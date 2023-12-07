"use client";
import { mock_listItems } from "@/data/list/mock_data";
import FileInput from "@/shared/components/inputs/FileInput";
import Form from "@/shared/components/inputs/Form";
import Switch from "@/shared/components/inputs/Switch";
import TextInput from "@/shared/components/inputs/TextInput";
import { TDynamicFormProps } from "@/shared/components/inputs/types";
import Button from "@/shared/components/layout/Button";
import ButtonLink from "@/shared/components/layout/ButtonLink";
import Card from "@/shared/components/layout/Card";
import Row from "@/shared/components/layout/Row";
import Section from "@/shared/components/layout/Section";
import Wrapper from "@/shared/components/layout/Wrapper";
import List from "@/shared/components/list/List";
import React from "react";

const mock_props: TDynamicFormProps = {
    inputList: [
        {
            type: "text",
            children: "Email Input",
            id: "id1",
            errorCallbacks: [{ validation: "email" }],
            defaultValue: "Default text",
        },
        { type: "text", children: "Slug input", id: "id2", errorCallbacks: [{ validation: "slug" }] },
        { type: "text", children: "Text input", id: "id3", errorCallbacks: [{ validation: "minmax", args: [0, 64] }] },
        { type: "number", children: "Text input", id: "id4", errorCallbacks: [{ validation: "minmax", args: [0, 2] }] },
        { type: "textarea", children: "Textarea", id: "id5", errorCallbacks: [{ validation: "minmax", args: [0, 128] }] },
        { type: "file", children: "File upload", id: "id6", errorCallbacks: [{ validation: "file" }] },
        { type: "file", children: "File upload 2", id: "id7", errorCallbacks: [{ validation: "file" }] },
    ],
    formButton: {
        text: "Submit",
        action: (data) => console.log(data),
    },
};

const StylesheetView = () => {
    return (
        <Section>
            <Wrapper width="small">
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
                </Row>
                <TextInput
                    errorCallbacks={[{ validation: "email" }, { validation: "minmax", args: [1, 10] }]}
                    defaultValue={"Value"}
                >
                    This is the description
                </TextInput>
                <TextInput type="textarea">This is the textarea</TextInput>
                <Switch>This is a switch</Switch>
                <FileInput errorCallbacks={[{ validation: "file" }]} />
                <FileInput errorCallbacks={[{ validation: "file" }]} />

                <Form {...mock_props} />
            </Wrapper>
        </Section>
    );
};

export default StylesheetView;
