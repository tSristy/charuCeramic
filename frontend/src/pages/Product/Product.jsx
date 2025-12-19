import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Checkbox, Container, Divider, FormControlLabel, FormGroup, Grid, TextField, Typography } from '@mui/material';
import bgImg from '../../img/bgDealer.jpg';
import { catalogyList, homePageProductList } from '../../Data';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveIcon from '@mui/icons-material/Remove';

const Product = () => {

    const handleChange = (e) => {
        console.log(e.target.name)
        // setState({
        //   ...state,
        //   [e.target.name]: e.target.checked,
        // });
    };

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
                                    <Box sx={{
                                        height: "400px",
                                        overflowY: "auto"
                                    }}>
                                        <FormGroup>
                                            {
                                                catalogyList.map(item => (
                                                    <FormControlLabel key={item.id} control={<Checkbox color="default" onChange={handleChange} name={item.id} />} label={item.title} sx={{

                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: '.9rem'
                                                        }
                                                    }} />
                                                ))
                                            }
                                        </FormGroup></Box>
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
                                
                                 <Grid container spacing={4} my={5}>
                                                        {homePageProductList.map(product => (
                                                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                                                <Box sx={{
                                                                    border: '1px solid #eee',
                                                                    cursor: 'pointer',
                                                                    '&:hover .hoverEffect': {
                                                                        borderBottom: '5px solid  #ED1C24',
                                                                        filter: 'grayscale(0%)',
                                                                    }
                                                                }}>
                                                                    <Box component="img" src={product.imgSrc} alt={product.productName} className="hoverEffect" sx={{ display: 'block', filter: 'grayscale(100%)', width: '100%', height: '250px', objectFit: 'cover', borderBottom: '5px solid #ffffffff' }} />
                                
                                                                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, textAlign: 'center', mt: 1 }}>
                                                                        {product.productName}
                                                                    </Typography>
                                                                    <Typography sx={{ fontSize: '.8rem', fontWeight: 400, textAlign: 'center', mb: 2 }}>
                                                                        View collection
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