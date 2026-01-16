import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment, Snackbar, Alert, Tooltip } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import UploadingLoader from "../../assets/Modal/UploadingLoader";


const CreateProject = () => {
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
    const [projectDetails, setProjectDetails] = useState({
        title: "",
        slug: "",
        location: "",
        content: "",
        publish_date: "",
        featured_image: ""
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
        setLoading(true);
        if (ID) {
            handleUpdate();
            return;
        }

        const formData = new FormData();
        formData.append("title", projectDetails.title);
        formData.append("slug", projectDetails.slug);
        formData.append("location", projectDetails.location);
        formData.append("publish_date", projectDetails.publish_date);
        formData.append("content", projectDetails.content);
        if (projectDetails.featured_image && projectDetails.featured_image instanceof File) {
            formData.append("featured_image", projectDetails.featured_image);
        }

        ServerApi("/project/add", "POST", null, formData, true)

            .then((res) => res.json())
            .then((res) => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);

                if (res.itemId) {
                    setProjectDetails({
                        title: "",
                        slug: "",
                        location: "",
                        content: "",
                        publish_date: "",
                        featured_image: ""
                    });
                    setPreviewSrc('');
                }
            })
            .catch((err) => console.error(err));
    };

    const handleUpdate = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", projectDetails.title);
        formData.append("slug", projectDetails.slug);
        formData.append("location", projectDetails.location);
        formData.append("publish_date", projectDetails.publish_date);
        formData.append("content", projectDetails.content);
        if (projectDetails.featured_image && projectDetails.featured_image instanceof File) {
            formData.append("featured_image", projectDetails.featured_image);
        }

        ServerApi(`/project/update/` + ID, 'Put', null, formData, true)
            .then((res) => res.json())
            .then((res) => 
                {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate('/project-list');
        }
        else {
            ServerApi(`/project/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete project:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (!ID) return;
        ServerApi(`/project/${ID}`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setProjectDetails(res);
            })
            .catch((err) => console.error(err));
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
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Project Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Create or update projects.</Typography>
                </Box>

                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Project" : "Register New Project"}</Typography>
                                <IconButton>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />
                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Project Title" icon={<CategoryIcon />} />
                                            <TextField required fullWidth size="small" value={projectDetails.title} onChange={(e) => setProjectDetails(p => ({ ...p, title: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }} item>
                                            <FormLabel text="Url Path" icon={<LanguageIcon />} />
                                            <Tooltip title="If any external link is connected to this project, provide only then or keep it empty">
                                                <TextField fullWidth size="small" value={projectDetails.slug} onChange={(e) => setProjectDetails(p => ({ ...p, slug: e.target.value }))} />
                                            </Tooltip>
                                        </Grid>
                                        {/* Image Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Featured Image || 330 × 210" icon={<AttachFileIcon />} />
                                            <Stack direction="row">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    onClick={() => imgTriggerClick.current.click()}
                                                    placeholder={projectDetails.featured_image?.name || null}
                                                    readOnly
                                                    slotProps={{
                                                        input: {
                                                            endAdornment: projectDetails.featured_image ? (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setProjectDetails(p => ({ ...p, featured_image: "" }));
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
                                                            setProjectDetails(p => ({ ...p, featured_image: file }));
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
                                            <FormLabel text="Publish Date" icon={<CalendarTodayIcon />} />
                                            <TextField type="date" fullWidth size="small" value={projectDetails.publish_date ? projectDetails.publish_date.split('T')[0] : ''} onChange={(e) => setProjectDetails(p => ({ ...p, publish_date: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }} item>
                                            <FormLabel text="Location" icon={<LocationOnIcon />} />
                                            <TextField required fullWidth size="small" value={projectDetails.location} onChange={(e) => setProjectDetails(p => ({ ...p, location: e.target.value }))} />
                                        </Grid>



                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextField multiline rows={4} fullWidth size="small" value={projectDetails.content} onChange={(e) => setProjectDetails(p => ({ ...p, content: e.target.value }))} />
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
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Provide an URL only if it has external link.</Typography>
                        </Box>

                        <Box>
                            {previewSrc ? (
                                <Box component="img" src={previewSrc} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
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

export default CreateProject;
