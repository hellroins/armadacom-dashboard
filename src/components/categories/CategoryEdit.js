import { Edit, useRecordContext } from "react-admin";
import { CategoryForm } from "./CategoryForm";

const CategoryTitle = () => {
    const record = useRecordContext();
    return <span>Edit {record ? `${record.id}` : ''}</span>;
};

const CategoryEdit = () => (
    <Edit title={<CategoryTitle />} redirect="list">
        <CategoryForm />
    </Edit>
);

export default CategoryEdit;