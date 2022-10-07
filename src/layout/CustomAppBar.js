import { AppBar } from 'react-admin';
import { Typography } from '@mui/material';

export const CustomAppBar = (props) => (
    <AppBar {...props}>
        <Typography flex="1" variant="h6" id="react-admin-title"></Typography>
        {/* <LocalesMenuButton languages={[
            { locale: 'en', name: 'English' },
            { locale: 'id', name: 'Indonesia' },
        ]} /> */}
    </AppBar>
);