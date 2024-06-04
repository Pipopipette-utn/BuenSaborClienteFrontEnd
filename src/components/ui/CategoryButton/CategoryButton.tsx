import * as React from "react";
import Button from "@mui/material/Button";

interface CategoryButtonProps {
  label: string;
  onClick?: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, onClick }) => {
  return (
    <Button variant="outlined" sx={{ width: "100%", mb: 1 }} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CategoryButton;
