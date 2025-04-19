export class AccountStorageApi {
    constructor(opts) {
        this.opts = opts;
    }
    async getAccount(account) {
        try {
            const url = `${this.opts.host}/api/values?account=${account}&project=${this.opts.projectName}`;
            const headers = {
                Authorization: `Bearer ${this.opts.authToken}`,
                "Content-Type": "application/json",
            };
            return fetch(url, { method: "GET", headers }).then((response) => {
                if (!response.ok) {
                    throw new Error(`Error fetching account: ${response.statusText}`);
                }
                return response.json();
            });
        }
        catch (error) {
            console.error(`Failed to fetch account: ${error}`);
            return undefined;
        }
    }
    async updateValues(account, values) {
        try {
            const url = `${this.opts.host}/api/values`;
            const headers = {
                Authorization: `Bearer ${this.opts.authToken}`,
                "Content-Type": "application/json",
            };
            const body = JSON.stringify({
                account: account,
                project: this.opts.projectName,
                values: values,
            });
            const response = await fetch(url, {
                method: "POST",
                headers,
                body,
            });
            if (!response.ok) {
                throw new Error(`Error updating values: ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            console.error(`Failed to update values: ${error}`);
            throw error;
        }
    }
}
