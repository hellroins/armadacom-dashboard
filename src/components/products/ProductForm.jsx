import React, { useState } from "react";
// import { useFormContext } from 'react-hook-form';
import { TextInput, NumberInput, BooleanInput, SelectInput, required, TabbedForm, FormTab, ImageInput, ImageField, FormDataConsumer, AutocompleteInput, DateTimeInput } from 'react-admin';
import { Grid } from '@mui/material';
import { RichTextInput } from 'ra-input-rich-text';
import { FirebaseReferenceInput } from "../../FirebaseReferenceFields";
import { ColorInput } from 'react-admin-color-picker';
import axios from "axios";

const HargaInput = () => {
    // const { setValue } = useFormContext()
    // const { harga, setHarga } = useState(0)
    // const { diskon, setDiskon } = useState(1)
    // const { total, setTotal } = useState(0)
    var harga = 0;
    var diskon = 0;
    var total = 0;
    // const changeTotalFromHarga = (event) => {
    //     // console.log(event.target.value)
    //     if (event.target.value) {
    //         const value = event.target.value - (event.target.value * diskon / 100)
    //         harga = event.target.value
    //         setValue('total', value)
    //     }
    // }
    // const changeTotalFromDiskon = (event) => {
    //     if (event.target.value > 0) {
    //         // console.log('ini2')
    //         const value = harga - (harga * event.target.value / 100)
    //         diskon = event.target.value
    //         setValue('total', value)
    //     } else {
    //         // console.log('ini')
    //         const value = harga
    //         // console.log(harga)
    //         diskon = 0
    //         setValue('total', value)
    //     }
    // }
    // const changeDiskonFromTotal = (event) => {
    //     // console.log('oke')
    //     // }
    // }
    return (
        <>
            <Grid item xs={12} sm={4}>
                <NumberInput source="harga" validate={required()} defaultValue={harga} /* onChange={changeTotalFromHarga} */ fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
                <NumberInput source="diskon" validate={required()} defaultValue={diskon} /* onChange={changeTotalFromDiskon} */ fullWidth />
            </Grid>
            <Grid item xs={12} sm={4}>
                <NumberInput source="total" validate={required()} defaultValue={total} /* onChange={changeDiskonFromTotal} */ label="Harga Promo" fullWidth />
            </Grid>
        </>
    );
}

export const ProductForm = () => {
    const [products, setProducts] = useState([]);

    const getKode = async (event) => {
        if (event.target.value) {
            const result = await axios.get(
                "http://67d207301fb9.sn.mynetname.net:81/api/product?cari=" + event.target.value, { headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY2MjAxMDI4NywibmJmIjoxNjYyMDEwMjg3LCJqdGkiOiJtVnhSYklzbXZHMVRZMzg0Iiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.e-hhN23VQvHF9lW1-Z7meeC5LPirItPAk81yxd8JO_c' } }
            );
            setProducts(result.data.map((d) => ({ id: d.id, name: d.nama, data: d })));
            // setProduct(result);
        }
    }

    return (
        <TabbedForm warnWhenUnsavedChanges>
            <FormTab label="product">
                <Grid container columnSpacing={2}>
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        {/* <ReferenceInput source="kategori_id" reference="categories"> */}
                        <FirebaseReferenceInput
                            label="Kategori"
                            source="kategori_ref"
                            reference="categories">
                            <SelectInput optionText={"nama"} validate={required()} onChange={getKode} fullWidth />
                        </FirebaseReferenceInput>

                        {/* </ReferenceInput> */}
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <FormDataConsumer>
                            {({ formData, ...rest }) => (
                                <AutocompleteInput
                                    onCreate={(filter) => {
                                        const newCategory = { id: filter, name: filter };
                                        products.push(newCategory);
                                        return newCategory;
                                    }}
                                    source="nama" choices={products} optionValue={"name"} fullWidth validate={required()} disabled={products.length ? false : true} {...rest} />
                            )}
                        </FormDataConsumer>
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <DateTimeInput source="createdate" fullWidth label="Tanggal Posting"/>
                    </Grid>
                    <Grid item sm={3}>
                    </Grid>
                </Grid>
            </FormTab>
            <FormTab label="description">
                <Grid container columnSpacing={2}>
                    <HargaInput />
                    <Grid item xs={6} sm={4}>
                        <SelectInput source='kondisi' choices={[{ id: 'Baru', name: 'Baru' }, { id: 'Bekas', name: 'Bekas' }]} defaultValue={'Baru'} validate={required()} fullWidth />
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <TextInput source="catatan" fullWidth />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <ColorInput source="warna_catatan" defaultValue={''} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <RichTextInput source="deskripsi" defaultValue={''} fullWidth />
                    </Grid>
                </Grid>
            </FormTab>
            <FormTab label="galeri">
                <ImageInput source="gambar" label="Galeri Images" accept="image/*" validate={required()} multiple placeholder={<p>Pick some product images</p>}>
                    <ImageField source="src" title="title" />
                </ImageInput>
                <BooleanInput source="isActive" label="Active" defaultValue={true} />
                <BooleanInput source="isPromo" label="Promo" defaultValue={false} />
            </FormTab>
        </TabbedForm>
    );
}