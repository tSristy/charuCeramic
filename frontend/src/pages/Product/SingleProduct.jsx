import { Box, Container, Divider, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Link from '@mui/material/Link';
import { useNavigate, useParams } from "react-router-dom";

import Breadcrumbs from '@mui/material/Breadcrumbs';
import DescriptionIcon from '@mui/icons-material/Description';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnDonwload from "../../assets/Button/BtnDownload";


const SingleProduct = () => {
    const { number } = useParams();
    const navigate = useNavigate();

    const [productDetails, setProductDetails] = useState("");
    const [mainImg, setMainImg] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [specList, setSpecList] = useState([]);
    const [testVar, setTestVar] = useState({});
    const [relatedList, setRelatedList] = useState([]);
    
    const [detailTab, setDetailTab] = useState({
        featureTab: true,
        specTab: false,
        downloadTab: false,
    })
    const tabs = [{ title: "Feature", val: "featureTab" }, { title: "Specs", val: "specTab" }, { title: "Download", val: "downloadTab" }]

    const handleTab = (name) => {
        setDetailTab(prev => ({
            featureTab: false,
            specTab: false,
            downloadTab: false,
            [name]: true
        })
        )
    }

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
        ServerApi(`/product?url_path=${number}`, "GET", null, null)
            .then((res) => res.json())
            .then(res => {
                if (res === 404) { navigate("/404-not-found", { replace: true }); }
                setProductDetails(res.product);
                setImageList(res.images);
                mainImageHanlde(res.images, res.product.first_image);
                setSpecList(res.specList);

                res.specList?.filter(item => {
                    const label = item.spec_label.toLowerCase();
                    return label !== "feature" && label !== 'technology';
                }).map(spec => (
                    setTestVar(p => ({ ...p, [spec.spec_label]: spec.spec_value }))
                ));
                relatedProduct(res.product.category.cID);
            })
    }, [number])


    const relatedProduct = async (id) => {
        await ServerApi(`/product/list-related/`+id, 'GET', null, null)
            .then((res) => res.json())
            .then(res => {
                setRelatedList(res);
            })
    }



    if (!productDetails || !mainImg) {
        return <Typography align="center" variant="overline" py={10}>Loading Product...</Typography>;
    }

    return (
        <>
            <Box py={10}>
                <Container maxWidth="xl">
                    <Box>
                        <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                            <Link underline="hover" color="inherit" href={`/Product/${productDetails?.category?.slug}`}>
                                {productDetails?.category?.cName}
                            </Link>
                            <Link
                                underline="hover"
                                color="inherit"
                                href="/Product"
                            >
                                {productDetails?.name}
                            </Link>
                        </Breadcrumbs>
                    </Box>

                    <Grid container spacing={5} sx={{ alignItems: "stretch" }}>
                        <Grid size={{ sm: 9, md: 7 }}>
                            <Box mt={5} px={{ md: 2, lg: 10 }} sx={{ borderRight: '1px solid #d0d0d094' }}>
                                <Box component="img" loading="eager" fetchPriority="high" src={urlAPI + mainImg?.image_url} alt={mainImg?.alt_text} className="hoverEffect" sx={{
                                    display: 'block', width: '100%',
                                    aspectRatio: {
                                        xs: '1 / 1',
                                        md: '1 / 1',
                                    }, height: 'auto', objectFit: 'cover'
                                }} />
                            </Box>
                            <Box px={{ md: 2, lg: 10 }}>
                                <Stack direction='row' sx={{ justifyContent: "space-between" }} mt={4}>
                                    {
                                        imageList?.filter(item => item.id !== mainImg.id)
                                            .map(item => (
                                                <Box key={item.id} loading="lazy" decoding="async"
                                                    component="img"
                                                    src={urlAPI + item.image_url}
                                                    sx={{
                                                        objectFit: "cover",
                                                        display: 'block',
                                                        width: { xs: '100px', sm: '150px', lg: '200px' },

                                                        aspectRatio: {
                                                            // xs: '4 / 3',
                                                            sm: '1 / 1',
                                                        }, height: 'auto',

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
                            </Box>
                        </Grid>

                        <Grid size={{ sm: 12, md: 5 }}>
                            <Box px={{ md: 2, lg: 5 }}>
                                <h1>{productDetails?.name}</h1>

                                <Stack direction="row">
                                    {
                                        tabs.map((item, index) => (
                                            <Box key={index} onClick={(e) => handleTab(item.val)} sx={{
                                                fontWeight: 600,
                                                width: "30%",
                                                border: 1,
                                                borderBottom: 0,
                                                borderColor: detailTab[item.val] ? '#181818ff' : "#eee",
                                                bgcolor: detailTab[item.val] ? '#ffffffff' : "#2b2b2b",
                                                fontSize: '.95rem',
                                                px: 2,
                                                py: 1,
                                                color: detailTab[item.val] ? '#2b2b2b' : '#ffffffff',
                                                '&:hover': {
                                                    bgcolor: "white",
                                                    color: "#2b2b2b",
                                                    cursor: "pointer",
                                                    borderColor: '#181818ff'
                                                }
                                            }}>
                                                {item.title}
                                            </Box>
                                        ))
                                    }
                                </Stack>

                                {detailTab.featureTab && <Box sx={{ p: 2, color: "#2b2b2b" }}>
                                    <ul>
                                        {specList?.filter((item) => {
                                            const label = item.spec_label.toLowerCase();
                                            return label == "feature" || label == "features";
                                        }).map((spec, index) => (
                                            <li className="li" key={index}>{spec.spec_value}</li>
                                        ))
                                        }
                                    </ul>
                                </Box>}

                                {detailTab.specTab && <Box sx={{ fontSize: '1rem', color: '#2b2b2b' }}>
                                    <Box p={4}>
                                        {testVar.Item && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Item</Box>
                                            <Box width={"60%"}>{testVar.Item || 'N/A'}</Box>
                                        </Stack>}

                                        {testVar['Water Use'] && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Water Use</Box>
                                            <Box width={"60%"}>{testVar['Water Use'] || 'N/A'}</Box>
                                        </Stack>}

                                        {testVar['Trap Way'] && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Trap Way</Box>
                                            <Box width={"60%"}>{testVar['Trap Way'] || 'N/A'}</Box>
                                        </Stack>}

                                        {testVar['Size'] && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Size</Box>
                                            <Box width={"60%"}>{testVar['Size'] || 'N/A'}</Box>
                                        </Stack>}

                                        {testVar['Outlet Range'] && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Outlet Range</Box>
                                            <Box width={"60%"}>{testVar['Outlet Range'] || 'N/A'}</Box>
                                        </Stack>}

                                        {testVar['Color'] && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Color</Box>
                                            <Box width={"60%"}>{testVar['Color'] || 'N/A'}</Box>
                                        </Stack>}

                                        {testVar['Flushing System'] && <Stack direction="row">
                                            <Box width={"40%"} sx={{ fontWeight: 500, mb: 1 }}>Flushing System</Box>
                                            <Box width={"60%"}>{testVar['Flushing System'] || 'N/A'}</Box>
                                        </Stack>}
                                    </Box>
                                </Box>}

                                {detailTab.downloadTab && <Box sx={{ fontSize: '.8rem', color: "#2b2b2b" }}>
                                    <Box p={2}>
                                        <Stack direction="column">
                                            <BtnDonwload fileUrl={imageList.find(result => parseInt(result.sort_order) === parseInt(productDetails.drawing_image))?.image_url}>
                                                <Stack direction="row" spacing={2} p={2}>
                                                    <DescriptionIcon sx={{ fontSize: "2rem", color: "#333" }} />

                                                    <Typography sx={{ fontWeight: 500, fontSize: '1.1rem', color: "#333" }}>2D Drawing</Typography>
                                                </Stack>
                                            </BtnDonwload>

                                            <BtnDonwload fileUrl={imageList.find(result => parseInt(result.sort_order) === parseInt(productDetails.first_image))?.image_url}>
                                                <Stack direction="row" spacing={2} p={2}>
                                                    <DescriptionIcon sx={{ fontSize: "2rem", color: "#333" }} />

                                                    <Typography sx={{ fontWeight: 500, fontSize: '1.1rem', color: "#333" }}>Image</Typography>
                                                </Stack>
                                            </BtnDonwload>

                                            <BtnDonwload fileUrl={productDetails.spec_pdf}>
                                                <Stack direction="row" spacing={2} p={2}>
                                                    <DescriptionIcon sx={{ fontSize: "2rem", color: "#333" }} />

                                                    <Typography sx={{ fontWeight: 500, fontSize: '1.1rem', color: "#333" }}>Specification Sheet</Typography>
                                                </Stack>
                                            </BtnDonwload>
                                        </Stack>
                                    </Box>
                                </Box>}


                                <Box mt={4}>
                                    <Typography sx={{ fontWeight: 600, mb: 2 }}>
                                        Technologies
                                    </Typography>
                                    <Divider sx={{ m: 2 }} />
                                    <Stack direction="row" spacing={2}>
                                        {specList.filter((item) => {
                                            const label = item.spec_label.toLowerCase();
                                            return label == "technology" || label == "techno";
                                        }).map((spec, index) => (
                                            <Tooltip title={spec.spec_value}>
                                                <Box component="img" src={urlAPI + spec.feature_image} alt="jet" sx={{ objectFit: "cover", height: "50px", mb: 2 }} />
                                            </Tooltip>))}
                                    </Stack>
                                </Box>

                                <Box mt={4}>
                                    <Typography sx={{ fontWeight: 600, mb: 2 }}>
                                        Description
                                    </Typography>
                                    <Divider sx={{ m: 2 }} />
                                    <Typography>
                                        {productDetails.description}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Container>
                <Stack direction='column' alignItems={'center'}>
                    <Typography variant="overline">You may also like</Typography>
                    <Typography variant="h4" fontWeight={600}>Related Product</Typography>
                </Stack>

                <Box my={10}>
                    <Grid container spacing={4}>
                        { relatedList.map(product => (
                                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                                <Box onClick={() => navigate(`/${product.url_path}`)} sx={{ border: '1px solid #eee', cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                                                    <Box component="img" src={urlAPI + product.image_url} loading="lazy" decoding="async" alt={product.name} sx={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
                                                    <Box p={2}>
                                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, textAlign: 'center' }}>{product.name}</Typography>
                                                        <Typography sx={{ fontSize: '.8rem', color: 'text.secondary', textAlign: 'center' }}>{product.category_name} / {product.color}</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))
                                    }
                    </Grid>
                </Box>
            </Container>

        </>
    );
};

export default SingleProduct;