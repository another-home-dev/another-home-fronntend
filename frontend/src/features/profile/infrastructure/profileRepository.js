class ProfileRepository {
  async updateProfile(payload) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return payload;
  }
}

export default new ProfileRepository();
