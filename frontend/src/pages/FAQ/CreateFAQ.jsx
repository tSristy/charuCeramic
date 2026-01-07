import { useEffect, useState } from "react";
import { TextField, Stack, Container, Typography, Box, IconButton, Divider, Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { ServerApi } from "../../route/ServerAPI";
import FormLabel from "../../assets/FormLabel/FormLabel";

import SyncIcon from '@mui/icons-material/Sync';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

const CreateFAQ = () => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [ID] = useState(searchParam.get("id") || null);

    const [quesList, setQuesList] = useState({
        question: "",
        answer: ""
    });


    const handleSubmit = () => {
        if (ID) {
            handleUpdate();
            return;
        } else {
            ServerApi(`/faq/add`, "POST", null, quesList)
                .then((res) => res.json())
                .then((res) => {
                    console.log("create response:", res);
                })
                .catch((err) => console.error(err));
        }
    };

    const handleUpdate = () => {
        ServerApi(`/faq/update/` + ID, "PUT", null, quesList)
            .then((res) => res.json())
            .then((res) => console.log("update response:", res))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
         if (ID === null) {
            navigate('/faq-list');
        } else {
            ServerApi(`/faq/delete/` + ID, "DELETE", null, null)
            .then((res) => res.json())
            .then((res) => console.log("delete response:", res))
            .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/faq/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setQuesList({
                        id: res.id,
                        question: res.question,
                        answer: res.answer
                    });
                });
        }
    }, [ID]);

    return (
        <Box bgcolor={"#f8fafc"} py={5}>
            <Container>
                {/* ------------------------Title and Description------------------------ */}
                <Box mb={3}>
                    <Typography variant="h5" fontWeight={600} mt={5} mb={1}> FAQ Management</Typography>
                    <Typography variant="overline" color="text.secondary"> Add, monitor, and analyze your Frequently Asked Questions so you can have the best understanding of your services.</Typography>
                </Box>


                <Grid container spacing={2} mb={3}>
                    <Grid item size={{ sm: 12, md: 8 }}>
                        {/* --------------------------Form Section------------------------- */}
                        <Box sx={{ bgcolor: "#fff", border: 1, borderColor: "#e2e8f0", borderRadius: 2 }}>
                            <Stack direction="row" sx={{ p: 3, justifyContent: "space-between", alignItems: "center" }}>
                                <Typography fontSize={"1.12rem"} fontWeight={600}>{ID ? "Update FAQ" : "Create New FAQ"}</Typography>
                                <IconButton>
                                    <SyncIcon color="disabled" />
                                </IconButton>
                            </Stack>
                            <Divider />

                            <Box p={3}>
                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12 }}>
                                        <FormLabel text="Question" icon={<PsychologyAltIcon />} />
                                        <TextField size="small" multiline rows={2} fullWidth value={quesList.question} onChange={(e) => setQuesList(p => ({ ...p, question: e.target.value }))} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <FormLabel text="Answer" icon={<QuestionAnswerIcon />} />
                                        <TextField size="small" multiline rows={4} fullWidth value={quesList.answer} onChange={(e) => setQuesList(p => ({ ...p, answer: e.target.value }))} />
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <Stack direction="row" spacing={2} justifyContent="space-between">
                                            <BtnAdminSubmit onClick={handleDelete} text={ID ? "Delete" : "Go Back"} />
                                            <BtnAdminSubmit onClick={handleSubmit} text={ID ? "Update" : "Create"} />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>


                    <Grid item size={{ sm: 12, md: 4 }}>
                        {/* --------------------------Info Section------------------------- */}
                        <Box sx={{ bgcolor: "#ff0000ff", border: 1, borderColor: "#e2e8f0", borderRadius: 2, p: 3 }}>
                            <Typography sx={{ color: "#fff", fontSize: '1.12rem', fontWeight: 500 }} color="">Pro Tip</Typography>
                            <Typography sx={{ color: "#fff", fontSize: '.85rem' }}>Better you keep your data with the most asked questions and answer it with the experts.</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        </Box>
    );
};

export default CreateFAQ;