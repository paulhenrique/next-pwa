"use client";
import React from "react";

export const useOnline = () => {
  const [online, setOnline] = React.useState(true);

  const handleOnline = () => {
    setOnline(true);
  };

  const handleOffline = () => {
    setOnline(false);
  };

  React.useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  });

  return {
    online,
  };
};
export const OnlineViewer = () => {
  const { online } = useOnline();
  return <div>{online ? "Online" : "Offline"}</div>;
};

export default OnlineViewer;
