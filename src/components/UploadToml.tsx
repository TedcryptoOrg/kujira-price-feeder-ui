import React, { useState, ChangeEvent } from 'react';
import toml from "toml";
import { useNavigate } from 'react-router-dom';
import FileUploadButton from "./FileUploadButton";

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

    return (
        <div>
            <FileUploadButton onFileSelect={handleFileChange} />
        </div>
    );
};

export default UploadToml;
