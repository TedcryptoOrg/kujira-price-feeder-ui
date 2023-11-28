import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    ServerConfig,
    Account,
    GlobalConfig,
    Rpc,
    Keyring,
    KujiraPriceFeederConfig,
    Telemetry,
    DeviationThresholds, ProviderMinOverrides, CurrencyPairs, ProviderEndpoints, ProviderContract
} from "../../interfaces";
import AccountConfigForm from "./AccountConfigForm";
import RpcConfigForm from "./RpcConfigForm";
import GlobalConfigForm from "./GlobalConfigForm";
import ServerConfigForm from "./ServerConfigForm";
import KeyringConfigForm from "./KeyringConfigForm";
import {styled} from '@mui/system';
import {useLocation} from 'react-router-dom';
import CustomSnackbar from "../CustomSnackBar";
import TelemetryConfigForm from "./TelemetryConfigForm";
import DeviationThresholdsForm from "./DeviationThresholdsForm";
import ProviderMinOverridesForm from "./ProviderMinOverridesForm";
import CurrencyPairsForm from "./CurrencyParisForm";
import ProviderEndpointForm from "./ProviderEndpointForm";
import {Tab, Tabs} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import ProviderContractForm from "./ProviderContractForm";

const json2toml = require('json2toml');

const StyledBox = styled(Box)({
    background: 'linear-gradient(30deg, rgba(96,125,139,0.25), rgba(96,125,139,0.05))',
    border: 0,
});

