import { Box, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';
import certificateImg from '../../img/certify.png';
import awardImg from '../../img/award.png';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const Certification = () => {
    return (
        <>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ED1C24",
                display: 'block',
                width: "100%",
                height: "350px",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Our Award Winning Journey & Certifications
                    </Typography>

                    <Box sx={{ mt: 10 }}>
                        <Grid container spacing={4} sx={{ justifyContent: "center"}}>
                            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box>
                                    <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                        <Box component="img" src={awardImg} sx={{
                                            width: "4rem",
                                            objectFit: "cover"

                                        }} />

                                        <Box >
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="overline">2007</Typography>
                                                <WorkspacePremiumIcon sx={{ fontSize: "1rem", color: "#ED1C24" }} />
                                            </Box>

                                            <Typography sx={{ fontSize: "1rem" }}>Certificate</Typography>

                                            <Typography sx={{ fontSize: ".9rem" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ py: 2 }} />
                                    <Box component="img" src={certificateImg} sx={{
                                        width: "100%",
                                        objectFit: "cover"

                                    }} />
                                </Box>
                            </Grid>


                             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box>
                                    <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                        <Box component="img" src={awardImg} sx={{
                                            width: "4rem",
                                            objectFit: "cover"

                                        }} />

                                        <Box >
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="overline">2007</Typography>
                                                <WorkspacePremiumIcon sx={{ fontSize: "1rem", color: "#ED1C24" }} />
                                            </Box>

                                            <Typography sx={{ fontSize: "1rem" }}>Certificate</Typography>

                                            <Typography sx={{ fontSize: ".9rem" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ py: 2 }} />
                                    <Box component="img" src={certificateImg} sx={{
                                        width: "100%",
                                        objectFit: "cover"

                                    }} />
                                </Box>
                            </Grid>


                             <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                <Box>
                                    <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                        <Box component="img" src={awardImg} sx={{
                                            width: "4rem",
                                            objectFit: "cover"

                                        }} />

                                        <Box >
                                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                                <Typography variant="overline">2007</Typography>
                                                <WorkspacePremiumIcon sx={{ fontSize: "1rem", color: "#ED1C24" }} />
                                            </Box>

                                            <Typography sx={{ fontSize: "1rem" }}>Certificate</Typography>

                                            <Typography sx={{ fontSize: ".9rem" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography>
                                        </Box>
                                    </Stack>
                                    <Divider sx={{ py: 2 }} />
                                    <Box component="img" src={certificateImg} sx={{
                                        width: "100%",
                                        objectFit: "cover"

                                    }} />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Certification;