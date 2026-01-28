import { useEffect, useState } from 'react';
import { ServerApi } from '../../route/ServerAPI';
import {
    Box, AppBar, Toolbar, Button, List, ListItemButton, ListItemText,
    Container, Stack, IconButton, Drawer, useMediaQuery, useTheme, Typography, Collapse
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../img/charu_logo.png';
import { tempMenuList } from '../../Data.jsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [menuList, setMenuList] = useState(tempMenuList); // Main hardcoded menu
    const [subMenuList, setSubMenuList] = useState([]);    // Tree-structured API data
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);

    // Helper to build tree using correct backend keys (parent_id, name)
    const buildTree = (data, parentID = 0) => {
        return data
            .filter(item => item.parent_id === parentID)
            .map(item => ({
                ...item,
                title: item.name, // Mapping 'name' to 'title' for consistency
                link: `/product/${item.slug}`,
                children: buildTree(data, item.id)
            }));
    };

    useEffect(() => {
        ServerApi(`/category/show?displayVar=add_menu`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res && res.length > 0) {
                    setSubMenuList(buildTree(res));
                }
            })
            .catch(err => console.error("API Failed, using temp data", err));
    }, []);

    const handleNavigate = (url) => {
        navigate(url);
        window.scrollTo(0, 0);
        setIsMobileOpen(false);
        setShowSubMenu(false);
    };

    // --- Desktop Menu Item ---
    const DesktopMenu = () => (
        <Stack direction="row" sx={{ ml: 'auto', mr: 'auto', alignItems: "center" }}>
            {menuList.map((item) => {
                const isProduct = item.title === 'Product';
                return (
                    <Box 
                        key={item.id} 
                        onMouseOver={() => isProduct && setShowSubMenu(true)}
                        onMouseLeave={() => isProduct && setShowSubMenu(false)}
                    >
                        <Button
                            onClick={() => handleNavigate(item.link)}
                            color="inherit"
                            endIcon={isProduct ? <KeyboardArrowDownIcon /> : null}
                            sx={{ textTransform: 'uppercase', fontWeight: 500, color: '#2b2b2b', px: 2, py: 2, fontSize: '.9em' }}
                        >
                            {item.title}
                        </Button>
                    </Box>
                );
            })}
        </Stack>
    );

    return (
        <Box sx={{ position: "sticky", top: 0, zIndex: 888 }}>
            <AppBar position="static" color="default" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box component='img' src={logo} alt="Logo" 
                             sx={{ cursor: "pointer", height: '50px' }} 
                             onClick={() => handleNavigate('/')} />

                        {!isMobile && <DesktopMenu />}

                        {isMobile && (
                            <IconButton onClick={() => setIsMobileOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>

                {/* --- DESKTOP MEGA MENU --- */}
                {!isMobile && showSubMenu && (
                    <Box
                        onMouseEnter={() => setShowSubMenu(true)}
                        onMouseLeave={() => setShowSubMenu(false)}
                        sx={{
                            position: "absolute", top: 64, left: 0, width: "100%",
                            bgcolor: "white", zIndex: 10, boxShadow: 1,
                            borderTop: '1px solid #eee',
                        }}
                    >

                        <Stack direction="row" sx={{ justifyContent: "space-evenly"}}>
                            {subMenuList.map((parent) => (
                                <Box key={parent.id} sx={{ minWidth: '170px' }}>
                                    <Typography
                                        
                                        sx={{ fontWeight: 500, fontSize: '.87rem', textTransform: 'uppercase', py: 1.5, cursor: 'pointer', '&:hover': { color: '#c00202', transition: '0.2s' } }}
                                        onClick={() => handleNavigate(parent.link)}
                                    >
                                        {parent.name}
                                    </Typography>
                                    {parent.children?.map(child => (
                                        <Typography
                                            key={child.id}
                                            sx={{ py: 1.5, fontSize: '.87rem', textTransform: 'uppercase', cursor: 'pointer', '&:hover': { ml: .5, transition: '0.2s' } }}
                                            onClick={() => handleNavigate(child.link)}
                                        >
                                            {child.name}
                                        </Typography>
                                    ))}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                )}

                {/* --- MOBILE DRAWER --- */}
                <Drawer anchor="right" open={isMobileOpen} onClose={() => setIsMobileOpen(false)}>
                    <Box sx={{ width: 220, p: 2 }}>
                        <List>
                            {menuList.map((item) => {
                                const isProduct = item.title === 'Product';
                                return (
                                    <Box key={item.id}>
                                        <ListItemButton onClick={() => isProduct ? setMobileSubMenuOpen(!mobileSubMenuOpen) : handleNavigate(item.link)}>
                                            <ListItemText primary={item.title} />
                                            {isProduct && <KeyboardArrowDownIcon sx={{ transform: mobileSubMenuOpen ? 'rotate(180deg)' : 'none' }} />}
                                        </ListItemButton>
                                        
                                        {isProduct && (
                                            <Collapse in={mobileSubMenuOpen} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding sx={{ pl: 3 }}>
                                                    {subMenuList.map((sub) => (
                                                        <Box key={sub.id}>
                                                            <ListItemButton onClick={() => handleNavigate(sub.link)}>
                                                                <Typography sx={{pb:1.5}} >{sub.name}</Typography>
                                                            </ListItemButton>
                                                            {/* {sub.children?.map(child => (
                                                                <ListItemButton key={child.id} sx={{ pl: 4 }} onClick={() => handleNavigate(child.link)}>
                                                                    <Typography sx={{ fontSize: '.85rem', textTransform: 'uppercase' }}>{child.name}</Typography> 
                                                                </ListItemButton>
                                                            ))} */}
                                                        </Box>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        )}
                                    </Box>
                                );
                            })}
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
        </Box>
    );
};

export default Header;