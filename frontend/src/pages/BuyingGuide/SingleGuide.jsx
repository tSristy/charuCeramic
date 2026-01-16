import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnOpenInTab from "../../assets/Button/BtnDownload";

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
                <Typography sx={{ fontSize: '2.7rem', fontWeight: 600, color: '#2b2b2b' }}>{guideDetail.title}</Typography>
                 <Box my={4}>
                 <BtnOpenInTab fileUrl={guideDetail.file_path}><Box sx={{ py: 1.5, textAlign: 'center', borderRadius: 2, width: '100%', color: "#fff", bgcolor: "#ff0000" }}>DOWNLOAD GUIDE</Box> </BtnOpenInTab>
                 </Box>
                        
                <Box
                    component="img"
                    src={urlAPI + guideDetail.featured_image}
                    sx={{
                        width: { xs: '100%', md: '50%' },
                        float: { md: 'left' },
                        mr: { md: 4 },
                        mb: 4,
                        borderRadius: 2,
                        aspectRatio: '16/9',
                        objectFit: 'cover'
                    }}
                />

                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: guideDetail.content }}
                />

            </Container>
        </Box>
    );
};

export default SingleGuide;