import { CLIENT_BASE_URL } from "@werewolf/shared";
import QRCode from "easyqrcodejs";
import { useEffect, useRef, useState } from "react";
import { useUrlInfo } from "./useUrlInfo";

export function useQrCode() {
  const qrMountPoint = useRef<HTMLDivElement>(null);
  const { password, roomNumber } = useUrlInfo();

  useEffect(() => {
    console.log(qrMountPoint.current);

    if (!qrMountPoint.current) return;

    const qr = new QRCode(qrMountPoint.current, {
      text: `${CLIENT_BASE_URL}/joinRoom?${
        password !== null && "password=" + password + "&"
      }${roomNumber !== null && "roomNumber=" + roomNumber}`,
      logo: "./wolf.png",
      logoWidth: 20,
      logoHeight: 20,
      width: 100,
      height: 100,
    });

    return () => qr.clear();
  }, [qrMountPoint]);

  return {
    qrMountPoint,
  };
}
