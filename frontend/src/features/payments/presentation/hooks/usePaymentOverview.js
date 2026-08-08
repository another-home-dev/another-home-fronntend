import { useEffect, useState } from "react";
import { getPaymentOverviewUseCase } from "@features/payments/application/getPaymentOverviewUseCase";

export function usePaymentOverview() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getPaymentOverviewUseCase().then((data) => {
      if (isMounted) setSummary(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { summary };
}
