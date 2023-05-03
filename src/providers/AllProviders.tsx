import { BrowserRouter, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserContext";

const AllProviders = ({ children }: { children: any }) => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>{children}</Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default AllProviders;
