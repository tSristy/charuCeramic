import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ServerApi, urlAPI } from "../../route/ServerAPI";

const SingleNews = () => {
    const { path } = useParams();
    const navigate = useNavigate();
    const [newsDetail, setNewsDetail] = useState({});

    useEffect(() => {
        ServerApi(`/blog?url_path=${path}`, "GET", null, null)
            .then((res) => res.json())
            .then(res => {
                if (res === 404) { navigate("/404-not-found", { replace: true }); }
                setNewsDetail(res);
            })
    }, [path])


    return (
        <Box py={10}>
            <Container>
                <Box component='img' src={urlAPI + newsDetail.featured_image} fetchPriority="high" loading="eager"
                    sx={{
                        mb: 5,
                        width: '100%',
                        aspectRatio: '86/54',
                        objectFit: 'cover'
                    }} />

                <Box sx={{ px: { sm: 5, md: 10 } }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '3rem', fontWeight: 600, color: '#6c6c6c', mb: 3 }}>{newsDetail.title}</Typography>

                    <Box sx={{ mt: 5, fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>
                        <div
                            className="rendered-content"
                            dangerouslySetInnerHTML={{ __html: newsDetail.content?.split('.').slice(0, 3).join('.') }}
                        />
                    </Box>

                    {newsDetail.featured_image_2 && <Box component='img' loading="lazy" decoding="async" src={urlAPI + newsDetail.featured_image_2}
                        sx={{
                            my: 1,
                            width: '100%',
                            aspectRatio: '86/64',
                            objectFit: 'cover'
                        }} />}


                    <Box sx={{ mt: 5, fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>
                        <div className="rendered-content" dangerouslySetInnerHTML={{ __html: newsDetail.content?.split('.').slice(3).join('.') }} />
                    </Box>

                    {newsDetail.featured_image_3 && <Box component='img' loading="lazy" decoding="async" src={urlAPI + newsDetail.featured_image_3}
                        sx={{
                            my: 1,
                            width: '100%',
                            aspectRatio: '86/64',
                            objectFit: 'cover'
                        }} />}

                    <Typography sx={{ fontSize: '.95rem', textAlign: 'right', color: '#dbdbdb' }}>- publishing date {newsDetail.published_at}</Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default SingleNews;