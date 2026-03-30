// context API chua state global: user

import { createContext } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }: { children: any }) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
