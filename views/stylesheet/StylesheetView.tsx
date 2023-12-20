"use client";
import mock_formData from "@/data/form/mock_data";
import { mock_listItems, mock_menuItems } from "@/data/list/mock_data";
import FileInput from "@/shared/components/inputs/FileInput";
import Form from "@/shared/components/inputs/Form";
import Switch from "@/shared/components/inputs/Switch";
import TextInput from "@/shared/components/inputs/TextInput";
import Button from "@/shared/components/layout/Button";
import ButtonLink from "@/shared/components/layout/ButtonLink";
import Card from "@/shared/components/layout/Card";
import Row from "@/shared/components/layout/Row";
import Section from "@/shared/components/layout/Section";
import Title from "@/shared/components/layout/Title";
import Wrapper from "@/shared/components/layout/Wrapper";
import Slider from "@/shared/components/presentation/Slider";
import List from "@/shared/components/menu/List";
import Menu from "@/shared/components/menu/Menu";
import React from "react";
import { TPresentationProps } from "@/shared/components/presentation/types";
import Tabs from "@/shared/components/presentation/Tabs";

const mock_sliderData: TPresentationProps = {
    type: "images",
    presentationItems: [
        { item: { src: "/img1.jpg", alt: "An image of something" }, itemHeader: "Image 1" },
        { item: { src: "/img2.jpg" }, itemHeader: "Image 2" },
        { item: { src: "/img3.jpg" }, itemHeader: "Image 3" },
        { item: { src: "/img1.jpg" }, itemHeader: "Image 4" },
        { item: { src: "/img2.jpg" }, itemHeader: "Image 5" },
        { item: { src: "/img3.jpg" }, itemHeader: "Image 6" },
    ],
};

const mock_sliderData2: TPresentationProps = {
    type: "components",
    presentationItems: [
        { item: <Button>Some button</Button>, itemHeader: "Button 1" },
        { item: <Button>Some button</Button>, itemHeader: "Button 2" },
        { item: <Button>Some button</Button>, itemHeader: "Button 3" },
    ],
};

const StylesheetView = () => {
    return (
        <Section>
            <Wrapper>
                <Title>Slider with images</Title>
                <Row>
                    <Slider {...mock_sliderData} />
                </Row>
                <Title>Slider with components</Title>
                <Row>
                    <Slider {...mock_sliderData2} />
                </Row>
                <Title>Tabs with images</Title>
                <Row>
                    <Tabs {...mock_sliderData} />
                </Row>
                <Title>Tabs with components</Title>
                <Row>
                    <Tabs {...mock_sliderData2} />
                </Row>
                <Title>Lightbox with images</Title>
                <Title>Lightbox with components</Title>
                <Title>List</Title>
                <Row>
                    <List listItems={mock_listItems} />
                </Row>
                <Title>Cards</Title>
                <Row>
                    <Card>
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>

                    <Card width="half">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                    <Card width="half">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>

                    <Card width="third">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                    <Card width="third">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                    <Card width="third">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>

                    <Card width="quarter">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                    <Card width="quarter">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                    <Card width="quarter">
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                    <Card width="quarter" isHoverable={true}>
                        <h3>Text</h3>
                        <p>Lorem ipsum dolor sit amet</p>
                    </Card>
                </Row>

                <Title>Buttons</Title>
                <Row>
                    <ButtonLink href={"/"} linkStyle="linkText">
                        Link text
                    </ButtonLink>
                    <ButtonLink href={"/"}>Link text</ButtonLink>
                    <Button>Button text</Button>
                    <Button btnStyle="outline">Button text</Button>
                    <Button btnType="primary">Button text</Button>
                    <Button btnType="secondary">Button text</Button>
                    <Button btnType="primary" btnStyle="outline">
                        Button text
                    </Button>
                    <Button btnType="secondary" btnStyle="outline">
                        Button text
                    </Button>
                </Row>
                <Title>Menu</Title>
                <Row>
                    <Menu menuContents={mock_menuItems.menuContents} menuPosition="right">
                        Menu right
                    </Menu>
                    <Menu menuContents={mock_menuItems.menuContents} menuPosition="right-bottom">
                        Menu right bottom
                    </Menu>
                    <Menu menuContents={mock_menuItems.menuContents} menuPosition="right-bottom-inner">
                        Menu right bottom inner
                    </Menu>
                    <Menu menuContents={mock_menuItems.menuContents} menuPosition="left">
                        Menu left
                    </Menu>
                    <Menu menuContents={mock_menuItems.menuContents} menuPosition="left-bottom">
                        Menu left bottom
                    </Menu>
                    <Menu menuContents={mock_menuItems.menuContents} menuPosition="left-bottom-inner">
                        Menu left bottom inner
                    </Menu>
                </Row>
                <TextInput errorCallbacks={[{ validation: "minmax", args: [1, 10] }]} defaultValue={"Value"}>
                    This is the description
                </TextInput>
                <TextInput type="textarea">This is the textarea</TextInput>
                <Switch>This is a switch</Switch>
                <FileInput uploadToServerData={{ endpoint: "/api/file" }} errorCallbacks={[{ validation: "file" }]} />
                <FileInput uploadToServerData={{ endpoint: "/api/file" }} errorCallbacks={[{ validation: "file" }]} />

                <Card>
                    <Title>Dynamic form</Title>
                    <Form {...mock_formData} />
                </Card>
            </Wrapper>
        </Section>
    );
};

export default StylesheetView;
