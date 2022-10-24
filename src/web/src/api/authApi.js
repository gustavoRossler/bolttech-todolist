import axiosClient from "./basicClient";

export default {
  login: async ({ email, password }) => {
    const res = await axiosClient.post("/login", { email, password });
    return res?.data;
  },
};
