import { Alert, Box, Snackbar } from "@mui/material";
import TiptapEditor from "../../assets/FormLabel/TiptapEditor";
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import UploadingLoader from "../../assets/Modal/UploadingLoader";

const CreateTerms = () => {
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [msgText, setMsgText] = useState({});

    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    useEffect(() => {
        ServerApi(`/policy-terms/2`, "GET", null, null)
            .then(res => res.json())
            .then(res => {
                setDetails(res.content);
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        ServerApi(`/policy-terms/update/2`, "PUT", null, { content: details })
            .then((res) => res.json())
            .then((res) => {
                setOpenAlert(true);
                setLoading(false);
                setMsgText(res);
            })
            .catch((err) => console.error(err));
    };

    return (
        <Box p={5}>
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

            <TiptapEditor
                initialValue={details}
                onChange={(html) => setDetails(html)}
            />
            <Box my={2}>
            <BtnAdminSubmit onClick={handleSubmit} text={"Update"} />
            </Box>
        </Box>
    );
}

export default CreateTerms;