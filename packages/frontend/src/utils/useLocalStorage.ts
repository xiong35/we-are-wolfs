import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  initialValue: T,
  key: string,
  override = true
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    if (override) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

