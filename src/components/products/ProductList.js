import { useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, TextField, EditButton, Filter, NumberField, BooleanField, useRecordContext, SelectInput, TextInput } from 'react-admin';
import { FirebaseReferenceField, FirebaseReferenceInput } from "../../FirebaseReferenceFields";

const ProductFilter = (props) => (
    <Filter {...props} disableSaveQuery>
        <TextInput label="Nama Barang" source='nama' resettable alwaysOn />
        <FirebaseReferenceInput
            source="kategori_ref"
            reference="categories"
            alwaysOn
        >
            <SelectInput label="Kategori" optionText={"nama"} emptyText="Semua Kategori" fullWidth />
        </FirebaseReferenceInput>
    </Filter>
);

const CustomColorField = ({ source }) => {
    const record = useRecordContext();
    return record ? (
        <div>
            <span
                style={{
                    height: '25px',
                    width: '25px',
                    backgroundColor: record[source],
                    borderRadius: '50%',
                    display: 'inline-block',
                }}></span>
        </div>
    ) : null;
}

const ProductList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={<ProductFilter />} title='Product List' >
            {isSmall ? (
                <SimpleList
                    primaryText={<TextField source="nama" />}
                    secondaryText={record => `${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(record.harga)}`}
                    rightAvatar={record => record.gambar[0].src}
                    linkType="edit"
                />
            ) :
                (
                    <Datagrid>
                        <FirebaseReferenceField source="kategori_ref" reference="categories" label="Kategori" link={false}>
                            <TextField source="nama" />
                        </FirebaseReferenceField>
                        <TextField source="nama" />
                        <NumberField source="harga" locales={"id-ID"} options={{ style: 'currency', currency: 'IDR' }} />
                        <NumberField source="diskon" />
                        <TextField source="kondisi" />
                        <CustomColorField source="warna_catatan" label='Warna' />
                        <BooleanField source="isActive" label="Active" />
                        <EditButton />
                    </Datagrid>
                )}
        </List >
    );
}

export default ProductList