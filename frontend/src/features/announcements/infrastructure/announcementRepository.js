import { httpClient } from "@infrastructure/api/httpClient";
import { useAuthStore } from "@features/authentication/application/useAuthStore";

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function toAnnouncement(item) {
  return {
    id: item.id,
    title: item.title,
    message: item.content,
    category: "General",
    createdBy: useAuthStore.getState().user?.name ?? "Warden Office",
    createdDate: formatDate(item.publishedDate),
  };
}

class AnnouncementRepository {
  async fetchAll() {
    const { data: res } = await httpClient.get("/operations/notices", { params: { pageSize: 500 } });
    return res.data.map(toAnnouncement);
  }

  async create(payload) {
    const { data } = await httpClient.post("/operations/notices", {
      title: payload.title,
      content: payload.message,
    });
    return toAnnouncement(data);
  }

  async update(id, payload) {
    const { data } = await httpClient.patch(`/operations/notices/${id}`, {
      title: payload.title,
      content: payload.message,
    });
    return toAnnouncement(data);
  }

  async remove(id) {
    await httpClient.delete(`/operations/notices/${id}`);
    return { success: true };
  }
}

export default new AnnouncementRepository();
