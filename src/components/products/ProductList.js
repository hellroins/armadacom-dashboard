import { useMediaQuery } from '@mui/material';
import { List, SimpleList, Datagrid, TextField, EditButton, RichTextField, Filter, SearchInput, NumberField } from 'react-admin';
import { FirebaseReferenceField } from "../../FirebaseReferenceFields";

const ProductFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Customer Email" source='nama' resettable alwaysOn />
    </Filter>
);

const ProductList = (props) => {
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List {...props} filters={<ProductFilter />} title='Product List'>
            {isSmall ? (
                <SimpleList
                    primaryText={<TextField source="nama" />}
                    secondaryText={record=>`${Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(record.harga)}`}
                    rightAvatar={record => record.gambar[0].src}
                    linkType="edit"
                />
            ) :
                (
                    <Datagrid>
                        <FirebaseReferenceField source="kategori_ref" reference="categories" label="Kategori">
                            <TextField source="nama" />
                        </FirebaseReferenceField>
                        <TextField source="nama" />
                        <NumberField source="harga" locales={"id-ID"} options={{ style: 'currency', currency: 'IDR' }}/>
                        <NumberField source="diskon" />
                        <TextField source="kondisi" />
                        <TextField source="catatan" />
                        <TextField source="warna_catatan" />
                        <TextField source="isActive" label="Active" />
                        <EditButton />
                    </Datagrid>
                )}
        </List >
    );
}

export default ProductList