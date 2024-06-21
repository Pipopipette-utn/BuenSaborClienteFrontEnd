import React, { useCallback, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";

interface BuscadorProps {
  palabra: string;
  onSearch: (term: string) => void;
}

const Search = styled("div")(({ theme }) => ({
  borderRadius: "15px",
  position: "relative",
  backgroundColor: alpha(theme.palette.grey[500], 0.85), // Tono más oscuro
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[800], 0.95), // Más oscuro al pasar el ratón
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white, // Color blanco para el icono de búsqueda
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.common.white, // Texto de entrada en blanco
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Buscador: React.FC<BuscadorProps> = ({ onSearch, palabra }) => {
  const [filtro, setFiltro] = useState(palabra);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const handleSearchClick = useCallback(() => {
    onSearch(filtro);
  }, [filtro, onSearch]);

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={filtro}
        placeholder="Buscar..."
        inputProps={{ "aria-label": "search" }}
        onChange={handleChange}
        sx={{
          width: { xs: "60%", sm: "70%", md: "80%" },
        }}
      />
      <Button
        onClick={handleSearchClick}
        sx={{
          width: { xs: "40%", sm: "30%", md: "20%" },
          padding: { xs: "0.5rem", md: "0.7rem" },
          fontSize: { xs: "0.8rem", md: "1rem" },
        }}
      >
        Buscar
      </Button>
    </Search>
  );
};
