//https://th.bing.com/th/id/OIG3.H2Vl._rFmCd8CI.MvvZd?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn LOGO

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/HookReducer";
import { RootState } from "../../../redux/Store";
import { setLogout } from "../../../redux/slices/Auth";

const pages = ["Menú", "Mi Pedido"];
const settings = ["Mi Cuenta", "Mis Pedidos", "Cerrar Sesión"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const userLogeado = useAppSelector((state: RootState) => state.user.isLogged);
  const userName = useAppSelector(
    (state: RootState) => state.user.user?.usuario?.username
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (page: string) => {
    console.log(`Se hizo clic en la página: ${page}`);
    //navigate(`/${page}`);
    switch (page) {
      case "Menú":
        navigate(`/menu`);
        break;
      case "Mi Pedido":
        navigate(`/pedido`);
        break;
      default:
        break;
    }
    handleCloseNavMenu();
  };

  const handleMenuItemSetting = (setting: string) => {
    switch (setting) {
      case "Mi Cuenta":
        navigate(`/cuenta`);
        break;
      case "Mis Pedidos":
        navigate(`/historial`);
        break;
      case "Cerrar Sesión": {
        dispatch(setLogout());
        navigate(`/login`);
        break;
      }
      default:
        break;
    }
    handleCloseNavMenu();
  };
  const handleLoggin = (setting: string) => {
    switch (setting) {
      case "Iniciar Sesion":
        navigate("/login");
        break;
      case "Registrarse":
        navigate("/register");
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {/* VISTA PARA PC */}
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            fontFamily="Roboto, sans-serif"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              marginLeft: "1rem",
            }}
          >
            El Buen Sabor
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* VISTA PARA CELULAR */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleMenuItemClick(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/*-------------------------SECCION USUARIOOO----------------------------*/}
          {!userLogeado ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => handleLoggin("Iniciar Sesion")}
                sx={{ mx: 1 }}
              >
                Iniciar Sesión
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => handleLoggin("Registrarse")}
                sx={{ mx: 1 }}
              >
                Registrarse
              </Button>
            </Box>
          ) : (
            <Box>
              <Tooltip title="Usuario loggeado">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Usuario"
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box width={"100%"} textAlign={"center"}>
                  ¡Hola {userName}!
                </Box>
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuItemSetting(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
