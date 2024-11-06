import axios from "./axios";

export const reportEntity = async ({ id, entity, ...data }) =>
  await axios.post("/" + entity + "/report/" + id, data);

export const getBraintreeToken = async () =>
  await axios.get("/braintree/token").then((res) => res.data);
