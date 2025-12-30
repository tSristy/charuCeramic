import { Avatar, Badge, Box, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import BtnAdminSearch from "../Button/BtnAdminSearch";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ px: 2, bgcolor: "white", border: 1, borderColor: "#e2e8f0" }}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>

                <BtnAdminSearch />

                <Stack direction="row" sx={{ alignItems: "center" }}
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}>

                    <>
                        <Badge color="error" variant="dot">
                            <GppMaybeIcon />
                        </Badge>
                    </>

                    <>
                        <Stack direction="row" spacing={1}>
                            <Box> <Typography sx={{ fontSize: ".75rem", fontWeight: 500 }}>Admin</Typography>
                                <Typography sx={{ fontSize: ".7rem" }}>System Generated</Typography>
                            </Box>
                            <IconButton onClick={e => {
                                sessionStorage.removeItem('loginInfo');
                                navigate('/login')
                            }}>
                                <Avatar sx={{ bgcolor: "#e41212ff" }}>
                                    A
                                </Avatar>
                            </IconButton>
                        </Stack>
                    </>

                </Stack>
            </Stack>
        </Box>
    );
};

export default AdminHeader;