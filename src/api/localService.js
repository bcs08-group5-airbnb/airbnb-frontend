export const userLocalStorage = {
  get: () => (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null),
  set: userDataContentInfo => {
    const dataJson = JSON.stringify(userDataContentInfo);
    localStorage.setItem("user", dataJson);
  },
  remove: () => {
    localStorage.removeItem("user");
  },
};
