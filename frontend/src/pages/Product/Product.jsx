import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Container, Divider, Drawer, FormControlLabel, FormGroup, Grid, Pagination, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
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
    const [searchVariable, setSearchVariable] = useState("");
    const [selectBrand, setSelectedBrand] = useState('');
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });


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
        // Fetch Categories once
        ServerApi(`/category/show?displayVar=all`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => setCategoryList(res))
            .catch(err => console.error("Category Load Error:", err));
    }, []);

    useEffect(() => {
        setLoading(true);
        const body = {
            pageNo: paginationDetails.pageNo,
            category: category,
            searchVariable: searchVariable
        };

        ServerApi(`/product/list-by-cat`, "POST", null, body)
            .then(res => res.json())
            .then(res => {
                setProductList(prev => {
                    if (searchVariable !== '') return res.items;
                    
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
    }, [category, searchVariable, paginationDetails.pageNo]);

    return (
        <>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ED1C24",
                display: 'block',
                aspectRatio: '16/5',
                objectFit: 'cover', width: '100%',
                height: "100%",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />

            <Box py={10}>
                <Container>
                    <Grid container spacing={4}>
                        {
                            isSmallScreen ?
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
                                :
                                <Grid size={{  sm: 3 }}>
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
                        }
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

                                <Grid container spacing={4} my={5} >
                                    {productList.length === 0 && !loading ? (
                                    <Grid item xs={12}>
                                        <Typography variant='overline' color='error'>No products found</Typography>
                                    </Grid>
                                ) : (
                                    productList.map(product => (
                                        <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                            <Box onClick={() => navigate(`/${product.url_path}`)} sx={{ border: '1px solid #eee', cursor: 'pointer', transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                                                <Box component="img" src={urlAPI + product.image_url} alt={product.name} sx={{ display: 'block', width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} />
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