import React from 'react';
import TextField from '@mui/material/TextField';
import { ProviderMinOverrides } from "../../interfaces";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

interface ProviderMinOverridesFormProps {
    config: ProviderMinOverrides[];
    onConfigChange: (newConfig: ProviderMinOverrides[]) => void;
}

const ProviderMinOverridesForm: React.FC<ProviderMinOverridesFormProps> = ({ config, onConfigChange }) => {
    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newOverrides = [...config];
        newOverrides[index] = { ...newOverrides[index], [event.target.name]: parseInt(event.target.value) };
        onConfigChange(newOverrides);
    };

    const handleDenomsChange = (index: number, event: React.ChangeEvent<{}>, value: string[]) => {
        const newOverrides = [...config];
        newOverrides[index] = { ...newOverrides[index], denoms: value };
        onConfigChange(newOverrides);
    };

    const handleAddOverride = () => {
        onConfigChange([...config, { denoms: [], providers: 0 }]);
    };

    const handleRemoveOverride = (index: number) => {
        const newOverrides = [...config];
        newOverrides.splice(index, 1);
        onConfigChange(newOverrides);
    };

    return (
        <>
            {config.map((override, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={5}>
                        <Autocomplete
                            multiple
                            options={[]}
                            freeSolo
                            value={override.denoms}
                            onChange={(event, value) => handleDenomsChange(index, event, value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Denoms" margin="normal" fullWidth />
                            )}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label="Providers"
                            name="providers"
                            type="number"
                            value={override.providers}
                            onChange={(event) => handleInputChange(index, event)}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => handleRemoveOverride(index)}>Remove</Button>
                    </Grid>
                </Grid>
            ))}
            <Grid container justifyContent="flex-end">
                <Button onClick={handleAddOverride}>Add Override</Button>
            </Grid>
        </>
    );
};

export default ProviderMinOverridesForm;