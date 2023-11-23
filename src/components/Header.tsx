import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import DiscordIcon from '@mui/icons-material/Forum'; // Example, as there's no Discord icon in MUI
import kujiraLogo from '../assets/kujira_logo.svg';

const Header = () => {
    return (
        <AppBar position="static" color="default" sx={{ backgroundColor: '#161721' }}>
            <Toolbar>
                <a href={`/`}><img src={kujiraLogo} alt="Logo" width={`200px`}/></a>
                &nbsp;<h3 style={{ color: 'white' }}>Price feeder by Tedcrypto.io</h3>
                <div style={{ flexGrow: 1 }}></div>
                <IconButton color="inherit" href="https://github.com/Team-Kujira" target="_blank" rel="noopener noreferrer">
                    <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" href="https://discord.gg/teamkujira" target="_blank" rel="noopener noreferrer">
                    <DiscordIcon />
                </IconButton>
                <IconButton color="inherit" href="https://twitter.com/TeamKujira" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
