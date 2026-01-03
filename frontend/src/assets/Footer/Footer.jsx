import { Box, Button, Container, Divider, Grid, Stack } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const accessToken = 'IGAAc8FV8Qo3xBZAFp6aU9ZAQnVpOG9YMGY1WlVtS3JEN0UwLVVZAQkN1Smg0WnI5cnhWN2JqWXlSZAF9XSHVjMktJOFhSTUQtaDRCeWlTbDZAyYVhBeWRlWVJCUFk2cWl3d2t5ckI2dDI1bDRUNUZAtVEZAfQnJURUtaR1ZAiQ1M1YWR1QQZDZD';
    const apiUrl = `https://graph.instagram.com/me/media?fields=25275126222110613,media_url,permalink&access_token=${accessToken}`;

    const handleBtn = (url, tab) => {
        tab ?
            window.open(url, '_blank')
            : navigate(url)
    }

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.data) {
                    setPosts(data.data);
                }
            })
            .catch(error => console.error('Error fetching Instagram posts:', error));
    }, []);



    return (
        <>
            <Box bgcolor="#2b2b2b">
                <Container maxWidth="xl" sx={{ py: 4, textAlign: 'left', color: '#e8e8e8ff', fontSize: '.8rem' }}>
                    <Grid container spacing={2}>
                        <Grid size={{ sm: 12, md: 4 }}>
                            Visit Our Instagram Feed
                            <Divider sx={{ my: 2, borderColor: '#444' }} />
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                {
                                    posts.filter((_, index) => index < 4)
                                        .map((item, index) => (
                                            <Box onClick={(e) => handleBtn(item.permalink, '_blank')} key={index} component="img" src={
                                                item.media_url
                                            } sx={{
                                                display: 'block', width: { xs: '100%', sm: '22%' }, aspectRatio: {
                                                    md: '1/1'
                                                }, height: 'auto', objectFit: 'cover', bgcolor: '#444'
                                            }} />
                                        ))
                                }
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                            <Box px={2}>Social Links</Box>
                            <Divider sx={{ my: 2, borderColor: '#444' }} />
                            <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
                                <Button onClick={(e) => handleBtn("http://facebook.com/CharuCeramic", '_blank')} variant="none" startIcon={<FacebookIcon sx={{ color: '#999' }} />} sx={{ fontSize: '.8rem', textTransform: 'none' }}>Facebook</Button>
                                <Button onClick={(e) => handleBtn("http://instagram.com/charuceramic", '_blank')} variant="none" startIcon={<InstagramIcon sx={{ color: '#999' }} />} sx={{ fontSize: '.8rem', textTransform: 'none' }}>Instagram</Button>
                                <Button onClick={(e) => handleBtn("http://linkedin.com/company/charuceramic", '_blank')} variant="none" startIcon={<LinkedInIcon sx={{ color: '#999' }} />} sx={{ fontSize: '.8rem', textTransform: 'none' }}>LinkedIn</Button>
                                <Button onClick={(e) => handleBtn("https://www.youtube.com/@CharuCeramic", '_blank')} variant="none" startIcon={<YouTubeIcon sx={{ color: '#999' }} />} sx={{ fontSize: '.8rem', textTransform: 'none' }}>YouTube</Button>
                                <Button onClick={(e) => handleBtn("https://wa.me/01700-706600", '_blank')} variant="none" startIcon={<WhatsAppIcon sx={{ color: '#999' }} />} sx={{ fontSize: '.8rem', textTransform: 'none' }}>WhatsApp</Button>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                            <Box px={2}>Company</Box>
                            <Divider sx={{ my: 2, borderColor: '#444' }} />
                            <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
                                <Button onClick={(e) => handleBtn("/company-information")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>About Us</Button>
                                <Button onClick={(e) => handleBtn("/project")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Project</Button>
                                <Button onClick={(e) => handleBtn("/career")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Careers</Button>
                                <Button onClick={(e) => handleBtn("/certification")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Certifications</Button>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                            <Box px={2}>Quick Links</Box>
                            <Divider sx={{ my: 2, borderColor: '#444' }} />
                            <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
                                <Button onClick={(e) => handleBtn("/news-article")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>News & Articles</Button>
                                <Button onClick={(e) => handleBtn("/buying-guide")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Buying Guide</Button>
                                <Button onClick={(e) => handleBtn("/privacy-policy")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Privacy Policy</Button>
                                <Button onClick={(e) => handleBtn("/terms-conditions")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Terms & Conditions</Button>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 6, sm: 3, md: 2 }}>
                            <Box px={2}>Talk to Us</Box>
                            <Divider sx={{ my: 2, borderColor: '#444' }} />
                            <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
                                <Button onClick={(e) => handleBtn("/faq")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>FAQ</Button>
                                <Button onClick={(e) => handleBtn("/contact")} variant="none" sx={{ fontSize: '.8rem', textTransform: 'none' }}>Contact us</Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 2, borderColor: '#444' }} />
                    © {new Date().getFullYear()} Charu Ceramic. All rights reserved.
                </Container>
            </Box>
        </>
    );
};

export default Footer;