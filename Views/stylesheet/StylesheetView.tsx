"use client";
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
            <Wrapper>
                <Row>
                    <Card>
                        <ButtonLink isExternal={false} href={"/"}>
                            Link text
                        </ButtonLink>
                        <Button>Button text</Button>
                    </Card>
                </Row>
            </Wrapper>
        </Section>
    );
};

export default StylesheetView;
