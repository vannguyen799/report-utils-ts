export type AccountStorageApiOptions = {
    authToken: string;
    host: string;
    projectName: string;
};
export declare class AccountStorageApi {
    private opts;
    constructor(opts: AccountStorageApiOptions);
    getAccount(account: string): Promise<{
        status: string;
        message: string;
        data: {
            account: string;
            project: string;
            values: Record<string, any>;
        };
    } | undefined>;
    updateValues(account: string, values: Record<string, any>): Promise<{
        status: string;
        message: string;
        data: {
            account: string;
            project: string;
            values: Record<string, any>;
        };
    }>;
}
