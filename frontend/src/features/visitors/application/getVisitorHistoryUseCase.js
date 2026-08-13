import visitorRepository from "@features/visitors/infrastructure/visitorRepository";
import { VisitorRequest } from "@features/visitors/domain/VisitorRequest";

export async function getVisitorHistoryUseCase(params) {
  const result = await visitorRepository.fetchHistoryPage(params);
  return { ...result, data: result.data.map((item) => new VisitorRequest(item)) };
}
