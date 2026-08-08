import visitorRepository from "@features/visitors/infrastructure/visitorRepository";
import { VisitorRequest } from "@features/visitors/domain/VisitorRequest";

export async function getVisitorRequestsUseCase() {
  const requests = await visitorRepository.fetchAll();
  return requests.map((request) => new VisitorRequest(request));
}
