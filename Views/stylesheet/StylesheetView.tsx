"use client";
import Switch from "@/shared/components/inputs/Switch";
import TextInput from "@/shared/components/inputs/TextInput";
import TextareaInput from "@/shared/components/inputs/TextareaInput";
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
                        <ButtonLink isExternal={false} href={"/"}>
                            Link text
                        </ButtonLink>
                        <Button>Button text</Button>
                    </Card>
                </Row>
                <TextInput>This is the description</TextInput>
                <TextareaInput>This is a textarea</TextareaInput>
                <Switch>This is a switch</Switch>
            </Wrapper>
        </Section>
    );
};

export default StylesheetView;
