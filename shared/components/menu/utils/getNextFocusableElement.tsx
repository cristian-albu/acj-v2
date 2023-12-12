const isFocusableElement = (element: HTMLElement): boolean => {
    const focusableTags = ["A", "BUTTON", "TEXTAREA", "INPUT", "SELECT", "DIV"];
    const focusableInputTypes = ["text", "radio", "checkbox"];

    const tagName = element.tagName;
    const inputType = (element as HTMLInputElement).type;

    return (
        focusableTags.includes(tagName) ||
        (tagName === "INPUT" && focusableInputTypes.includes(inputType)) ||
        (tagName === "DIV" && element.hasAttribute("tabindex"))
    );
};

export const getNextFocusableElement = (container: HTMLElement): HTMLElement | undefined => {
    const focusableElements = Array.from(
        container.querySelectorAll<HTMLElement>(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, div[tabindex], ul[tabindex], li[tabindex]'
        )
    );

    const currentActiveElement = document.activeElement;

    const currentIndex =
        container && currentActiveElement instanceof HTMLElement ? focusableElements.indexOf(currentActiveElement) : -1;
    const nextIndex = (currentIndex + 1) % focusableElements.length;

    return focusableElements[nextIndex];
};
