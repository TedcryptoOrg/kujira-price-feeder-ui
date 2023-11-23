import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ServerConfig, Account, GlobalConfig, Rpc, Keyring, KujiraPriceFeederConfig} from "../../interfaces";
import AccountConfigForm from "./AccountConfigForm";
import RpcConfigForm from "./RpcConfigForm";
import GlobalConfigForm from "./GlobalConfigForm";
import ServerConfigForm from "./ServerConfigForm";
import KeyringConfigForm from "./KeyringConfigForm";
import {styled} from '@mui/system';
import {useLocation} from 'react-router-dom';
import CustomSnackbar from "../CustomSnackBar";

const json2toml = require('json2toml');

const StyledBox = styled(Box)({
    background: 'linear-gradient(30deg, rgba(96,125,139,0.25), rgba(96,125,139,0.05))',
    border: 0,
});

const MainForm: React.FC = () => {
    const location = useLocation();
    const jsonData = location.state?.jsonData as KujiraPriceFeederConfig;

    const [snackbarDetails, setSnackbarDetails] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning',
    });

    const [globalConfig, setGlobalConfig] = useState<GlobalConfig>({
        gas_adjustment: 2.5,
        gas_prices: '0.00125ukuji',
        enable_server: true,
        enable_voter: true,
        provider_timeout: '500ms',
        history_db: '/tmp/kujira.db'
    });
    const [serverConfig, setServerConfig] = useState<ServerConfig>({
        listen_addr: '0.0.0.0:7171',
        read_timeout: '20s',
        verbose_cors: true,
        write_timeout: '20s',
    });
    const [accountConfig, setAccountConfig] = useState<Account>({
        address: '',
        chain_id: 'kaiyo-1',
        validator: 'kujiravaloper',
        prefix: 'kujira',
    });
    const [keyringConfig, setKeyringConfig] = useState<Keyring>({
        backend: 'file',
        dir: '/home/user/.kujira',
    });
    const [rpcConfig, setRpcConfig] = useState<Rpc>({
        grpc_endpoint: 'http://localhost:9090',
        rpc_timeout: '500ms',
        tmrpc_endpoint: 'http://localhost:26657',
    });

    useEffect(() => {
        if (jsonData) {
            setGlobalConfig({
                gas_adjustment: jsonData.gas_adjustment || 0,
                gas_prices: jsonData.gas_prices || '',
                enable_server: jsonData.enable_server || false,
                enable_voter: jsonData.enable_voter || false,
                provider_timeout: jsonData.provider_timeout || '',
                history_db: jsonData.history_db || '',
            });
            setServerConfig({
                listen_addr: jsonData.server.listen_addr || '',
                read_timeout: jsonData.server.read_timeout || '',
                verbose_cors: jsonData.server.verbose_cors || false,
                write_timeout: jsonData.server.write_timeout || '',
            });
            setAccountConfig({
                fee_granter: jsonData.account.fee_granter || undefined,
                address: jsonData.account.address || '',
                chain_id: jsonData.account.chain_id || '',
                validator: jsonData.account.validator || '',
                prefix: jsonData.account.prefix || '',
            });
            setKeyringConfig({
                backend: jsonData.keyring.backend || '',
                dir: jsonData.keyring.dir || '',
            });
            setRpcConfig({
                grpc_endpoint: jsonData.rpc.grpc_endpoint || '',
                rpc_timeout: jsonData.rpc.rpc_timeout || '',
                tmrpc_endpoint: jsonData.rpc.tmrpc_endpoint || '',
            });
        }
    }, [jsonData]);

    const handleGlobalChange = (newGlobalConfig: GlobalConfig) => {
        setGlobalConfig(newGlobalConfig);
    };

    const handleServerChange = (newServerConfig: ServerConfig) => {
        setServerConfig(newServerConfig);
    };

    const handleAccountChange = (newAccountConfig: Account) => {
        setAccountConfig(newAccountConfig);
    };

    const handleKeyringChange = (newKeyringConfig: Keyring) => {
        setKeyringConfig(newKeyringConfig);
    };

    const handleRpcChange = (newRpcConfig: Rpc) => {
        setRpcConfig(newRpcConfig);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Combine data from all states and handle submission
        const data: KujiraPriceFeederConfig = {
            ...globalConfig,
            server: serverConfig,
            account: accountConfig,
            keyring: keyringConfig,
            rpc: rpcConfig,
        };

        console.log(data);
        const tomlData = json2toml(data);
        console.log(tomlData)

        try {
            await navigator.clipboard.writeText(tomlData);
            setSnackbarDetails({
                open: true,
                message: 'Configuration copied to clipboard!',
                severity: 'success'
            });
        } catch (err) {
            console.error('Failed to copy text: ', err);
            setSnackbarDetails({
                open: true,
                message: 'Failed to copy configuration.',
                severity: 'error'
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CustomSnackbar
                snackbarDetails={snackbarDetails}
                setOpen={(open) => setSnackbarDetails(prev => ({ ...prev, open }))}
                open={snackbarDetails.open}
            />
            <Grid container spacing={2}>
                <Grid item lg={4} xs={12} md={6}>
                    <StyledBox p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Global Configuration</Typography>
                        <GlobalConfigForm config={globalConfig} onConfigChange={handleGlobalChange}/>
                    </StyledBox>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <StyledBox p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Server Configuration</Typography>
                        <ServerConfigForm server={serverConfig} onServerChange={handleServerChange}/>
                    </StyledBox>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <StyledBox p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Account Configuration</Typography>
                        <AccountConfigForm account={accountConfig} onAccountChange={handleAccountChange}/>
                    </StyledBox>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <StyledBox p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">Keyring Configuration</Typography>
                        <KeyringConfigForm keyring={keyringConfig} onKeyringChange={handleKeyringChange}/>
                    </StyledBox>
                </Grid>
                <Grid item lg={4} md={6} xs={12}>
                    <StyledBox p={2} border={1} borderRadius={2}>
                        <Typography variant="h6">RPC Configuration</Typography>
                        <RpcConfigForm rpc={rpcConfig} onRpcChange={handleRpcChange}/>
                    </StyledBox>
                </Grid>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default MainForm;
