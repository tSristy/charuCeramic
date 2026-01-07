import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, TextField, Typography, IconButton, Snackbar, Alert } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import { ServerApi } from "../../route/ServerAPI";

const Career = () => {

    const [careerDetails, setCareerDetails] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        cover_letter: "",
        file_path: "",
    });

    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({ error: "" });

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false);
        setMsgText({});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", careerDetails.name);
        formData.append("email", careerDetails.email);
        formData.append("phone", careerDetails.phone);
        formData.append("address", careerDetails.address);
        formData.append("cover_letter", careerDetails.cover_letter);
        if (careerDetails.file_path && careerDetails.file_path instanceof File) formData.append("file_path", careerDetails.file_path);

        ServerApi(`/career/add`, "POST", null, formData, true)
            .then((res) => res.json())
            .then(res => {
                console.log(res)
                if (res.status) {
                    setOpenAlert(true);
                    setMsgText(res);
                    setCareerDetails({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                        cover_letter: "",
                        file_path: "",
                    })
                }
            })
    }

    return (
        <>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleAlertClose}
                    severity={
                        "success"
                    }
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {msgText.message}
                </Alert>
            </Snackbar>


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
                        Join Us & Grow Fast
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4} px={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField required
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    value={careerDetails.name}
                                    onChange={(e) => setCareerDetails(p => ({ ...p, name: e.target.value }))}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    value={careerDetails.email}
                                    onChange={(e) => setCareerDetails(p => ({ ...p, email: e.target.value }))}
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <TextField required
                                    label="Address"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    value={careerDetails.address}
                                    onChange={(e) => setCareerDetails(p => ({ ...p, address: e.target.value }))}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField required
                                    label="Mobile Number"
                                    variant="outlined"
                                    fullWidth size="small" color="danger"
                                    value={careerDetails.phone}
                                    onChange={(e) => setCareerDetails(p => ({ ...p, phone: e.target.value }))}
                                />


                                <Box py={4}>
                                    <Button color={careerDetails.file_path ? "disable" : "error"}
                                        component="label"
                                        variant={
                                            careerDetails.file_path ? "outlined" : "contained"
                                        }

                                        startIcon={<AttachFileIcon />}
                                        sx={{ textTransform: 'none', width: "100%", py: 1 }}
                                        endIcon={careerDetails.file_path ? <IconButton sx={{ p: 0, bgcolor: "#23232365" }}
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                setCareerDetails(p => ({ ...p, file_path: "" }))
                                            }}
                                        >
                                            <CloseIcon fontSize="small" sx={{ color: "white" }} />
                                        </IconButton> : null}

                                    >
                                        {careerDetails.file_path ? (careerDetails.file_path instanceof File ? careerDetails.file_path.name : careerDetails.file_path) : "Upload Resume"}
                                        <input
                                            type="file"
                                            accept="application/pdf"
                                            hidden
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    if (file.size > 3 * 1024 * 1024) {
                                                        setOpenAlert(true);
                                                        window.scrollTo({
                                                            top: 100,
                                                            left: 100,
                                                            behavior: "smooth",
                                                        });
                                                        setMsgText({ error: "The file is too large. Max (3MB)." });
                                                        return;
                                                    }
                                                    setCareerDetails(p => ({ ...p, file_path: file }));
                                                }
                                            }}
                                        />
                                    </Button>
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField color="danger"
                                    label="Cover Letter"
                                    placeholder='Remember to write within 200 words. Even if you do it will be chipped'
                                    multiline
                                    minRows={4}
                                    maxRows={10}
                                    variant="outlined"
                                    fullWidth
                                    value={careerDetails.cover_letter}
                                    onChange={(e) => setCareerDetails(p => ({ ...p, cover_letter: e.target.value }))}
                                />
                            </Grid>


                            <Grid size={{ xs: 12 }} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <BtnAdminSubmit type={"submit"} text='submit'></BtnAdminSubmit>
                            </Grid>

                        </Grid>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Career;