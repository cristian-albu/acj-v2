export type TFocusableElements = {
    elements: HTMLElement[];
};

export type TFocusableElement = {
    [key in "prevElement" | "nextElement" | "currElement" | "lastElement" | "firstElement"]: HTMLElement | null;
};

export type TFocusableElementsObj = TFocusableElements & TFocusableElement;

/**
 * @param {HTMLElement} container - The container of one or multiple focusable elements.
 * @returns {TFocusableElementsObj}
 */
export const getFocusableElements = (container: HTMLElement) => {
    const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, div[tabindex], ul[tabindex], li[tabindex], label[tabindex]'
        )
    );

    const currentActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const currentIndex = container && currentActiveElement ? focusableElements.indexOf(currentActiveElement) : -1;

    let elements: TFocusableElementsObj = {
        prevElement: null,
        nextElement: null,
        currElement: currentActiveElement,
        lastElement: null,
        firstElement: null,
        elements: focusableElements,
    };

    if (focusableElements.length > 0) {
        elements.firstElement = focusableElements[0];
        elements.lastElement = focusableElements[focusableElements.length - 1];
    }

    if (currentIndex >= 0) {
        if (currentIndex < focusableElements.length - 1) {
            elements.nextElement = focusableElements[currentIndex + 1];
        }

        if (currentIndex > 0) {
            elements.prevElement = focusableElements[currentIndex - 1];
        }
    }

    return { ...elements };
};
