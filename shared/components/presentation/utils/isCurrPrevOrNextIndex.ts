/**
 * - If the index is the current index, the previous index or the next index, it should return true
 */
export default function isCurrPrevOrNextIndex(index: number, currIndex: number, sliderLength: number) {
    return (
        index === currIndex ||
        index === currIndex - 1 ||
        (currIndex === 0 && index === sliderLength - 1) ||
        index === currIndex + 1 ||
        (currIndex === sliderLength - 1 && index === 0)
    );
}
