import React, { ChangeEvent } from 'react';
import toml from "toml";
import { useNavigate } from 'react-router-dom';
import FileUploadButton from "./FileUploadButton";
import { Box, Stack, Button } from '@mui/material';

const UploadToml: React.FC = () => {
    const navigate = useNavigate();

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

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Stack spacing={2}>  {/* Adjust the spacing value as needed */}
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
    );
};

export default UploadToml;
