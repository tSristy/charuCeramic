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

    const currentSelected = category || null;
    const [state, setState] = useState({
        bottom: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const handleChange = (item) => {
        const path = currentSelected === item.slug ? '/product' : `/product/${item.slug}`;
        isSmallScreen ? toggleDrawer('bottom', false) : null;
        navigate(path);
    };
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });
    const [searchVar, setSearchVar] = useState(" ");

    useEffect(() => {
        const body = {
            pageNo: paginationDetails.pageNo,
            category: category,
            searchVar: searchVar
        };
        ServerApi(`/category/show?displayVar=all`, "GET", null, null)
            .then((res) => res.json())
            .then((res) => {
                setCategoryList(res);
            })

        ServerApi(`/product/list-by-cat`, "POST", null, body)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                setProductList(res.items);
                setPaginationDetails(previousState => {
                    return {
                        ...previousState,
                        totalRows: res.totalRows,
                        totalPages: Math.ceil(res.totalRows / 12)
                    }
                });
            })
    }, [category, searchVar, paginationDetails.pageNo])

    return (
        <>

            <Box sx={{
                borderBottom: 4,
                borderColor: "#ED1C24",
                display: 'block',
                width: "100%",
                height: "350px",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />

            <Box py={10}>
                <Container>
                    <Grid container spacing={4}>
                        {
                            isSmallScreen ?
                             <Grid size={{ xs: 12 }}>
                                    <Stack direction='row' sx={{alignItems: "center", border:1, p:2, borderColor: '#d9d9d9ff', borderRadius:2}} spacing={2} onClick={(e)=>toggleDrawer('bottom', true)}>
                                        <TuneOutlinedIcon sx={{border:1}}/>
                                       <Box>
                                         <Typography variant='subtitle2'>Filter</Typography>
                                        <Typography variant='h6'>Catagories</Typography>
                                        </Box>
                                    </Stack>
                                <Drawer
                                    anchor='bottom'
                                    open={state['bottom']}
                                    onClose={toggleDrawer('bottom', false)}
                                >
                                    <Box
                                        sx={{
                                            borderRadius:3,
                                            height: "80vh",
                                            overflowY: "auto"
                                        }}
                                    >
                                        <Stack direction='row' sx={{alignItems: "center", border:1, p:2, borderColor: '#d9d9d9ff', borderRadius:2}} spacing={2} onClick={(e)=>toggleDrawer('bottom', false)}>
                                        <TuneOutlinedIcon sx={{border:1}}/>
                                       <Box>
                                         <Typography variant='subtitle2'>Filter</Typography>
                                        <Typography variant='h6'>Catagories</Typography>
                                        </Box>
                                    </Stack>
                                        <FormGroup sx={{ p:4}}>
                                            {categoryList.map((item) => (
                                                <FormControlLabel
                                                    key={item.cID}
                                                    control={
                                                        <Checkbox
                                                            checked={currentSelected === item.slug}
                                                            onChange={() => handleChange(item)}
                                                        />
                                                    }
                                                    label={item.cName}
                                                    sx={{
                                                        "& .MuiFormControlLabel-label": {
                                                            fontSize: ".9rem",
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </FormGroup>
                                    </Box>
                                </Drawer>
                            </Grid>
                                :
                                <Grid size={{ xs: 12, sm: 3 }}>
                                    {/* <Box sx={{
                                boxShadow: 1,
                                p: 2,
                                height: "450px",
                                overflowY: "auto" 
                            }}> */}

                                    <Accordion defaultExpanded>
                                        <AccordionSummary
                                            expandIcon={<RemoveIcon />}
                                            aria-controls="panel3-content"
                                            id="panel3-header"
                                        >
                                            <Typography component="span">All Catagory</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails >
                                            <Box
                                                sx={{
                                                    height: "400px",
                                                    overflowY: "auto",
                                                }}
                                            >
                                                <FormGroup>
                                                    {categoryList.map((item) => (
                                                        <FormControlLabel
                                                            key={item.cID}
                                                            control={
                                                                <Checkbox
                                                                    checked={currentSelected === item.slug}
                                                                    onChange={() => handleChange(item)}
                                                                />
                                                            }
                                                            label={item.cName}
                                                            sx={{
                                                                "& .MuiFormControlLabel-label": {
                                                                    fontSize: ".9rem",
                                                                },
                                                            }}
                                                        />
                                                    ))}
                                                </FormGroup>
                                            </Box>

                                            <Divider sx={{ my: 1 }} />
                                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                <Button variant='none' startIcon={<RemoveIcon />} onClick={(e) => navigate('/product')}>Reset Filter</Button>
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* </Box> */}
                                </Grid>

                        }
                        <Grid size={{ xs: 12, sm: 9 }}>
                            <Box>
                                <TextField fullWidth size="small" onChange={(e) => setSearchVar(e.target.value)} label="Search" />

                                <Grid container spacing={4} my={5} sx={{ height: '700px', overflowY: "auto" }}>
                                    {productList.length === 0 &&
                                        (
                                            <Typography variant='overline' color='error'>No product in this category</Typography>
                                        )
                                        || productList.map(product => (
                                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                                <Box onClick={(e) => navigate(`/${product.url_path}`)}
                                                    sx={{
                                                        border: '1px solid #eee',
                                                        cursor: 'pointer',
                                                        // '&:hover .hoverEffect': {
                                                        //     borderBottom: '5px solid  #ED1C24',
                                                        //     filter: 'grayscale(0%)',
                                                        // }
                                                    }}>
                                                    <Box component="img" src={urlAPI + product.image_url} alt={product.name} className="hoverEffect" sx={{ display: 'block', width: '100%', aspectRatio: { xs: '1/1' }, height: 'auto', objectFit: 'cover', borderBottom: '5px solid #ffffffff' }} />

                                                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, textAlign: 'center', mt: 1 }}>
                                                        {product.name}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '.8rem', fontWeight: 400, textAlign: 'center', mb: 2 }}>
                                                        {product.category_name} / {product.color}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>

                            <Pagination color="error" shape="rounded" hidePrevButton hideNextButton siblingCount={0}
                                boundaryCount={3}
                                count={paginationDetails.totalPages}
                                page={paginationDetails.pageNo}
                                sx={{ '& .MuiPagination-ul': { gap: 1 }, display: 'flex', justifyContent: 'center' }}
                                onChange={(e, value) => {
                                    setPaginationDetails(previousState => {
                                        return { ...previousState, pageNo: value }
                                    })
                                }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Product;