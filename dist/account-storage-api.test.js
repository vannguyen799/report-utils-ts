import { AccountStorageApi } from "account-storage-api.js";
const storage = new AccountStorageApi({
    authToken: "",
    host: "",
    projectName: "",
});
console.log(await storage.getAccount("abc"));
console.log(await storage.updateValues("abc", { name: "abc" }));
