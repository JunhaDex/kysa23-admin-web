import axios from "axios";

export class ApiService {
  constructor() {
    // this.api = axios.create({ baseURL: "https://api.kysa.page/" });
    this.api = axios.create({ baseURL: "http://localhost:3000/" });
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

  async searchRoommates(email) {
    try {
      const register = await this.api.post("register/roommate", { email });
      return register.data;
    } catch (e) {
      console.error(e);
    }
  }

  async getCount() {
    const res = await this.api.get("register/stats");
    return res.data.count;
  }

  async getAdditionalInfo(email) {
    const register = await this.api.post("register/me/more", { email });
    return register.data;
  }
}
