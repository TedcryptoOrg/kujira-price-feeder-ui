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

export interface KujiraPriceFeederConfig extends GlobalConfig {
    server: ServerConfig;
    account: Account;
    keyring: Keyring;
    rpc: Rpc;
}