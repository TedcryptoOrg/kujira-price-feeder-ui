import React from 'react';
import { ProviderContract } from "../../interfaces";
import { Button, Grid, TextField, Box, Typography } from '@mui/material';

interface ProviderContractFormProps {
    config: ProviderContract[];
    onConfigChange: (newConfig: ProviderContract[]) => void;
}

const ProviderContractForm: React.FC<ProviderContractFormProps> = ({ config, onConfigChange }) => {
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const newContracts = [...config];
        newContracts[index] = { ...newContracts[index], [event.target.name]: event.target.value };
        onConfigChange(newContracts);
    };

    const handleAddressChange = (contractIndex: number, addressIndex: number, event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const newContracts = [...config];
        newContracts[contractIndex].addresses[addressIndex] = { ...newContracts[contractIndex].addresses[addressIndex], [event.target.name]: event.target.value };
        onConfigChange(newContracts);
    };

    const handleAddContract = () => {
        onConfigChange([...config, { name: '', addresses: [] }]);
    };

    const handleRemoveContract = (index: number) => {
        const newContracts = [...config];
        newContracts.splice(index, 1);
        onConfigChange(newContracts);
    };

    const handleAddAddress = (index: number) => {
        const newContracts = [...config];
        newContracts[index].addresses.push({ denom: '', address: '' });
        onConfigChange(newContracts);
    };

    const handleRemoveAddress = (contractIndex: number, addressIndex: number) => {
        const newContracts = [...config];
        newContracts[contractIndex].addresses.splice(addressIndex, 1);
        onConfigChange(newContracts);
    };

    return (
        <>
            {config.map((contract, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={3}>
                        <TextField
                            label="Name"
                            name="name"
                            value={contract.name}
                            onChange={(event) => handleInputChange(index, event)}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button onClick={() => handleRemoveContract(index)}>Remove</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Box border={1} p={2} m={2} borderRadius={2}>
                            <Typography variant="h6">Contract Addresses</Typography>
                            {contract.addresses.map((address, addressIndex) => (
                                <Grid container spacing={2} alignItems="center" key={addressIndex}>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="Denom"
                                            name="denom"
                                            value={address.denom}
                                            onChange={(event) => handleAddressChange(index, addressIndex, event)}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextField
                                            label="Address"
                                            name="address"
                                            value={address.address}
                                            onChange={(event) => handleAddressChange(index, addressIndex, event)}
                                            margin="normal"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button onClick={() => handleRemoveAddress(index, addressIndex)}>Remove</Button>
                                    </Grid>
                                </Grid>
                            ))}
                            <Button onClick={() => handleAddAddress(index)}>Add Address</Button>
                        </Box>
                    </Grid>
                </Grid>
            ))}
            <Grid container justifyContent="flex-end">
                <Button onClick={handleAddContract}>Add Contract</Button>
            </Grid>
        </>
    );
};

export default ProviderContractForm;