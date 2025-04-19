export type AccountStorageApiOptions = {
  authToken: string;
  host: string;
  projectName: string;
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

export class AccountStorageApi {
  private opts: AccountStorageApiOptions;
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

  async getAccount<T extends { [key: string]: any }>(account: string): Promise<AccountApiResponse<T>> {
    const url = `${this.opts.host}/api/values?account=${account}&project=${this.opts.projectName}`;
    const headers = {
      Authorization: `Bearer ${this.opts.authToken}`,
    };
    return fetch(url, { headers }).then((response) => {
      if (!response.ok) {
        throw new Error(`Error fetching account: ${response.statusText}`);
      }
      return response.json();
    });
  }

  async updateValues<T extends { [key: string]: any }>(
    account: string,
    values: Record<string, any>
  ): Promise<AccountApiResponse<T>> {
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
}
