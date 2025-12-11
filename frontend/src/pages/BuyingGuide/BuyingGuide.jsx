import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';
import AllPagePdf from "../../assets/pdf/AllPagePdf";
import { buyingGuideList } from "../../Data";
import { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';

const BuyingGuide = () => {
    const [openPdf, setOpenPdf] = useState({
        display: false,
        pdf: null,
    });
    return (
        <>
            <Container sx={{ py: 10 }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'flex-start' }}>
                    Buying Guides
                </Typography>
                <Grid container>
                    <Grid size={{ md: openPdf.display ? 4 : 12 }}>
                        <Stack direction={{ md: openPdf.display ? 'column' : 'row' }} spacing={4}>
                            {buyingGuideList.map(item => (
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={bgImg}
                                        title={item.title}
                                    />
                                    <CardContent>
                                        <Chip
                                            label="Buying Guide"
                                            size="small"
                                            sx={{
                                                mr: 2,
                                                bgcolor: "#ff0000",
                                                color: "white",
                                                fontWeight: 600,
                                            }}
                                        />
                                        <Typography gutterBottom variant="overline">
                                            {item.header}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                            {item.title}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={(e) => {
                                            setOpenPdf({
                                                display: true,
                                                pdf: item.pdf,
                                            })
                                        }}>Learn More</Button>
                                    </CardActions>
                                </Card>))}
                        </Stack>
                    </Grid>

                    {openPdf.display && <Grid size={{ sm: 12, md: 8 }}>
                        <Box>
                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                {/* <DownloadIcon /> */}
                                <IconButton onClick={(e) => {
                                    setOpenPdf({
                                        display: false,
                                        pdf: null,
                                    })
                                }}>
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                            <Divider py={1} />
                            <AllPagePdf pdf={openPdf.pdf} />
                        </Box>
                    </Grid>}
                </Grid>
            </Container>
        </>
    );
};

export default BuyingGuide;