export default function getEffectiveBackgroundColor(element: HTMLElement) {
    while (element) {
        const computedStyle = window.getComputedStyle(element);
        const backgroundColor = computedStyle.backgroundColor;

        // Check if the background color is not transparent
        if (backgroundColor !== "rgba(0, 0, 0, 0)" && backgroundColor !== "transparent") {
            return backgroundColor;
        }

        // Move to the parent element
        element.parentElement ? (element = element.parentElement) : null;
    }

    // Return a default color if no non-transparent background color is found
    return "white"; // You can choose a default color
}
