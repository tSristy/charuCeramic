import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CategoryIcon from '@mui/icons-material/Category';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WebStoriesIcon from '@mui/icons-material/WebStories';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ApartmentIcon from '@mui/icons-material/Apartment';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import ImageIcon from '@mui/icons-material/Image';

const Sidebar = () => {
    const menuList = [
        { title: "Banner", url: "/banner-list", icon: <ImageIcon /> },
        { title: "Categories", url: "/category-list", icon: <CategoryIcon /> },
        { title: "Products", url: "/product-list", icon: <WarehouseIcon /> },
        { title: "Catalogues", url: "/catalogue-list", icon: <WebStoriesIcon /> },
        { title: "Dealers", url: "/dealer-list", icon: <CreditCardIcon /> },
        { title: "Blogs", url: "/blog-list", icon: <NewspaperIcon /> },
        { title: "Buying Guide", url: "/buying-guide-list", icon: <MenuBookIcon /> },
        { title: "Projects", url: "/project-list", icon: <ApartmentIcon /> },
        { title: "Resume", url: "/career-list", icon: <WorkHistoryIcon /> },
        { title: "Policy", url: "/policy-panel", icon: <PolicyIcon /> },
        { title: "Terms & Condition", url: "/terms-condition-panel", icon: <GavelIcon /> },
        { title: "FAQs", url: "/faq-list", icon: <LiveHelpIcon /> },
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