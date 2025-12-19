import { Autocomplete, Box, Container, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, TextField, Typography } from "@mui/material";
import bgImg from '../../img/bgDealer.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { dealerDetailList } from "../../Data";
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";

const Dealer = () => {
    const [ dealerList, setDealerList] = useState([]);
    
    useEffect(()=>{
         ServerApi(`/dealers/list`, 'GET', null, null)
            .then(res => res.json())
            .then(res=>{
                setDealerList(res.items)
            })
    },[]);

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

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Find Yourself A Dealer
                    </Typography>
                    
                    <Stack direction={{ sm: "column", md: "row"}} spacing={4}>
                    <Autocomplete fullWidth size="small" renderInput={(params) => <TextField {...params} label="Search Location" />} />
                    <Autocomplete fullWidth size="small" renderInput={(params) => <TextField {...params} label="Search District" />} />
                    <Autocomplete fullWidth size="small" renderInput={(params) => <TextField {...params} label="Search Thana/Upazila" />} />
                    </Stack>

                    <Box sx={{ mt: 5 }}>
                        <Grid container spacing={4}>
                            {
                                dealerList.map(item => (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                        <Box sx={{ border: '1px solid #ddd', p: 2, borderRadius: 1 }}>
                                            <Typography sx={{ fontWeight: 600, mb: 1 }}>{item.name}</Typography>
                                            <List>
                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <LocationOnIcon sx={{ color: "#ED1C24" }} />
                                                        </ListItemIcon>
                                                        <ListItemText>  <Typography sx={{ fontSize: '.9rem' }}>
                                                            {item.address}</Typography>
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>

                                                <ListItem disablePadding>
                                                    <ListItemButton>
                                                        <ListItemIcon>
                                                            <PhoneIcon sx={{ color: "#ED1C24" }} />
                                                        </ListItemIcon>
                                                        <ListItemText>  <Typography sx={{ fontSize: '.9rem' }}>
                                                            {item.phone}</Typography>
                                                        </ListItemText>
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Dealer;