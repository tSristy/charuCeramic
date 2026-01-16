import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

import IconColumnCard from "../../assets/Card/IconColumnCard";
import BtnUrlChange from "../../assets/Button/BtnUrlChange";
import CTA from "../../assets/Button/CTA.jsx";
import Carousel from "../../assets/Slide/Carousel.jsx";

import bannerVideo from '../../img/dummyVideo.mp4';
import bannerImg from '../../img/bg1.jpg';

import img3in1 from '../../img/3img1.jpg';
import img3in2 from '../../img/3img2.jpg';
import img3in3 from '../../img/3img3.jpg';

import imgOt1 from '../../img/hpicon1.png';
import imgOt2 from '../../img/hpicon2.png';
import imgOt3 from '../../img/hpicon3.png';
import imgOt4 from '../../img/hpicon4.png';
import { useEffect, useState } from "react";

import { ServerApi, urlAPI } from "../../route/ServerAPI.js";
import { useNavigate } from "react-router-dom";
import { homePagePropsList } from "../../Data.jsx";


const Homepage = () => {
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState([]);
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        ServerApi(`/category/show?displayVar=add_homepage`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setCategoryList(res);
            });

        ServerApi(`/blog/show`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setBlogList(res);
            });
    }, [])

    return (
        <>

            {/* HEROSECTIONNNNNNNNNNNNNNNNNNNNNNNNNNNN */}
            <Box>
                <Carousel>
                    <video
                        poster={bannerImg}
                        preload="metadata"
                        style={{ aspectRatio: '16/6.7', width: '100%', objectFit: 'cover' }}
                        autoPlay loop muted playsInline
                    >
                        <source src={bannerVideo} type="video/mp4" />
                    </video>

                    <Box sx={{
                        display: 'block',
                        width: "100%",
                        aspectRatio: '16/6.7',
                        height: "auto",
                        objectFit: "cover"
                    }}
                        loading="eager"
                        fetchPriority="high"
                        component="img" src={bannerImg} />
                </Carousel>
            </Box>


            {/* 3 boxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <Box sx={{ p: 5 }}>
                <Container>
                    <Stack sx={{
                        bgcolor: "white",
                        p: 1,
                        borderRadius: 1,
                        // boxShadow: 1,
                        alignItems: "stretch",
                        justifyContent: "space-evenly"
                    }}
                        direction={{ xs: 'column', sm: 'row' }}
                        divider={<Divider orientation="vertical" flexItem />}
                    >
                        {
                            homePagePropsList.map(item => (
                                <IconColumnCard key={item.id} item={item} />
                            ))
                        }
                    </Stack>
                </Container>
            </Box>


            {/* ABOUTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT */}
            <Box sx={{
                bgcolor: '#c5c5c5',
                backgroundImage: `url(${bannerImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                <Box sx={{
                    py: 10,
                    bgcolor: 'rgba(0, 0, 0, 0.65)',
                    height: '100%',
                }}>
                    <Container sx={{ py: 10 }}>
                        <Typography sx={{ color: 'white', fontSize: '2.5rem', fontWeight: 600, textAlign: 'left' }}>
                            Brand Purpose
                        </Typography>
                        <Typography sx={{ color: 'white', fontSize: '.9rem', fontWeight: 400, textAlign: 'left', my: 2, width: { xs: '100%', md: '60%' } }}>
                            At Charu Ceramic, our brand purpose is to enhance the quality of life by providing innovative and reliable ceramic solutions that combine functionality with aesthetic appeal. We are committed to sustainability, customer satisfaction, and continuous improvement, striving to create products that not only meet but exceed the expectations of our diverse clientele.
                        </Typography>
                        <Box py={2}>
                            <BtnUrlChange btnTitle="Explore More" url="/company-information" />
                        </Box>
                    </Container>
                </Box>
            </Box>


            {/* PRODUCTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT */}
            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'center', mb: 10 }}>
                        Products
                    </Typography>

                    <Grid container spacing={4}>
                        {categoryList.map(product => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box sx={{
                                    border: '1px solid #eee',
                                    cursor: 'pointer',
                                    '&:hover .hoverEffect': {
                                        borderBottom: '5px solid  #ff0000',
                                        filter: 'grayscale(0%)',
                                        transform: 'scale(1.02)',
                                    }
                                }} onClick={(e) => navigate(`/product/${product.slug}`)}>
                                    <Box component="img" loading="lazy" decoding="async" src={urlAPI + product.featured_image} alt={product.name} className="hoverEffect" sx={{
                                        display: 'block', filter: 'grayscale(100%)', width: '100%', aspectRatio: '4/3', height: { sm: 'auto', md: '180px' }, objectFit: 'cover',
                                        transition: "all .3s ease", borderBottom: '5px solid #ffffffff'
                                    }} />

                                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, textAlign: 'center', mt: 1 }}>
                                        {product.name}
                                    </Typography>
                                    <Typography sx={{ fontSize: '.8rem', fontWeight: 400, textAlign: 'center', mb: 2 }}>
                                        View collection
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>


            {/* OUR TECHNOLOGYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY */}
            <Box sx={{ py: 5 }}>
                {/* <Container> */}
                <Stack sx={{ alignItems: 'stratch', justifyContent: 'center' }} direction={{ sm: 'column', md: 'row' }}>
                    <Box sx={{ bgcolor: '#ff0000', py: 10, px: 5, alignContent: "center" }}>
                        <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'left', color: 'white' }}>
                            Our Technologies
                        </Typography>
                    </Box>

                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                        <Box sx={{ bgcolor: '#000000ff', p: 10, px: 2, width: '50%' }}>
                            <Box component="img" src={imgOt1} alt="rimless" sx={{ filter: "grayscale(100%)", objectFit: "cover", height: "50px", mb: 2 }} />
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'left', color: 'white', mb: 2 }}>
                                Rimless Design
                            </Typography>
                            <Typography sx={{ fontSize: '.9rem', textAlign: 'left', color: 'white' }}>
                                Rimless design delivers superior hygiene, efficient flushing, and effortless maintenance through a seamless bowl structure free of dirt-trapping edges.
                            </Typography>
                        </Box>

                        <Box sx={{ bgcolor: '#2b2b2b', p: 10, px: 2, width: '50%' }}>
                            <Box component="img" src={imgOt2} alt="jet" sx={{ filter: "grayscale(100%)", objectFit: "cover", height: "50px", mb: 2 }} />
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'left', color: 'white', mb: 2 }}>
                                Rimless Siphon Jet
                            </Typography>
                            <Typography sx={{ fontSize: '.9rem', textAlign: 'left', color: 'white' }}>
                                Rimless Siphon Jet Flush ensures powerful cleaning, enhanced hygiene, and efficient water flow with a seamless, edge-free bowl design.
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }}>
                        <Box sx={{ bgcolor: '#4a4a4a', p: 10, px: 2, width: '50%' }}>
                            <Box component="img" src={imgOt3} alt="hygigenic" sx={{ filter: "grayscale(100%)", objectFit: "cover", height: "50px", mb: 2 }} />
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'left', color: 'white', mb: 2 }}>
                                Hygienic Glaze
                            </Typography>
                            <Typography sx={{ fontSize: '.9rem', textAlign: 'left', color: 'white' }}>
                                Hygienic Glaze creates an ultra-smooth, antimicrobial surface that resists stains, prevents bacterial buildup, and ensures long-lasting cleanliness.
                            </Typography>
                        </Box>


                        <Box sx={{ bgcolor: '#676767', p: 10, px: 2, width: '50%' }}>
                            <Box component="img" src={imgOt4} alt="hygigenic" sx={{ filter: "grayscale(100%)", objectFit: "cover", height: "50px", mb: 2 }} />
                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 600, textAlign: 'left', color: 'white', mb: 2 }}>
                                Click Release
                            </Typography>
                            <Typography sx={{ fontSize: '.9rem', textAlign: 'left', color: 'white' }}>
                                Click Release Technology allows effortless seat and cover removal for deep cleaning, improved hygiene, and quick, tool-free maintenance.
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>

                {/* </Container> */}
            </Box>


            {/* 3PICTUREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
            <Box sx={{ py: 10 }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{ position: 'relative', height: { xs: '350px', md: '500px' } }}>
                                <Box sx={{
                                    borderRadius: 3,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    boxShadow: 2,
                                    width: '55%',
                                    height: '60%',
                                    objectFit: 'cover',
                                    "&:hover": {
                                        zIndex: 2,
                                        transform: 'scale(1.05)',
                                        transition: 'all 0.5s ease-in-out',
                                    }
                                }} loading="lazy"
                                    decoding="async" component="img" src={img3in1} />

                                <Box sx={{
                                    borderRadius: 3,
                                    position: 'absolute',
                                    top: '50%',
                                    left: "10%",
                                    boxShadow: 2,
                                    width: "50%",
                                    height: "50%",
                                    "&:hover": {
                                        zIndex: 2,
                                        transform: 'scale(1.05)',
                                        transition: 'all 0.5s ease-in-out',
                                    }
                                }} loading="lazy"
                                    decoding="async" component="img" src={img3in2} />

                                <Box sx={{
                                    borderRadius: 3,
                                    position: 'absolute',
                                    top: '15%',
                                    left: "49%",
                                    boxShadow: 2,
                                    width: "50%",
                                    height: "70%",
                                    objectFit: "cover",
                                    "&:hover": {
                                        transform: 'scale(1.05)',
                                        transition: 'all 0.5s ease-in-out',
                                    }
                                }} loading="lazy"
                                    decoding="async" component="img" src={img3in3} />
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{
                                pt: 10,
                                pb: { sm: 0, md: 10 },
                            }}>
                                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'left' }}>
                                    Bangladesh’s Benchmark for Premium Sanitaryware
                                </Typography>
                                <Typography sx={{ fontSize: '.9rem', fontWeight: 400, textAlign: 'left', my: 2 }}>
                                    Charu Ceramic has set the benchmark for premium sanitaryware and bath ware in Bangladesh through innovative design, superior quality, advanced manufacturing, and an unwavering commitment to customer satisfaction.
                                </Typography>
                                <Box py={2}>
                                    <BtnUrlChange btnTitle="Know About Us" url="/company-information" />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>


            {/* VIDEOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO */}
            <Box sx={{ py: { md: 4, lg: 10 } }}>
                <video
                    poster={bannerImg}
                    preload="metadata"
                    style={{ aspectRatio: '16/7', width: '100%', objectFit: 'cover' }}
                    autoPlay loop muted playsInline
                >
                    <source src={bannerVideo} type="video/mp4" />
                </video>
            </Box>


            {/* BLOGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG */}
            <Box sx={{ py: 10 }}>
                <Container>
                    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 10 }}>
                        <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'left' }}>
                            Read About CHARU
                        </Typography>
                        <Button variant="none" onClick={(e) => navigate('/news-article')} sx={{ textTransform: 'capitalize' }} endIcon={<AddBoxIcon sx={{ color: "#ff0000" }} />}>Explore All</Button>
                    </Stack>

                    <Grid container spacing={4}>
                        {blogList.length > 0 && blogList.map(item => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id} onClick={(e) => navigate(`/news-article/${item.slug}`)}>
                                <Box>
                                    <Box component="img" src={urlAPI + item.featured_image} loading="lazy"
                                    decoding="async" alt="Blog Image" sx={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                    <Typography sx={{ fontSize: '1rem', fontWeight: 600, textAlign: 'left', my: 2 }}>
                                        {item.title}
                                    </Typography>

                                </Box>
                            </Grid>)
                        )}
                    </Grid>
                </Container>
            </Box>

            <CTA />
        </>
    );
};

export default Homepage;