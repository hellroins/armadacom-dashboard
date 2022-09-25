import React from "react";
import { Create } from "react-admin";
import { CategoryForm } from "./CategoryForm";

const CategoryCreate = () => {
    return (
        <Create title="Product Category Add" redirect="list">
            <CategoryForm />
        </Create>
    );
};

export default CategoryCreate;