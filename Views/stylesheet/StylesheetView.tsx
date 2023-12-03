"use client";
import Switch from "@/shared/components/inputs/Switch";
import TextInput from "@/shared/components/inputs/TextInput";
import Button from "@/shared/components/layout/Button";
import ButtonLink from "@/shared/components/layout/ButtonLink";
import Card from "@/shared/components/layout/Card";
import Row from "@/shared/components/layout/Row";
import Section from "@/shared/components/layout/Section";
import Wrapper from "@/shared/components/layout/Wrapper";
import React from "react";

const StylesheetView = () => {
    return (
        <Section>
            <Wrapper width="small">
                <Row>
                    <Card>
                        <ButtonLink href={"/"}>Link text</ButtonLink>
                        <Button>Button text</Button>
                    </Card>
                </Row>
                <TextInput errorCallbacks={[{ validation: "email" }]}>This is the description</TextInput>
                <TextInput type="textarea">This is the textarea</TextInput>
                <Switch>This is a switch</Switch>
            </Wrapper>
        </Section>
    );
};

export default StylesheetView;
