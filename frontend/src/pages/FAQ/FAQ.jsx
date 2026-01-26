import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Container } from '@mui/material';

import { useEffect, useState } from 'react';
import { ServerApi } from '../../route/ServerAPI';

const FAQ = () => {
    const [faqList, setFaqList] = useState([]);
    useEffect(() => {
        const body = {
            pageNo: 1,
            searchVariable: ''
        };

        ServerApi(`/faq/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setFaqList(res.items);
            })
    }, []);

    // const [bannerImg, setBannerImg] = useState(null);

    // useEffect(() => {
    //     ServerApi(`/banner?pageName=FAQ&sectionValue=FQ01`, "GET", null, null)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setBannerImg(res[0]);
    //         });
    // }, [])

    return (
        <Box sx={{ bgcolor: "#fff" }}>
            {/* <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000",
                display: 'block',
                aspectRatio: '16/4',
                width: '100%',
                height: "auto",
                overflow: 'hidden',
                bgcolor: '#f0f0f0'
            }}>
                <Box
                    component="img"
                    src={bannerImg?.featured_image ? urlAPI + bannerImg.featured_image : "bgImg"}
                    fetchPriority="high"
                    loading="eager"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box> */}

            <Box py={10} >
                <Container>
                    <Box px={{ sm: 5, md: 10 }}>
                        <Typography sx={{ fontSize: '3rem', fontWeight: 600, color: '#6c6c6c', mb: 3, textAlign: 'center' }}>
          
                            Frequently Asked Questions
                        </Typography>
                        {faqList.map((item, index) => (
                            <Accordion key={index} defaultExpanded={index === 0 ? true : false} sx={{ mb: 2, boxShadow: 0 }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color='error' />}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">{item.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{ fontSize: ".9rem", color: '#838383ff' }}>
                                    {item.answer}
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Container>
            </Box>

        </Box>
    );
};

export default FAQ;