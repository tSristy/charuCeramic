import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import bgImg from '../../img/bg3.jpg';
import { homePageProductList } from '../../Data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ServerApi, imageAPI } from '../../route/ServerAPI';

const Product = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [productList, setProductList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);

    const currentSelected = category || null;

    const handleChange = (item) => {
        const path = currentSelected === item.slug ? '/product' : `/product/${item.slug}`;
        navigate(path);
    };



    useEffect(() => {
        const body = {
            pageNo: 0,
            category: category
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
                setProductList(res)
            })
    }, [category])

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
                        <Grid size={{ sm: 3 }}>
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
                                        <Button variant='none' startIcon={<RemoveIcon />}>Reset Filter</Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>

                            {/* </Box> */}
                        </Grid>
                        <Grid size={{ sm: 9 }}>
                            <Box>
                                <Autocomplete size="small" renderInput={(params) => <TextField {...params} label="Search" />} />

                                <Grid container spacing={4} my={5} sx={{ height: '700px', overflowY: "auto" }}>
                                    {productList.length === 0 &&
                                        (
                                            <Typography variant='overline' color='error'>No product in this category</Typography>
                                        )
                                        || productList.map(product => (
                                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                                <Box onClick={(e) => navigate(`/${product.id}`)}
                                                    sx={{
                                                        border: '1px solid #eee',
                                                        cursor: 'pointer',
                                                        // '&:hover .hoverEffect': {
                                                        //     borderBottom: '5px solid  #ED1C24',
                                                        //     filter: 'grayscale(0%)',
                                                        // }
                                                    }}>
                                                    <Box component="img" src={imageAPI + product.image_url} alt={product.name} className="hoverEffect" sx={{ display: 'block', width: '100%', height: '250px', objectFit: 'cover', borderBottom: '5px solid #ffffffff' }} />

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
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default Product;