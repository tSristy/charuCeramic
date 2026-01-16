import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment, Switch, Tooltip, Snackbar, Alert } from "@mui/material";
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

const CreateBlogs = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});

    // 1. Image Refs & Preview State
    const imgRef1 = useRef(null);
    const imgRef2 = useRef(null);
    const imgRef3 = useRef(null);

    const [previews, setPreviews] = useState({
        featured_image: null,
        featured_image_2: null,
        featured_image_3: null
    });

    const [blogDetails, setBlogDetails] = useState({
        title: "",
        slug: "",
        summary: "",
        content: "",
        add_homepage: 0,
        published_at: "",
        featured_image: "",
        featured_image_2: "",
        featured_image_3: ""
    });

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenAlert(false);
    };

    // 2. Handle Image Selection
    const handleImageChange = (file, fieldName) => {
        if (file) {
            setBlogDetails(p => ({ ...p, [fieldName]: file }));
            const url = URL.createObjectURL(file);
            setPreviews(prev => ({ ...prev, [fieldName]: url }));
        }
    };

    // 3. Submit/Update Logic
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", blogDetails.title);
        formData.append("slug", blogDetails.slug.replace(/\s+/g, "-").toLowerCase());
        formData.append("add_homepage", blogDetails.add_homepage);
        formData.append("summary", blogDetails.content.slice(0, 100));
        formData.append("content", blogDetails.content);
        formData.append("published_at", blogDetails.published_at);

        // Append images only if they are new File objects
        if (blogDetails.featured_image instanceof File) formData.append("featured_image", blogDetails.featured_image);
        if (blogDetails.featured_image_2 instanceof File) formData.append("featured_image_2", blogDetails.featured_image_2);
        if (blogDetails.featured_image_3 instanceof File) formData.append("featured_image_3", blogDetails.featured_image_3);

        const method = ID ? "PUT" : "POST";
        const endpoint = ID ? `/blog/update/${ID}` : `/blog/add`;

        ServerApi(endpoint, method, null, formData, true)
            .then((res) => res.json())
            .then((res) => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);

                if (!ID && res.itemId) {
                    setBlogDetails({
                        title: "", slug: "", summary: "", content: "",
                        add_homepage: 0, published_at: "",
                        featured_image: "", featured_image_2: "", featured_image_3: ""
                    });
                    setPreviews({ featured_image: null, featured_image_2: null, featured_image_3: null });
                }
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/blog/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => setBlogDetails(res));
        }
    }, [ID]);

    const handleDelete = () => {
        if (!ID) navigate('/blog-list');
        else {
            ServerApi(`/blog/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then(() => navigate('/blog-list'))
                .catch((err) => console.error(err));
        }
    };

    return (
        <Box bgcolor={"#f8fafc"} py={5}>
            {loading && <UploadingLoader loading={true} />}
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleAlertClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleAlertClose} severity={msgText?.message ? "success" : "error"} variant="filled">
                    {msgText?.message || msgText?.error || "Action completed"}
                </Alert>
            </Snackbar>

            <Container>
                <Box mb={3}>
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}>News & Article Management</Typography>
                    <Typography variant="overline" color="text.secondary">Upload up to 3 images for your articles.</Typography>
                </Box>

                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Blog" : "Register New Blog"}</Typography>
                                <IconButton><SyncIcon color="disabled" /></IconButton>
                            </Stack>
                            <Divider />

                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 8 }}>
                                            <FormLabel text="Blog Title" icon={<CategoryIcon />} />
                                            <TextField required fullWidth size="small" value={blogDetails.title} onChange={(e) => setBlogDetails(p => ({ ...p, title: e.target.value }))} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end", pb: 1 }}>
                                                <Switch checked={blogDetails.add_homepage === 1} onChange={(e) => setBlogDetails(p => ({ ...p, add_homepage: e.target.checked ? 1 : 0 }))} />
                                                <FormLabel text="Add to Homepage" />
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Url Path" icon={<LanguageIcon />} />
                                            <TextField fullWidth size="small" value={blogDetails.slug} onChange={(e) => setBlogDetails(p => ({ ...p, slug: e.target.value }))} />
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Publish Date" icon={<CalendarTodayIcon />} />
                                            <TextField type="date" fullWidth size="small" value={blogDetails.published_at ? blogDetails.published_at.split('T')[0] : ''} onChange={(e) => setBlogDetails(p => ({ ...p, published_at: e.target.value }))} />
                                        </Grid>

                                        {/* Image Inputs */}
                                        {[
                                            { name: 'featured_image', label: 'First Image || 860 × 640', ref: imgRef1 },
                                            { name: 'featured_image_2', label: 'Second Image || 860 × 640', ref: imgRef2 },
                                            { name: 'featured_image_3', label: 'Third Image || 860 × 640', ref: imgRef3 }
                                        ].map((img) => (
                                            <Grid size={{ xs: 12, sm: 4 }} key={img.name}>
                                                <FormLabel text={img.label} icon={<AttachFileIcon />} />
                                                <Stack direction="row">
                                                    <TextField
                                                        fullWidth size="small" readOnly
                                                        onClick={() => img.ref.current.click()}
                                                        placeholder={blogDetails[img.name]?.name || "Select File"}
                                                        slotProps={{
                                                            input: {
                                                                sx: { cursor: 'pointer' },
                                                                endAdornment: blogDetails[img.name]?.name ? (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setBlogDetails(p => ({ ...p, [img.name]: "" }));
                                                                                setPreviews(prev => ({ ...prev, [img.name]: "" }));

                                                                                if (img.ref.current) img.ref.current.value = "";
                                                                            }}
                                                                        >
                                                                            <CloseIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ) : null,
                                                            },
                                                        }}
                                                    />
                                                    <input ref={img.ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageChange(e.target.files[0], img.name)} />
                                                    <InputAdornment position="end">
                                                        <IconButton size="small" onClick={() => img.ref.current.click()}><PhotoCamera /></IconButton>
                                                    </InputAdornment>
                                                </Stack>
                                            </Grid>
                                        ))}

                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextFormat onChange={(html) => setBlogDetails(p => ({ ...p, content: html }))} initialValue={blogDetails.content} />
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

                    {/* Image Preview Sidebar */}
                    <Grid item size={{ sm: 12, md: 4 }}>
                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3, mb: 2 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Ensuring the URL name is unique and it will add to homepage only when you turn on add to homepage options.</Typography>
                        </Box>

                        <Stack spacing={2}>
                            {[
                                { key: 'featured_image', label: 'Main Preview' },
                                { key: 'featured_image_2', label: 'Second Preview' },
                                { key: 'featured_image_3', label: 'Third Preview' }
                            ].map((item) => {
                                const preview = previews[item.key];
                                const existing = blogDetails[item.key];
                                const src = preview || (existing && typeof existing === 'string' ? urlAPI + existing : null);

                                return (
                                    <Box key={item.key}>
                                        {src ? (
                                            <Box component="img" src={src} sx={{ width: '100%', height: 180, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                                        ) : (
                                            <Box sx={{ width: '100%', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                                                <Typography variant="caption" color="text.disabled">No Image</Typography>
                                            </Box>
                                        )}
                                    </Box>
                                );
                            })}
                        </Stack>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CreateBlogs;