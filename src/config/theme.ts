import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

import { green, red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#008af8",
    },
    grey: {
      "100": "#00eb3f",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },

    success: {
      main: green.A400,
    },
    background: {
      default: "#ffff",
    },
    text: {
      primary: "#3d3d3d",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
