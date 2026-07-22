import { httpClient } from "@infrastructure/api/httpClient";
import { AdminUser } from "@features/authentication/domain/AdminUser";

class LiveAuthRepository {
  async login(email, password) {
    const { data } = await httpClient.post("/auth/login", { email, password });

    return {
      user: AdminUser.fromResponse(data.user),
      token: data.token,
    };
  }

  async requestPasswordReset(email) {
    const { data } = await httpClient.post("/auth/forgot-password", { email });
    return data;
  }
}

export default new LiveAuthRepository();
