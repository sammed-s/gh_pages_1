import { Skeleton, Box, TableRow, TableCell } from "@mui/material";
import styled from "styled-components";

const SkeletonWrapper = styled(Box)`
  margin-top: 0.3rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  width: 100%;
  background-color: #f1f7f7 !important;
`;

const CommonTableSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <SkeletonWrapper key={index}>
          <TableRow>
            <TableCell width="11%" sx={{ textAlign: "center" }}>
              <Skeleton animation="wave" width={"100%"} />
            </TableCell>
            <TableCell width="12%">
              <Skeleton animation="wave" width={"100%"} />
            </TableCell>
            <TableCell width="42%">
              {" "}
              <Skeleton animation="wave" width={"100%"} height={"1rem"} />
              <Skeleton animation="wave" width={"50%"} height={"0.7rem"} />
            </TableCell>
            <TableCell width="29%">
              {" "}
              <Skeleton
                animation="wave"
                width={"100%"}
                height={"2rem"}
                sx={{ borderRadius: "0.5rem" }}
              />{" "}
            </TableCell>
            <TableCell width="10%">
              <Skeleton
                animation="wave"
                width={"500%"}
                sx={{ borderRadius: "50%" }}
              />
            </TableCell>
          </TableRow>
        </SkeletonWrapper>
      ))}
    </>
  );
};

export default CommonTableSkeleton;
