import { Skeleton, Box } from "@mui/material";
import styled from "styled-components";

const SkeletonWrapper = styled(Box)`
  margin-top: 0.3rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 5.1rem;
  width: 4rem;
`;

const PageScrollViewSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonWrapper key={index}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="100%"
            height="100%"
          />
        </SkeletonWrapper>
      ))}
    </>
  );
};

export default PageScrollViewSkeleton;
