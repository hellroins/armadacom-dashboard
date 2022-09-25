import { useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, DateField, TextField, ImageField, BooleanField, EditButton, DeleteButton } from 'react-admin';

const CategoryList = props => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} title="Category List">
            {isSmall ? (
            <SimpleList
                primaryText={<TextField source="id" />}
                secondaryText={<TextField source="nama" />}
                rightAvatar={record => record.icon.src}
                linkType="edit"
            />
            ) :
            (
            <Datagrid>
                <TextField source="id" />
                <TextField source="nama" />
                <TextField source="jenis" />
                <ImageField source="icon.src" label="Icon" sortable={false} />
                <DateField source="createdate" label="Create Date" />
                <DateField source="lastupdate" label="Last Update" />
                <BooleanField source="isActive" label="Active" />
                <EditButton />
                <DeleteButton />
            </Datagrid>
            )}
        </List>
    );
}

export default CategoryList;