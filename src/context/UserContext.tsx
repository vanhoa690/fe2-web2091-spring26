import { createContext, useState } from "react";

type User = {
  name: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
// create context
export const UserContext = createContext<UserContextType | null>(null);

// provider component
export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
