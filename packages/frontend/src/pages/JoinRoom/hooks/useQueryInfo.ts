import { useSearchParams } from "react-router-dom";

export function useQueryInfo() {
  let [searchParams, _] = useSearchParams({ p: "0" });

  const initialRoomNumber = searchParams.get("roomNumber");
  const initialPassword = searchParams.get("password");

  return {
    initialRoomNumber,
    initialPassword,
  };
}
