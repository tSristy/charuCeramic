import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";

const CTA = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            bgcolor: "#ff0000ff",
            py: 2,
        }}>
            <Container>
                <Stack direction={{ sm: "row" }} sx={{
                    alignItems: "center"
                }}>
                    <Typography variant="h6" sx={{
                        color: "white",
                        mr: "auto"
                    }}>Expert Consultation For Bathrooms</Typography>
                    <TextField size="small" placeholder="Email Address" variant="outlined" color="error" slotProps={{
                        input: {
                           sx:{
                            bgcolor: "white"
                           }
                        }
                    }} />
                    <Button variant="none" onClick={(e)=>{
                        navigate("/contact")
                    }} sx={{
                        ml: 4,
                        bgcolor: "white",
                        fontWeight: 500
                    }}>Get Started</Button>
                </Stack>
            </Container>
        </Box>
    );
};

export default CTA;