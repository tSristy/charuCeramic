import { Box, Button, Collapse, Container, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import bgInfo from '../../img/bgInfo.jpg';
import { useEffect, useState } from 'react';

import imgCard1 from '../../img/Image-01.png';
import imgCard2 from '../../img/Image-02.png';
import imgCard3 from '../../img/Image-03.png';
import CTA from '../../assets/Button/CTA';
import { ServerApi, urlAPI } from '../../route/ServerAPI';

const CompanyInfo = () => {
    const [seeMore, setSeeMore] = useState(false);
    const [sideImg, setSideImg] = useState(null);
    const [primeVideo, setPrimeVideo] = useState(null);
    const [bannerImg, setBannerImg] = useState(null);

    useEffect(() => {
        ServerApi(`/banner?pageName=ABOUT&sectionValue=CI01`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setBannerImg(res[0]);
            });

        ServerApi(`/banner?pageName=ABOUT&sectionValue=CI02`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setSideImg(res[0]);
            });

         ServerApi(`/banner?pageName=ABOUT&sectionValue=CI03`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setPrimeVideo(res[0]);
                });

    }, [])

    return (
        <Box sx={{ bgcolor: "#fff" }}>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000",
                display: 'block',
                aspectRatio: '16/5',
                width: '100%',
                height: "auto",
                overflow: 'hidden',
                bgcolor: '#f0f0f0'
            }}>
                <Box
                    component="img"
                    src={bannerImg?.featured_image ? urlAPI + bannerImg.featured_image : "bgImg"}
                    fetchPriority="high"
                    loading="eager"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>


            <Box sx={{ py: 10 }}>
                <Container>
                    <Grid container direction="row" spacing={2}>
                        <Grid size={{ xs: 12, sm: 9 }} >
                            <Box width={{xs: '100%', md: '70%'}}>
                                <Typography sx={{ fontSize: '1.15rem', fontWeight: 600, mb: 1, textAlign: 'left' }}>
                                    CHARU Ceramic Industries Limited
                                </Typography>
                                <Typography sx={{ fontSize: {xs: '2rem', sm: '2.5rem'}, fontWeight: 500, textAlign: 'left', whiteSpace: {xs:'pre-line', sm: 'normal'} }}>{`Leading \n Sanitary Ware Manufacturer \n in Bangladesh`}
                                </Typography>
                            </Box>

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: seeMore ? 12 : 8 }} sx={{
                                    transition: 'all 0.5s ease-in-out'
                                }}>
                                    <Box py={3}>
                                        <Typography sx={{
                                            textAlign: "justify",
                                            whiteSpace: "pre-line",
                                            fontSize: ".85rem"
                                        }}>
                                            CHARU Ceramic Industries Limited represents a significant milestone in Bangladesh's industrial development. Established in March 2012, our company proudly stands as the first manufacturing facility in Bangladesh to produce sanitary ware that meets rigorous international standards.
                                            This achievement was made possible through collaborative partnerships with premier consultants from both Europe and Asia, ensuring world-class expertise in every aspect of our operations.
                                        </Typography>
                                    </Box>
                                    <Collapse in={seeMore} timeout={500} unmountOnExit>
                                        {seeMore && <Typography sx={{
                                            mb: 3,
                                            textAlign: "justify",
                                            whiteSpace: "pre-line",
                                            fontSize: ".85rem"
                                        }}>

                                            Our commitment to quality is formally recognized through ISO 9001:2015 certification, validating our adherence to globally recognized quality management systems across all operational areas. This certification demonstrates our dedication to consistent quality and continuous improvement in our manufacturing processes.

                                            The technological foundation of our facility showcases our commitment to excellence. We have invested in cutting-edge manufacturing equipment from industry leaders SACMI, UNIMAK, and HEXIANG. This advanced machinery enables an impressive annual production capacity of 1.5 million pieces, positioning us as a significant player in the regional market.
                                            A particularly noteworthy achievement in our company's history is our technical collaboration with Siam Sanitary Ware Industry Co. Ltd. of Thailand. Through this partnership, CHARU manufactures the internationally acclaimed COTTO brand in Bangladesh, bringing world-renowned quality and design to the local market.
                                            While our initial focus has been on meeting the growing domestic demand for high-quality sanitary ware in Bangladesh, we have established a solid foundation for expanding into international markets. Our export strategy is a key component of our business development plan, reflecting our confidence in the quality and competitiveness of our products on the global stage.
                                        </Typography>}
                                    </Collapse>
                                    <Box>
                                        <Button variant="contained" sx={{
                                            bgcolor: '#ff0000'
                                        }} onClick={(e) => setSeeMore(!seeMore)}> {seeMore ? "See Less" : "See More"}
                                        </Button>
                                    </Box>
                                </Grid>


                                {seeMore ? null : <Grid size={{ xs: 12, sm: 4 }} sx={{
                                    transition: 'all 0.5s ease-in-out',
                                    opacity: seeMore ? 0 : 1,
                                    overflow: 'hidden',
                                    visibility: seeMore ? 'hidden' : 'visible'
                                }}>
                                    <Box sx={{ position: "relative" }}>
                                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
                                            <Typography sx={{ fontSize: "8rem", fontWeight: 600, color: "#ff0000ff" }}>
                                                9
                                            </Typography>
                                            <Typography sx={{ fontSize: "7rem", fontWeight: 600, color: "#2e2e2eff" }}>
                                                +
                                            </Typography>
                                        </Box>
                                        <Box sx={{ position: "absolute", top: 150, width: "100%", textAlign: "center" }}>
                                            Years of experience
                                        </Box>
                                    </Box>
                                </Grid>}
                            </Grid>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                            <Box component='img' src={sideImg ? urlAPI + sideImg.featured_image : "infoImg"} sx={{ width: "100%" }} loading='eager' decoding="async" />
                        </Grid>
                    </Grid>
                </Container>
            </Box>


            <Box sx={{ p: { sm: 2, md: 15 }, backgroundImage: `radial-gradient(circle closest-corner at 20% 20%, #811d1dff, #1e1e1eff)` }}>
                <Container>
                    <Box pb={10}>
                        <Typography color='#fff' fontSize={"2.5rem"}>MORAL PURPOSE</Typography>
                    </Box>
                    <Grid container spacing={2} direction="row" sx={{ alignItems: "stretch" }}>
                        <Grid size={{ xs: 12, sm: 6 }} sx={{
                            border: 1,
                            borderColor: "#ededed4a",
                            p: 7,
                            bgcolor: "#2f2a2a2d",
                            "&:hover": {
                                border: "none",
                                bgcolor: "#d31111ff",
                            }
                        }}>
                            <Typography variant='overline' sx={{ color: "#dbdbdbff" }}>01 Vision</Typography>
                            <Typography sx={{ mt: 2, color: "#fff", fontSize: "1.25rem" }}>
                                To be a leading brand in the ceramic industry by setting new benchmarks for quality and design. Charu Ceramic aspires to lead the market through the “Stylish Living," creating stylish and sophisticated living solutions that enhance the modern lifestyle while expanding its presence across South Asia and beyond.

                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }} sx={{
                            border: 1,
                            borderColor: "#ededed4a",
                            p: 7,
                            bgcolor: "#2f2a2a2d",
                            "&:hover": {
                                border: "none",
                                bgcolor: "#000000ff",
                            }

                        }}>
                            <Typography variant='overline' sx={{ color: "#dbdbdbff" }}>02 Mission</Typography>
                            <Typography sx={{ mt: 2, color: "#fff", fontSize: "1.15rem" }}>
                                To provide world-class sanitary ware and tiles by integrating cutting-edge technology with sustainable manufacturing practices. The company is committed to delivering exceptional value, durability, and unique designs to its customers, ensuring total satisfaction through a customer-centric approach and strategic international collaborations.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Box>
                <Box sx={{
                    display: 'block',
                    width: "100%",
                    aspectRatio: '16/6.7',
                    height: "auto",
                    objectFit: "cover"
                }} autoPlay loop muted playsInline
                    onCanPlay={(e) => e.currentTarget.muted = true}
                    loading="loading"
                    decoding="async"
                    component="video" src={urlAPI + primeVideo?.featured_image} />
            </Box>

            <Box sx={{ py: 20, backgroundImage: `url(${bgInfo})`, bgcolor: '#cccccc' }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, textAlign: 'left', mb: 10 }}>
                        Our Innovation
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid size={{ sm: 12, md: 4 }}>
                            <Stack direction={{ sm: "row", md: "column" }} spacing={2}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column", bgcolor: "#fff", p: 3, height: "250px"
                                }}>
                                    <Typography variant='h2' sx={{ color: "#e0e0e0ff" }}>01</Typography>
                                    <Box sx={{ mt: "auto" }}>
                                        <Typography sx={{ fontSize: "1.5rem", mb: 2, fontWeight: 600, textTransform: "capitalize" }}>Coating Technology</Typography>
                                        <Typography sx={{ fontSize: ".8rem" }}>
                                            Advanced coating technology produces a super smooth surface to reduce strain forming in the space between surfaces and prevents germ accumulation.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box component="img" src={imgCard1} loading="lazy"
                                    decoding="async" sx={{ height: "298px", objectFit: "cover" }} />
                            </Stack>
                        </Grid>


                        <Grid size={{ sm: 12, md: 4 }}>
                            <Stack direction={{ sm: "row", md: "column" }} spacing={2}>
                                <Box component="img" src={imgCard2} loading="lazy"
                                    decoding="async" sx={{ height: "298px", objectFit: "cover" }} />

                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column", bgcolor: "#fff", p: 3, height: "250px"
                                }}>
                                    <Typography variant='h2' sx={{ color: "#e0e0e0ff" }}>02</Typography>
                                    <Box sx={{ mt: "auto" }}>
                                        <Typography sx={{ fontSize: "1.5rem", mb: 2, fontWeight: 600, textTransform: "capitalize" }}>Green Innovation</Typography>
                                        <Typography sx={{ fontSize: ".8rem" }}>Green innovation in toilets means using eco-friendly technology to save water and protect the environment. Charu is committed to promoting sustainability in Bangladesh through innovation.
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Grid>



                        <Grid size={{ sm: 12, md: 4 }}>
                            <Stack direction={{ sm: "row", md: "column" }} spacing={2}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column", bgcolor: "#fff", p: 3, height: "250px"
                                }}>
                                    <Typography variant='h2' sx={{ color: "#e0e0e0ff" }}>03</Typography>
                                    <Box sx={{ mt: "auto" }}>
                                        <Typography sx={{ fontSize: "1.5rem", mb: 2, fontWeight: 600, textTransform: "capitalize" }}>Clean Comfort</Typography>
                                        <Typography sx={{ fontSize: ".8rem" }}>Easy Clean Technology helps make toilets easy to clean and maintain. Comfort Clean uses smooth surfaces, antibacterial coating, efficient flushing, and hidden trapways for better hygiene.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box component="img" src={imgCard3} loading="lazy"
                                    decoding="async" sx={{ height: "298px", objectFit: "cover" }} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>


            <CTA />
        </Box>
    );
};

export default CompanyInfo;