import React from 'react';
import TextField from '@mui/material/TextField';
import {Rpc} from "../../interfaces";
interface RpcFormProps {
    rpc: Rpc;
    onRpcChange: (rpc: Rpc) => void;
}

const RpcConfigForm: React.FC<RpcFormProps> = ({ rpc, onRpcChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        onRpcChange({
            ...rpc,
            [name]: value,
        });
    };

    return (
        <>
            <TextField
                label="gRPC Endpoint"
                name="grpc_endpoint"
                value={rpc.grpc_endpoint}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="RPC Timeout"
                name="rpc_timeout"
                value={rpc.rpc_timeout}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="TMRPC Endpoint"
                name="tmrpc_endpoint"
                value={rpc.tmrpc_endpoint}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
        </>
    );
};

export default RpcConfigForm;
