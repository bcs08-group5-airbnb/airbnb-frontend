import { httpsNoLoading } from "./config";

export const adminServ = {
  login: values => httpsNoLoading.post("/auth/signin", values),
};
