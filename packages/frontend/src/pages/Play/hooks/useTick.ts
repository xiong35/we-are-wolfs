import { useEffect, useRef } from "react";
import { gameStatusTimeLeft } from "../../../signals/game";

export function useTick() {
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      gameStatusTimeLeft.value--;
    }, 1000);
    return () => {
      window.clearInterval(timer.current);
      timer.current = undefined;
    };
  }, []);
}
