import breakpoints from "./drillbit/breakpoints";
import mixins from "./drillbit/mixins";
import palette from "./drillbit/palette";
import shadows from "./drillbit/shadows";
import typography from "./drillbit/typography";
import zIndex from "./drillbit/zIndex";

export const drillBitTheme = {
  breakpoints,
  palette,
  mixins,
  shadows,
  typography,
  zIndex,
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: palette.common.lightgray,
          fontWeight: 400,
          marginTop: ".2125rem",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#fff !important",
          fontSize: "0.6875rem",
          fontWeight: 600,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          letterSpacing: ".0625rem",
          textTransform: "capitalize",
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          fontWeight: 300,
          marginTop: "0.5rem",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "0.5rem 0.75rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // marginTop: "0.375rem",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          padding: "0.375rem",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          color: "#e6dfdf",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontWeight: "400",
          fontSize: "0.87rem",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.1)",
          background: "#fff",
          color: "#000",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          background: "#fff",
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: "0rem",
        },
      },
    },
  },
};
