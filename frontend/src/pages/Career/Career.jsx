import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';

const Career = () => {
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
                        Join Us & Grow Fast
                    </Typography>

                    <Grid container spacing={4} justifyContent={"center"}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <TextField
                                label="Full Name"
                                variant="outlined"
                                fullWidth size="small" color="danger" />
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth size="small" color="danger" />
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <TextField
                                label="Address"
                                variant="outlined"
                                fullWidth size="small" color="danger" />
                        </Grid>

                        <Grid size={{ xs: 12, md: 5 }}>
                            <TextField
                                label="Number"
                                variant="outlined"
                                fullWidth size="small" color="danger" />
                        </Grid>

                        <Grid size={{ xs: 12, md: 10 }}>
                            <TextField color="danger"
                                label="Cover Letter"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        {/* <Grid size={{ xs: 12, md: 5 }}>
                            <Button variant="contained" component="label" sx={{ bgcolor: '#ff0000ff', textTransform: 'none', minWidth: '200px', py: 1, mt: 2, '&:hover': { bgcolor: '#e60000ff' } }}
                                >
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    accept=".pdf, .doc, .docx"
                                    onChange={(e) => console.log(e.target.files[0])}
                                />
                            </Button>
                        </Grid> */}

                        <Grid size={{ xs: 12, md: 10 }}>
                             <Typography variant='uoverline' sx={{ mb: 2, color: "#ff0000ff" }}>There are no job postings at this time. Please check back later.</Typography>
                                                        
                        </Grid>

                    </Grid>

                </Container>
            </Box>
        </>
    );
};

export default Career;