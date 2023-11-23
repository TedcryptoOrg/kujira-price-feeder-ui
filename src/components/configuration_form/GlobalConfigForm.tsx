import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {GlobalConfig} from "../../interfaces";

interface GlobalConfigFormProps {
    config: GlobalConfig;
    onConfigChange: (config: GlobalConfig) => void;
}

const GlobalConfigForm: React.FC<GlobalConfigFormProps> = ({ config, onConfigChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        onConfigChange({
            ...config,
            [name]: type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value),
        });
    };

    return (
        <>
            <TextField
                label="Gas Adjustment"
                name="gas_adjustment"
                type="number"
                value={config.gas_adjustment}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Gas Prices"
                name="gas_prices"
                value={config.gas_prices}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={config.enable_server}
                        onChange={handleChange}
                        name="enable_server"
                    />
                }
                label="Enable Server"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={config.enable_voter}
                        onChange={handleChange}
                        name="enable_voter"
                    />
                }
                label="Enable Voter"
            />
            <TextField
                label="Provider Timeout"
                name="provider_timeout"
                value={config.provider_timeout}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="History Database"
                name="history_db"
                value={config.history_db}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
        </>
    );
};

export default GlobalConfigForm;
