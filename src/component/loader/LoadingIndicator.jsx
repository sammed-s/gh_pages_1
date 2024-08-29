import styled from "styled-components";
import { DrillBitLogo } from "../../assets";
import loadingGif from "../../assets/icon/Loading.gif";
import "../../index.css";

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.5);
`;

const LoaderWrapper = styled.div`
  text-align: center;
  background: white;
  border-radius: 10px;
  padding: 10px 70px;
`;

const LogoContainer = styled.div`
  text-align: center;
  padding: 25px;
`;

const IconContainer = styled.div`
  padding: 0px 55px 15px 15px;
`;

const BeatContainer = styled.div`
  text-align: center;
  padding: 25px 15px;
`;

const LoadingIndicator = () => {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <IconContainer>
          <DrillBitLogo />
        </IconContainer>
        <LogoContainer>
          <img src={loadingGif} alt="Be patient..." />
        </LogoContainer>
        <BeatContainer>Please wait, data is Loading...</BeatContainer>
      </LoaderWrapper>
    </LoaderContainer>
  );
};

export default LoadingIndicator;
