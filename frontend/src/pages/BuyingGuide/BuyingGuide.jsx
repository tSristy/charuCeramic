import { Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

import AllPagePdf from "../../assets/pdf/AllPagePdf";
import bgImg from '../../img/bgDealer.jpg';
import { ServerApi, urlAPI } from "../../route/ServerAPI";

const BuyingGuide = () => {

    const navigate = useNavigate();
    const [guidelist, setGuideList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });

    useEffect(() => {
        const body = {
            pageNo: paginationDetails.pageNo,
        };
        ServerApi(`/guide/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setGuideList(prev => {
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
                    Buying Guides
                </Typography>
                <Grid container spacing={4} sx={{ alignItems: "stretch" }}>
                    {guidelist.map((item) => (
                        <Grid
                            key={item.id}
                            size={{ xs: 12, md: 6, lg: 4 }}
                            sx={{
                                display: "flex", // 1. Make the Grid item a flex container
                                '&:hover': { cursor: 'pointer' }
                            }}
                            onClick={() => navigate(item.slug)}
                        >
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    height: "100%"
                                }}
                            >
                                <CardMedia loading="lazy" decoding="async"
                                    sx={{ height: 140 }}
                                    image={urlAPI + item.featured_image}
                                    title={item.title}
                                />

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Chip label="Buying Guide" size="small" sx={{ bgcolor: "#ff0000", color: "white" }} />
                                    <Typography variant="overline" display="block">
                                        {item.created_at.split("T")[0]}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        {item.title}
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                <Stack py={4} alignItems="center">
                    {paginationDetails.totalPages > paginationDetails.pageNo ? (
                        <Button variant='outlined' color='error' onClick={() => {
                            setPaginationDetails(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
                        }}>
                            Load More
                        </Button>
                    ) : (
                        guidelist.length > 0 && <Typography variant='overline' color='textDisabled'>End of results</Typography>
                    )}
                </Stack>
            </Container>
        </>
    );
};

export default BuyingGuide;