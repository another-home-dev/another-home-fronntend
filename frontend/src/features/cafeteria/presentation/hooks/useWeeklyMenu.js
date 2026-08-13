import { useCallback, useEffect, useState } from "react";
import { getWeeklyMenuUseCase } from "@features/cafeteria/application/getWeeklyMenuUseCase";

export function useWeeklyMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getWeeklyMenuUseCase().then((data) => {
      if (isMounted) {
        setMenuItems(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    const data = await getWeeklyMenuUseCase();
    setMenuItems(data);
  }, []);

  return { menuItems, isLoading, refresh };
}
