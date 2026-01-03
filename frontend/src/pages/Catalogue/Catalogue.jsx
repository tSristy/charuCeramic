import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import bgImg from '../../img/bg1.jpg';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnOpenInTab from "../../assets/Button/BtnDownload";

const Catalogue = () => {
    const [catalogueList, setCatalogueList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
            pageNo: 1,
            totalRows: 0,
            totalPages: 0
        });
        const [searchVariable, setSearchVariable] = useState(null);
    
        useEffect(() => {
            const body = { pageNo: paginationDetails.pageNo };
            ServerApi(`/catalogue/list`, 'POST', null, body)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                    setCatalogueList(res.items);
                    setPaginationDetails(prev => ({
                        ...prev,
                        totalRows: res.totalRows,
                        totalPages: Math.ceil(res.totalRows / 10)
                    }));
                })
                .catch(err => console.error(err));
        }, [paginationDetails.pageNo]);
    

    return (
        <Box sx={{ bgcolor: "#fff" }}>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ED1C24",
                display: 'block',
                width: "100%",
                height: "350px",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 10, textAlign: 'center' }}>
                        Catalogue Collections
                    </Typography>


                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {
                                catalogueList.lenth !== 0 && catalogueList.filter(general=> parseInt(general.summary)===0)
                                .map(item => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <BtnOpenInTab fileUrl={item.file_path}>
                                            <Box sx={{
                                                bgcolor: "white", '&:hover .hoverEffect': {
                                                    // filter: "grayscale(0%)",
                                                    borderBottom: 2,
                                                    overflow: 'hidden',
                                                    transition: "all 0.3s ease-in-out"
                                                }
                                            }}>
                                                <Box className="hoverEffect"
                                                    component="img"
                                                    src={urlAPI + item.featured_image}
                                                    sx={{
                                                        // filter: "grayscale(100%)",
                                                        display: 'block',
                                                        width: "100%",
                                                        height: "470px",
                                                        objectFit: "cover",
                                                    }} />
                                                <Box sx={{ p: 2 }}>
                                                    <Stack direction="column" justifyContent="center" alignItems="center" >
                                                        <Typography sx={{ fontSize: '1.2rem', textAlign: "center", fontWeight: 600 }}>
                                                            {item.title.toUpperCase()}
                                                        </Typography>

                                                        <Button variant="none" className="hoverEffect" sx={{
                                                            width: "200px", p: 0, m: 0, borderRadius: 0, fontSize: '1.2rem', color: '#0065caff', fontWeight: '600',
                                                            borderBottom: 0,
                                                        }}>
                                                            READ MORE
                                                            <Box sx={{ fontWeight: 400, bgcolor: "red", fontSize: '.6rem', ml: 1, px: 1, color: "#fff" }}>PDF</Box>
                                                        </Button>
                                                    </Stack>
                                                </Box>
                                            </Box>
                                        </BtnOpenInTab>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Container>
            </Box>


            <Box sx={{ py:10}}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 10, textAlign: 'center' }}>
                        Product Series
                    </Typography>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {
                                catalogueList.filter(products=>parseInt(products.summary) === 1)
                                .map(item => (
                                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                        <BtnOpenInTab fileUrl={item.file_path}>
                                            <Box sx={{
                                                borderRadius: 2, '&:hover .hoverEffect': {
                                                    filter: "grayscale(0%)",
                                                    transition: "all 0.3s ease-in-out"
                                                }
                                            }}>

                                                <Box className="hoverEffect"
                                                    component="img"
                                                    src={urlAPI + item.featured_image}
                                                    sx={{
                                                        filter: "grayscale(100%)",
                                                        display: 'block',
                                                        width: "100%",
                                                        height: "350px",
                                                        objectFit: "cover",
                                                    }} />
                                                <Box sx={{ p: 2 }}>
                                                    <Typography variant="h6" textAlign={'center'}>
                                                        {item.title}
                                                    </Typography>
                                                    <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                                        <Button color='error'>
                                                            Read More
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </BtnOpenInTab>
                                    </Grid>
                                ))
                            }
                        </Grid>
                        </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Catalogue;