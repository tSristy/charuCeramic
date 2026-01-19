import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Container, Divider, Drawer, FormControlLabel, FormGroup, Grid, Pagination, Stack, TextField, Typography, useMediaQuery, useTheme, Skeleton } from '@mui/material';
import bgImg from '../../img/bg3.jpg';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ServerApi, urlAPI } from '../../route/ServerAPI';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

const Product = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    
    // Search & Debounce States
    const [searchVariable, setSearchVariable] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    
    const [selectBrand, setSelectedBrand] = useState('');
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });

    // 1. Handle Search Debounce (Improves FID/Interaction)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchVariable);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchVariable]);

    const handleCategoryChange = (item) => {
        setPaginationDetails(prev => ({ ...prev, pageNo: 1 }));
        setProductList([]);
        const path = category === item.slug ? '/product' : `/product/${item.slug}`;
        navigate(path);
        if (isSmallScreen) setDrawerOpen(false);
    };

    const handleBrandChange = (brandName) => {
        setPaginationDetails(prev => ({ ...prev, pageNo: 1 }));
        setProductList([]);
        const newBrand = selectBrand === brandName ? '' : brandName;
        setSelectedBrand(newBrand);
        setSearchVariable(newBrand);
        if (isSmallScreen) setDrawerOpen(false);
    };

    const CategoryFilterList = () => (
        <FormGroup>
            {categoryList.map((item) => (
                <FormControlLabel
                    key={item.cID}
                    control={
                        <Checkbox
                            checked={category === item.slug}
                            onChange={() => handleCategoryChange(item)}
                        />
                    }
                    label={item.cName}
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: ".9rem" } }}
                />
            ))}
        </FormGroup>
    );

    const BrandFilterList = () => (
        <FormGroup>
            {['CHARU', 'COTTO'].map((brand) => (
                <FormControlLabel
                    key={brand}
                    control={
                        <Checkbox
                            checked={selectBrand === brand}
                            onChange={() => handleBrandChange(brand)}
                        />
                    }
                    label={brand}
                    sx={{ "& .MuiFormControlLabel-label": { fontSize: ".9rem" } }}
                />
            ))}
        </FormGroup>
    );

    useEffect(() => {
        ServerApi(`/category/show?displayVar=child`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => setCategoryList(res))
            .catch(err => console.error("Category Load Error:", err));
    }, []);

    useEffect(() => {
        setLoading(true);
        const body = {
            pageNo: paginationDetails.pageNo,
            category: category,
            searchVariable: debouncedSearch // Using debounced value for API
        };

        ServerApi(`/product/list-by-cat`, "POST", null, body)
            .then(res => res.json())
            .then(res => {
                setProductList(prev => {
                    if (paginationDetails.pageNo === 1) return res.items || [];
                    const map = new Map();
                    [...prev, ...res.items].forEach(item => map.set(item.id, item));
                    return Array.from(map.values());
                });

                setPaginationDetails(prev => ({
                    ...prev,
                    totalRows: res.totalRows,
                    totalPages: Math.ceil(res.totalRows / 12)
                }));
                setLoading(false);
            });
    }, [category, debouncedSearch, paginationDetails.pageNo]);
const [bannerImg, setBannerImg] = useState(null);

    useEffect(() => { 
        ServerApi(`/banner?pageName=PRODUCT&sectionValue=PP01`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setBannerImg(res[0]);
                });
        }, [])

    return (
        <>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000",
                display: 'block',
                aspectRatio: '16/5',
                width: '100%',
                height: "auto",
                overflow: 'hidden',
                bgcolor: '#f0f0f0'
            }}>
                <Box
                    component="img"
                    src={bannerImg?.featured_image ? urlAPI + bannerImg.featured_image : bgImg}
                    fetchPriority="high"
                    loading="eager"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            <Box py={10}>
                <Container>
                    <Grid container spacing={4}>
                        {isSmallScreen ? (
                            <Grid size={{ xs: 12 }}>
                                <Stack direction='row' sx={{ alignItems: "center", border: 1, p: 2, borderColor: '#d9d9d9ff', borderRadius: 2, cursor: 'pointer' }} spacing={2} onClick={() => setDrawerOpen(true)}>
                                    <TuneOutlinedIcon />
                                    <Box>
                                        <Typography variant='subtitle2'>Filter</Typography>
                                        <Typography variant='h6'>Categories & Brands</Typography>
                                    </Box>
                                </Stack>
                                <Drawer anchor='bottom' open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                                    <Box sx={{ p: 3, height: "80vh", overflowY: "auto" }}>
                                        <Typography variant="h6" gutterBottom>Brands</Typography>
                                        <BrandFilterList />
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="h6" gutterBottom>Categories</Typography>
                                        <CategoryFilterList />
                                    </Box>
                                </Drawer>
                            </Grid>
                        ) : (
                            <Grid size={{ sm: 3 }}>
                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<RemoveIcon />}>
                                        <Typography>Brand</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <BrandFilterList />
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion defaultExpanded>
                                    <AccordionSummary expandIcon={<RemoveIcon />}>
                                        <Typography>All Categories</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box sx={{ height: "400px", overflowY: "auto" }}>
                                            <CategoryFilterList />
                                        </Box>
                                        <Divider sx={{ my: 1 }} />
                                        <Button fullWidth startIcon={<RemoveIcon />} onClick={() => navigate('/product')}>Reset Filter</Button>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>
                        )}

                        <Grid size={{ xs: 12, sm: 9 }}>
                            <Box>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Search products..."
                                    value={searchVariable}
                                    onChange={(e) => {
                                        setSearchVariable(e.target.value);
                                        setPaginationDetails(prev => ({ ...prev, pageNo: 1 }));
                                    }}
                                />

                                <Grid container spacing={4} my={5}>
                                    {/* CLS OPTIMIZED LOADING STATE */}
                                    {loading && paginationDetails.pageNo === 1 ? (
                                        [1, 2, 3, 4, 5, 6].map((n) => (
                                            <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
                                                <Skeleton variant="rectangular" width="100%" sx={{ aspectRatio: '1/1' }} />
                                                <Skeleton variant="text" sx={{ mt: 1, fontSize: '1rem' }} />
                                                <Skeleton variant="text" width="60%" />
                                            </Grid>
                                        ))
                                    ) : productList.length === 0 ? (
                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant='overline' color='error'>No products found</Typography>
                                        </Grid>
                                    ) : (
                                        productList.map(product => (
                                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                                <Box onClick={() => navigate(`/${product.url_path}`)} sx={{ border: '1px solid #eee', cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                                                    <Box component="img" loading="lazy" decoding="async" src={urlAPI + product.image_url} alt={product.name} sx={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover', bgcolor: '#f9f9f9' }} />
                                                    <Box p={2}>
                                                        <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, textAlign: 'center' }}>{product.name}</Typography>
                                                        <Typography sx={{ fontSize: '.8rem', color: 'text.secondary', textAlign: 'center' }}>{product.category_name} / {product.color}</Typography>
                                                    </Box>
                                                </Box>
                                            </Grid>
                                        ))
                                    )}
                                </Grid>
                            </Box>

                            <Stack py={4} alignItems="center">
                                {paginationDetails.totalPages > paginationDetails.pageNo ? (
                                    <Button variant='outlined' color='error' disabled={loading} onClick={() => {
                                        setPaginationDetails(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
                                    }}>
                                        {loading ? "Loading..." : "Load More"}
                                    </Button>
                                ) : (
                                    productList.length > 0 && <Typography variant='overline' color='textDisabled'>End of results</Typography>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Product;