import { useEffect, useState } from "react";
import {
    TextInput,
    BooleanInput,
    SelectInput,
    AutocompleteInput,
    SimpleForm,
    FormDataConsumer,
    ImageInput,
    ImageField,
    required
} from "react-admin";
import { Grid } from '@mui/material';
import axios from "axios";
import { useFormContext } from "react-hook-form";

// axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY2MjAxMDI4NywibmJmIjoxNjYyMDEwMjg3LCJqdGkiOiJtVnhSYklzbXZHMVRZMzg0Iiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.e-hhN23VQvHF9lW1-Z7meeC5LPirItPAk81yxd8JO_c'

const optionRenderer = categori => `${categori.kode} | ${categori.nama}`;

const AutoFillNama = (props) => {
    const {
        choices,
        fillId
    } = props;
    const { setValue } = useFormContext();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(
                "http://67d207301fb9.sn.mynetname.net:81/api/product_categories", { headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTY2MjAxMDI4NywibmJmIjoxNjYyMDEwMjg3LCJqdGkiOiJtVnhSYklzbXZHMVRZMzg0Iiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.e-hhN23VQvHF9lW1-Z7meeC5LPirItPAk81yxd8JO_c' } })
                .then(response => {
                    setCategories(response.data)
                }
                )
        }
        fetchData()
    }, [])

    const filterCategori = (event) => {
        const filtered = categories.filter(category => category.jenis_kategori === event)
        return filtered.map((d) => ({ kode: d.kode_kategori, nama: d.nama_kategori }))
    }

    const getNamaKategori = async (event) => {
        if (event) {
            const filtered = categories.filter(category => category.kode_kategori === event)
            setValue('nama', filtered[0].nama_kategori)
        }
    }
    return (
        // <AutocompleteInput onChange={getNamaKategori} {...props} />
        <>
            <Grid item xs={12} sm={4}>
                <AutocompleteInput source="id" label="Kode Kategori" choices={
                    categories && choices ? filterCategori(choices) : []
                } optionText={optionRenderer} optionValue={"kode"} validate={required()} onChange={getNamaKategori} fullWidth disabled={choices ? false : true} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextInput
                    source="nama"
                    validate={required()}
                    disabled={fillId ? false : true}
                    fullWidth
                />
            </Grid>
        </>
    );
}

export const CategoryForm = () => {
    return (
        <SimpleForm>
            <FormDataConsumer>
                {({ formData, ...rest }) => {
                    return (
                        <Grid container columnSpacing={2}>
                            <Grid item xs={12} sm={4}>
                                <SelectInput source='jenis' choices={[{ id: 'barang', name: 'Barang' }, { id: 'jasa', name: 'Jasa' }]} validate={required()} fullWidth />
                            </Grid>
                            <AutoFillNama choices={formData.jenis} fillId={formData.id}/>
                            {/* <Grid item xs={12} sm={4}>
                                <AutocompleteInput source="id" label="Kode Kategori" choices={formData.jenis} optionText={optionRenderer} optionValue={"kode"} validate={required()} fullWidth disabled={formData.jenis ? false : true} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextInput
                                    source="nama"
                                    validate={required()}
                                    disabled={formData.id && formData.jenis ? false : true}
                                    fullWidth
                                />
                            </Grid> */}
                        </Grid>
                    )
                }}
            </FormDataConsumer>
            <ImageInput source="icon" defaultValue={[]} label="Icon" accept="image/png" placeholder={<p>Max Resolution : 100px * 100px <br />Max Size : 100kb</p>}>
                <ImageField source="src" title="title" />
            </ImageInput>
            <BooleanInput source="isActive" label="Active" defaultValue={true} />
        </SimpleForm>
    );
}