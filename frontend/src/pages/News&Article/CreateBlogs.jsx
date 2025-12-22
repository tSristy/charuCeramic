import { useEffect, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment, Switch, Tooltip } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { imageAPI, ServerApi } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const CreateBlogs = () => {
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [blogDetails, setBlogDetails] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        add_homepage: 0,
        published_at: "",
        featured_image: ""
    });

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
        } else {
            const formData = new FormData();
            formData.append("title", blogDetails.title);
            formData.append("slug", blogDetails.slug);
            formData.append("add_homepage", blogDetails.add_homepage);
            formData.append("summary", blogDetails.summary);
            formData.append("content", blogDetails.content);
            formData.append("published_at", blogDetails.published_at);
            if (blogDetails.featured_image && blogDetails.featured_image instanceof File) {
                formData.append("featured_image", blogDetails.featured_image);
            }

            ServerApi(`/blog/add`, "POST", null, formData, true)
                .then((res) => res.json())
                .then((res) => {
                    console.log("create response:", res);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("title", blogDetails.title);
        formData.append("slug", blogDetails.slug);
        formData.append("add_homepage", blogDetails.add_homepage);
        formData.append("summary", blogDetails.summary);
        formData.append("content", blogDetails.content);
        formData.append("published_at", blogDetails.published_at);
        if (blogDetails.featured_image && blogDetails.featured_image instanceof File) {
            formData.append("featured_image", blogDetails.featured_image);
        }

        ServerApi(`/blog/update/` + ID, "PUT", null, formData, true)
            .then((res) => res.json())
            .then((res) => console.log("update response:", res))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {

        } else {
            ServerApi(`/blog/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/blog/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setBlogDetails(res);
                });
        } else return;
    }, [ID]);


    return (
        <Box bgcolor={"#f8fafc"} py={5}>
            <Container>
                {/* ------------------------Title and Description------------------------ */}
                <Box mb={3}>
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> News & Article Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Keep updating people with the latest news and articles.</Typography>
                </Box>


                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        {/* --------------------------Form Section------------------------- */}
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Blog" : "Register New Blog"}</Typography>
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
                                            <FormLabel text="Blog Title" icon={<CategoryIcon />} />
                                            <TextField required fullWidth size="small" value={blogDetails.title} onChange={(e) => setBlogDetails(p => ({ ...p, title: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Url Path" icon={<LanguageIcon />} />
                                            <TextField fullWidth size="small" value={blogDetails.slug} onChange={(e) => setBlogDetails(p => ({ ...p, slug: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm:4 }}>
                                            <FormLabel text="Publish Date" icon={<CalendarTodayIcon />} />
                                            <TextField type="date" fullWidth size="small" value={blogDetails.published_at} onChange={(e) => setBlogDetails(p => ({ ...p, published_at: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Tooltip title="If enabled, the blog will be displayed on the homepage.">
                                                <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end" }}>
                                                    <Stack direction="row" alignItems={"center"} spacing={1}>
                                                        <Switch
                                                            checked={blogDetails.add_homepage === 1}
                                                            onChange={(e) => setBlogDetails(p => ({ ...p, add_homepage: e.target.checked ? 1 : 0 }))}
                                                            slotProps={{ input: { 'aria-label': 'controlled' } }}
                                                        />
                                                        <FormLabel text="Add to Homepage" />
                                                    </Stack>
                                                </Box>
                                            </Tooltip>
                                        </Grid>


                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormLabel text="Featured Image" icon={<AttachFileIcon />} />
                                            <Stack direction="row">
                                                <TextField fullWidth size="small" placeholder={blogDetails.featured_image.name || blogDetails.featured_image} readOnly slotProps={{
                                                    input: {
                                                        endAdornment: blogDetails.featured_image ? <InputAdornment position="end"><IconButton onClick={(e) => { setBlogDetails(p => ({ ...p, featured_image: "" })); setPreviewSrc("") }}><CloseIcon /></IconButton></InputAdornment> : null,
                                                    },
                                                }} />
                                                <input
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    id="featured-image-upload"
                                                    type="file"
                                                    onChange={(e) => { setBlogDetails(p => ({ ...p, featured_image: e.target.files[0] })); handleImagePreview(e.target.files[0]); }}
                                                />
                                                <label htmlFor="featured-image-upload">
                                                    <IconButton color="primary" component="span" aria-label="upload picture">
                                                        <PhotoCamera color="disabled" />
                                                    </IconButton>
                                                </label>
                                            </Stack>
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextField multiline rows={2} required fullWidth size="small" value={blogDetails.content} onChange={(e) => setBlogDetails(p => ({ ...p, summary: e.target.value.slice(0, 100), content: e.target.value }))} />
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

                        {/* --------------------------Image Preview------------------------- */}
                        <Box>
                            {previewSrc ? (
                                <Box component="img" src={previewSrc} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : blogDetails.featured_image ? (
                                <Box component="img" src={imageAPI + blogDetails.featured_image} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : (
                                <Box sx={{ mb: 3, width: '100%', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                                    <Typography color="text.secondary">No image selected</Typography>
                                </Box>
                            )}
                        </Box>
                        {/* --------------------------Info Section------------------------- */}
                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>{"Provide URL Path only if the content has the official URL in the external source. The form will hold upto one single image for your news & article data."}</Typography>
                        </Box>
                    </Grid>


                </Grid>
            </Container>
        </Box >
    );
};

export default CreateBlogs;