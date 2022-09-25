import React from "react";
import { Create } from 'react-admin';
import { ProductForm } from "./ProductForm";

const ProductCreate = () => {
    return (
        <Create title="Product  Add" redirect="list">
            <ProductForm />
        </Create>
    )
};

export default ProductCreate