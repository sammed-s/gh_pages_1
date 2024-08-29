import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  styled,
  Card,
  Typography,
  Box,
} from "@mui/material";

const CustomTable = styled(Table)(({ isFileInfo }) => ({
  ...(isFileInfo && {
    border: "1px solid #EEE",
    borderRadius: "0.5rem !important",
  }),
}));

const CustomSwitch = styled(Switch)(() => ({
  width: 32,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    color: "#fff",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#337AB7",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: 200,
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const CommonTable2 = ({ columns, data, onToggleChange, isFileInfo }) => {
  return (
    <TableContainer>
      <CustomTable isFileInfo={isFileInfo}>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                width={column.headerWidth}
                key={index}
                sx={{ borderBottom: "none" }}
              >
                <Typography variant="caption_1">{column.label}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => {
            const isDisabled = row.exclude === false && row.include === false;
            return (
              <TableRow key={rowIndex}>
                <TableCell
                  colSpan={columns.length}
                  sx={{ borderBottom: "none" }}
                >
                  <Card
                    sx={{ marginBottom: "0.5rem", padding: "0.4rem" }}
                    elevation={6}
                  >
                    <Box>
                      {columns.map((column, colIndex) => (
                        <Box
                          key={colIndex}
                          display="inline-block"
                          width={column.bodyWidth}
                        >
                          {column.field === "exclude" && (
                            <CustomSwitch
                              inputProps={{ "aria-label": "ant design" }}
                              checked={row.exclude}
                              onChange={(e) => onToggleChange(e, rowIndex)}
                              disabled={isDisabled}
                            />
                          )}
                          <Typography
                            variant="body_2"
                            color={column.label === "Font Size" ? "green" : ""}
                            fontWeight={column.label === "Name" ? "500" : ""}
                          >
                            {row[column.field]}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Card>
                  {row.message && (
                    <Typography variant="caption_1" sx={{ color: "red" }}>
                      {row.message}
                    </Typography>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </CustomTable>
    </TableContainer>
  );
};

export default CommonTable2;
