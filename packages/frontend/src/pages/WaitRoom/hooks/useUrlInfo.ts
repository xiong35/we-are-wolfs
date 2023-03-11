import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PASSWORD, ROOM_NUMBER } from "../../../constants/searchPrams";

export function useUrlInfo() {
  const [params] = useSearchParams();

  const roomNumber = params.get(ROOM_NUMBER);
  const password = params.get(PASSWORD);

  return {
    roomNumber,
    password,
  };
}
