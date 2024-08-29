import { useSelector } from "react-redux";
import { LoadingIndicator } from "../component";
import Navbar from "../component/navbar/Navbar";
import styled from "styled-components";

const MainContent = styled.main`
  margin-top: 2.7rem;
  padding: 1rem;
`;

const Layout = ({ children }) => {
  const isLoadingHtml = useSelector((state) => state.sourcebody.isLoadingHtml);
  const isLoadingAI = useSelector((state) => state.aidata.isLoadingAI);
  const isLoadingSettings = useSelector((state) => state.navbar.isLoading);

  return (
    <>
      {(isLoadingHtml || isLoadingAI || isLoadingSettings) && (
        <LoadingIndicator />
      )}
      <Navbar />
      <MainContent>{children}</MainContent>
    </>
  );
};

export default Layout;
