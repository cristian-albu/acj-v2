type AnyFunction = (...args: any[]) => void;

interface DebouncedFunction<T extends AnyFunction> {
    (...args: Parameters<T>): void;
    cancel: () => void;
}

export default function debounce<T extends AnyFunction>(func: T, delay: number): DebouncedFunction<T> {
    let timeoutId: NodeJS.Timeout;

    const debounced = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    } as DebouncedFunction<T>;

    debounced.cancel = () => {
        clearTimeout(timeoutId);
    };

    return debounced;
}
