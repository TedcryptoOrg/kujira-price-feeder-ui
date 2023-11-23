import React from 'react';
import TextField from '@mui/material/TextField';
import {Account} from "../../interfaces";

interface AccountFormProps {
    account: Account;
    onAccountChange: (account: Account) => void;
}

const AccountConfigForm: React.FC<AccountFormProps> = ({ account, onAccountChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        onAccountChange({
            ...account,
            [name]: value,
        });
    };

    return (
        <>
            <TextField
                label="Fee Granter"
                name="fee_granter"
                value={account.fee_granter || ''}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Address"
                name="address"
                value={account.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Chain ID"
                name="chain_id"
                value={account.chain_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Validator"
                name="validator"
                value={account.validator}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Prefix"
                name="prefix"
                value={account.prefix}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
        </>
    );
};

export default AccountConfigForm;
