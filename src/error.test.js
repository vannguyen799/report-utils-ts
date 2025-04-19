import { AuthTokenError } from "./index.js";

try {
  throw new AuthTokenError("Resource not found");
} catch (error) {
  let a = error.toString();
  console.log(a);
}
