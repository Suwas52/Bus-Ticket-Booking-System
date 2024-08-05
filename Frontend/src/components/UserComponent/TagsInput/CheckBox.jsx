import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

import { Box } from "@mui/material";

const CheckBox = ({ name, Icon }) => {
  return (
    <FormControlLabel
      className="checkbox"
      control={<Checkbox name={name} />}
      label={
        <Box display="flex" alignItems="center">
          <Icon className="icon" />
          {name}
        </Box>
      }
    />
  );
};

export default CheckBox;
