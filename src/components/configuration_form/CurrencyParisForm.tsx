import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CurrencyPairs } from "../../interfaces";
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CurrencyPairsFormProps {
    config: CurrencyPairs[];
    onConfigChange: (newConfig: CurrencyPairs[]) => void;
}

const CurrencyPairsForm: React.FC<CurrencyPairsFormProps> = ({ config, onConfigChange }) => {
    const [showAdvanced, setShowAdvanced] = useState<boolean[]>(config.map(pair => pair.derivative !== undefined && pair.derivative !== ''));

    type PartialCurrencyPairs = {
        [K in keyof CurrencyPairs]?: CurrencyPairs[K];
    };

    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newPairs: PartialCurrencyPairs[] = [...config];
        const { name, value } = event.target;
        // Type guard to check if a string is a key of CurrencyPairs
        const isKeyOfCurrencyPairs = (key: string): key is keyof CurrencyPairs => {
            return key === 'base' || key === 'quote' || key === 'providers' || key === 'derivative' || key === 'derivative_period';
        };

        if (value === '' && isKeyOfCurrencyPairs(name)) {
            const { [name]: _, ...rest } = newPairs[index];
            newPairs[index] = rest;
        } else if (isKeyOfCurrencyPairs(name)) {
            newPairs[index] = { ...newPairs[index], [name]: value };
        }
        onConfigChange(newPairs as CurrencyPairs[]);
    };

    const handleProvidersChange = (index: number, event: React.ChangeEvent<{}>, value: string[]) => {
        const newPairs = [...config];
        newPairs[index] = { ...newPairs[index], providers: value };
        onConfigChange(newPairs);
    };

    const handleAddPair = () => {
        onConfigChange([...config, { base: '', quote: '', providers: [] }]);
    };

    const handleRemovePair = (index: number) => {
        const newPairs = [...config];
        newPairs.splice(index, 1);
        onConfigChange(newPairs);
    };

    return (
        <>
            {config.map((pair, index) => {
                return (
                    <Grid container spacing={2} alignItems="center" key={index}>
                        <Grid item xs={2}>
                            <TextField
                                label="Base"
                                name="base"
                                value={pair.base}
                                onChange={(event) => handleInputChange(index, event)}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField
                                label="Quote"
                                name="quote"
                                value={pair.quote}
                                onChange={(event) => handleInputChange(index, event)}
                                margin="normal"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Autocomplete
                                multiple
                                options={[]}
                                freeSolo
                                value={pair.providers}
                                onChange={(event, value) => handleProvidersChange(index, event, value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Providers" margin="normal" fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <Button onClick={() => handleRemovePair(index)}>Remove</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Switch checked={showAdvanced[index]} onChange={() => {
                                    const newShowAdvanced = [...showAdvanced];
                                    newShowAdvanced[index] = !newShowAdvanced[index];
                                    setShowAdvanced(newShowAdvanced);
                                }} />}
                                label="Advanced"
                            />
                            <Collapse in={showAdvanced[index]}>
                                <Box border={1} p={2} m={2} borderRadius={2}>
                                    <Typography variant="h6">Advanced settings</Typography>
                                    <TextField
                                        label="Derivative"
                                        name="derivative"
                                        value={pair.derivative}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        fullWidth
                                    />
                                    <TextField
                                        label="Derivative Period"
                                        name="derivative_period"
                                        value={pair.derivative_period}
                                        onChange={(event) => handleInputChange(index, event)}
                                        margin="normal"
                                        fullWidth
                                    />
                                </Box>
                            </Collapse>
                        </Grid>
                    </Grid>
                );
            })}
            <Grid container justifyContent="flex-end">
                <Button onClick={handleAddPair}>Add Pair</Button>
            </Grid>
        </>
    );
};

export default CurrencyPairsForm;