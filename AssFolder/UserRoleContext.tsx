import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'admin' | 'guest';

interface UserRoleContextProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const UserRoleContext = createContext<UserRoleContextProps | undefined>(undefined);

export const UserRoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('guest');

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export const useUserRole = (): UserRoleContextProps => {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
};
