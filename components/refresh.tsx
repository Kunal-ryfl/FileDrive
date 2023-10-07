"use client";
import { RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const Refresh = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  function onSubmit() {
    console.log(100);
    setLoading(true);

    setTimeout(function () {
      setLoading(false);
      router.refresh();
    }, 1000);
  }
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <div
      className={loading ? " animate-spin  cursor-pointer" : "  cursor-pointer"}
      onClick={onSubmit}
    >
      <RefreshCw />
    </div>
  );
};

export default Refresh;
