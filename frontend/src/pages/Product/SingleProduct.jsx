import { Box, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Link from '@mui/material/Link';
import { useParams } from "react-router-dom";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import DescriptionIcon from '@mui/icons-material/Description';

import imgOt1 from '../../img/hpicon1.png';
import imgOt2 from '../../img/hpicon2.png';
import imgOt3 from '../../img/hpicon3.png';
import imgOt4 from '../../img/hpicon4.png';

import { imageAPI, ServerApi } from "../../route/ServerAPI";


const SingleProduct = () => {
    const { number } = useParams();

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

    const [productDetails, setProductDetails] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [specList, setSpecList] = useState([]);

    const mainImageHanlde = (imgList, seq) => {
        if (!imgList || !Array.isArray(imgList)) return; // Safety check

        const found = imgList.find(item => Number(item.sort_order) === Number(seq));
        if (found) {
            setMainImg(found);
        }
        else if (imgList.length > 0) {
            setMainImg(imgList[0]);
        }
    };

    useEffect(() => {
        ServerApi(`/product/${number}`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setProductDetails(res.product);
                setImageList(res.images);
                mainImageHanlde(res.images, res.product.first_image);
                setSpecList(res.specList);
            })
    }, [number])


    if (!productDetails || !mainImg) {
        return <Typography align="center" variant="overline" py={10}>Loading Product...</Typography>;
    }

    return (
        <>
            <Box py={10}>
                <Container>
                    <Box>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" href="/Product">
                                {productDetails?.category?.cName}
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/Product"
                            >
                                {productDetails?.name}
                            </Link>
                            <Typography sx={{ color: 'text.primary' }}>{productDetails?.model_number}</Typography>
                        </Breadcrumbs>
                    </Box>

                    <Grid container spacing={4} sx={{ py: 5 }}>
                        <Grid size={{ sm: 9, md: 8 }}>
                            <Box component="img" src={imageAPI + mainImg?.image_url} alt={mainImg?.alt_text} className="hoverEffect" sx={{ display: 'block', width: '100%', objectFit: 'cover', borderBottom: '5px solid #ffffffff' }} />

                            <Stack direction="row" spacing={4} mt={4}>
                                {
                                    imageList?.filter(item => item.id !== mainImg.id)
                                        .map(item => (
                                            <Box key={item.id}
                                                component="img"
                                                src={imageAPI + item.image_url}
                                                sx={{
                                                    objectFit: "cover",
                                                    display: 'block',
                                                    width: { sm: '100%', lg: '200px' },
                                                    height: '200px',
                                                    bgcolor: '#444',
                                                    '&:hover': {
                                                        cursor: "pointer"
                                                    }
                                                }}
                                                onClick={(e) => {
                                                    setMainImg(item)
                                                }} />
                                        ))
                                }

                            </Stack>
                        </Grid>


                        <Grid size={{ sm: 12, md: 4 }}>
                            <Stack direction="row">
                                <Box onClick={(e) => handleTab("featureTab")} sx={{ fontWeight: 600, width: "30%",
                                    fontSize: '.9rem', borderRadius: '8px 8px 0 0', px: 2, pt: 1, bgcolor: '#f0f0f0ff', color: "#2b2b2b", '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}>
                                    Features
                                </Box>
                                <Box onClick={(e) => handleTab("specTab")} sx={{ fontWeight: 600, width: "30%",
                                    fontSize: '.9rem', borderRadius: '8px 8px 0 0', px: 2, pt: 1, color: '#2b2b2b', bgcolor: '#dadadaff',  '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}>
                                    Specs
                                </Box>
                            </Stack>

                            {detailTab.featureTab && <Box sx={{ p: 2,  bgcolor: '#f0f0f0ff', color: "#2b2b2b", boxShadow: 1 }}>
                               <ul>
                                    { specList?.filter((item) => {
                                            const label = item.spec_label.toLowerCase();
                                            return label == "feature" || label == "features";
                                        }).map((spec, index) => (
                                            <li className="li" key={index}>{spec.spec_value}</li>
                                        ))
                                    }
                                </ul>
                            </Box>}

                            {detailTab.specTab && <Box sx={{ fontSize: '.8rem', color: '#2b2b2b', bgcolor: '#dadadaff', boxShadow: 1 }}>
                                <Box p={4}>
                                    {specList.length > 0 ? (
                                        specList.filter((item) => {
                                            const label = item.spec_label.toLowerCase();
                                            return label !== "feature" && label !== "features" && label !== "technology" && label !== "techno";
                                        }).map((spec, index) => (
                                            <Stack direction="row" key={index} spacing={2}>
                                                <Box width={"40%"} sx={{ fontWeight: 500}}>{spec.spec_label}</Box>
                                                <Box width={"60%"}>{spec.spec_value}</Box>
                                            </Stack>
                                        ))
                                    ) : (
                                        <Typography>No speficiations available.</Typography>
                                    )}
                                </Box>
                            </Box>}

                            {detailTab.downloadTab && <Box sx={{ boxShadow: 1, fontSize: '.8rem', bgcolor: '#999999', color: "#FFF" }}>
                                <Box p={2}>
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DescriptionIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '.8rem', color: "white" }}>2D Drawing</Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>


                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DescriptionIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '.8rem', color: "white" }}>Image</Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>


                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <DescriptionIcon sx={{ fontSize: "1.5rem", color: "white" }} />
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography sx={{ fontSize: '.8rem', color: "white" }}>Specification Sheets</Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Box>
                            </Box>}


                            <Box mt={4}>
                                <Typography sx={{ fontWeight: 600, mb: 2 }}>
                                    Technology
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    {specList.filter((item)=> {
                                            const label = item.spec_label.toLowerCase();
                                            return label == "technology" || label == "techno";
                                        }).map((spec, index) => (
                                    <Tooltip title={spec.spec_value}>
                                        <Box component="img" src={imageAPI+spec.feature_image} alt="jet" sx={{ objectFit: "cover", height: "40px", mb: 2 }} />
                                    </Tooltip>))}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

        </>
    );
};

export default SingleProduct;