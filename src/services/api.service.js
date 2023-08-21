import axios from "axios";

export class ApiService {
  constructor() {
    this.api = axios.create({ baseURL: "https://api.kysa.page/" });
  }

  async findMyEmail(name, phone) {
    const register = await this.api.post("register/find-me", { name, phone });
    return register.data;
  }

  async loginEmail(email) {
    const register = await this.api.post("register/login", { email });
    return register.data;
  }

  async searchByGroup(email, group) {
    try {
      const register = await this.api.post(
        "register/search/group",
        { email },
        { params: { group } }
      );
      return register.data;
    } catch (e) {
      console.error(e);
    }
  }

  async searchByName(email, name) {
    try {
      const register = await this.api.post(
        "register/search/name",
        { email },
        { params: { name } }
      );
      return register.data;
    } catch (e) {
      console.error(e);
    }
  }
}