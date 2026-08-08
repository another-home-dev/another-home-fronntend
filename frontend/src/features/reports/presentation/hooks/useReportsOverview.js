import { useEffect, useState } from "react";
import { getReportsOverviewUseCase } from "@features/reports/application/getReportsOverviewUseCase";

export function useReportsOverview() {
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getReportsOverviewUseCase().then((data) => {
      if (isMounted) {
        setOverview(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { overview, isLoading };
}