const MainForm: React.FC = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const location = useLocation();
    const jsonData = location.state?.jsonData as KujiraPriceFeederConfig;

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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
        address: 'kujira',
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
    const [telemetryConfig, setTelemetryConfig] = useState<Telemetry>({
        enable_hostname: true,
        enable_hostname_label: true,
        enable_service_label: true,
        enabled: true,
        global_labels: [["chain-id", "kayo-1"]],
        service_name: 'price-feeder',
        type: 'prometheus',
    });
    const [deviationThresholdsData, setDeviationThresholdsData] = useState([
        { base: 'KUJI', threshold: '1' } as DeviationThresholds
    ]);
    const [providerMinOverridesData, setProviderMinOverridesData] = useState([
        { denoms: ['KUJI'], providers: 1 } as ProviderMinOverrides
    ]);
    const [currencyPairsData, setCurrencyPairsData] = useState([
        { base: 'AMPKUJI', quote: 'USD', providers: ['finv2'] } as CurrencyPairs
    ]);
    const [providerEndpointsData, setProviderEndpointsData] = useState([
        { name: 'finv2', urls: ['https://finv2.dev.kujira.network'] } as ProviderEndpoints
    ]);
    const [providerContractData, setProviderContractData] = useState([
        {name: '', addresses: [{denom: '', address: ''}]} as ProviderContract,
    ]);

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
            setTelemetryConfig({
                enable_hostname: jsonData.telemetry.enable_hostname || false,
                enable_hostname_label: jsonData.telemetry.enable_hostname_label || false,
                enable_service_label: jsonData.telemetry.enable_service_label || false,
                enabled: jsonData.telemetry.enabled || false,
                global_labels: jsonData.telemetry.global_labels || [],
                service_name: jsonData.telemetry.service_name || '',
                type: jsonData.telemetry.type || '',
            });
            setDeviationThresholdsData(jsonData.deviation_thresholds || []);
            setProviderMinOverridesData(jsonData.provider_min_overrides || []);
            setCurrencyPairsData(jsonData.currency_pairs || []);
            setProviderEndpointsData(jsonData.provider_endpoints || []);
            setProviderContractData(jsonData.provider_contracts || []);
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

    const handleTelemetryChange = (newTelemetryConfig: Telemetry) => {
        setTelemetryConfig(newTelemetryConfig);
    }

    const handleDeviationThresholdDataChange = (newDeviationThresholdsData: DeviationThresholds[]) => {
        setDeviationThresholdsData(newDeviationThresholdsData);
    }

    const handleProviderMinOverridesDataChange = (newProviderMinOverridesData: ProviderMinOverrides[]) => {
        setProviderMinOverridesData(newProviderMinOverridesData);
    }

    const handleCurrencyPairsDataChange = (newCurrencyPairsData: CurrencyPairs[]) => {
        setCurrencyPairsData(newCurrencyPairsData);
    }

    const handleProviderEndpointsDataChange = (newProviderEndpointsData: ProviderEndpoints[]) => {
        setProviderEndpointsData(newProviderEndpointsData);
    }

    const handleProviderContractDataChange = (newProviderContractData: ProviderContract[]) => {
        setProviderContractData(newProviderContractData);
    }

    function createData(): KujiraPriceFeederConfig
    {
        return {
            ...globalConfig,
            server: serverConfig,
            account: accountConfig,
            keyring: keyringConfig,
            rpc: rpcConfig,
            telemetry: telemetryConfig,
            provider_endpoints: providerEndpointsData,
            deviation_thresholds: deviationThresholdsData,
            currency_pairs: currencyPairsData,
            provider_min_overrides: providerMinOverridesData,
            provider_contracts: providerContractData,
        };
    }

    const saveConfig = () => {
        setSnackbarDetails({
            open: true,
            message: 'Configuration saved to the browser!',
            severity: 'success'
        });

        const timestamp = Date.now();
        localStorage.setItem(`config_${timestamp}`, JSON.stringify(createData()));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const contractAddresses: {[key: string]: {[key: string]: string}} = {};
        providerContractData.forEach(contract => {
            contractAddresses[contract.name] = contract.addresses.reduce((acc, curr) => {
                acc[curr.denom] = curr.address;
                return acc;
            }, {} as {[key: string]: string});
        });

        // Combine data from all states and handle submission
        let tomlData = json2toml(globalConfig, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({server: serverConfig}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({account: accountConfig}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({keyring: keyringConfig}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({rpc: rpcConfig}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({telemetry: telemetryConfig}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({provider_endpoints: providerEndpointsData}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({deviation_thresholds: deviationThresholdsData}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({currency_pairs: currencyPairsData}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({provider_min_overrides: providerMinOverridesData}, {newlineAfterSection: true})+"\n";
        tomlData += json2toml({contract_addresses: contractAddresses}, {newlineAfterSection: true});

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
            <Grid container>
                <Grid item xs={12} md={9}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="scrollable"
                        allowScrollButtonsMobile
                        orientation={matches ? "horizontal" : "vertical"}
                        scrollButtons
                    >
                        <Tab label="General" />
                        <Tab label="Deviations & Overrides" />
                        <Tab label={`Pairs (${currencyPairsData.length})`}/>
                        <Tab label="Provider Endpoints" />
                        <Tab label="Provider Contracts" />
                    </Tabs>
                </Grid>
                <Hidden mdDown>
                    <Grid item md={3}>
                        <Box display="flex" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                Generate
                            </Button>
                            <Button variant="contained" color="secondary" onClick={saveConfig}>
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Hidden>
            </Grid>
            {tabValue === 0 && (
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
                </Grid>
            )}
            {tabValue === 1 && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StyledBox p={2} border={1} borderRadius={2}>
                            <Typography variant="h6">Telemetry Configuration</Typography>
                            <TelemetryConfigForm config={telemetryConfig} onConfigChange={handleTelemetryChange}/>
                        </StyledBox>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledBox p={2} border={1} borderRadius={2}>
                            <Typography variant="h6">Deviation Thresholds</Typography>
                            <DeviationThresholdsForm config={deviationThresholdsData} onConfigChange={handleDeviationThresholdDataChange}/>
                        </StyledBox>
                    </Grid>
                </Grid>
            )}
            {tabValue === 2 && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StyledBox p={2} border={1} borderRadius={2}>
                            <Typography variant="h6">Currency pairs</Typography>
                            <CurrencyPairsForm config={currencyPairsData} onConfigChange={handleCurrencyPairsDataChange}/>
                        </StyledBox>
                    </Grid>
                </Grid>
            )}
            {tabValue === 3 && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StyledBox p={2} border={1} borderRadius={2}>
                            <Typography variant="h6">Provider min overrides</Typography>
                            <ProviderMinOverridesForm config={providerMinOverridesData} onConfigChange={handleProviderMinOverridesDataChange}/>
                        </StyledBox>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledBox p={2} border={1} borderRadius={2}>
                            <Typography variant="h6">Provider endpoints</Typography>
                            <ProviderEndpointForm config={providerEndpointsData} onConfigChange={handleProviderEndpointsDataChange}/>
                        </StyledBox>
                    </Grid>
                </Grid>
            )}
            {tabValue === 4 && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <StyledBox p={2} border={1} borderRadius={2}>
                            <Typography variant="h6">Provider Contracts</Typography>
                            <ProviderContractForm config={providerContractData} onConfigChange={handleProviderContractDataChange}/>
                        </StyledBox>
                    </Grid>
                </Grid>
            )}
            <Hidden mdUp>
                <Grid item padding={4}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Generate Configuration
                        </Button>
                    </Box>
                </Grid>
                <Grid item padding={4}>
                    <Button variant="contained" color="secondary" onClick={saveConfig}>
                        Save Configuration
                    </Button>
                </Grid>
            </Hidden>
        </form>
    );
};

export default MainForm;
