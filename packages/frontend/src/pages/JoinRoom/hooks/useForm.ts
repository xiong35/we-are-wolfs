import { IJoinRoomReq } from "@werewolf/shared";
import { useState } from "react";

export function useForm(
  initialPassword: string | null,
  initialRoomNumber: string | null
) {
  const [form, setForm] = useState<IJoinRoomReq>({
    password: initialPassword ?? "",
    roomNumber: initialRoomNumber ?? "",
    name: "",
  });

  function setField(key: keyof IJoinRoomReq, value: string) {
    setForm({
      ...form,
      [key]: value,
    });
  }

  return {
    setField,
    form,
  };
}
