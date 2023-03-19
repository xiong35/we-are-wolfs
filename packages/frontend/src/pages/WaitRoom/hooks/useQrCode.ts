import { CLIENT_BASE_URL } from "@werewolf/shared";
import QRCode from "easyqrcodejs";
import { useEffect, useRef } from "react";
import { useUrlInfo } from "./useUrlInfo";

export function useQrCode(urlInfo: ReturnType<typeof useUrlInfo>) {
  const qrMountPoint = useRef<HTMLDivElement>(null);
  const { password, roomNumber } = urlInfo;

  useEffect(() => {
    if (!qrMountPoint.current) return;

    const qr = new QRCode(qrMountPoint.current, {
      text: `${CLIENT_BASE_URL}/joinRoom?${
        password === null ? "" : "password=" + password + "&"
      }${roomNumber === null ? "" : "roomNumber=" + roomNumber}`,
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
