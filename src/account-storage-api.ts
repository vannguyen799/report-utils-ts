import fetch, { RequestInit } from "node-fetch";
import { Semaphore } from "async-mutex";
export type AccountStorageApiOptions = {
  authToken: string;
  host: string;
  projectName: string;
  fetchOptions?: RequestInit;
};
type AccountApiResponse<T extends { [key: string]: any }> = {
  status: string;
  message: string;
  data: {
    account: string;
    project: string;
    values?: T;
  };
};

export class AccountStorageApi<T extends { [key: string]: any }> {
  private opts: AccountStorageApiOptions;
  private sp = new Semaphore(50);
  constructor(opts: AccountStorageApiOptions) {
    this.opts = opts;
    if (!opts.authToken) {
      throw new Error("authToken is required");
    }
    if (!opts.host) {
      throw new Error("host is required");
    } else {
      try {
        new URL(opts.host);
      } catch {
        throw new Error("host must be a valid URL");
      }
      if (opts.host.endsWith("/")) {
        opts.host = opts.host.slice(0, -1);
      }
    }
    if (!opts.projectName) {
      throw new Error("projectName is required");
    }
  }

  async getAccount(account: string): Promise<AccountApiResponse<T>> {
    const url = `${this.opts.host}/api/values?account=${account}&project=${this.opts.projectName}`;
    const headers = {
      ...(this.opts.fetchOptions?.headers || {}),
      Authorization: `Bearer ${this.opts.authToken}`,
    };
    await this.sp.acquire();
    return fetch(url, { ...this.opts.fetchOptions, headers })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`Error fetching account: ${response.statusText}`);
        }
        const data = await response.json();
        return data as AccountApiResponse<T>;
      })
      .finally(() => {
        this.sp.release();
      });
  }

  async getAccountValues(account: string): Promise<T> {
    return (await this.getAccount(account).catch())?.data.values || ({} as T);
  }

  async updateValues(account: string, values: Record<string, any>): Promise<AccountApiResponse<T>> {
    const url = `${this.opts.host}/api/values`;
    const headers = {
      ...(this.opts.fetchOptions?.headers || {}),
      Authorization: `Bearer ${this.opts.authToken}`,
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      account: account,
      project: this.opts.projectName,
      values: values,
    });
    await this.sp.acquire();
    const response = await fetch(url, {
      ...(this.opts.fetchOptions || {}),
      method: "POST",
      headers,
      body,
    }).finally(() => {
      this.sp.release();
    });
    if (!response.ok) {
      throw new Error(`Error updating values: ${response.statusText}`);
    }
    return response.json() as any;
  }
}
