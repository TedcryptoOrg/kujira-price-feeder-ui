import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DeviationThresholds } from "../../interfaces";

interface DeviationThresholdsFormProps {
    config: DeviationThresholds[];
    onConfigChange: (newConfig: DeviationThresholds[]) => void;
}

const DeviationThresholdsForm: React.FC<DeviationThresholdsFormProps> = ({ config, onConfigChange }) => {
    const handleThresholdChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newThresholds = [...config];
        newThresholds[index] = { ...newThresholds[index], [event.target.name]: event.target.value };
        onConfigChange(newThresholds);
    };

    const handleAddThreshold = () => {
        onConfigChange([...config, { base: '', threshold: '' }]);
    };

    const handleRemoveThreshold = (index: number) => {
        const newThresholds = [...config];
        newThresholds.splice(index, 1);
        onConfigChange(newThresholds);
    };

    return (
        <>
            {config.map((threshold, index) => (
                <Grid container spacing={2} alignItems="center" key={index}>
                    <Grid item xs={5}>
                        <TextField
                            label="Base"
                            name="base"
                            value={threshold.base}
                            onChange={(event) => handleThresholdChange(index, event)}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            label="Threshold"
                            name="threshold"
                            value={threshold.threshold}
                            onChange={(event) => handleThresholdChange(index, event)}
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => handleRemoveThreshold(index)}>Remove</Button>
                    </Grid>
                </Grid>
            ))}
            <Grid container justifyContent="flex-end">
                <Button onClick={handleAddThreshold}>Add Threshold</Button>
            </Grid>
        </>
    );
};

export default DeviationThresholdsForm;