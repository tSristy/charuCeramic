import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment, Switch, Tooltip, Snackbar, Alert, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import UploadingLoader from "../../assets/Modal/UploadingLoader";

import SyncIcon from '@mui/icons-material/Sync';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextFormat from "../../assets/FormLabel/TextFormat";
import BtnOpenInTab from "../../assets/Button/BtnDownload";

const CreateGuide = () => {
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

    const [guideDetails, setGuideDetails] = useState({
        title: "",
        slug: "",
        content: "",
        featured_image: "",
         file_path: ""
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
        setLoading(true);
        e.preventDefault();
        if (ID) {
            handleUpdate();
            return;
        } else {
            const formData = new FormData();
            formData.append("title", guideDetails.title);
            formData.append("slug", guideDetails.slug.replace(/\s+/g, "-").toLowerCase());
            formData.append("content", guideDetails.content);
              if (guideDetails.file_path && guideDetails.file_path instanceof File) formData.append("file_path", guideDetails.file_path);
        if (guideDetails.featured_image && guideDetails.featured_image instanceof File) formData.append("featured_image", guideDetails.featured_image);


            ServerApi(`/guide/add`, "POST", null, formData, true)
                .then((res) => res.json())
                .then((res) => {
                    setOpenAlert(true);
                    setLoading(false);
                    setMsgText(res);

                    if (res.itemId) {
                        setGuideDetails({
                            title: "",
                            slug: "",
                            content: " ",
                            featured_image: "",
                             file_path: ""
                        });
                        setPreviewSrc('');
                    }
                })
                .catch((err) => console.error(err));
        }
    };

    const handleUpdate = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", guideDetails.title);
        formData.append("slug", guideDetails.slug.replace(/\s+/g, "-").toLowerCase());
        formData.append("content", guideDetails.content);
         if (guideDetails.file_path && guideDetails.file_path instanceof File) formData.append("file_path", guideDetails.file_path);
        if (guideDetails.featured_image && guideDetails.featured_image instanceof File) formData.append("featured_image", guideDetails.featured_image);


        ServerApi(`/guide/update/` + ID, "PUT", null, formData, true)
            .then((res) => res.json())
            .then((res) => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate(-1);
        } else {
            ServerApi(`/guide/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/guide/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setGuideDetails(res);
                });
        } else return;
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
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Buying Guide Management</Typography>
                    <Typography variant="overline" color="text.secondary">Upload the instruction for buying products.</Typography>
                </Box>


                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        {/* --------------------------Form Section------------------------- */}
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Buying Guide" : "Register New Buying Guide"}</Typography>
                                <IconButton>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />


                            {/* ----------------------------Form Inputs------------------------- */}
                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Buying Guide Title" icon={<CategoryIcon />} />
                                            <TextField required fullWidth size="small" value={guideDetails.title} onChange={(e) => setGuideDetails(p => ({ ...p, title: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Url Path" icon={<LanguageIcon />} />
                                            <TextField fullWidth size="small" value={guideDetails.slug} onChange={(e) => setGuideDetails(p => ({ ...p, slug: e.target.value }))} />
                                        </Grid>

                                       
                                        {/* Image Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Featured Image || 860*640" icon={<AttachFileIcon />} />
                                            <Stack direction="row">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    // Opens picker when clicking anywhere on the bar
                                                    onClick={() => imgTriggerClick.current.click()}
                                                    placeholder={guideDetails.featured_image?.name || (typeof guideDetails.featured_image === 'string' ? guideDetails.featured_image : "No file selected")}
                                                    readOnly
                                                    slotProps={{
                                                        input: {
                                                            endAdornment: guideDetails.featured_image ? (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevents re-opening the file dialog
                                                                            setGuideDetails(p => ({ ...p, featured_image: "" }));
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
                                                            setGuideDetails(p => ({ ...p, featured_image: file }));
                                                            handleImagePreview(file);
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => imgTriggerClick.current.click()}
                                                >
                                                    <PhotoCamera color={"disabled"} />
                                                </IconButton>
                                            </Stack>
                                        </Grid>

 <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Specification File" icon={<DescriptionIcon />} />

                                            <Tooltip title="Provide PDF that has size of under 3Mb ">
                                                <Button color={guideDetails.file_path ? "disable" : "error"}
                                                    component="label"
                                                    variant={
                                                        guideDetails.file_path ? "outlined" : "contained"
                                                    }

                                                    startIcon={<AttachFileIcon />}
                                                    sx={{ textTransform: 'none', width: "100%", py: 1 }}
                                                    endIcon={guideDetails.file_path ? <IconButton sx={{ p: 0, bgcolor: "#23232365" }}
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setGuideDetails(p => ({ ...p, file_path: "" }))
                                                        }}
                                                    >
                                                        <CloseIcon fontSize="small" sx={{ color: "white" }} />
                                                    </IconButton> : null}

                                                >
                                                    {guideDetails.file_path ? (guideDetails.file_path instanceof File ? guideDetails.file_path.name : guideDetails.file_path) : "Specification PDF"}
                                                    <input
                                                        type="file"
                                                        accept="application/pdf"
                                                        hidden
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                if (file.size > 4 * 1024 * 1024) {
                                                                    setOpenAlert(true);
                                                                    window.scrollTo({
                                                                        top: 100,
                                                                        left: 100,
                                                                        behavior: "smooth",
                                                                    });
                                                                    setMsgText({ error: "The file is too large. Max(3MB" });
                                                                    return;
                                                                }
                                                                setGuideDetails(p => ({ ...p, file_path: file }));
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </Grid>

                                        {/* EDITABLE TEXTFIELD*/}
                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextFormat
                                                onChange={(html) => setGuideDetails(p => ({ ...p, content: html }))}
                                                initialValue={guideDetails.content}
                                            />
                                        </Grid>

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


                    <Grid item size={{ sm: 12, md: 4 }}>
                        {/* --------------------------Info Section------------------------- */}
                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3, mb: 2 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>{" The form will hold upto one single image for your buying guide data."}</Typography>
                        </Box>
                        {/* --------------------------Image Preview------------------------- */}
                        <Box>
                            {previewSrc ? (
                                <Box component="img" src={previewSrc} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : guideDetails.featured_image ? (
                                <Box component="img" src={urlAPI + guideDetails.featured_image} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : (
                                <Box sx={{ mb: 3, width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                                    <Typography color="text.secondary">No image selected</Typography>
                                </Box>
                            )}
                        </Box>

                        {ID && guideDetails.file_path &&
                                                    <BtnOpenInTab fileUrl={guideDetails.file_path}><Box sx={{ mb: 3, py: 1, textAlign: 'center', borderRadius: 2, width: '100%', color: "#fff", bgcolor: "#333" }}>Buying_guide.pdf</Box> </BtnOpenInTab>
                                                }
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
};

export default CreateGuide;