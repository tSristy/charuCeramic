import { Autocomplete, Box, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Pagination, Stack, TextField, Typography } from "@mui/material";
import bgImg from '../../img/Dealer_page.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";
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
                if(res){
                setDealerList(res.items);
                setPaginationDetails(previousState => {
                    return {
                        ...previousState,
                        totalRows: res.totalRows,
                        totalPages: Math.ceil(res.totalRows / 12)
                    }
                });
            }
            else return;
    })
    }, [searchVariable,paginationDetails.pageNo]);

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

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Find Yourself A Dealer
                    </Typography>

                    <Stack direction={{ sm: "column", md: "row" }} spacing={4}>
                       <TextField  fullWidth size="small" onChange={(e)=>setSearchVariable(prev=>({...prev, find: e.target.value }))} label="Search" />
                       
                        <Autocomplete fullWidth size="small" onChange={(e,newVal)=>setSearchVariable(prev=>({...prev, division: newVal }))} 
                        options={divisions} renderInput={(params) => <TextField {...params} label="Search Divison" />} />

                        <Autocomplete fullWidth size="small" onChange={(e,newVal)=>setSearchVariable(prev=>({...prev, district: newVal }))} 
                         options={searchVariable.division ? districtsByDivision[searchVariable.division] || [] : []}
                                                 renderInput={(params) => <TextField {...params} label="Search District" />} freeSolo/>
                    </Stack>

                    <Box sx={{ m: 5 }}>
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
                                        '&:hover':{

                                            bgcolor: '#000000ff',
                                        },
                                        '&:hover .hoverEffect':{
                                            cursor: "pointer",
                                            color: '#fff',
                                        },
                                        borderRadius: 2,
                                        p: 3, boxShadow: 1
                                    }}>
                                        <Typography className="hoverEffect" sx={{ fontWeight: 600, textAlign: "center", mb: 2 }}>{item.name}</Typography>
                                        <Stack direction="column" spacing={2}>
                                            <Stack direction="row" spacing={1}>
                                                <LocationOnIcon sx={{ color: "#ED1C24" }} />
                                                <Typography className="hoverEffect" sx={{ fontSize: '.9rem' }}> {item.address}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <PhoneIcon sx={{ color: "#ED1C24" }} />
                                                <Typography className="hoverEffect" sx={{ fontSize: '.9rem' }}>{item.phone}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>

                    <Pagination color="error" shape="rounded" hidePrevButton hideNextButton siblingCount={0}
                        boundaryCount={3}
                        count={paginationDetails.totalPages}
                        page={paginationDetails.pageNo}
                        sx={{ '& .MuiPagination-ul': { gap: 3 }, display: 'flex', justifyContent: 'center' }}
                        onChange={(e, value) => {
                            setPaginationDetails(previousState => {
                                return { ...previousState, pageNo: value }
                            })
                        }} />
                </Container>
            </Box>
        </>
    );
};

export default Dealer;