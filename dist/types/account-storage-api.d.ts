import { RequestInit } from "node-fetch";
export type AccountStorageApiOptions = {
    authToken: string;
    host: string;
    projectName: string;
    semaphoreValue?: number;
    fetchOptions?: RequestInit;
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
export declare class AccountStorageApi<T extends {
    [key: string]: any;
}> {
    private opts;
    private sp;
    constructor(opts: AccountStorageApiOptions);
    getAccount(account: string): Promise<AccountApiResponse<T>>;
    getAccountValues(account: string): Promise<T>;
    updateValues(account: string, values: Record<string, any>): Promise<AccountApiResponse<T>>;
}
export {};
