"use client";
import React from "react";
import { mock_products, mock_order, mock_productOrder } from "@/data/api/mock_data";
import styles from "./mockapi.module.scss";
import { Order, Product, ProductOrder } from "@prisma/client";

const token = "lPjlecas14258ujasHjvwz";

const createProduct = async (data: Product) => {
    const payload: ProductRequestPayload = {
        data: data,
        authToken: token,
    };

    const res = await fetch("/api/shop/create-product", {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resJson = await res.json();

    console.log(resJson);
};

const createOrder = async (orderData: Order, productsData: ProductOrder[]) => {
    const payload: OrderRequestPayload = {
        orderData: orderData,
        productsData: productsData,
        authToken: token,
    };

    const res = await fetch("/api/shop/create-order", {
        method: "POST",
        body: JSON.stringify(payload),
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const resJson = await res.json();

    console.log(resJson);
};
const MockApiPayloads = () => {
    return (
        <div className={styles.mockapi}>
            <h2>Products</h2>
            <pre>
                <code>{JSON.stringify(mock_products, null, 4)}</code>
            </pre>

            <div className={styles.buttons}>
                <button onClick={() => createProduct(mock_products[0])}>Create product 1</button>
                <button onClick={() => createProduct(mock_products[1])}>Create product 2</button>
                <button>Delete product 1</button>
                <button>Delete product 2</button>
            </div>

            <br />

            <pre>
                <code>{JSON.stringify(mock_order, null, 4)}</code>
            </pre>

            <pre>
                <code>{JSON.stringify(mock_productOrder, null, 4)}</code>
            </pre>
            <div className={styles.buttons}>
                <button onClick={() => createOrder(mock_order, mock_productOrder)}>Create order</button>
            </div>
        </div>
    );
};

export default MockApiPayloads;
