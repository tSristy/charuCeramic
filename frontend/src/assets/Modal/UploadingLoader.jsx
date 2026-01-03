import { Backdrop, Stack, Typography, CircularProgress } from "@mui/material";

const UploadingLoader = ({ loading }) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                flexDirection: 'column'
            }}
            open={loading}
        >
            <Stack alignItems="center" spacing={2}>
                <CircularProgress color="inherit" />
                <Typography variant="h6">Uploading Data...</Typography>
                <Typography variant="caption">Please do not refresh the page</Typography>
            </Stack>
        </Backdrop>
    );
};

export default UploadingLoader;
