import { useEffect, useState } from 'react';
import { ServerApi } from '../../route/ServerAPI';
import {
    Box,
    AppBar,
    Toolbar, // Re-included for proper alignment
    Button,
    List,
    ListItemButton,
    ListItemText,
    Container,
    Stack,
    IconButton, // For hamburger icon
    Drawer,     // For mobile menu
    useMediaQuery, // For responsiveness
    useTheme,    // To access breakpoints
    Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../img/charu_logo.png';
import { tempMenuList } from '../../Data.jsx';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [menuList, setMenuList] = useState([]);
    const [subMenuList, setSubMenuList] = useState([]);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // --- Responsive Hooks ---
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleHover = (index) => {
        setSubMenuList(menuList[index].children || null);
    }

    const handleClick = (url) => {
        navigate(url);
        setSubMenuList([])
    }

    const buildTree = (data, parentID = null) => {
        const tree = [];
        const dataCopy = JSON.parse(JSON.stringify(data));

        for (const item of dataCopy) {
            if (item.parentId === parentID) {
                const children = buildTree(dataCopy, item.id);
                if (children.length > 0) {
                    item.children = children;
                }
                tree.push(item);
            }
        }
        return tree;
    }

    useEffect(() => {
       ServerApi(`/category/show?displayVar=add_homepage`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                // console.log(res)
                if (res.data && res.data.length > 0) {
                    setMenuList(buildTree(res.data));
                } else {
                    setMenuList(buildTree(tempMenuList));
                }
            })
            .catch(err => {
                console.error("API Failed, using temp data", err);
                setMenuList(buildTree(tempMenuList));
            })
    }, []);


    // --- Reusable Menu Component for Mobile and Desktop ---
    const MenuItems = ({ items }) => (
        items.map((item, index) => {
            const hasChildren = item.children && item.children.length > 0;

            // Desktop Mega Menu Logic
            if (!isMobile) {
                return (
                    <>
                        <Box
                            key={item.id}
                        >
                            <Button onMouseOver={(e) => handleHover(index)}
                                onClick={(e) => handleClick(item.link)}
                                color="inherit"
                                endIcon={hasChildren ? <KeyboardArrowDownIcon /> : null}
                                sx={{ textTransform: 'uppercase', fontWeight: 500, color: '#2b2b2b', px: 2, py: 2, fontSize: '.9em', '&:hover': { backgroundColor: '#f5f5f5' } }}
                            >
                                {item.title}
                            </Button>
                        </Box>
                    </>
                );
            }

            // Mobile Menu Logic (simpler nested list items)
            return (
                <Box key={item.id}>
                    <ListItemButton component="a" href={item.link} onClick={() => hasChildren ? null : setIsMobileOpen(false)}>
                        <ListItemText primary={item.title} sx={{ fontWeight: hasChildren ? 'bold' : 'normal' }} />
                        {hasChildren && <KeyboardArrowDownIcon />}
                    </ListItemButton>
                    {hasChildren && (
                        <List component="div" disablePadding sx={{ pl: 2, borderLeft: '2px solid #eee' }}>
                            {item.children.map((child) => (
                                <ListItemButton key={child.id} component="a" href={child.link} onClick={() => setIsMobileOpen(false)}>
                                    <ListItemText primary={child.title} sx={{ fontSize: '.87rem'}}/>
                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </Box>
            );
        })
    );


    return (
        <Box sx={{ position: "sticky", top:0, lefy:0, zIndex: 888}}>
        {/* <Box sx={{ position: "relative" }}> */}

            <AppBar position="static" color="default" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ p: 0, m: 0, justifyContent: 'space-between' }}>

                        {/* Logo Area */}
                        <Box>
                            <img src={logo} alt="Charu Ceramic Logo" style={{ height: '50px' }} />
                        </Box>

                        {/* --- DESKTOP MENU --- */}
                        {!isMobile && (
                            <Stack direction="row" sx={{ width: 'auto', justifyContent: "space-around", alignItems: "center" }}>
                                <MenuItems items={menuList} />
                            </Stack>
                        )}
                        <Button variant='contained'   sx={{ fontSize: ".87rem", bgcolor: '#ED1C24', textTransform: "uppercase", py: 1, '&:hover': { bgcolor: '#f0141bff' } }} >3D Visualizer</Button>

                        {/* --- MOBILE ICON --- */}
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={() => setIsMobileOpen(true)}
                                sx={{ color: '#333' }}
                            >
                                <MenuIcon />
                            </IconButton>
                        )}
                    </Toolbar>
                </Container>

                {subMenuList?.length > 0 && !isMobile &&
                    <Box onMouseOver={(e) => handleHover(index)}
                                onMouseLeave={(e) => setSubMenuList([])}
                        sx={{
                            bgcolor: "white",
                            position: "absolute",
                            top: 64,
                            left: 0,
                            width: "100%",
                            zIndex: 25,
                            // px:5,
                            // py:3,
                            borderRadius: '0 0 8px 8px',
                            borderTop: '1px solid #c3c3c3ff',
                            boxShadow: 2,
                        }}
                    >
                        <Stack direction="row" sx={{ justifyContent: "space-evenly"}}>

                            {subMenuList.map((child) => (
                                <Box key={child.id}>
                                    <Typography sx={{ py:1.5, fontWeight: 500, textTransform: "uppercase", fontSize: '.87rem', '&:hover': {
                                            cursor: "pointer"
                                        }
                                    }} onClick={(e)=>handleClick(child.link)}>
                                    {child.title}
                                    </Typography>
                                    
                                    { child.children.map(item=>(
                                    <Box key={item.id} sx={{
                                        py:1.5,
                                        '&:hover': {
                                            cursor: "pointer"
                                        }
                                    }} onClick={(e)=>handleClick(item.link)}>
                                    <Typography sx={{ fontSize: '.87rem', textTransform: 'uppercase'}}>{item.title}</Typography>
                                    </Box>
                                    ))}
                                </Box>
                            ))
                            }
                        </Stack>
                    </Box>
                }

                <Drawer
                    anchor="right"
                    open={isMobileOpen}
                    onClose={() => setIsMobileOpen(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={() => { }} // Keep the drawer open on item click to handle submenu
                        onKeyDown={() => setIsMobileOpen(false)}
                    >
                        <List>
                            <MenuItems items={menuList} />
                        </List>
                    </Box>
                </Drawer>
            </AppBar>
        </Box>
        // </Box>
    );
};

export default Header;