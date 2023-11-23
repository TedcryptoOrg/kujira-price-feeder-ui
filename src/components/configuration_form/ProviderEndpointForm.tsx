import React, {useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import { ProviderEndpoints } from "../../interfaces";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ProviderEndpointsFormProps {
    config: ProviderEndpoints[];
    onConfigChange: (newConfig: ProviderEndpoints[]) => void;
}

const ProviderEndpointsForm: React.FC<ProviderEndpointsFormProps> = ({ config, onConfigChange }) => {
    const [showAdvanced, setShowAdvanced] = useState<boolean[]>(config.map(endpoint => endpoint.provider_timeout !== undefined && endpoint.provider_timeout !== ''));

    useEffect(() => {
        setShowAdvanced(config.map(endpoint => endpoint.provider_timeout !== undefined && endpoint.provider_timeout !== ''));
    }, [config]);

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newEndpoints = [...config];
        newEndpoints[index] = { ...newEndpoints[index], [event.target.name]: event.target.value };
        onConfigChange(newEndpoints);
    };

    const handleUrlsChange = (index: number, event: React.ChangeEvent<{}>, value: string[]) => {
        const newEndpoints = [...config];
        newEndpoints[index] = { ...newEndpoints[index], urls: value };
        onConfigChange(newEndpoints);
    };

    const handleAddEndpoint = () => {
        onConfigChange([...config, { name: '', urls: [], provider_timeout: '' }]);
    };

    const handleRemoveEndpoint = (index: number) => {
        const newEndpoints = [...config];
        newEndpoints.splice(index, 1);
        onConfigChange(newEndpoints);
    };

    return (
        <>
            {config.map((endpoint, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={3}>
                        <TextField
                            label="Name"
                            name="name"
                            value={endpoint.name}
                            onChange={(event) => handleInputChange(index, event)}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            multiple
                            options={[]}
                            freeSolo
                            value={endpoint.urls}
                            onChange={(event, value) => handleUrlsChange(index, event, value)}
                            renderInput={(params) => (
                                <TextField {...params} label="URLs" margin="normal" fullWidth />
                            )}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <FormControlLabel
                            control={<Switch checked={showAdvanced[index]} onChange={() => {
                                const newShowAdvanced = [...showAdvanced];
                                newShowAdvanced[index] = !newShowAdvanced[index];
                                setShowAdvanced(newShowAdvanced);
                            }} />}
                            label="Advanced"
                        />
                        <Button onClick={() => handleRemoveEndpoint(index)}>Remove</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Collapse in={showAdvanced[index]}>
                            <Box border={1} p={2} m={2} borderRadius={2}>
                                <Typography variant="h6">Advanced settings</Typography>
                                <TextField
                                    label="Provider Timeout"
                                    name="provider_timeout"
                                    value={endpoint.provider_timeout}
                                    onChange={(event) => handleInputChange(index, event)}
                                    margin="normal"
                                    fullWidth
                                />
                            </Box>
                        </Collapse>
                    </Grid>
                </Grid>
            ))}
            <Grid container justifyContent="flex-end">
                <Button onClick={handleAddEndpoint}>Add Endpoint</Button>
            </Grid>
        </>
    );
};

export default ProviderEndpointsForm;