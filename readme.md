## Install

```bash
npm i @vannb/report-utils
```

## Error example

```js
import { AuthTokenError } from "@vannb/report-utils";

try {
  throw new AuthTokenError("test error");
} catch (error) {
  let status = error.toString(); // AuthTokenError: test error
  console.log(status); // AuthTokenError: test error
}
```

## Logger

```js
import { getLogger, setLogLevel } from "@vannb/report-utils";

const logger = getLogger();

logger.info("This is an info message");
logger.success("This is a success message");
logger.warn("This is a warning message");
logger.error("This is an error message");
setLogLevel("debug");
logger.debug("This is a debug message");
```


## Account Storage API

```js
import { AccountStorageApi } from "@vannb/report-utils";

const storage = new AccountStorageApi({
  authToken: "",
  host: "",
  projectName: "",
});

console.log(await storage.getAccount("abc"));
console.log(await storage.updateValues("abc", { name: "abc" }));

```
