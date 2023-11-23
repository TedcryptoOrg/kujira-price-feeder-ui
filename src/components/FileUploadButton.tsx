import React, { useRef, ChangeEvent } from 'react';
import Button from '@mui/material/Button';

interface FileUploadButtonProps {
    onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <input
                ref={fileInputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={onFileSelect}
                accept=".toml" // Change or remove this depending on your needs
            />
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Upload TOML File
            </Button>
        </div>
    );
};

export default FileUploadButton;
