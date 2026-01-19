import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServerApi, urlAPI } from "../../route/ServerAPI";

const SingleGuide = () => {
    const { path } = useParams();
    const navigate = useNavigate();
    const [guideDetail, setGuideDetail] = useState({});

    useEffect(() => {
        ServerApi(`/guide?url_path=${path}`, "GET", null, null)
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                if (res === 404) { navigate("/404-not-found", { replace: true }); }
                setGuideDetail(res);
            })
    }, [path])


    return (
        <Box py={10}>
            <Container>
                <Grid container direction='row' sx={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography sx={{ fontSize: '3rem', fontWeight: 600, color: '#6c6c6c', mb: 3 }}>{guideDetail.title}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Box
                            component="img" fetchPriority="high"
                            src={urlAPI + guideDetail.featured_image}
                            sx={{
                                width: '100%',
                                borderRadius: 2,
                                aspectRatio: '43/32',
                                objectFit: 'cover'
                            }}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 5, fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>
                    <div className="rendered-content" dangerouslySetInnerHTML={{ __html: guideDetail.content }} />
                </Box>
            </Container>
        </Box>
    );
};

export default SingleGuide;