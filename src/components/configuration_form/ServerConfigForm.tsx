import React from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {ServerConfig} from "../../interfaces";

interface ServerConfigFormProps {
    server: ServerConfig;
    onServerChange: (config: ServerConfig) => void;
}

const ServerConfigForm: React.FC<ServerConfigFormProps> = ({ server, onServerChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        onServerChange({
            ...server,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return (
        <div>
            <TextField
                label="Listen Address"
                name="listen_addr"
                value={server.listen_addr}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Read Timeout"
                name="read_timeout"
                value={server.read_timeout}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={server.verbose_cors}
                        onChange={handleChange}
                        name="verbose_cors"
                    />
                }
                label="Verbose CORS"
            />
            <TextField
                label="Write Timeout"
                name="write_timeout"
                value={server.write_timeout}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
        </div>
    );
};

export default ServerConfigForm;
