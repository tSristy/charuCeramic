import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CategoryIcon from '@mui/icons-material/Category';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WebStoriesIcon from '@mui/icons-material/WebStories';

const Sidebar = () => {
    const menuList = [
        // { title: "Dashboard", url: "/dashboard", icon: <DashboardIcon /> },
        { title: "Categories", url: "/category-list", icon: <CategoryIcon /> },
        { title: "Products", url: "/product-list", icon: <WarehouseIcon /> },
        { title: "Catalogues", url: "/catalogue-list", icon: <WebStoriesIcon /> },
        { title: "Dealers", url: "/dealer-list", icon: <CreditCardIcon /> },
        // { title: "FAQs", url: "/faq-list", icon: <LiveHelpIcon /> },
        // { title: "Blogs", url: "/blog-list", icon: <InboxIcon /> },
        // { title: "Projects", url: "/project-list", icon: <InboxIcon /> },
    ];
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();

    const location = useLocation();
    const [currPath, setCurrPath] = useState(location.pathname);

    useEffect(() => {
        setCurrPath(location.pathname);
    }, [location]);

    return (
        <Box
            sx={{
                width: open ? 270 : 72,
                borderRight: 1,
                bgcolor: "#151515ff",
                minHeight: "100vh",
                transition: 'width 200ms',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', p: 1 }}>
                <IconButton size="small" onClick={() => setOpen(o => !o)}>
                    {open ? <ChevronLeftIcon sx={{ color: "#fff" }} /> : <MenuIcon sx={{ color: "#fff" }} />}
                </IconButton>
            </Box>

            <Stack spacing={1} px={2}>
                {menuList.map((menu, index) => (
                    <Box key={index} sx={{
                        p: 1, color: "#fff", bgcolor: currPath === menu.url ? "#ac1010ff" : "transparent",
                        borderRadius: 2, "&:hover": { bgcolor: currPath === menu.url ? "#ac1010ff": "#4d4d4d5f" }
                    }} onClick={() => navigate(menu.url, { replace: true })}
                    >
                        <Stack direction="row" spacing={1} sx={{ color: "#fff" }}>{
                            React.cloneElement(menu.icon, {
                                //   fontSize: "1rem", 
                                sx: { fontSize: "1.rem", color: "#ecf0f6ff" } // exact control (optional)
                            })
                        }
                            {open &&
                                <Typography sx={{ fontSize: ".9rem", color: "#ecf0f6ff" }}>{menu.title}</Typography>}
                        </Stack>
                    </Box>))}
            </Stack>
        </Box>
    )
}
export default Sidebar;