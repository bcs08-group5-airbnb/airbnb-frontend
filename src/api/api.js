import { httpsNoLoading, httpsAdmin } from "./config";

export const userServ = {
  login: (values) => httpsNoLoading.post("/auth/signin", values),
  signup: (values) => httpsNoLoading.post("/auth/signup", values),

  // ADMIN PAGE
  getUsersPage: (index) =>
    httpsAdmin.get(`/users/phan-trang-tim-kiem?pageIndex=${index}&pageSize=10`),
  getUserByID: (id) => httpsAdmin.get(`/users/${id}`),
  createNewUser: (user) => httpsAdmin.post("/users", user),
  deleteUser: (id) => httpsAdmin.delete(`/users/?id=${id}`),
  updateUser: (userUpdate) =>
    httpsAdmin.put(`/users/${userUpdate.id}`, userUpdate),
  searchUser: (key) => httpsAdmin.get(`users/search/${key}`),
  updateAvatar: (avatar) => httpsAdmin.post(`users/upload-avatar`, avatar),
};

export const roomServ = {
  getAllRooms: () => httpsAdmin.get("/phong-thue"),
};
