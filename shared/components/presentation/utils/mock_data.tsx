import Button from "../../layout/Button";
import { TPresentationComponents, TPresentationImages } from "../types";

export const mock_sliderData: TPresentationImages = {
    type: "images",
    presentationItems: [
        { item: { src: "/img1.svg", alt: "An image of something" }, itemHeader: "Image 1" },
        { item: { src: "/img2.svg" }, itemHeader: "Image 2" },
        { item: { src: "/img3.svg" }, itemHeader: "Image 3" },
    ],
};

export const mock_sliderData2: TPresentationComponents = {
    type: "components",
    presentationItems: [
        { item: <Button>Some button</Button>, itemHeader: "Button 1" },
        { item: <Button>Some button</Button>, itemHeader: "Button 2" },
        { item: <Button>Some button</Button>, itemHeader: "Button 3" },
    ],
};
