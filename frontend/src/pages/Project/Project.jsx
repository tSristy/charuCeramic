import { Box, Button, Chip, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';

const Project = () => {
    return (
        <>
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
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Mega Projects
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, sm: 8 }}>
                                <Box sx={{
                                    boxShadow: 1, borderRadius: 2, bgcolor: "white", '&:hover .hoverEffect': {
                                        filter: "grayscale(0%)",
                                        transition: "all 0.3s ease-in-out"
                                    }
                                }}>
                                    <Box className="hoverEffect"
                                        component="img"
                                        src={bgImg}
                                        sx={{
                                            filter: "grayscale(100%)",
                                            display: 'block',
                                            width: "100%",
                                            height: "470px",
                                            objectFit: "cover",
                                        }} />
                                    <Box sx={{ p: 2 }}>
                                        <Stack direction="row" spacing={2} justifyContent="flex-start" >
                                            <Chip
                                                label="Project"
                                                size="small"
                                                sx={{
                                                    bgcolor: "#ff0000ff",
                                                    color: "white",
                                                    fontWeight: 600,
                                                }}
                                            />
                                            <Typography variant="overline">
                                                SOME Projects
                                            </Typography>
                                        </Stack>
                                        <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem earum sit dicta magni laudantium
                                        </Typography>
                                        <Box sx={{ justifyContent: 'flex-end', display: 'flex' }}>
                                            <Button variant="none" sx={{ p: 0, m: 0, fontSize: '.7rem', color: '#1976d2' }}>
                                                View Details
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid size={{ sx: 12, sm: 4 }}>
                                <Box sx={{ boxShadow: 1, p: 4, borderRadius: 2 }}>
                                    <Typography variant="overline">
                                        Latest Projects
                                    </Typography>

                                    <Divider py={1} />
                                    <Box py={2}>
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            Mega Project
                                        </Typography>

                                        <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem earum sit dicta magni laudantium
                                        </Typography>
                                    </Box>
                                    <Divider py={1} />
                                    <Box py={2}>
                                        <Typography sx={{ fontSize: '1rem' }}>
                                            Mega Project
                                        </Typography>

                                        <Typography sx={{ fontSize: '.8rem', color: 'text.secondary' }} noWrap>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem earum sit dicta magni laudantium
                                        </Typography>
                                    </Box>

                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Project;