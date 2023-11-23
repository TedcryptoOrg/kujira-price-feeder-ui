import React from 'react';
import TextField from '@mui/material/TextField';
import {Keyring} from "../../interfaces";
interface KeyringFormProps {
    keyring: Keyring;
    onKeyringChange: (keyring: Keyring) => void;
}

const KeyringConfigForm: React.FC<KeyringFormProps> = ({ keyring, onKeyringChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        onKeyringChange({
            ...keyring,
            [name]: value,
        });
    };

    return (
        <>
            <TextField
                label="Backend"
                name="backend"
                value={keyring.backend}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Directory"
                name="dir"
                value={keyring.dir}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
        </>
    );
};

export default KeyringConfigForm;
