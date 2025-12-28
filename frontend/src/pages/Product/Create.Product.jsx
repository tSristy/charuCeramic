import { useEffect, useRef, useState } from "react";
import { TextField, Stack, Container, Box, Typography, Grid, IconButton, Divider, Autocomplete, Tooltip, Switch, InputAdornment } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import { imageAPI, ServerApi } from "../../route/ServerAPI";
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

const CreateProduct = () => {
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [categoryList, setCategoryList] = useState([]);
    const [product, setProduct] = useState({
        category: {

        },
        name: "",
        description: "",
        model_number: "",
        SKU: "",
        size: "",
        color: "",
        brand_name: ""
    });

    const imgTriggerClick = useRef(null);
    // Inside CreateProduct component
    const [images, setImages] = useState([]); // Array of { file: File, preview: string, sequence: number }
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

    const removeImage = (item,index) => {
        if(item.id){
            setDelId(prev=> [...prev,item.id])
        }
        const filtered = images.filter((_, i) => i !== index);
        // Re-calculate sequences so there are no gaps
        const reSequenced = filtered.map((img, i) => ({ ...img, sort_order: i + 1 }));
        setImages(reSequenced);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category_id", product.category?.cID);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("model_number", product.model_number);
        formData.append("SKU", product.SKU);
        formData.append("size", product.size);
        formData.append("color", product.color);
        formData.append("brand_name", product.brand_name);
delId.length !== 0 ? delId.forEach((id) => {
    formData.append("delValues", id); 
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
            .then(res => console.log("Success:", res))
            .catch(err => console.error(err));
    };



    const handleDelete = () => {
        if (ID === null) {

        } else {
            ServerApi(`/product/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    const getCategoryList = () => {
        ServerApi(`/category/show?displayVar=all`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setCategoryList(res);
            });
    };

    useEffect(() => {
        getCategoryList();
        if (ID !== null) {
            ServerApi(`/product/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setProduct(res.product);
                    setImages(res.images)
                });
        }
    }, [ID]);


    return (
        <Box bgcolor={"#f8fafc"} py={5}>
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
                                            <Autocomplete size="small" required
                                                options={categoryList}
                                                getOptionLabel={(option) => option.cName || ""}
                                                value={product.category || null}
                                                onChange={(_, newVal) => setProduct(p => ({ ...p, category: newVal }))}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Product Name" icon={<DescriptionIcon />} />
                                            <TextField required fullWidth size="small" value={product.name} onChange={(e) => setProduct(p => ({ ...p, name: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Model Number" icon={<PinOutlinedIcon />} />
                                            <TextField fullWidth size="small" value={product.model_number} onChange={(e) => setProduct(p => ({ ...p, model_number: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="SKU" icon={<DescriptionIcon />} />
                                            <TextField fullWidth required size="small" value={product.SKU} onChange={(e) => setProduct(p => ({ ...p, SKU: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormLabel text="Size" icon={<PinOutlinedIcon />} />
                                            <TextField fullWidth size="small" value={product.size} onChange={(e) => setProduct(p => ({ ...p, size: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormLabel text="Color" icon={<PinOutlinedIcon />} />
                                            <Tooltip title="Provide HEX Color. A hexadecimal color is specified with: #RRGGBB">
                                                <TextField fullWidth size="small" value={product.color} onChange={(e) => setProduct(p => ({ ...p, color: e.target.value }))} />
                                            </Tooltip>
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 4 }}>
                                            <FormLabel text="Brand Name" icon={<PinOutlinedIcon />} />
                                            <TextField fullWidth size="small" value={product.brand_name} onChange={(e) => setProduct(p => ({ ...p, brand_name: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Images" icon={<AttachFileIcon />} />
                                            <Tooltip title="All images will be saved at once.First image will be the main image that will be shown in product page">
                                                <Stack direction="row">
                                                    <TextField
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

                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Description" icon={<DescriptionIcon />} />
                                            <TextField multiline rows={3} fullWidth size="small" value={product.description} onChange={(e) => setProduct(p => ({ ...p, description: e.target.value }))} />
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
                                    <Box component={"img"} src={img.preview ? img.preview : imageAPI+img.image_url} alt="prev" sx={{ borderRadius: 2, display: "block", width: "100%", height: "150px", objectFit: 'cover', mb: 1 }} />
                                    <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                                        <IconButton sx={{ bgcolor: "#23232365" }}
                                            size="small"
                                            onClick={() => removeImage(img,index)}
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
                                    // slotProps={{
                                    //     input: {
                                    //         endAdornment: <InputAdornment position="end">

                                    //         </InputAdornment>
                                    //     }
                                    // }}
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
