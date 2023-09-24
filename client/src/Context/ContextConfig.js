import { createContext, useState } from "react";

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("login");
  const updateData = (updatedData) => {
    setData(updatedData);
  };

  const Updatestatus = (Updatestatus) => {
    setData(Updatestatus);
  };

  return (
    <Context.Provider value={{ data, updateData, status, Updatestatus }}>
      {children}
    </Context.Provider>
  );
};
