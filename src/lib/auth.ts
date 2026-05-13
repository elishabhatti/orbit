import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { userModel } from "@/src/models/user.model";

export const getAuthUser = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    console.log("TOKEN:", token);

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);

    return null;
  }
};
