import { Box, Stack, Typography } from "@mui/material"

const NoPage = () => {
    return (
        <Box sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `radial-gradient(circle closest-corner at 20% 20%, #811d1dff, #1e1e1eff)`
        }}>
            <Stack>
                <Typography variant="h1">404</Typography>
                <Typography variant="caption">Sorry but there is no such page.</Typography>
                <a href="/" style={{ color: "#b5b5b5ff"}}>click here to go back</a>
            </Stack>
        </Box>
    );
};

export default NoPage;