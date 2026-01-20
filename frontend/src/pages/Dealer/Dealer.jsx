import { Autocomplete, Box, Button, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import bgImg from '../../img/Dealer_page.png';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import { districtsByDivision, divisions } from "./data";

const Dealer = () => {
    const [dealerList, setDealerList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });
    const [searchVariable, setSearchVariable] = useState({
        find: "",
        district: "",
        division: "",

    })

    useEffect(() => {
        const body = {
            searchVariable: searchVariable,
            pageNo: paginationDetails.pageNo
        };
        ServerApi(`/dealer/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setDealerList(prev => {
                    if (paginationDetails.pageNo === 1) {
                        return res.items;
                    }

                    const map = new Map();
                    [...prev, ...res.items].forEach(item => map.set(item.id, item));
                    return Array.from(map.values());
                });
                setPaginationDetails(previousState => {
                    return {
                        ...previousState,
                        totalRows: res.totalRows,
                        totalPages: Math.ceil(res.totalRows / 12)
                    }
                });
            })
    }, [searchVariable, paginationDetails.pageNo]);

    const [bannerImg, setBannerImg] = useState(null);

    useEffect(() => {
        ServerApi(`/banner?pageName=DEALER&sectionValue=DL01`, "GET", null, null)
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

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        FIND A STORE
                    </Typography>

                    <Stack direction={{ sm: "column", md: "row" }} spacing={4}>
                        <TextField fullWidth size="small" onChange={(e) => { setPaginationDetails(prev => ({ ...prev, pageNo: 1 })); setSearchVariable(prev => ({ ...prev, find: e.target.value })) }} label="Search" />

                        <Autocomplete fullWidth size="small" onChange={(e, newVal) => { setPaginationDetails(prev => ({ ...prev, pageNo: 1 })); setSearchVariable(prev => ({ ...prev, division: newVal })) }}
                            options={divisions} renderInput={(params) => <TextField {...params} label="Search Divison" />} />

                        <Autocomplete fullWidth size="small" onChange={(e, newVal) => { setPaginationDetails(prev => ({ ...prev, pageNo: 1 })); setSearchVariable(prev => ({ ...prev, district: newVal })) }}
                            options={searchVariable.division ? districtsByDivision[searchVariable.division] || [] : []}
                            renderInput={(params) => <TextField {...params} label="Search District" />} freeSolo />
                    </Stack>

                    <Box sx={{ my: 5 }}>
                        <Grid container spacing={4}
                            direction="row"
                            sx={{
                                justifyContent: "center",
                                alignItems: "stretch",
                            }}>
                            {
                                dealerList?.map(item => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id} sx={{
                                        // border: '1px solid #ddd', \
                                        '&:hover': {

                                            bgcolor: '#000000ff',
                                        },
                                        '&:hover .hoverEffect': {
                                            cursor: "pointer",
                                            color: '#fff',
                                        },
                                        borderRadius: 2,
                                        p: 3, boxShadow: 1
                                    }}>
                                        <Typography className="hoverEffect" sx={{ fontWeight: 600, textAlign: "center", mb: 2 }}>{item.name}</Typography>
                                        <Stack direction="column" spacing={2}>
                                            <Stack direction="row" spacing={1}>
                                                <LocationOnIcon sx={{ color: "#ff0000" }} />
                                                <Typography className="hoverEffect" sx={{ fontSize: '.9rem' }}> {item.address}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <PhoneIcon sx={{ color: "#ff0000" }} />
                                                <Typography className="hoverEffect" sx={{ fontSize: '.9rem' }}>{item.phone}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                    <Stack py={4} alignItems="center">
                        {paginationDetails.totalPages > paginationDetails.pageNo ? (
                            <Button variant='outlined' color='error' onClick={() => {
                                setPaginationDetails(prev => ({ ...prev, pageNo: prev.pageNo + 1 }));
                            }}>
                                Load More
                            </Button>
                        ) : (
                            dealerList.length > 0 && <Typography variant='overline' color='textDisabled'>End of results</Typography>
                        )}
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default Dealer;