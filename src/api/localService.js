export const adminLocalStorage = {
  get: () => (localStorage.getItem("ADMIN") ? JSON.parse(localStorage.getItem("ADMIN")) : null),
  set: adminDataContentInfo => {
    const dataJson = JSON.stringify(adminDataContentInfo);
    localStorage.setItem("ADMIN", dataJson);
  },
  remove: () => {
    localStorage.removeItem("ADMIN");
  },
};
