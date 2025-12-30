import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material"
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import { useContext, useState } from "react";
import logo from '../../img/charu_logo.png';
import { useNavigate } from "react-router-dom";
import { ServerApi } from "../../route/ServerAPI";
import { AuthContext } from "../../route/AuthContext";

const Login = () => {
    const navigate = useNavigate();

    const { loginFun } = useContext(AuthContext);

    const [userDetail, setUserDetail] = useState({
        username: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = () => {
        ServerApi(`/login`, 'POST', null, userDetail)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.access_token) {
                    loginFun(res)
                    navigate('/product-list')
                }
                else setErrMsg(res.message)
            })
    }

    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `radial-gradient(circle closest-corner at 20% 20%, #811d1dff, #1e1e1eff)`
        }}>

            <Box sx={{
                width: '380px',
                borderRadius: 2,
                border: 1,
                bgcolor: "#41414132",
                borderColor: "#ededed4a",
                p: 7,
                color: "#dfe6ecff"
            }}>
                <Stack direction="column">
                    <Box component="img" src={logo} sx={{
                        height: "90px",
                        objectFit: "contain",
                        "&:hover": { cursor: "pointer" },
                    }}
                        onClick={(e) => { navigate('/') }} />

                    <Typography sx={{ color: "#dfe6ecff", fontSize: ".8rem", fontWeight: 500, mb: 1 }}>Username</Typography>
                    <TextField size="small" fullWidth sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#dfe6ecff",
                            height: "35px",

                            "& fieldset": {
                                border: "none"
                            },
                            "&:hover fieldset": {
                                border: "none"
                            },
                            "&.Mui-focused fieldset": {
                                border: "none"
                            }
                        },

                        /* INPUT TEXT */
                        "& .MuiOutlinedInput-input": {
                            fontSize: "13px",
                            padding: "6px 10px"
                        },


                    }} onChange={(e)=>setUserDetail(prev=>({...prev, username: e.target.value}))}
                    />

                    <Typography sx={{ color: "#dfe6ecff", fontSize: ".8rem", fontWeight: 500, mb: 1 }}>Password</Typography>
                    <TextField size="small" fullWidth sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#dfe6ecff",
                            height: "35px",

                            "& fieldset": {
                                border: "none"
                            },
                            "&:hover fieldset": {
                                border: "none"
                            },
                            "&.Mui-focused fieldset": {
                                border: "none"
                            }
                        },

                        /* INPUT TEXT */
                        "& .MuiOutlinedInput-input": {
                            fontSize: "13px",
                            padding: "6px 10px"
                        }
                    }}
                        type={showPassword ? 'text' : 'password'}
                        slotProps={{
                            input: {
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end">
                                            {showPassword ? <FullscreenExitOutlinedIcon /> : <FullscreenOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                            }
                        }} onChange={(e)=>setUserDetail(prev=>({...prev, password: e.target.value}))}
                    />

                    <Button color="error" variant="contained" onClick={handleLogin}>Login</Button>
                </Stack>
            </Box>
        </Box>
    );
};

export default Login;