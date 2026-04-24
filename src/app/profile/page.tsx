"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const logout = async () => {
    await axios.post("/api/logout");
    router.push("/register"); // or login page
  };

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
      <button className="bg-black text-white" onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Page;
