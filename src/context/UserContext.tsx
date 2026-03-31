import { createContext } from "react";

type UserContextType = {
  username: string;
};
// create context
export const UserContext = createContext<UserContextType | null>(null);

// provider component
export const UserProvider = ({ children }: { children: any }) => {
  const username = "hoadv";
  return (
    <UserContext.Provider value={{ username }}>{children}</UserContext.Provider>
  );
};
