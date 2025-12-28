import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { ServerApi } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const CreateProject = () => {
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [projectDetails, setProjectDetails] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
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

        if (ID) {
            handleUpdate();
            return;
        }

        const formData = new FormData();
        formData.append("title", projectDetails.title);
        formData.append("slug", projectDetails.slug);
        formData.append("summary", projectDetails.summary);
        formData.append("content", projectDetails.content);
        if (projectDetails.featured_image && projectDetails.featured_image instanceof File) {
            formData.append("featured_image", projectDetails.featured_image);
        }

        ServerApi("/project/add", "POST", null, formData, true)

            .then((res) => res.json())
            .then((res) => console.log("create project:", res))
            .catch((err) => console.error(err));
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("title", projectDetails.title);
        formData.append("slug", projectDetails.slug);
        formData.append("summary", projectDetails.summary);
        formData.append("content", projectDetails.content);
        if (projectDetails.featured_image && projectDetails.featured_image instanceof File) {
            formData.append("featured_image", projectDetails.featured_image);
        }

        ServerApi(`/project/update/` + ID, 'Put', null, formData, true)
            .then((res) => res.json())
            .then((res) => console.log("update project:", res))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (!ID) return;
        ServerApi(`/project/delete/` + ID, "DELETE", null, null)
            .then((res) => res.json())
            .then((res) => console.log("delete project:", res))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (!ID) return;
        ServerApi(`/project/${ID}`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setProjectDetails({
                    title: res.title || "",
                    slug: res.slug || "",
                    summary: res.summary || "",
                    content: res.content || "",
                    featured_image: res.featured_image || ""
                });
            })
            .catch((err) => console.error(err));
    }, [ID]);


    return (
        <Box bgcolor={"#f8fafc"} py={5}>
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
                                            <TextField fullWidth size="small" value={projectDetails.slug} onChange={(e) => setProjectDetails(p => ({ ...p, slug: e.target.value }))} />
                                        </Grid>
                                        {/* Image Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Featured Image" icon={<AttachFileIcon />} />
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

                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextField required multiline rows={4} fullWidth size="small" value={projectDetails.content} onChange={(e) => setProjectDetails(p => ({ ...p, content: e.target.value }))} />
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
                        <Box>
                            {previewSrc ? (
                                <Box component="img" src={previewSrc} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : (
                                <Box sx={{ mb: 3, width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                                    <Typography color="text.secondary">No image selected</Typography>
                                </Box>
                            )}
                        </Box>

                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Provide a single featured image for the project.</Typography>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default CreateProject;
