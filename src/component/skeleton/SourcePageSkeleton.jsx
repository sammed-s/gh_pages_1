import { Skeleton, Box } from "@mui/material";
import styled from "styled-components";

const SkeletonWrapper = styled(Box)`
  margin-top: 0.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 0.95rem;
`;

const SourcePageSkeleton = () => {
  return (
    <>
      {Array.from({ length: 25 }).map((_, index) => (
        <SkeletonWrapper key={index}>
          <Skeleton animation="wave" width="100%" height="100%" />
        </SkeletonWrapper>
      ))}
    </>
  );
};

export default SourcePageSkeleton;
