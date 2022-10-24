import { User } from "../models/User.js";

export const fakeUsers = [];

export class UsersRepositoryInMemory {

  async getAllUsers() {
    return fakeUsers;
  }

  async getUserByEmail(email) {
    return fakeUsers.find(item => item.email === email);
  }

  async getUserById(id) {
    return fakeUsers.find(item => item.id === id);
  }

  async createUser(user) {
    fakeUsers.push(user);
  }

  async updateUser(id, user) {
    const index = fakeUsers.findIndex(item => item.id === id);
    fakeUsers[index] = user;
  }

  async deleteUser(id) {
    const index = fakeUsers.findIndex(item => item.id === id);
    delete fakeUsers[index];
  }

}