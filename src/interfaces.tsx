export interface ServerConfig {
    listen_addr: string;
    read_timeout: string;
    verbose_cors: boolean;
    write_timeout: string;
}

export interface Account {
    fee_granter?: string;
    address: string;
    chain_id: string;
    validator: string;
    prefix: string;
}

export interface Keyring {
    backend: string;
    dir: string;
}

export interface Rpc {
    grpc_endpoint: string;
    rpc_timeout: string;
    tmrpc_endpoint: string;
}

export interface GlobalConfig {
    gas_adjustment: number;
    gas_prices: string;
    enable_server: boolean;
    enable_voter: boolean;
    provider_timeout: string;
    history_db: string;
}

export interface Telemetry {
    enable_hostname: boolean;
    enable_hostname_label: boolean;
    enable_service_label: boolean;
    enabled: boolean;
    global_labels: Array<[string, string]>;
    service_name: string;
    type: string;
}

export interface ProviderEndpoints {
    name: string;
    urls: string[];
    provider_timeout?: string;
}

export interface DeviationThresholds {
    base: string;
    threshold: string;
}

export interface ProviderMinOverrides {
    denoms: string[];
    providers: number;
}

export interface CurrencyPairs {
    base: string;
    quote: string;
    providers: string[];
    derivative?: string;
    derivative_period?: string;
}

export interface KujiraPriceFeederConfig extends GlobalConfig {
    server: ServerConfig;
    account: Account;
    keyring: Keyring;
    rpc: Rpc;
    telemetry: Telemetry;
    provider_endpoints: ProviderEndpoints[];
    deviation_thresholds: DeviationThresholds[];
    provider_min_overrides: ProviderMinOverrides[];
    currency_pairs: CurrencyPairs[];
}