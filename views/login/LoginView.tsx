"use client";
import Form from "@/shared/components/inputs/Form";
import { TDynamicFormProps } from "@/shared/components/inputs/types";
import Card from "@/shared/components/layout/Card";
import Section from "@/shared/components/layout/Section";
import Title from "@/shared/components/layout/Title";
import Wrapper from "@/shared/components/layout/Wrapper";
import React from "react";

const formData: TDynamicFormProps = {
    inputList: [
        {
            type: "text",
            children: "Email",
            id: "email",
            errorCallbacks: [{ validation: "email" }, { validation: "minmax", args: [1, 10] }, { validation: "slug" }],
        },
        // { type: "password", children: "Password", id: "password" },
    ],
    formButton: {
        text: "Login",
        action: (data) => console.log(data),
    },
};

const LoginView = () => {
    return (
        <Section>
            <Wrapper width="small">
                <Card>
                    <Title>Text</Title>
                    <Form {...formData} />
                </Card>
            </Wrapper>
        </Section>
    );
};

export default LoginView;
