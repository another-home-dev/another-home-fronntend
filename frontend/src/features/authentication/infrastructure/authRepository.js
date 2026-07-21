import liveAuthRepository from "@features/authentication/infrastructure/authRepository.live";
import mockAuthRepository from "@features/authentication/infrastructure/authRepository.mock";

const useMockApi = import.meta.env.VITE_USE_MOCK_API === "true";

export default useMockApi ? mockAuthRepository : liveAuthRepository;
