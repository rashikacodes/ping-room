import { useEffect, useState } from "react";

export default function useUsername() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(sessionStorage.getItem("username") || "");
  }, []);

  return username;
}