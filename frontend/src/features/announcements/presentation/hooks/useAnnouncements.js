import { useCallback, useEffect, useState } from "react";
import { getAnnouncementsUseCase } from "@features/announcements/application/getAnnouncementsUseCase";

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getAnnouncementsUseCase().then((data) => {
      if (isMounted) {
        setAnnouncements(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    const data = await getAnnouncementsUseCase();
    setAnnouncements(data);
  }, []);

  return { announcements, isLoading, refresh };
}
