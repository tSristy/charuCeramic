import { Box, Button, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';
import StarIcon from '@mui/icons-material/Star';
import { catalogueList, seriesList } from "../../Data";

const Catalogue = () => {
    return (
        <Box sx={{ bgcolor: "#fff" }}>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000ff",
                display: 'block',
                width: "100%",
                height: "350px",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 10, textAlign: 'center' }}>
                        Catalogue Collections
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {
                                catalogueList.map(item => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Box sx={{
                                            boxShadow: 1, borderRadius: 2, bgcolor: "white", '&:hover .hoverEffect': {
                                                filter: "grayscale(0%)",
                                                transition: "all 0.3s ease-in-out"
                                            }
                                        }}>
                                            <Box className="hoverEffect"
                                                component="img"
                                                src={item.imgSrc}
                                                sx={{
                                                    filter: "grayscale(100%)",
                                                    display: 'block',
                                                    width: "100%",
                                                    height: "470px",
                                                    objectFit: "cover",
                                                }} />
                                            <Box sx={{ p: 2 }}>
                                                <Stack direction="row" justifyContent="space-between" >
                                                    <Typography sx={{ fontSize: '1rem' }}>
                                                        {item.title}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '.8rem' }}><StarIcon sx={{ color: "#ff9500ff", fontSize: '.8rem' }} />{item.score}</Typography>

                                                </Stack>
                                                <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                                    {item.details}
                                                </Typography>
                                                <Divider sx={{ my: 1 }} />
                                                <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                                                    <Button variant="none" sx={{ p: 0, m: 0, fontSize: '.7rem', color: '#1976d2' }}>
                                                        Download
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Container>
            </Box>


            <Box sx={{ py:10}}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 10, textAlign: 'center' }}>
                        Product Series
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {
                                seriesList.map(item => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                        <Box sx={{ borderRadius: 2, '&:hover .hoverEffect': {
                                                filter: "grayscale(0%)",
                                                transition: "all 0.3s ease-in-out"
                                            }
                                        }}>
                                            <Box className="hoverEffect"
                                                component="img"
                                                src={item.imgSrc}
                                                sx={{
                                                    filter: "grayscale(100%)",
                                                    display: 'block',
                                                    width: "100%",
                                                    height: "350px",
                                                    objectFit: "cover",
                                                }} />
                                            <Box sx={{ p: 2 }}>
                                                
                                                <Typography variant="h6" textAlign={'center'}>
                                                    {item.title}
                                                </Typography>
                                                <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                                    <Button color='error'>
                                                        Read More
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Catalogue;