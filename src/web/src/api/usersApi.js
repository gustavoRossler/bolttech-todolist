import axiosClient from "./basicClient";

export default {
  createUser: async ({ name, email, password }) => {
    const res = await axiosClient.post("/users", { name, email, password });
    return res?.data;
  },
};
