import React, {ChangeEvent, useEffect, useState} from 'react';
import toml from "toml";
import { useNavigate } from 'react-router-dom';
import FileUploadButton from "./FileUploadButton";
import { Box, Stack, Button, Grid } from '@mui/material';

const UploadToml: React.FC = () => {
    const navigate = useNavigate();
    const [configs, setConfigs] = useState<string[]>([]);
    const [originalKeys, setOriginalKeys] = useState<string[]>([]);

    const formatTimestamp = (timestamp: number) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('config_'));
        setOriginalKeys(keys);
        const formattedKeys = keys.map(key => formatTimestamp(Number(key.split('_')[1])));
        setConfigs(formattedKeys);
    }, [configs]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const tomlContent = e.target?.result;
                if (typeof tomlContent === 'string') {
                    try {
                        const json = toml.parse(tomlContent);
                        console.log(json)

                        navigate('/form', { state: { jsonData: json } });
                    } catch (error) {
                        console.error('Error parsing TOML:', error);
                    }
                }
            };
            reader.readAsText(file);
        }
    };

    const handleContinueButtonClick = () => {
        navigate('/form');
    }

    const deleteConfig = (index: number) => {
        localStorage.removeItem(originalKeys[index]);
        const updatedConfigs = [...configs];
        updatedConfigs.splice(index, 1);
        setConfigs(updatedConfigs);
        const updatedOriginalKeys = [...originalKeys];
        updatedOriginalKeys.splice(index, 1);
        setOriginalKeys(updatedOriginalKeys);
    };

    const restoreConfig = (key: string) => {
        const config = JSON.parse(localStorage.getItem(key) || '');
        navigate('/form', { state: { jsonData: config } });
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Stack direction="column" spacing={2}>
                        {configs.length > 0 && <h2>Saved Configurations</h2>}
                        {configs.map((configKey, index) => (
                            <Box key={configKey} style={{ marginBottom: '20px' }}>
                                <span style={{ marginRight: '10px' }}>{configKey}</span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => restoreConfig(originalKeys[index])}
                                    style={{ marginRight: '10px' }}
                                >
                                    Restore
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => deleteConfig(index)}>
                                    Delete
                                </Button>
                            </Box>
                        ))}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleContinueButtonClick}
                            sx={{ fontSize: 'large', padding: '10px 20px' }} // Adjust the values as needed
                        >
                            Create new
                        </Button>

                        <FileUploadButton onFileSelect={handleFileChange} />
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
};

export default UploadToml;
