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
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/sessionSlice";
import { supabase } from "../../config/supabaseClient";

const pages = [
  { label: "Peliculas", path: "peliculas" },
  { label: "Series", path: "series" },
  { label: "Catalogo", path: "catalogo" },
  { label: "Niños y Familia", path: "niñosfamilia" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.session);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };

  const handleCloseUserMenuOption = async (event) => {
    setAnchorElUser(null);
    if (event.target.textContent === "Logout") {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error al cerrar sesión:", error.message);
      } else {
        dispatch(logout());
        navigate("/", { replace: true });
      }
    }
  };

  const handleNavigate = (path) => {
    //  console.log(path);
    console.log(user);
    navigate(path);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("series")}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              sx={{ display: { xs: "block", md: "none", height: "400px" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleNavigate(page.path)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 4,
              display: { xs: "flex", md: "none" },
              flexGrow: 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
            onClick={() => handleNavigate("series")}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => handleNavigate(page.path)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textDecoration: "none",
                }}
              >
                <Typography
                  variant="body"
                  sx={{
                    fontFamily: "'Poppins', sans-serif", // Consistencia en la tipografía
                    fontWeight: 600, // Mantener el peso
                    color: "white", // Color hereda del botón
                    ml: 2,
                  }}
                >
                  {page.label}
                </Typography>
              </Button>
            ))}
          </Box>

          {/* Nombre de usuario */}

          <Typography
            variant="h6"
            noWrap
            component="h5"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "flex" },
              flexGrow: 0,
              fontFamily: "'Poppins', sans-serif", // Tipografía moderna
              fontWeight: 600, // Peso de la fuente para que sea más visible
              fontSize: { xs: "1rem", md: "1.25rem" }, // Tamaño adaptable según pantalla
              letterSpacing: ".05rem", // Espaciado ligero para mayor legibilidad
              color: "white", // Color verde para un toque fresco
              textDecoration: "none",
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Fondo sutil
              padding: "8px 16px", // Padding para que se vea más espacioso
              borderRadius: "8px", // Bordes redondeados para un look moderno
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Sombra sutil para mayor profundidad
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.15)", // Cambia el fondo al pasar el mouse
                cursor: "pointer", // Cursor tipo mano para interactividad
              },
            }}
          >
            {user.identities[0].identity_data.name}
          </Typography>

          {/* Icono Usuario Logueado */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={user.identities[0].identity_data.avatar_url}
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  value={setting}
                  onClick={handleCloseUserMenuOption}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
