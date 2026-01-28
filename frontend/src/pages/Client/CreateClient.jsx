import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, Tooltip, InputAdornment, Snackbar, Alert } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadingLoader from "../../assets/Modal/UploadingLoader";

const CreateClient = () => {
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const [client, setClient] = useState({
        title: "",
        featured_image: "",
        description: "",
    });

    const imgTriggerClick = useRef(null);
    const [previewSrc, setPreviewSrc] = useState("");

    const handleImagePreview = (file) => {
        if (typeof file === "string") {
            setPreviewSrc(file);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewSrc(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", client.title);
        formData.append("description", client.description);
        formData.append("featured_image", client.featured_image);

        const url = ID ? `/client/update/${ID}` : `/client/add`;
        const method = ID ? "PUT" : "POST";

        ServerApi(url, method, null, formData, true)
            .then(res => res.json())
            .then(res => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);

                if (method === "POST" && res.itemId) {
                    setClient({
                        title: "",
                        featured_image: "",
                        description: ""
                    });
                    setPreviewSrc("");
                    if (imgTriggerClick.current) imgTriggerClick.current.value = "";
                }
            })
            .catch(err => console.error(err));
            
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate('/client-list');
        } else {
            ServerApi(`/client/delete/${ID}`, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/client/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setClient(res);
                });
        }
    }, [ID]);

    return (
        <Box bgcolor={"#f8fafc"} py={5}>
            {loading && <UploadingLoader loading={true} />}
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {msgText && typeof msgText === "object" && Object.keys(msgText).length > 0 && (
                    <Alert
                        onClose={handleAlertClose}
                        severity={
                            Object.keys(msgText)[0] === "message"
                                ? "success"
                                : "error"
                        }
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {Object.values(msgText)[0]}
                    </Alert>
                )}
            </Snackbar>
            <Container>
                {/* ------------------------Title and Description------------------------ */}
                <Box mb={3}>
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Client Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Add, monitor, and manage your clients.</Typography>
                </Box>

                <Grid container spacing={2} mb={3}>
                    <Grid size={{ sm: 12, md: 8 }}>
                        {/* --------------------------Form Section------------------------- */}
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Client" : "Register New Client"}</Typography>
                                <IconButton onClick={(e) => window.location.reload()}>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />

                            {/* ----------------------------Form Inputs------------------------- */}
                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>

                                        {/* Title Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Title" icon={<TitleIcon />} />
                                            <TextField
                                                fullWidth
                                                size="small"
                                                value={client.title}
                                                onChange={(e) => setClient(p => ({ ...p, title: e.target.value }))}
                                                required
                                            />
                                        </Grid>

                                        {/* Featured Image Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Featured Image || 200 x 200" icon={<AttachFileIcon />} />
                                            <Stack direction="row">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    onClick={() => imgTriggerClick.current.click()}
                                                    placeholder={client.featured_image?.name || (typeof client.featured_image === 'string' ? client.featured_image : "No file selected")}
                                                    readOnly
                                                    slotProps={{
                                                        input: {
                                                            sx: { cursor: 'pointer' },
                                                            endAdornment: client.featured_image ? (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setClient(p => ({ ...p, featured_image: "" }));
                                                                            setPreviewSrc("");
                                                                            if (imgTriggerClick.current) imgTriggerClick.current.value = "";
                                                                        }}
                                                                    >
                                                                        <CloseIcon fontSize="small" />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            ) : null,
                                                        },
                                                    }}
                                                />
                                                <input
                                                    ref={imgTriggerClick}
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setClient(p => ({ ...p, featured_image: file }));
                                                            handleImagePreview(file);
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => imgTriggerClick.current.click()}
                                                >
                                                    <PhotoCamera />
                                                </IconButton>
                                            </Stack>
                                        </Grid>

                                        {/* Description */}
                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Description" icon={<DescriptionIcon />} />
                                            <TextField multiline minRows={2} maxRows={10} fullWidth size="small" value={client.description} onChange={(e) => setClient(p => ({ ...p, description: e.target.value }))} inputProps={{ maxLength: 160 }} />
                                        </Grid>

                                        {/* Buttons */}
                                        <Grid size={{ xs: 12 }}>
                                            <Stack direction="row" spacing={2} justifyContent="space-between">
                                                <BtnAdminSubmit onClick={handleDelete} text={ID ? "Delete" : "Go Back"} />
                                                <BtnAdminSubmit type={"submit"} text={ID ? "Update" : "Create"} />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        </Box>
                    </Grid>

                    <Grid size={{ sm: 12, md: 4 }}>
                        {/* --------------------------Info Section------------------------- */}
                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3, mb: 2 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Make sure all required fields are filled before submitting.</Typography>
                        </Box>

                        {/* --------------------------Image Preview------------------------- */}
                        <Box>
                            {previewSrc ? (
                                <Box component="img" src={previewSrc} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : client.featured_image ? (
                                <Box component="img" src={urlAPI + client.featured_image} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : (
                                <Box sx={{ mb: 3, width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                                    <Typography color="text.secondary">No image selected</Typography>
                                </Box>
                            )}
                        </Box>

                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default CreateClient;
