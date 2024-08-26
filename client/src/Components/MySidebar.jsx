import { useState } from "react";
import { Sidebar, Menu, MenuItem ,SubMenu} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import BookIcon from '@mui/icons-material/Book';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const MySidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setIsCollapsed(false);
  };

  const handleMouseLeave = () => {
    setIsCollapsed(true);
  };

  return (
    <div className="sidebar " style={{ display: 'flex', height: '100vh', minHeight: '300px' , backgroundColor:"white" }}>
      <Sidebar collapsed={isCollapsed} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        >
      <Menu>
          <MenuItem icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}> 
          
                    {
                        (!isCollapsed && 
                            <div>
                                Menu
                            </div>
                        )
                    }
            </MenuItem>
            <MenuItem icon={isCollapsed ? <BookIcon/> : undefined}> 
          
                    {
                        (!isCollapsed && 
                            <div>
                                Blog
                            </div>
                        )
                    }
            </MenuItem>
            <MenuItem icon={isCollapsed ? <ShoppingCartIcon /> : undefined}> 
          
                    {
                        (!isCollapsed && 
                            <div>
                                Cart
                            </div>
                        )
                    }
            </MenuItem>
      </Menu>
    </Sidebar>
    </div>
  );
};

export default MySidebar;
