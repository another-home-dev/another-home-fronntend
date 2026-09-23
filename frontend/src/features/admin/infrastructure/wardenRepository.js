import { httpClient } from "@infrastructure/api/httpClient";

class WardenRepository {
  async fetchAll() {
    const { data } = await httpClient.get("/admin/wardens");
    return data.data;
  }

  async create(payload) {
    const { data } = await httpClient.post("/admin/wardens", payload);
    return data.data;
  }
}

export default new WardenRepository();
