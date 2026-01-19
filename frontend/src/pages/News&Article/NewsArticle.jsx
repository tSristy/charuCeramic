import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import { useNavigate } from "react-router-dom";

const NewsArticle = () => {
    const navigate = useNavigate();
    const [blogList, setBlogList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });

    useEffect(() => {
        const body = {
            pageNo: paginationDetails.pageNo,
        };
        ServerApi(`/blog/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setBlogList(prev=>{
                    const map = new Map();
                     [...prev, ...res.items].forEach(item => map.set(item.id, item));
                    return Array.from(map.values());
                });
                setPaginationDetails(previousState => {
                    return {
                        ...previousState,
                        totalRows: res.totalRows,
                        totalPages: Math.ceil(res.totalRows / 10)
                    }
                });
            })
    }, [paginationDetails.pageNo]);

    return (
        <>
            <Container sx={{ py: 10 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'flex-start' }}>
                    Read About Charu
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ sm: 12, md: 8 }}>
                        <Card onClick={(e) => navigate(`/news-article/${blogList[0]?.slug}`)}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                borderRadius: 3,
                                overflow: "hidden",
                                boxShadow: 2,
                                '&:hover': {
                                    cursor: 'pointer'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    flex: { md: 3 },
                                    minHeight: { xs: 220, md: 320 },
                                }}
                            >
                                <CardMedia
                                    component="img" loading="eager" fetchPriority="high"
                                    image={urlAPI + blogList[0]?.featured_image}
                                    alt="news"
                                    sx={{
                                        width: "100%",
                                        aspectRatio: '4/3',
                                        height: "100%",
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
                                    {blogList[0]?.title}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontSize: ".9rem",
                                        mb: 2,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div
                                        className="blog-post-content"
                                        dangerouslySetInnerHTML={{ __html: blogList[0]?.content.slice(0, 400) }}
                                    />
                                </Typography>

                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: "auto",
                                    }}
                                >
                                    {blogList[0]?.published_at?.split(' ')[0]}
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
                                {blogList?.filter((_, index) => index > 0 && index < 4)
                                    .map((item, index) => (
                                        <Box sx={{
                                            px: 2, pt: 2, '&:hover': {
                                                cursor: 'pointer'
                                            }
                                        }} key={index} onClick={(e) => navigate(`/news-article/${item.slug}`)}>
                                            <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                                                {item.title}
                                            </Typography>

                                            <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                                <div
                                                    className="blog-post-content"
                                                    dangerouslySetInnerHTML={{ __html: item.content.slice(0, 100) }}
                                                />
                                            </Typography>
                                            <Divider py={1} />
                                        </Box>
                                    ))
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>



            <Container sx={{ pb: 10 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'flex-start' }}>
                    Media
                </Typography>
                <Grid container spacing={4}>
                    {
                        blogList?.filter((_, index) => index > 3)
                            .map((item, index) => (
                                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }} onClick={(e) => navigate(`/news-article/${item.slug}`)} sx={{
                                    '&:hover': {
                                        cursor: 'pointer'
                                    }
                                }}>
                                    <Box>
                                        <Box component="img" src={urlAPI + item.featured_image} loading="lazy" decoding="async"
                                            alt={item.title} sx={{
                                                borderRadius: 2,
                                                width: '100%', height: 'auto',
                                                aspectRatio: '16/9', objectFit: 'cover'
                                            }} />
                                        <Typography sx={{ fontSize: '1rem', fontWeight: 600, textAlign: 'left', my: 2 }}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))
                    }
                </Grid>

                <Stack py={4} alignItems="center">
                    {paginationDetails.totalPages > paginationDetails.pageNo ? (
                        <Button variant='outlined' color='error' onClick={() => {
                            setPaginationDetails(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
                        }}>
                            Load More
                        </Button>
                    ) : (
                        blogList.length > 0 && <Typography variant='overline' color='textDisabled'>End of results</Typography>
                    )}
                </Stack>
            </Container>
        </>
    );
};

export default NewsArticle;