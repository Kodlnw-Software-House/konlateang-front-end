import { MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const StyledMenuItem = withStyles((theme) => ({
  root: {
    "border-bottom-width": "2.5px",
    "border-bottom-style": "inset",
    "border-bottom-color": theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
  // padding: {},
}))(MenuItem);
