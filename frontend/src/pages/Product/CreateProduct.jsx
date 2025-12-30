import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, Autocomplete, Tooltip, Switch, InputAdornment, Snackbar, Alert, Button } from "@mui/material";
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
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';


const CreateProduct = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const [categoryList, setCategoryList] = useState([]);
    const [technoList, setTechnoList] = useState([]);
    const [specList, setSpecList] = useState([
        {
            spec_id: "",
            spec_label: "",
            spec_value: "",
        }
    ])
    const [specDel, setSpecDel] = useState([]);

    const [product, setProduct] = useState({
        category: {
        },
        name: "",
        description: "",
        model_number: "",
        url_path: "",
        spec_pdf: "",
        SKU: "",
        size: "",
        color: "",
        brand_name: "",
        single_image: "",
        first_image: ""
    });

    const imgTriggerClick = useRef(null);
    const [images, setImages] = useState([]);
    const [delId, setDelId] = useState([]);

    const handleMultipleImages = (e) => {
        const files = Array.from(e.target.files);

        const newImages = files.map((file, index) => ({
            file: file,
            preview: URL.createObjectURL(file),
            sort_order: images.length + index + 1 // Auto-assign next sequence
        })).filter(img => img.sort_order <= 5); // Limit to 8

        setImages(prev => [...prev, ...newImages].slice(0, 5));
    };

    const removeImage = (item, index) => {
        if (item.id) {
            setDelId(prev => [...prev, item.id])
        }
        const filtered = images.filter((_, i) => i !== index);
        // Re-calculate sequences so there are no gaps
        const reSequenced = filtered.map((img, i) => ({ ...img, sort_order: i + 1 }));
        setImages(reSequenced);
    };

    const getCategoryList = () => {
        ServerApi(`/category/show?displayVar=all`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setCategoryList(res);
            });
    };

    const getTechnoList = () => {
        ServerApi(`/technology/show`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                const simplifiedList = res.map(item => item.spec_value);
                setTechnoList(simplifiedList);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category_id", product.category?.cID);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("model_number", product.model_number);
        formData.append("SKU", product.SKU);
        formData.append("url_path", product.url_path);
        if (product.spec_pdf) formData.append("spec_pdf", product.spec_pdf);/////////
        formData.append("brand_name", product.brand_name);
        formData.append("single_image", product.single_image);
        formData.append("first_image", product.first_image);

        specList.forEach(item => {
            formData.append("specId", (item.spec_id));
            formData.append("specLabel", (item.spec_label));
            formData.append("specValue", (item.spec_value));
        });

        delId.length !== 0 ? delId.forEach((id) => {
            formData.append("delValues", id);
        }) : null;

        specDel.length !== 0 ? specDel.forEach((id) => {
            formData.append("specDel", id);
        }) : null;

        images.forEach((imgObj, index) => {
            // If it's a new file
            if (imgObj.file) {
                formData.append(`images`, imgObj.file);
                formData.append(`sort_order`, imgObj.sort_order);
            } else {
                // Handle existing images if updating
                formData.append(`existing_images`, imgObj.image_url);
                formData.append(`existing_sort_order`, imgObj.sort_order);
            }
        });

        const url = ID ? `/product/update/${ID}` : `/product/add`;
        const method = ID ? "PUT" : "POST";

        ServerApi(url, method, null, formData, true)
            .then(res => res.json())
            .then(res => {
                setOpenAlert(true);
                setMsgText(res);
                if (method === "POST") {
                    setProduct({
                        category: {

                        },
                        name: "",
                        description: "",
                        model_number: "",
                        SKU: "",
                        url_path: "",
                        spec_pdf: "",
                        brand_name: "",
                        first_image: "",
                        single_image: ""
                    });
                    setSpecList([{
                        id: "",
                        spec_label: "",
                        spec_value: "",
                    }]);
                    setImages([]);
                    setDelId([]);
                    setSpecDel([]);
                }
            })
            .catch(err => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate(-1)
        } else {
            ServerApi(`/product/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        getCategoryList();
        getTechnoList();

        if (ID !== null) {
            ServerApi(`/product/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setSpecList(res.specList);
                    setProduct(res.product);
                    setImages(res.images)
                });
        }
    }, [ID]);

    return (
        <Box bgcolor={"#f8fafc"} py={5}>
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
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Product Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Add, monitor, and analyze your authorized products.</Typography>
                </Box>


                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Product" : "Register New Product"}</Typography>
                                <IconButton>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />


                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Category" icon={<CategoryIcon />} />
                                            <Autocomplete size="small"
                                                options={categoryList}
                                                getOptionLabel={(option) => option.cName || ""}
                                                isOptionEqualToValue={(option, value) => option.cID === value.cID}
                                                renderOption={(props, option) => (
                                                    <li {...props} key={option.cID}>
                                                        {option.cName}
                                                    </li>
                                                )}
                                                value={product.category || null}
                                                onChange={(_, newVal) => setProduct(p => ({ ...p, category: newVal }))}
                                                renderInput={(params) => <TextField required {...params} />}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Product Name" icon={<DescriptionIcon />} />
                                            <TextField required fullWidth size="small" value={product.name} onChange={(e) => setProduct(p => ({ ...p, name: e.target.value.replace(/^./, c => c.toUpperCase()) }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Model Number" icon={<PinOutlinedIcon />} />
                                            <TextField fullWidth required size="small" value={product.model_number} onChange={(e) => setProduct(p => ({ ...p, model_number: e.target.value.replace(/^./, c => c.toUpperCase()), url_path: e.target.value.replace(/\s+/g, "").toLowerCase() }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Brand Name" icon={<LanguageIcon />} />
                                            <TextField fullWidth size="small" value={product.brand_name} onChange={(e) => setProduct(p => ({ ...p, brand_name: e.target.value }))} />
                                        </Grid>


                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Specification File" icon={<DescriptionIcon />} />

                                            <Tooltip title="Provide PDF that has size of under 10Mb ">
                                                <Button color={product.spec_pdf ? "disable" : "error"}
                                                    component="label"
                                                    variant={
                                                        product.spec_pdf ? "outlined" : "contained"
                                                    }

                                                    startIcon={<AttachFileIcon />}
                                                    sx={{ textTransform: 'none', width: "100%", py: 1 }}
                                                    endIcon={product.spec_pdf ? <IconButton sx={{ bgcolor: "#23232365" }}
                                                        size="small"
                                                        onClick={() => setProduct(p => ({ ...p, spec_pdf: "" }))}
                                                    >
                                                        <CloseIcon fontSize="small" sx={{ color: "white" }} />
                                                    </IconButton> : null}

                                                >
                                                    {product.spec_pdf ? product.spec_pdf.name : "Specification PDF"}
                                                    <input
                                                        type="file"
                                                        accept="application/pdf"
                                                        hidden
                                                        onChange={(e) => {
                                                            const file = e.target.files[0];
                                                            if (file) {
                                                                if (file.size > 10 * 1024 * 1024) {
                                                                    setOpenAlert(true);
                                                                    window.scrollTo({
                                                                        top: 100,
                                                                        left: 100,
                                                                        behavior: "smooth",
                                                                    });
                                                                    setMsgText({ error: "The file is too large. Max(10MB" });
                                                                    return;
                                                                }
                                                                setProduct(p => ({ ...p, spec_pdf: file }));
                                                            }
                                                        }}
                                                    />
                                                </Button>
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="SKU" icon={<LanguageIcon />} />
                                            <TextField fullWidth size="small" value={product.SKU} onChange={(e) => setProduct(p => ({ ...p, SKU: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Images" icon={<AttachFileIcon />} />
                                            <Tooltip title="All images will be saved at once.First image will be the main image that will be shown in product page">
                                                <Stack direction="row">
                                                    <TextField required={images.length > 0 ? false : true}
                                                        fullWidth
                                                        size="small"
                                                        placeholder={product.featured_image?.name || (typeof product.featured_image === 'string' ? product.featured_image : "No file selected")}
                                                        readOnly
                                                        onClick={() => imgTriggerClick.current.click()}
                                                        slotProps={{
                                                            input: {
                                                                sx: { cursor: 'pointer' },
                                                                endAdornment: product.featured_image ? (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            size="small"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                setProduct(p => ({ ...p, featured_image: "" }));
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
                                                    <input multiple
                                                        ref={imgTriggerClick}
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                        type="file"
                                                        onChange={(e) => handleMultipleImages(e)}
                                                    />
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => imgTriggerClick.current.click()}
                                                    >
                                                        <PhotoCamera color={"primary"} />
                                                    </IconButton>
                                                </Stack>
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <FormLabel text="Single Img no." icon={<PinOutlinedIcon />} />
                                            <Tooltip title="Select the image no that will be displayed after selecting categories">
                                                <TextField fullWidth required size="small" value={product.single_image} onChange={(e) => setProduct(p => ({ ...p, single_image: e.target.value }))} />
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 6, sm: 3 }}>
                                            <FormLabel text="First Img no." required icon={<PinOutlinedIcon />} />
                                            <Tooltip title="Select the image no that will displayed first after selecting the products">
                                                <TextField fullWidth size="small" value={product.first_image} onChange={(e) => {
                                                    e.stopPropagation();
                                                    setProduct(p => ({ ...p, first_image: e.target.value }))
                                                }} />
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 12 }} py={1}>
                                            <FormLabel text="Add Features & Specifications" icon={<FormatListNumberedIcon />} />
                                            {specList.map((item, index) => (
                                                <Stack direction="row" key={index} spacing={2} mb={1}>
                                                    <Autocomplete
                                                        size="small"
                                                        freeSolo
                                                        value={item?.spec_label || ''}

                                                        options={['Feature', 'Technology']}

                                                        onChange={(event, newValue) => {
                                                            setSpecList(prev =>
                                                                prev.map((p, i) =>
                                                                    i === index ? { ...p, spec_label: newValue || "" } : p
                                                                )
                                                            );
                                                        }}

                                                        onInputChange={(event, newInputValue) => {
                                                            setSpecList(prev =>
                                                                prev.map((p, i) =>
                                                                    i === index ? { ...p, spec_label: newInputValue } : p
                                                                )
                                                            );
                                                        }}

                                                        fullWidth
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                            />
                                                        )}
                                                    />

                                                    {item?.spec_label === 'Technology' ?
                                                        <Autocomplete size="small" fullWidth
                                                            options={technoList}
                                                            value={item.spec_value || null}
                                                            onChange={(_, newVal) => setSpecList(prev =>
                                                                prev.map((p, i) =>
                                                                    i === index ? { ...p, spec_value: newVal } : p
                                                                )
                                                            )}
                                                            renderInput={(params) => <TextField required {...params} />}
                                                        />
                                                        : <TextField fullWidth size="small" value={item.spec_value} onChange={(e) =>
                                                            setSpecList(prev =>
                                                                prev.map((p, i) =>
                                                                    i === index ? { ...p, spec_value: e.target.value } : p
                                                                )
                                                            )
                                                        } placeholder="Value" />}

                                                    <IconButton onClick={(e) => {
                                                        setSpecList(prev => [...prev, {
                                                            spec_id: "",
                                                            spec_label: "",
                                                            spec_value: "",
                                                        }])
                                                    }}>
                                                        <AddBoxOutlinedIcon />
                                                    </IconButton>
                                                    <IconButton disabled={specList.length <= 1} onClick={() => {
                                                        setSpecDel(prev => [...prev, item.spec_id]);
                                                        setSpecList(prev => prev.filter((_, i) => i !== index));
                                                    }}>
                                                        <RemoveCircleOutlineOutlinedIcon />
                                                    </IconButton>
                                                </Stack>))
                                            }
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Description" icon={<DescriptionIcon />} />
                                            <TextField multiline minRows={3}
                                                maxRows={10} fullWidth size="small" value={product.description} onChange={(e) => setProduct(p => ({ ...p, description: e.target.value }))} placeholder="Put the speficiation and feature details here" />
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

                        <Grid container spacing={2} sx={{ bgcolor: "#fff", borderRadius: 2, boxShadow: 1, p: 2, mb: 2 }}>
                            {images.length !== 0 ? images.map((img, index) => (
                                <Grid size={6} sx={{ position: "relative" }}>
                                    <Box component={"img"} src={img.preview ? img.preview : urlAPI + img.image_url} alt="prev" sx={{ borderRadius: 2, display: "block", width: "100%", height: "150px", objectFit: 'cover', mb: 1 }} />
                                    <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                                        <IconButton sx={{ bgcolor: "#23232365" }}
                                            size="small"
                                            onClick={() => removeImage(img, index)}
                                        >
                                            <CloseIcon fontSize="small" sx={{ color: "white" }} />
                                        </IconButton>
                                    </Box>
                                    {/* Sequence Input */}
                                    <TextField disabled
                                        size="small"
                                        type="number"
                                        value={img.sort_order}
                                        onChange={(e) => {
                                            const newSeq = parseInt(e.target.value);
                                            if (newSeq >= 1 && newSeq <= 5) {
                                                const updated = [...images];
                                                updated[index].sequence = newSeq;
                                                setImages(updated);
                                            }
                                        }}
                                    />
                                </Grid>
                            )) : <Typography variant="overline">No Images is selected</Typography>}
                        </Grid>

                        <Box sx={{ bgcolor: "#ff0000", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Provide accurate images sequence for your own benefits.</Typography>
                        </Box>
                    </Grid>


                </Grid>
            </Container>
        </Box>
    );
};

export default CreateProduct;
