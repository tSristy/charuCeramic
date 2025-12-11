import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';

const NewsArticle = () => {
    return (
        <>
            <Container sx={{ py: 10 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'flex-start' }}>
                    Read About Charu
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ sm: 12, md: 8 }}>
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    flex: { md: 3 },
                                    minHeight: { xs: 220, md: 320 },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={bgImg}
                                    alt="news"
                                    sx={{
                                        height: "100%",
                                        width: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>

                            <CardContent
                                sx={{
                                    flex: { md: 2 },
                                    p: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    bgcolor: "white",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                    sx={{ mb: 1 }}
                                >
                                    <Chip
                                        label="News"
                                        size="small"
                                        sx={{
                                            bgcolor: "#ff0000",
                                            color: "white",
                                            fontWeight: 600,
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            textTransform: "uppercase",
                                            letterSpacing: 1.2,
                                        }}
                                    >
                                        Lastest New
                                    </Typography>
                                </Stack>

                                <Typography
                                    sx={{
                                        fontSize: { xs: "1rem", md: "1.2rem" },
                                        fontWeight: 600,
                                        mb: 1,
                                        lineHeight: 1.3,
                                    }}
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: ".9rem",
                                        mb: 2,
                                    }}
                                >
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur facilis est praesentium alias molestias voluptatibus magni et obcaecati iste rem laboriosam voluptatem quaerat ab, aperiam voluptate ex ut eveniet totam!
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: "auto",
                                    }}
                                >
                                    24 Nov, 2025
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid size={{ sx: 12, sm: 4 }}>
                        <Card sx={{ bgcolor: "white" }}>
                            <CardContent >

                                <Typography variant="overline">
                                    Latest Updates
                                </Typography>

                                <Divider py={1} />
                                <Box px={2} pt={2}>
                                    <Typography sx={{ fontSize: '1rem' }}>
                                        Article
                                    </Typography>

                                    <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem earum sit dicta magni laudantium
                                    </Typography>
                                </Box>
                            </CardContent>
                            <Divider py={1} />

                            <CardContent>
                                <Box px={2}>
                                    <Typography sx={{ fontSize: '1rem' }}>
                                        News
                                    </Typography>

                                    <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem earum sit dicta magni laudantium
                                    </Typography>
                                </Box>
                            </CardContent>

                            <Divider py={1} />
                            <CardContent>
                                <Box px={2}>
                                    <Typography sx={{ fontSize: '1rem' }}>
                                        News
                                    </Typography>

                                    <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem earum sit dicta magni laudantium
                                    </Typography>
                                </Box>
                            </CardContent>


                        </Card>
                    </Grid>
                </Grid>
            </Container>



            <Container sx={{ py: 10 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'flex-start' }}>
                    Media
                </Typography>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box>
                            <Box component="img" src={bgImg} alt="Blog Image" sx={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <Typography sx={{ fontSize: '1rem', fontWeight: 600, textAlign: 'left', my: 2 }}>
                                The Evolution of Sanitaryware: A Look into Charu Ceramic's Journey
                            </Typography>
                            {/* <Typography sx={{ fontSize: '.9rem', textAlign: 'left' }}>
                                    Explore the transformative journey of Charu Ceramic in the sanitaryware industry, highlighting key milestones.
                                </Typography> */}
                        </Box>
                    </Grid><Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box>
                            <Box component="img" src={bgImg} alt="Blog Image" sx={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <Typography sx={{ fontSize: '1rem', fontWeight: 600, textAlign: 'left', my: 2 }}>
                                The Evolution of Sanitaryware: A Look into Charu Ceramic's Journey
                            </Typography>
                            {/* <Typography sx={{ fontSize: '.9rem', textAlign: 'left' }}>
                                    Explore the transformative journey of Charu Ceramic in the sanitaryware industry, highlighting key milestones.
                                </Typography> */}
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Box>
                            <Box component="img" src={bgImg} alt="Blog Image" sx={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                            <Typography sx={{ fontSize: '1rem', fontWeight: 600, textAlign: 'left', my: 2 }}>
                                The Evolution of Sanitaryware: A Look into Charu Ceramic's Journey
                            </Typography>
                            {/* <Typography sx={{ fontSize: '.9rem', textAlign: 'left' }}>
                                    Explore the transformative journey of Charu Ceramic in the sanitaryware industry, highlighting key milestones.
                                </Typography> */}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default NewsArticle;