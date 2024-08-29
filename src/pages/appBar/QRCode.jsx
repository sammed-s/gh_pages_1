import styled from "styled-components";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const QRCode = () => {
  const qrCode = useSelector((state) => state.sourcematch.data.qrCode);

  return (
    <>
      <Container>
        {qrCode ? (
          <img
            src={`data:image/jpeg;base64,${qrCode}`}
            alt={"qrtag"}
            color="blue !important"
            style={{
              width: "250px",
              height: "250px",
            }}
          />
        ) : (
          <Skeleton
            animation="wave"
            width="250px"
            height="250px"
            variant="rectangular"
          />
        )}
      </Container>
    </>
  );
};

export default QRCode;
