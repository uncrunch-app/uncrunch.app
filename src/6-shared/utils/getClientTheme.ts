// utils/getClientTheme.ts (утилита для клиентской стороны)
import Cookies from "js-cookie";

export const getClientTheme = (): string => {
  return Cookies.get("theme") || "light";
};
