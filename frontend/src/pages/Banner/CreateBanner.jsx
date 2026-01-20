import { Alert, Autocomplete, Box, Container, Divider, Grid, IconButton, InputAdornment, Snackbar, Stack, Switch, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import FormLabel from "../../assets/FormLabel/FormLabel";
import UploadingLoader from "../../assets/Modal/UploadingLoader";
import { sizeList, pageList, sectionList } from "./Data";
import img_3 from '../../img/3Img.png';

import SyncIcon from '@mui/icons-material/Sync';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PublicIcon from '@mui/icons-material/Public';
import BedroomBabyIcon from '@mui/icons-material/BedroomBaby';
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { ServerApi, urlAPI } from "../../route/ServerAPI";

const CreateBanner = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [ID, setID] = useState(searchParam.get("id") || null);
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});
    const imgTriggerClick = useRef();

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };


    const [imgDetails, setImgDetails] = useState({
        page_name: "HOMEPAGE",
        sectionCode: {
            section_value: "0000"
        },
        content_type: "Image",
        featured_image: ""
    })

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

        const formData = new FormData();
        formData.append("page_name", imgDetails.page_name);
        formData.append("section_title", imgDetails.sectionCode.section_title);
        formData.append("section_value", imgDetails.sectionCode.section_value);
        formData.append("content_type", imgDetails.content_type);
        formData.append("sort_order", imgDetails.sort_order || 0);
        formData.append("add_homepage", imgDetails.add_homepage || 1);

        if (imgDetails.featured_image && imgDetails.featured_image instanceof File) formData.append("featured_image", imgDetails.featured_image);

        const url = ID ? `/banner/update/${ID}` : `/banner/add`;
        const method = ID ? "PUT" : "POST";

        ServerApi(url, method, null, formData, true)
            .then(res => res.json())
            .then(res => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);

                if (method === "POST" && res.itemId) {
                    setID(res.itemId);
                    navigate('/banner-panel?id=' + res.itemId);
                }
            })
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate('/banner-list')
        } else {
            ServerApi(`/banner/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/banner/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setImgDetails(res);
                });
        }
    }, [ID]);


    return (
        <Box py={5}>
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
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Homepage Layout</Typography>
                    <Typography variant="overline" color="text.secondary"> Design your homepage.</Typography>
                </Box>
                <Grid container spacing={2} mb={3}>
                    <Grid size={{ sm: 12, md: 8 }}>
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>Upload Content</Typography>
                                <IconButton onClick={(e) => window.location.reload()}>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />
                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ sm: 12, md: 6 }}>
                                            <FormLabel text="Page" icon={<PublicIcon />} />
                                            <Autocomplete size="small" required
                                                options={pageList}
                                                value={imgDetails.page_name}
                                                onChange={(_, newVal) => setImgDetails(p => ({ ...p, sectionCode: { section_value: '0000' }, page_name: newVal }))}
                                                renderInput={(params) => <TextField {...params} placeholder="Page" />}
                                                freeSolo
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Section" icon={<BedroomBabyIcon />} />
                                            <Autocomplete size="small" required
                                                options={imgDetails.page_name ? sectionList[imgDetails.page_name] || [] : []}
                                                value={imgDetails.sectionCode}
                                                getOptionLabel={(option) => option.section_title || ""}
                                                renderOption={(props, option) => (
                                                    <li {...props} key={option.section_value}>
                                                        {option.section_title}
                                                    </li>
                                                )}
                                                onChange={(_, newVal) => setImgDetails(p => ({ ...p, sectionCode: newVal }))}
                                                renderInput={(params) => <TextField {...params} placeholder="Section" />}
                                                freeSolo
                                            />
                                        </Grid>

                                        <Grid size={{ sm: 12, md: 6 }}>
                                            <FormLabel text="Content Type" icon={<VideoLibraryIcon />} />
                                            <Autocomplete size="small" required
                                                options={sizeList.find(item => item.code === imgDetails.sectionCode?.section_value)?.video ? ["Image", "Video"] : ["Image"]}
                                                value={imgDetails.content_type}
                                                onChange={(_, newVal) => setImgDetails(p => ({ ...p, content_type: newVal }))}
                                                renderInput={(params) => <TextField {...params} />}
                                                freeSolo
                                            />
                                        </Grid>

                                        <Grid size={{ sm: 12, md: 6 }}>
                                            <FormLabel text={`Feature Image ${sizeList.find(item => item.code === imgDetails.sectionCode?.section_value)?.size}`} icon={<AttachFileIcon />} />
                                            <Tooltip title={imgDetails.type === "Image" ? "Please resize image under 1MB" : "Please resize the video 3MB"}>
                                                <Stack direction="row">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        // Opens picker when clicking anywhere on the bar
                                                        onClick={() => imgTriggerClick.current.click()}
                                                        placeholder={imgDetails.featured_image?.name || (typeof imgDetails.featured_image === 'string' ? imgDetails.featured_image : "No file selected")}
                                                        readOnly
                                                        slotProps={{
                                                            input: {
                                                                endAdornment: imgDetails.featured_image ? (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation(); // Prevents re-opening the file dialog
                                                                                setImgDetails(p => ({ ...p, featured_image: "" }));
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
                                                        accept={imgDetails.content_type === "Image" ? "image/*" : "video/*"}
                                                        style={{ display: 'none' }}
                                                        type="file"
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                setImgDetails(p => ({ ...p, featured_image: file }));
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
                                            </Tooltip>
                                        </Grid>

                                        {ID && <Grid size={{ xs: 12 }}>
                                            <Stack direction={{ xs: "column", md: "row" }}>
                                                <Box width={"50%"}>
                                                    <FormLabel text="Sort Order" icon={<SwapVertIcon />} />
                                                    <TextField fullWidth size="small" type="number" value={imgDetails.sort_order} onChange={(e) => setImgDetails(p => ({ ...p, sort_order: e.target.value }))} />
                                                </Box>
                                                <Box width={"50%"}>
                                                    <Tooltip title="If enabled, the Category will be displayed on the homepage.">
                                                        <Box sx={{ height: "100%", display: "flex", alignItems: "flex-end" }}>
                                                            <Stack direction="row" alignItems={"center"} spacing={1}>
                                                                <Switch
                                                                    checked={imgDetails.add_homepage === 1}
                                                                    onChange={(e) => setImgDetails(p => ({ ...p, add_homepage: e.target.checked ? 1 : 0 }))}
                                                                    slotProps={{ input: { 'aria-label': 'controlled' } }}
                                                                />
                                                                <FormLabel text="Add to Homepage" />
                                                            </Stack>
                                                        </Box>
                                                    </Tooltip>
                                                </Box>
                                            </Stack>
                                        </Grid>}


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
                        {imgDetails.sectionCode.section_value !== 'HP03' ?
                            (<Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3, mb: 2 }}>
                                <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                                <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>The slider is avaiable only in HOMEPAGE Banner.</Typography>
                            </Box>)
                            : (<Box sx={{ mb: 2 }}>
                                <Box component='img' src={img_3} sx={{ width: '100%', aspectRatio: '1/1' }} />
                            </Box>)
                        }

                        <Grid container spacing={2} sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 1, mb: 2 }}>
                            {imgDetails.featured_image ? (
                                <Grid size={12} sx={{ position: "relative" }}>
                                    {imgDetails.content_type === "Video" ? (
                                        <Box sx={{
                                            display: 'block',
                                            width: "100%",
                                            aspectRatio: '16/6.7',
                                            height: "auto",
                                            objectFit: "cover"
                                        }} autoPlay loop muted playsInline
                                            loading="eager"
                                            fetchPriority="high"
                                            component="video" src={previewSrc ? previewSrc : urlAPI + imgDetails.featured_image} />
                                    ) : (
                                        <Box sx={{
                                            display: 'block',
                                            width: "100%",
                                            aspectRatio: '16/6.7',
                                            height: "auto",
                                            objectFit: "cover"
                                        }}
                                            loading="eager"
                                            fetchPriority="high"
                                            component="img" src={previewSrc ? previewSrc : urlAPI + imgDetails.featured_image} />)}
                                </Grid>
                            ) : <Box p={3}>
                                <Typography variant="overline">No Images is selected</Typography>
                            </Box>
                            }
                        </Grid>

                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CreateBanner;