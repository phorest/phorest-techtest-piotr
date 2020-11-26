import ENV from "phorest-techtest-piotr/config/environment";

export default function timeoutForEnv(timeout, timeoutForTestEnv = 0) {
  return ENV.environment === "test" ? timeoutForTestEnv : timeout;
}
