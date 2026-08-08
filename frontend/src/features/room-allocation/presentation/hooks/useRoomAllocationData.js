import { useCallback, useEffect, useState } from "react";
import { getRoomAllocationOverviewUseCase } from "@features/room-allocation/application/getRoomAllocationOverviewUseCase";

const EMPTY_OVERVIEW = { rooms: [], unallocatedStudents: [], allocatedStudents: [] };

export function useRoomAllocationData() {
  const [overview, setOverview] = useState(EMPTY_OVERVIEW);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      const data = await getRoomAllocationOverviewUseCase();
      if (isMounted) {
        setOverview(data);
        setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    const data = await getRoomAllocationOverviewUseCase();
    setOverview(data);
  }, []);

  return { ...overview, isLoading, refresh };
}
