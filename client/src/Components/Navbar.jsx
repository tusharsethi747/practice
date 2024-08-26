import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate=useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut=()=>{
    localStorage.removeItem("userPayload");
    localStorage.removeItem("token");
    navigate('/');
  }

  const handleLogIn=()=>{
    navigate('/login');
  }
  return (
    <div >
      <AppBar 
        className='navbar'
        position="sticky"  // Keeps the AppBar fixed at the top on scroll
        sx={{ backgroundColor: "white", boxShadow: 'none' }} // Transparent background with no shadow
      >
        <Box 
          minWidth="xl" 
          sx={{ display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            margin: "10px", 
            overflow: "hidden" }}
        >
          <Typography 
            sx={{
              fontSize: "40px", 
              color: "black", 
              flexGrow: 1, // Ensures the logo is aligned to the left,
              fontWeight:"700",
              padding:"8px",
              marginLeft:"3px"

            }}
          >
            ZuAi
          </Typography>

          <Box sx={{display:"flex" , justifyContent:"space-around" }}>
            <Button sx={{ display:"flex", justifyContent:"center",alignItems:"center",margin:"3px",color:"grey",fontWeight:"600", fontSize:"15px", borderColor:"grey", borderStyle:"solid",borderWidth:"3px",borderRadius:"40px" , paddingLeft:"12px",paddingRight:"12px",":hover":{backgroundColor:"purple", color:"white"}}}
            onClick={handleLogIn}
            >
              Login
            </Button>
            <Button sx={{ margin:"3px",color:"grey",fontWeight:"600", fontSize:"15px", borderColor:"grey", borderStyle:"solid",borderWidth:"3px",borderRadius:"40px" , paddingLeft:"12px",paddingRight:"12px",":hover":{backgroundColor:"purple", color:"white"}}}
            onClick={handleLogOut}
            >
              LogOut
            </Button>
          </Box>
        </Box>
      </AppBar>
    </div>
  )
}

export default Navbar







