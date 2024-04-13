import { plainToInstance } from 'class-transformer';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { User } from '@models/User';

interface UserContextInterface {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

export default function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  function setSelectedUser(user: User) {
    setUser(user);
  }

  return (
    <UserContext.Provider value={{ selectedUser: user, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within UserContext.Provider');
  }

  return context;
}
