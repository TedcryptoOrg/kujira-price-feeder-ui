import React from 'react';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Telemetry} from "../../interfaces";
import {Box, Button} from "@mui/material";
import Grid from "@mui/material/Grid";

interface TelemetryConfigFormProps {
    config: Telemetry;
    onConfigChange: (newConfig: Telemetry) => void;
}

const TelemetryConfigForm: React.FC<TelemetryConfigFormProps> = ({ config, onConfigChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        onConfigChange({
            ...config,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleLabelChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newLabels = [...config.global_labels];
        if (event.target.name === 'key') {
            newLabels[index][0] = event.target.value;
        } else if (event.target.name === 'value') {
            newLabels[index][1] = event.target.value;
        }
        onConfigChange({
            ...config,
            global_labels: newLabels
        });
    };

    const handleAddLabel = () => {
        onConfigChange({
            ...config,
            global_labels: [...config.global_labels, ['', '']]
        });
    };

    const handleRemoveLabel = (index: number) => {
        const newLabels = [...config.global_labels];
        newLabels.splice(index, 1);
        onConfigChange({
            ...config,
            global_labels: newLabels
        });
    };

    return (
        <>
            <TextField
                label="Service Name"
                name="service_name"
                value={config.service_name}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Type"
                name="type"
                value={config.type}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <Box padding={2}>
                {config.global_labels.map((label, index) => (
                    <Grid container spacing={2} alignItems="center" key={index}>
                        <Grid item xs={5}>
                            <TextField
                                label="Label Key"
                                name="key"
                                value={label[0]}
                                onChange={(event) => handleLabelChange(index, event)}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                label="Label Value"
                                name="value"
                                value={label[1]}
                                onChange={(event) => handleLabelChange(index, event)}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button onClick={() => handleRemoveLabel(index)}>Remove</Button>
                        </Grid>
                    </Grid>
                ))}
                <Grid container justifyContent="flex-end">
                    <Button onClick={handleAddLabel}>Add Label</Button>
                </Grid>
            </Box>
            <FormControlLabel
                control={
                    <Switch
                        checked={config.enabled}
                        onChange={handleChange}
                        name="enabled"
                    />
                }
                label="Enabled"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={config.enable_hostname}
                        onChange={handleChange}
                        name="enable_hostname"
                    />
                }
                label="Enable Hostname"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={config.enable_hostname_label}
                        onChange={handleChange}
                        name="enable_hostname_label"
                    />
                }
                label="Enable Hostname Label"
            />
            <FormControlLabel
                control={
                    <Switch
                        checked={config.enable_service_label}
                        onChange={handleChange}
                        name="enable_service_label"
                    />
                }
                label="Enable Service Label"
            />
        </>
    );
};

export default TelemetryConfigForm;