import * as React from "react";
import Button from "@mui/material/Button";

interface CategoryButtonProps {
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label }) => {
  return (
    <Button variant="outlined" sx={{ width: "100%", mb: 1 }}>
      {label}
    </Button>
  );
};

export default CategoryButton;
