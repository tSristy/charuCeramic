import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ServerApi, urlAPI } from '../../route/ServerAPI';

const Contact = () => {
    const [subject, setSubject] = useState('');

    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };
    // const [bannerImg, setBannerImg] = useState(null);

    // useEffect(() => {
    //     ServerApi(`/banner?pageName=CONTACT&sectionValue=CT01`, "GET", null, null)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             console.log()
    //             setBannerImg(res[0]);
    //         });
    // }, [])

    return (
        <>
            {/* <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000",
                display: 'block',
                aspectRatio: '16/5',
                width: '100%',
                height: "auto",
                overflow: 'hidden',
                bgcolor: '#f0f0f0'
            }}>
                <Box
                    component="img"
                    src={bannerImg?.featured_image ? urlAPI + bannerImg.featured_image : "bgImg"}
                    fetchPriority="high"
                    loading="eager"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box> */}


            <Box sx={{ py: 10 }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box sx={{ m: 5 }}>
                                <Typography variant='overline' letterSpacing={4}>Let's Talk</Typography>
                                <Typography sx={{ fontSize: '2.5rem', fontWeight: 600 }}>
                                    Get Any Question?
                                </Typography>

                                <Stack direction="row" sx={{ my: 4, justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography sx={{ fontSize: '1rem' }}>Please reach us at</Typography>
                                        <Typography sx={{ fontWeight: 600 }}>info@charuceramic.com</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ textAlign: "right", fontWeight: 600 }}>Phone</Typography>
                                        <Typography sx={{ textAlign: "right", fontSize: '1rem' }}>+880 1700 706 600</Typography>
                                    </Box>
                                </Stack>

                                <Stack direction="row" sx={{ my: 4, justifyContent: 'space-between' }}>
                                    <Box>
                                        <Typography sx={{ fontWeight: 600 }}>Head Office</Typography>
                                        <Typography sx={{ fontSize: '1rem' }}>Navana Zohura Square
                                            28, Kazi Nazrul Islam Avenue
                                            Bangla Motor
                                            Dhaka 1205</Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{ textAlign: 'right', fontWeight: 600 }}>Factory</Typography>
                                        <Typography sx={{ textAlign: 'right', fontSize: '1rem' }}>Madhabpur, Habiganj, Sylhet, Bangladesh</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Box component="form" noValidate autoComplete="off" sx={{ m: 5 }}>
                                <Typography variant='uoverline' sx={{ mb: 2, color: "#ff0000" }}>Please provide your full name</Typography>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    sx={{ mt: 1 }}
                                />
                                <TextField
                                    label="Mobile"
                                    type="tel"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    sx={{ mt: 1 }}
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    sx={{ mt: 1 }}
                                />

                                <FormControl fullWidth color='error' size='small' sx={{ mt: 1 }}>
                                    <InputLabel>Subject</InputLabel>
                                    <Select
                                        value={subject}
                                        label="Subject"
                                        onChange={handleSubjectChange}
                                    >
                                        <MenuItem value="Product Inquiry">Product Inquiry</MenuItem>
                                        <MenuItem value="Technical Support">Technical Support</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField color="danger"
                                    label="Message"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                />

                                <Button variant="contained" sx={{ bgcolor: '#ff0000', textTransform: 'none', minWidth: '200px', py: 1, mt: 2, '&:hover': { bgcolor: '#e60000ff' } }}
                                >
                                    Send
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>


            <Box>
                <div style={{ height: '450px', overflow: 'hidden', width: '100%' }}>
                    <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6136.65707468825!2d90.39705862329069!3d23.745930515109507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89619b141f3%3A0x8a108b598fcefadb!2sNavana%20Zohura%20Square!5e0!3m2!1sen!2sbd!4v1753583129199!5m2!1sen!2sbd" width="100%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </Box>
        </>
    );
};

export default Contact;