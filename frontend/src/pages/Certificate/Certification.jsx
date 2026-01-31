import { Box, Container, Grid, Typography } from "@mui/material";
import { urlAPI } from "../../route/ServerAPI";

const Certification = () => {
    return (
        <Box>
            <Container sx={{ py: 10, textAlign: 'justify' }}>
                <Box px={{ sm: 5, md: 10 }}>
                    <Typography sx={{ fontSize: { xs: '2.5rem', sm: '3rem' }, fontWeight: 600, color: '#6c6c6c', textAlign: 'center' }}>Awards & Certifications</Typography>

                    <Box component='img' src={`${urlAPI}/images/certification.png`} sx={{
                        width: '100%', height: 'auto', my: 5
                    }} />




                    <Grid container>
                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ mb: 5, fontSize: '2rem', color: '#6c6c6c', fontWeight: 600, textAlign: 'left' }}>
                                GO GREEN CERTIFICATION
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                            <Box component='img' src={`${urlAPI}/images/goGreenLogo.png`} sx={{
                                width: '100%', height: 'auto'
                            }} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 9 }}>
                            <Box px={4}>
                                <Typography sx={{ mb: 3, fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545', whiteSpace: 'pre-line' }}>{`Product Tested Report Cerficiation from BUET Total Number of Products: 12 nos

                                Product Lines: Sella, MICC, PRIZ, CM18, CM15 CM750, Urinal C311, CM711, CM10 Water Tank`}</Typography>
                                <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545', whiteSpace: 'pre-line' }}>{`FOR THE WORLD 
                                Through Green Processes COTTO integrates eco-conscious practices in every step from design to disposal. We welcome insights from business partners and experts to ensure the well-being of people while minimizing environmental impact.As a product manufacturer, we are part of the solution for environmentally friendly building designs.`}</Typography>
                            </Box>
                        </Grid>


                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ fontSize: '2rem', color: '#6c6c6c', fontWeight: 600, textAlign: 'left', my: 5 }}>
                                LEED CERTIFICATION
                            </Typography>
                            <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>{`
Our innovative products for sustainable architecture under LEED
LEED is a popular and worldwide-used rating system for evaluating the environmentallyfriendliness of buildings or constructions. Developed by the U.S. Green Building Council
(USGBC), LEED is intended to increase efficiency usage of construction resources,
ike energy, water, and building materials, which are considered important to every step
of a building's life cycle (site selection, design, construction, operations, maintenance,
and deconstruction).`}</Typography>
                        </Grid>


                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ my: 5, fontSize: '2rem', color: '#6c6c6c', fontWeight: 600, textAlign: 'left' }}>
                                ISO 9001:2015 CERTIFICATION
                            </Typography>
                        </Grid>



                        <Grid size={{ xs: 12, sm: 3 }}>
                            <Box component='img' src={`${urlAPI}/images/oPro.png`} sx={{
                                width: '100%', height: 'auto',
                            }} />
                        </Grid>


                        <Grid size={{ xs: 12, sm: 9 }}>
                            <Box px={4}>
                                <Typography sx={{ mb: 3, fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>{`International Organization for Standardization (ISO) ISO 9001:2015 - Quality Management System for the Research & Development, Manufacturing, Marketing & Distribution, Export & Import of Sanitaryware`}</Typography>

                                <Grid container spacing={2} width={{ xs: '100%', sm: '80%', lg: '50%' }}>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>Cerification Number</Typography>
                                        <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>Date of Certification</Typography>
                                        <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>Date of Expiry</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 6 }}>
                                        <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>: 3050250729103Q</Typography>
                                        <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>: 29 July 2025</Typography>
                                        <Typography sx={{ fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>: 28 July 2028</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>



                        <Grid size={{ xs: 12 }}>
                            <Typography sx={{ my: 5, fontSize: '2rem', color: '#6c6c6c', fontWeight: 600, textAlign: 'left' }}>
                                CHARU ENLISTED
                            </Typography>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Box component='img' src={`${urlAPI}/images/enList.png`} sx={{
                                width: '100%', height: 'auto',
                            }} />

                            <Typography sx={{ fontSize: '.925rem', fontWeight: 500, color: '#454545', textAlign: 'center' }}>{`Public Works Deperment (PWD) |
Military Engineers Services (MES) |
Department of Public Health Engineering (DPHE) |
Boarder Gueard Bangladesh (BGB) |
Bangladesh Police`}</Typography>
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

export default Certification;