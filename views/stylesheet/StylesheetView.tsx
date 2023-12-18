"use client";
import mock_formData from "@/data/form/mock_data";
import mock_listItems from "@/data/list/mock_data";
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
import { TSliderProps } from "@/shared/components/presentation/types";

const mock_sliderData: TSliderProps = {
    type: "images",
    sliderItems: [
        { item: { src: "/img1.jpg" } },
        { item: { src: "/img2.jpg" } },
        { item: { src: "/img3.jpg" } },
        { item: { src: "/img1.jpg" } },
        { item: { src: "/img2.jpg" } },
        { item: { src: "/img3.jpg" } },
    ],
};

const StylesheetView = () => {
    return (
        <Section>
            <Wrapper>
                <Row>
                    <Slider sliderItems={mock_sliderData.sliderItems} type={mock_sliderData.type} />
                </Row>
                <Row>
                    <List listItems={mock_listItems} />
                </Row>
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

                    <Menu menuContents={{ listItems: mock_listItems }}>Menu</Menu>
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
