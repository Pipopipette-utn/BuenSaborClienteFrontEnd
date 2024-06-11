import * as React from "react";
import Button from "@mui/material/Button";

interface CategoryButtonProps {
  label: string;
  onClick?: () => void;
  selected: boolean;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick, selected }) => {
  return (
    <Button
      fullWidth
      variant={selected ? "contained" : "outlined"}
      sx={{ width: "100%", mb: 1, textTransform: "none" }}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CategoryButton;
