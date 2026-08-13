import { useEffect, useState } from "react";
import { getVisitorRequestsUseCase } from "@features/visitors/application/getVisitorRequestsUseCase";

export function useVisitorRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getVisitorRequestsUseCase().then((data) => {
      if (isMounted) {
        setRequests(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { requests, isLoading, setRequests };
}
