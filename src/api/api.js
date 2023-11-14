import { httpsNoLoading, httpsAdmin } from "./config";

export const userServ = {
  login: (values) => httpsNoLoading.post("/auth/signin", values),
  signup: (values) => httpsNoLoading.post("/auth/signup", values),
  getAllUsers: () => httpsAdmin.get("/users"),
};
