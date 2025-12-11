import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqQuestions } from '../../Data';
import { Box, Container } from '@mui/material';
import bgImg from '../../img/bgDealer.jpg';

const FAQ = () => {
    return (
        <Box>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000ff",
                display: 'block',
                width: "100%",
                height: "350px",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />

            <Box py={10}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Frequently Asked Questions
                    </Typography>
                    {faqQuestions.map((item, index) => (
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
                </Container>
            </Box>

        </Box>
    );
};

export default FAQ;