import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment, Tooltip, Button, Snackbar, Alert, Switch } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import UploadingLoader from "../../assets/Modal/UploadingLoader";
import BtnOpenInTab from "../../assets/Button/BtnDownload";

const CreateCatalogue = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);


    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const [catalogue, setCatalogue] = useState({
        title: "",
        file_path: "",
        summary: "",
        content: "",
        featured_image: ""
    });

    const imgTrigger = useRef(null);
    const [previewImg, setPreviewImg] = useState("");

    const handleImagePreview = (file) => {
        if (typeof file === "string") {
            setPreviewImg(file);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewImg(url);
        return () => URL.revokeObjectURL(url);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (ID) {
            handleUpdate();
            return;
        }

        const formData = new FormData();
        formData.append("title", catalogue.title);
        formData.append("summary", catalogue.summary);
        formData.append("content", catalogue.content);
        if (catalogue.file_path && catalogue.file_path instanceof File) formData.append("file_path", catalogue.file_path);
        if (catalogue.featured_image && catalogue.featured_image instanceof File) formData.append("featured_image", catalogue.featured_image);

        ServerApi("/catalogue/add", "POST", null, formData, true)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                setOpenAlert(true);
                setMsgText(res);

                if (res.itemId) {
                    setCatalogue({
                        title: "",
                        file_path: "",
                        summary: 0,
                        content: "",
                        featured_image: ""
                    });
                    setPreviewImg("");
                }
            })
            .catch(err => console.error(err));
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("title", catalogue.title);
        formData.append("summary", catalogue.summary);
        formData.append("content", catalogue.content);
        if (catalogue.file_path && catalogue.file_path instanceof File) formData.append("file_path", catalogue.file_path);
        if (catalogue.featured_image && catalogue.featured_image instanceof File) formData.append("featured_image", catalogue.featured_image);

        ServerApi(`/catalogue/update/${ID}`, "PUT", null, formData, true)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                setOpenAlert(true);
                setMsgText(res);
            })
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate('/catalogue-list');
        } else {
            ServerApi(`/catalogue/delete/${ID}`, "DELETE", null, null)
                .then(res => res.json())
                .then(res => console.log("delete catalogue:", res))
                .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        if (!ID) return;
        ServerApi(`/catalogue/${ID}`, "GET", null, null)
            .then(res => res.json())
            .then(res => {
                setCatalogue({
                    title: res.title || "",
                    file_path: res.file_path || "",
                    summary: res.summary || 0,
                    content: res.content || "",
                    featured_image: res.featured_image || ""
                });
                if (res.featured_image) setPreviewImg(urlAPI + res.featured_image);
            })
            .catch(err => console.error(err));
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
                <Box mb={3}>
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Catalogue Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Upload and manage catalogue PDFs.</Typography>
                </Box>

                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Catalogue" : "Register New Catalogue"}</Typography>
                                <IconButton><SyncIcon color="disabled" /></IconButton>
                            </Stack>
                            <Divider />
                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Title" icon={<DescriptionIcon />} />
                                            <TextField required fullWidth size="small" value={catalogue.title} onChange={(e) => setCatalogue(p => ({ ...p, title: e.target.value }))} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Specification File" icon={<DescriptionIcon />} />

                                            <Tooltip title="Provide PDF that has size of under 20Mb ">
                                                <Button color={catalogue.file_path ? "disable" : "error"}
                                                    component="label"
                                                    variant={
                                                        catalogue.file_path ? "outlined" : "contained"
                                                    }

                                                    startIcon={<AttachFileIcon />}
                                                    sx={{ textTransform: 'none', width: "100%", py: 1 }}
                                                    endIcon={catalogue.file_path ? <IconButton sx={{ p: 0, bgcolor: "#23232365" }}
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setCatalogue(p => ({ ...p, file_path: "" }))
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" sx={{ color: "white" }} />
                                                    </IconButton> : null}

                                                >
                                                    {catalogue.file_path ? (catalogue.file_path instanceof File ? catalogue.file_path.name : catalogue.file_path) : "Specification PDF"}
                                                    <input
                                                        type="file"
                                                        accept="application/pdf"
                                                        hidden
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                if (file.size > 21 * 1024 * 1024) {
                                                                    setOpenAlert(true);
                                                                    window.scrollTo({
                                                                        top: 100,
                                                                        left: 100,
                                                                        behavior: "smooth",
                                                                    });
                                                                    setMsgText({ error: "The file is too large. Max(20MB" });
                                                                    return;
                                                                }
                                                                setCatalogue(p => ({ ...p, file_path: file }));
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Featured Image || 370 × 520" icon={<AttachFileIcon />} />
                                            <Stack direction="row">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder={catalogue.featured_image?.name || (typeof catalogue.featured_image === 'string' ? catalogue.featured_image : "No file selected")}
                                                    readOnly
                                                    onClick={() => imgTrigger.current.click()}
                                                    slotProps={{
                                                        input: {
                                                            endAdornment: catalogue.featured_image ? (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setCatalogue(p => ({ ...p, featured_image: "" }));
                                                                            setPreviewImg("");
                                                                            if (imgTrigger.current) imgTrigger.current.value = "";
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
                                                    ref={imgTrigger}
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) {
                                                            setCatalogue(p => ({ ...p, featured_image: file }));
                                                            handleImagePreview(file);
                                                        }
                                                    }}
                                                />
                                                <IconButton onClick={() => imgTrigger.current.click()}><PhotoCamera color={"inherit"} /></IconButton>
                                            </Stack>
                                        </Grid>

                                        <Grid size={{ xs: 12 }} item>                                            
                                            <Tooltip title="If enabled, the Catalogue will be displayed on the product series.">
                                                <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end" }}>
                                                    <Stack direction="row" alignItems={"center"} spacing={1}>
                                                        <Switch
                                                            checked={parseInt(catalogue.summary) === 1}
                                                            onChange={(e) => setCatalogue(p => ({ ...p, summary: e.target.checked ? 1 : 0 }))}
                                                            slotProps={{ input: { 'aria-label': 'controlled' } }}
                                                        />
                                                        <FormLabel text="Add to Product Series || Without turning it on it will be add in general cataogue." />
                                                    </Stack>
                                                </Box>
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextField required multiline minRows={3} maxRows={10} fullWidth size="small" value={catalogue.content} onChange={(e) => setCatalogue(p => ({ ...p, content: e.target.value }))} />
                                        </Grid>


                                        <Grid size={{ xs: 12 }} item>
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

                    <Grid item size={{ sm: 12, md: 4 }}>
                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3, mb: 2 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }}>Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Upload a PDF file for the catalogue and an optional featured image.</Typography>
                        </Box>


                        <Box>
                            {previewImg ? (
                                <Box component="img" src={previewImg} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : catalogue.featured_image ? (
                                <Box component="img" src={urlAPI + catalogue.featured_image} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : (
                                <Box sx={{ mb: 3, width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                                    <Typography color="text.secondary">No image selected</Typography>
                                </Box>
                            )}
                        </Box>

                        {ID && catalogue.file_path &&
                            <BtnOpenInTab fileUrl={catalogue.file_path}><Box sx={{ mb: 3, py: 1, textAlign: 'center', borderRadius: 2, width: '100%', color: "#fff", bgcolor: "#333" }}>{catalogue.title}.pdf</Box> </BtnOpenInTab>
                        }

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CreateCatalogue;
