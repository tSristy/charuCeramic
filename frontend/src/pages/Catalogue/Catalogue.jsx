import { Box, Button, Container, Grid, Stack, Typography, Skeleton } from "@mui/material";
import bgImg from '../../img/bg1.jpg';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnOpenInTab from "../../assets/Button/BtnDownload";

const Catalogue = () => {
    const [catalogueList, setCatalogueList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });

    useEffect(() => {
        setLoading(true);
        const body = { pageNo: paginationDetails.pageNo };
        ServerApi(`/catalogue/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setCatalogueList(res.items || []);
                setPaginationDetails(prev => ({
                    ...prev,
                    totalRows: res.totalRows,
                    totalPages: Math.ceil(res.totalRows / 10)
                }));
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [paginationDetails.pageNo]);

    

    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* LCP OPTIMIZATION: High priority banner */}
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ED1C24",
                display: 'block',
                aspectRatio: '16/5',
                width: '100%',
                height: "auto",
                overflow: 'hidden',
                bgcolor: '#f0f0f0'
            }}>
                <Box 
                    component="img" 
                    src={bgImg} 
                    fetchPriority="high" 
                    loading="eager" 
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </Box>

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Catalogue Collections
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {loading ? (
                               <Skeleton variant="rectangular" width={210} height={60} />
                            ) : (
                                catalogueList.length !== 0 && catalogueList
                                    .filter(general => parseInt(general.summary) === 0)
                                    .map(item => (
                                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                            <BtnOpenInTab fileUrl={item.file_path}>
                                                <Box sx={{
                                                    bgcolor: "white", 
                                                    cursor: 'pointer',
                                                    '&:hover .hoverEffectImg': { borderBottom: 2, transition: "all 0.3s ease-in-out" }
                                                }}>
                                                    <Box className="hoverEffectImg"
                                                        component="img"
                                                        src={urlAPI + item.featured_image}
                                                        loading="lazy"
                                                        decoding="async"
                                                        sx={{
                                                            display: 'block',
                                                            width: "100%",
                                                            height: "470px",
                                                            objectFit: "cover",
                                                        }} />
                                                    <Box sx={{ p: 2 }}>
                                                        <Stack direction="column" justifyContent="center" alignItems="center">
                                                            <Typography sx={{ fontSize: '1.2rem', textAlign: "center", fontWeight: 600 }}>
                                                                {item.title.toUpperCase()}
                                                            </Typography>
                                                            <Button variant="text" sx={{
                                                                width: "200px", borderRadius: 0, fontSize: '1.1rem', color: '#0065caff', fontWeight: '600',
                                                            }}>
                                                                READ MORE
                                                                <Box component="span" sx={{ fontWeight: 400, bgcolor: "red", fontSize: '.6rem', ml: 1, px: 1, color: "#fff", display: 'inline-block', lineHeight: 'normal' }}>PDF</Box>
                                                            </Button>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </BtnOpenInTab>
                                        </Grid>
                                    ))
                            )}
                        </Grid>
                    </Box>
                </Container>
            </Box>

            <Box sx={{ py: 10, bgcolor: '#ffffff' }}>
                <Container>
                    <Typography sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Product Series
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {loading ? (
                                <Skeleton variant="rectangular" width={210} height={60} />
                            ) : (
                                catalogueList
                                    .filter(products => parseInt(products.summary) === 1)
                                    .map(item => (
                                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                                            <BtnOpenInTab fileUrl={item.file_path}>
                                                <Box sx={{
                                                    borderRadius: 2, bgcolor: '#fff', overflow: 'hidden', cursor: 'pointer',
                                                    '&:hover .seriesImg': { filter: "grayscale(0%)", transition: "all 0.3s ease-in-out" }
                                                }}>
                                                    <Box className="seriesImg"
                                                        component="img"
                                                        loading="lazy"
                                                        decoding="async"
                                                        src={urlAPI + item.featured_image}
                                                        sx={{
                                                            filter: "grayscale(100%)",
                                                            display: 'block',
                                                            width: "100%",
                                                            height: "350px",
                                                            objectFit: "cover",
                                                        }} />
                                                    <Box sx={{ p: 2 }}>
                                                        <Typography variant="h6" textAlign={'center'} sx={{ fontWeight: 500 }}>
                                                            {item.title}
                                                        </Typography>
                                                        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                                            <Button color='error' size="small">Read More</Button>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </BtnOpenInTab>
                                        </Grid>
                                    ))
                            )}
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Catalogue;