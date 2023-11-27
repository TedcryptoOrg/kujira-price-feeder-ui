import React from 'react';
import { AppBar, Toolbar, IconButton, Grid } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import TedcryptoLogo from '../assets/tedcrypto_with_text_horizontal.png';

const Footer: React.FC = () => {
    return (
        <AppBar position="static" color="default" sx={{ top: 'auto', bottom: 0, backgroundColor: '#161721' }}>
            <Toolbar>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <h3 style={{ color: 'white'}}>Powered by</h3>
                        <img src={TedcryptoLogo} alt="Logo" style={{ height: 50 }} />
                    </Grid>
                    <Grid item>
                        <IconButton color="inherit" href="https://t.me/TedcryptoOfficial" target="_blank">
                            <TelegramIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;

