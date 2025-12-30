import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, InputAdornment } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

import SyncIcon from '@mui/icons-material/Sync';
import DescriptionIcon from '@mui/icons-material/Description';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const CreateCatalogue = () => {
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [catalogue, setCatalogue] = useState({
        title: "",
        file_path: "",
        summary: "",
        content: "",
        featured_image: ""
    });

    const pdfTrigger = useRef(null);
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
            .then(res => console.log("create catalogue:", res))
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
            .then(res => console.log("update catalogue:", res))
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        if (!ID) return;
        ServerApi(`/catalogue/delete/${ID}`, "DELETE", null, null)
            .then(res => res.json())
            .then(res => console.log("delete catalogue:", res))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        if (!ID) return;
        ServerApi(`/catalogue/${ID}`, "GET", null, null)
            .then(res => res.json())
            .then(res => {
                setCatalogue({
                    title: res.title || "",
                    file_path: res.file_path || "",
                    summary: res.summary || "",
                    content: res.content || "",
                    featured_image: res.featured_image || ""
                });
                if (res.featured_image) setPreviewImg(urlAPI + res.featured_image);
            })
            .catch(err => console.error(err));
    }, [ID]);

    return (
        <Box bgcolor={"#f8fafc"} py={5}>
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
                                            <FormLabel text="PDF File" icon={<PictureAsPdfIcon />} />
                                            <Stack direction="row">
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    placeholder={catalogue.file_path?.name || (typeof catalogue.file_path === 'string' ? catalogue.file_path : "No file selected")}
                                                    readOnly
                                                    onClick={() => pdfTrigger.current.click()}
                                                    slotProps={{ input: { sx: { cursor: 'pointer' } } }}
                                                />
                                                <input
                                                    ref={pdfTrigger}
                                                    accept="application/pdf"
                                                    style={{ display: 'none' }}
                                                    type="file"
                                                    onChange={(e) => {
                                                        const file = e.target.files[0];
                                                        if (file) setCatalogue(p => ({ ...p, file_path: file }));
                                                    }}
                                                />
                                                <IconButton color="primary" onClick={() => pdfTrigger.current.click()}><AttachFileIcon /></IconButton>
                                            </Stack>
                                        </Grid>

 <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Featured Image" icon={<AttachFileIcon />} />
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
                                                <IconButton color="primary" onClick={() => imgTrigger.current.click()}><PhotoCamera color={"primary"} /></IconButton>
                                            </Stack>
                                        </Grid>

                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Summary" icon={<DescriptionIcon />} />
                                            <TextField multiline rows={2} fullWidth size="small" value={catalogue.summary} onChange={(e) => setCatalogue(p => ({ ...p, summary: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12 }} item>
                                            <FormLabel text="Content" icon={<DescriptionIcon />} />
                                            <TextField required multiline rows={4} fullWidth size="small" value={catalogue.content} onChange={(e) => setCatalogue(p => ({ ...p, content: e.target.value }))} />
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

                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }}>Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Upload a PDF file for the catalogue and an optional featured image.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CreateCatalogue;
