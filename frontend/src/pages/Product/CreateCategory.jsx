import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, Autocomplete, Tooltip, Switch, InputAdornment, Snackbar, Alert } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import CategoryIcon from '@mui/icons-material/Category';
import LanguageIcon from '@mui/icons-material/Language';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import UploadingLoader from "../../assets/Modal/UploadingLoader";

const CreateCategory = () => {
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

    const [parentCategory, setParentCategory] = useState([]);
    const [category, setCategory] = useState({
        name: "",
        slug: "",
        add_menu: 0,
        add_homepage: 0,
        homepage_sequence: null,
        featured_image: "",
        description: "",
        parent_id: null,
        parentCategory: {
            parent_id: null,
            parent_name: ""
        }
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
        } else {
            const formData = new FormData();
            formData.append("name", category.name);
            formData.append("slug", category.slug);
            formData.append("add_menu", category.add_menu);
            formData.append("add_homepage", category.add_homepage);
            formData.append("homepage_sequence", category.homepage_sequence);
            formData.append("description", category.description);
            formData.append("parent_id", category.parentCategory ? category.parentCategory.parent_id : null);
            formData.append("featured_image", category.featured_image);

            ServerApi(`/category/add`, "POST", null, formData, true)
                .then((res) => res.json())
                .then((res) => {
                    console.log("create response:", res);
                })
                .catch((err) => console.error(err));
        }
    };



    const handleUpdate = () => {
        const formData = new FormData();
        formData.append("name", category.name);
        formData.append("slug", category.slug);
        formData.append("add_menu", category.add_menu);
        formData.append("add_homepage", category.add_homepage);
        formData.append("homepage_sequence", category.homepage_sequence);
        formData.append("description", category.description);
        formData.append("parent_id", category.parentCategory ? category.parentCategory.parent_id : null);
        formData.append("featured_image", category.featured_image);

        ServerApi(`/category/update/` + ID, "PUT", null, formData, true)
            .then((res) => res.json())
            .then((res) => console.log("update response:", res))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate('/category-list');
        } else {
            ServerApi(`/category/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    const getParentCategoryDetails = () => {
        ServerApi(`/category/parent`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setParentCategory(res);
            });
    };

    useEffect(() => {
        getParentCategoryDetails();
        if (ID !== null) {
            ServerApi(`/category/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setCategory(res);
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
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Category Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Add, monitor, and analyze your authorized category.</Typography>
                </Box>


                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        {/* --------------------------Form Section------------------------- */}
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Category" : "Register New Category"}</Typography>
                                <IconButton>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />


                            {/* ----------------------------Form Inputs------------------------- */}
                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>

                                        {/* Category Name Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Category Name" icon={<CategoryIcon />} />
                                            <TextField required fullWidth size="small" value={category.name} onChange={(e) => setCategory(p => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))} />
                                        </Grid>


                                        {/* Parent Category Field */}
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Parent Category" icon={<CategoryIcon />} />
                                            <Autocomplete size="small"
                                                options={parentCategory.filter((option => category.id ? option.parent_id !== category.id : option))}
                                                getOptionLabel={(option) => option.parent_name || ""}
                                                value={category.parentCategory || null}
                                                onChange={(_, newVal) => setCategory(p => ({ ...p, parentCategory: newVal }))}
                                                renderInput={(params) => <TextField {...params} />}
                                                freeSolo
                                            />
                                        </Grid>


                                        {/* Add to Homepage */}
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Tooltip title="If enabled, the Category will be displayed on the homepage.">
                                                <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end" }}>
                                                    <Stack direction="row" alignItems={"center"} spacing={1}>
                                                        <Switch
                                                            checked={category.add_homepage === 1}
                                                            onChange={(e) => setCategory(p => ({ ...p, add_homepage: e.target.checked ? 1 : 0 }))}
                                                            slotProps={{ input: { 'aria-label': 'controlled' } }}
                                                        />
                                                        <FormLabel text="Add to Homepage" />
                                                    </Stack>
                                                </Box>
                                            </Tooltip>
                                        </Grid>


                                        {/* Image Field */}
                                        <Grid size={{ xs: 12, sm: 8 }}>
                                            <FormLabel text="Featured Image || 524 × 360" icon={<AttachFileIcon />} />
                                            <Stack direction="row">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    // Logical check for disabled/required
                                                    required={category.add_homepage === 1}
                                                    disabled={category.add_homepage !== 1}
                                                    // Opens picker when clicking anywhere on the bar
                                                    onClick={() => category.add_homepage === 1 && imgTriggerClick.current.click()}
                                                    placeholder={category.featured_image?.name || (typeof category.featured_image === 'string' ? category.featured_image : "No file selected")}
                                                    readOnly
                                                    slotProps={{
                                                        input: {
                                                            sx: { cursor: category.add_homepage === 1 ? 'pointer' : 'default' },
                                                            endAdornment: category.featured_image ? (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        size="small"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Prevents re-opening the file dialog
                                                                            setCategory(p => ({ ...p, featured_image: "" }));
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
                                                            setCategory(p => ({ ...p, featured_image: file }));
                                                            handleImagePreview(file);
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    color="primary"
                                                    disabled={category.add_homepage !== 1}
                                                    onClick={() => imgTriggerClick.current.click()}
                                                >
                                                    <PhotoCamera color={category.add_homepage === 1 ? "primary" : "disabled"} />
                                                </IconButton>
                                            </Stack>
                                        </Grid>

                                        {/* Add to Mega Menu */}
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <Tooltip title="If enabled, the Category will be displayed on the menu.">
                                                <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end" }}>
                                                    <Stack direction="row" alignItems={"center"} spacing={1}>
                                                        <Switch
                                                            checked={category.add_menu === 1}
                                                            onChange={(e) => setCategory(p => ({ ...p, add_menu: e.target.checked ? 1 : 0 }))}
                                                            slotProps={{ input: { 'aria-label': 'controlled' } }}
                                                        />
                                                        <FormLabel text="Add to Mega Menu" />
                                                    </Stack>
                                                </Box>
                                            </Tooltip>
                                        </Grid>


                                        {/* Homepage Sequence */}
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormLabel text="Homepage Sequence" icon={<PinOutlinedIcon />} />
                                            <Tooltip title="Please select within 1 - 8 range">
                                                <TextField type="number" fullWidth size="small" value={category.homepage_sequence} slotProps={{ htmlInput: { min: 1, max: 8 } }} onChange={(e) => { e.target.value < 9 ? setCategory(p => ({ ...p, homepage_sequence: e.target.value })) : "" }} />
                                            </Tooltip>
                                        </Grid>

                                        {/* URL Path Field */}
                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormLabel text="Url Path" icon={<LanguageIcon />} />
                                            <TextField fullWidth disabled size="small" value={category.slug} />
                                        </Grid>


                                        {/* Description */}
                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Description" icon={<DescriptionIcon />} />
                                            <TextField multiline rows={2} fullWidth size="small" value={category.description} onChange={(e) => setCategory(p => ({ ...p, description: e.target.value }))} />
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

                    <Grid item size={{ sm: 12, md: 4 }}>
                        {/* --------------------------Info Section------------------------- */}
                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3, mb: 2 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Ensuring the category name is unique and Add image or homepage sequence only when you turn on add to homepage options.</Typography>
                        </Box>
                        
                        {/* --------------------------Image Preview------------------------- */}
                        <Box>
                            {previewSrc ? (
                                <Box component="img" src={previewSrc} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
                            ) : category.featured_image ? (
                                <Box component="img" src={urlAPI + category.featured_image} alt="Preview" sx={{ mb: 3, width: '100%', height: 200, objectFit: 'cover', border: 1, borderColor: "#e2e8f0", borderRadius: 2 }} />
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

export default CreateCategory;