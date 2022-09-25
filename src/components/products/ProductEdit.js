import React from "react";
import { Edit, useRecordContext } from 'react-admin';
import { ProductForm } from "./ProductForm";

const ProductTitle = () => {
    const record = useRecordContext();
    return <span>Edit {record ? `${record.nama}` : ''}</span>;
};

const ProductEdit = () => {
    return (
        <Edit title={<ProductTitle />} redirect="list">
            <ProductForm />
        </Edit>
    )
};

export default ProductEdit
