import { Box, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useState } from "react";
import DescriptionIcon from '@mui/icons-material/Description';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import imgPro from '../../img/bg1.jpg';

const SingleProduct = () => {
    const [detailTab, setDetailTab] = useState({
        featureTab: true,
        specTab: false,
        downloadTab: false,
    })

    const handleTab = (name) => {
        setDetailTab(prev => ({
            featureTab: false,
            specTab: false,
            downloadTab: false,
            [name]: true
        })
        )
    }

    return (
        <>
            <Box py={10}>
                <Container>
                    <Box>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/">
                                Home
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/Product"
                            >
                                Product Name
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>Breadcrumbs</Typography>
                        </Breadcrumbs>
                    </Box>

                    <Grid container spacing={4} sx={{ py: 5 }}>
                        <Grid size={{ sm: 9, md: 8 }}>
                            <Box component="img" src={imgPro} alt="name" className="hoverEffect" sx={{ display: 'block', width: '100%', height: '550px', objectFit: 'cover', borderBottom: '5px solid #ffffffff' }} />

                            <Stack direction="row" spacing={4} mt={4}>
                                <Box component="img" src="" sx={{ display: 'block', width: { sm: '100%' }, height: '120px', bgcolor: '#444' }} />
                                <Box component="img" src="" sx={{ display: 'block', width: { sm: '100%' }, height: '120px', bgcolor: '#444' }} />
                                <Box component="img" src="" sx={{ display: 'block', width: { sm: '100%' }, height: '120px', bgcolor: '#444' }} />
                                <Box component="img" src="" sx={{ display: 'block', width: { sm: '100%' }, height: '120px', bgcolor: '#444' }} />

                            </Stack>
                        </Grid>


                        {/* <Grid size={{ sm: 3, md: 2 }}>
                        </Grid> */}

                        <Grid size={{ sm: 12, md: 4 }}>
                            <Stack direction="row">
                                <Box onClick={(e) => handleTab("featureTab")} sx={{
                                    fontSize: '.9rem', borderRadius: '8px 8px 0 0', px: 2, pt: 1, bgcolor: '#f1f1f1ff', '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}>
                                    Features
                                </Box>
                                <Box onClick={(e) => handleTab("specTab")} sx={{
                                    fontSize: '.9rem', borderRadius: '8px 8px 0 0', px: 2, pt: 1, bgcolor: '#e4e4e4ff', '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}>
                                    Specs
                                </Box>
                                <Box onClick={(e) => handleTab("downloadTab")} sx={{
                                    fontSize: '.9rem', borderRadius: '8px 8px 0 0', px: 2, pt: 1, bgcolor: '#d4d4d4ff', '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}>
                                    Downlaod
                                </Box>
                            </Stack>

                            {detailTab.featureTab && <Box sx={{ p: 2, bgcolor: '#f1f1f1ff' }}>
                                <ul>
                                    <li className="li">Lorem ipsum dolor sit amet consectetur adipisicivoluptates magnam delectus excepturi dolores.</li>
                                    <li className="li">aVoluptatum neque odio corrupti enim optio ipsum rerum nesciunt,</li>
                                    <li className="li">aPossimus reprehenderit modi voluptate sit perferendis unde rem?</li>
                                </ul>
                            </Box>}

                            {detailTab.specTab && <Box sx={{ fontSize: '.8rem', bgcolor: '#e4e4e4ff' }}>
                                <Grid container sx={{ p: 4 }}>
                                    <Grid size={4}>
                                        idkd
                                    </Grid>
                                    <Grid size={6}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </Grid>

                                    <Grid size={4}>
                                        idkd
                                    </Grid>
                                    <Grid size={6}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                    </Grid>
                                </Grid>
                            </Box>}

                            {detailTab.downloadTab && <Box sx={{ fontSize: '.8rem', bgcolor: '#d4d4d4ff' }}>
                                <Box p={2}>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DescriptionIcon sx={{ fontSize: "1.5rem" }} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '.8rem' }}>2D Drawing</Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>


                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DescriptionIcon sx={{ fontSize: "1.5rem" }} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '.8rem' }}>Image</Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>


                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DescriptionIcon sx={{ fontSize: "1.5rem" }} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '.8rem' }}>Specification Sheets</Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>}


                            <Box mt={4}>
                                <Typography>
                                    Technology
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    );
};

export default SingleProduct;