// utils/getServerTheme.ts (утилита для серверной стороны)
import { cookies } from "next/headers";

export const getServerTheme = (): string => {
  const themeCookie = cookies().get("theme");
  return themeCookie ? themeCookie.value : "light";
};
