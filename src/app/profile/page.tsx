"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Page = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me");
        setUser(res.data);
      } catch (err) {
        console.log("Not logged in");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.fullName}</h1>
      <p>{user.email}</p>
      <p>{user.site}</p>
    </div>
  );
};

export default Page;