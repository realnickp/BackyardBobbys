"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function UtmSaver() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utms = {
      utm_source: searchParams.get("utm_source") || "",
      utm_medium: searchParams.get("utm_medium") || "",
      utm_campaign: searchParams.get("utm_campaign") || "",
      fbclid: searchParams.get("fbclid") || "",
    };
    try {
      sessionStorage.setItem("bb_utm", JSON.stringify(utms));
    } catch {
      // sessionStorage unavailable
    }
  }, [searchParams]);

  return null;
}
