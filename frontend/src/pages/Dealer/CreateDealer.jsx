import { useEffect, useState } from "react";
import { TextField, Autocomplete, Stack, Container, Typography, Box, IconButton, Divider, Grid, Snackbar, Alert } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi } from "../../route/ServerAPI";
import { districtsByDivision, divisions } from "./data";
import FormLabel from "../../assets/FormLabel/FormLabel";

import SyncIcon from '@mui/icons-material/Sync';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import UploadingLoader from "../../assets/Modal/UploadingLoader";

const CreateDealer = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const [dealer, setDealer] = useState({
        name: "",
        address: "",
        phone: "",
        division: null,
        district: null,
        thana: null
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        if (ID) {
            handleUpdate();
            return;
        } else {
            ServerApi(`/dealer/add`, "POST", null, dealer)
                .then((res) => res.json())
                .then((res) => {
                    setOpenAlert(true);
                setLoading(false);
                setMsgText(res);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleUpdate = () => {
        ServerApi(`/dealer/update/` + ID, "PUT", null, dealer)
            .then((res) => res.json())
            .then((res) => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);
            })
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
        if (ID === null) {
            navigate('/dealer-list');
        } else {
            ServerApi(`/dealer/delete/` + ID, "DELETE", null, null)
                .then((res) => res.json())
                .then((res) => console.log("delete response:", res))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/dealer/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setDealer({
                        id: res.id,
                        name: res.name,
                        address: res.address,
                        phone: res.phone,
                        division: res.division,
                        district: res.district,
                        thana: res.thana
                    });
                });
        }
    }, [ID]);

    return (
        <Box bgcolor={"#f8fafc"} py={5}>
             {loading && <UploadingLoader loading={true} />}
                        <Snackbar
                            open={openAlert}
                            autoHideDuration={3000}
                            onClose={handleAlertClose}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        >
                            {msgText && typeof msgText === "object" && Object.keys(msgText).length > 0 && (
                                <Alert
                                    onClose={handleAlertClose}
                                    severity={
                                        Object.keys(msgText)[0] === "message"
                                            ? "success"
                                            : "error"
                                    }
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {Object.values(msgText)[0]}
                                </Alert>
                            )}
                        </Snackbar>
            <Container>
                {/* ------------------------Title and Description------------------------ */}
                <Box mb={3}>
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> Dealer Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Add, monitor, and analyze your authorized dealer network across divisions.</Typography>
                </Box>


                <Grid container spacing={2} mb={3}>
                    <Grid size={{ sm: 12, md: 8 }}>
                        {/* --------------------------Form Section------------------------- */}
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update Dealer" : "Register New Dealer"}</Typography>
                                <IconButton onClick={(e)=>window.location.reload()}>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />


                            <form onSubmit={handleSubmit}>
                                <Box p={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Dealer Name" icon={<PersonOutlineOutlinedIcon />} />
                                            <TextField size="small" required fullWidth value={dealer.name} onChange={(e) => setDealer(p => ({ ...p, name: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Contact Number" icon={<PhoneOutlinedIcon />} />
                                            <TextField required size="small" fullWidth value={dealer.phone} onChange={(e) => setDealer(p => ({ ...p, phone: e.target.value }))} />
                                        </Grid>


                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Division" icon={<LanguageIcon />} />
                                            <Autocomplete size="small" required
                                                options={divisions}
                                                value={dealer.division}
                                                onChange={(_, newVal) => setDealer(p => ({ ...p, division: newVal }))}
                                                renderInput={(params) => <TextField {...params} />}
                                                freeSolo
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="District" icon={<ApartmentIcon />} />
                                            <Autocomplete size="small" required
                                                options={dealer.division ? districtsByDivision[dealer.division] || [] : []}
                                                value={dealer.district}
                                                onChange={(_, newVal) => setDealer(p => ({ ...p, district: newVal }))}
                                                renderInput={(params) => <TextField {...params} />}
                                                freeSolo
                                            />
                                        </Grid>

                                        <Grid size={{ xs: 12, sm: 6 }}>
                                            <FormLabel text="Thana" icon={<LocationOnOutlinedIcon />} />
                                            <TextField fullWidth size="small" value={dealer.thana} onChange={(e) => setDealer(p => ({ ...p, thana: e.target.value }))} />
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <FormLabel text="Address" />
                                            <TextField fullWidth multiline required
                                                rows={2} size="small" value={dealer.address} onChange={(e) => setDealer(p => ({ ...p, address: e.target.value }))} />
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


                    <Grid size={{ sm: 12, md: 4 }}>
                        {/* --------------------------Info Section------------------------- */}
                        <Box sx={{ bgcolor: "#ff0000ff", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Ensuring the Thana and District are accurate helps us to calculate territory saturation and logistics feasibility for this specific location.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    );
};

export default CreateDealer;