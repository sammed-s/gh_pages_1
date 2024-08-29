import styled from "styled-components";
import { Card as MuiCard, Grid, Skeleton } from "@mui/material";
import Title from "../../typography/Title";
import Heading from "../../typography/Heading";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
`;

const StyledCard = styled(MuiCard)`
  padding: 0.3rem;
  margin: 0.5rem 0;
`;

const CenteredGridItem = styled(Grid)`
  display: inline-block;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledImage = styled.img`
  width: ${({ size }) => size || "3.125rem"};
  height: ${({ size }) => size || "3.125rem"};
`;

const DigitalReceiptHeader = ({ title, customerLogo, qrCode, collegeName }) => {
  return (
    <StyledCard elevation={3}>
      <Grid container>
        <CenteredGridItem item xs={12} md={12}>
          {customerLogo ? (
            <StyledImage
              src={`data:image/jpeg;base64,${customerLogo}`}
              alt="customerLogo"
            />
          ) : (
            <Skeleton
              animation="wave"
              width="3.125rem"
              height="3.125rem"
              variant="rectangular"
            />
          )}
        </CenteredGridItem>
      </Grid>
      <Container>
        {qrCode ? (
          <StyledImage
            src={`data:image/jpeg;base64,${qrCode}`}
            alt="qrCode"
            size="4.375rem"
          />
        ) : (
          <Skeleton
            animation="wave"
            width="4.375rem"
            height="4.375rem"
            variant="rectangular"
          />
        )}
        <Grid container>
          <CenteredGridItem item xs={12} md={11.3}>
            <Heading title={collegeName} variant="heading_1" />
            <Title
              title={`Certificate of Plagiarism Check for ${title}`}
              variant="title_1"
              color="#F44336 !important"
            />
          </CenteredGridItem>
        </Grid>
      </Container>
    </StyledCard>
  );
};

export default DigitalReceiptHeader;
