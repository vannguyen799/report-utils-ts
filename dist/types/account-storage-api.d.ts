export type AccountStorageApiOptions = {
    authToken: string;
    host: string;
    projectName: string;
};
type AccountApiResponse<T extends {
    [key: string]: any;
}> = {
    status: string;
    message: string;
    data: {
        account: string;
        project: string;
        values?: T;
    };
};
export declare class AccountStorageApi {
    private opts;
    constructor(opts: AccountStorageApiOptions);
    getAccount<T extends {
        [key: string]: any;
    }>(account: string): Promise<AccountApiResponse<T>>;
    updateValues<T extends {
        [key: string]: any;
    }>(account: string, values: Record<string, any>): Promise<AccountApiResponse<T>>;
}
export {};
