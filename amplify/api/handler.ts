import type { Schema } from "../data/resource";

import { secret } from "@aws-amplify/backend"

const key = secret('X_AUTH_TOKEN');


export const handler: Schema["callApi"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { key } = event.arguments
  // return typed from `.returns()`
  return `Hello, ${ key }!`
}