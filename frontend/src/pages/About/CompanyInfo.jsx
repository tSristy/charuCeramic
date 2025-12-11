import { Box, Container, Typography } from '@mui/material';
import bgImg from '../../img/bgDealer.jpg';

const CompanyInfo = () => {
    return (
        <Box sx={{ bgcolor: "#fff" }}>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ff0000ff",
                display: 'block',
                width: "100%",
                height: "350px",
                objectFit: "cover"
            }}
                component="img" src={bgImg} />


            <Box sx={{ py: 10 }}>
                <Container>
                    <Box mb={10}>
                        <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 2, textAlign: 'center' }}>
                            CHARU Ceramic Industries Limited
                        </Typography>
                        <Typography sx={{ fontSize: '1.15rem', fontWeight: 500, textAlign: 'center' }}> A Leading Sanitary Ware Manufacturer in Bangladesh
                        </Typography>
                    </Box>

                    <Typography sx={{
                        whiteSpace: "pre-line",
                        fontSize: ".9rem"
                    }}>
                        <Box component="span" fontWeight={600}>CHARU Ceramic Industries Limited</Box> represents a significant milestone in Bangladesh's industrial development. Established in March 2012, our company proudly stands as <Box component="span" fontWeight={600}>the first manufacturing facility in Bangladesh</Box> to produce sanitary ware that meets rigorous international standards. This achievement was made possible through collaborative partnerships with premier consultants from both Europe and Asia, ensuring world-class expertise in every aspect of our operations.{<br/>}{<br/>}
                        Our commitment to quality is formally recognized through <Box component="span" fontWeight={600}>ISO 9001:2015 certification</Box>, validating our adherence to globally recognized quality management systems across all operational areas. This certification demonstrates our dedication to consistent quality and continuous improvement in our manufacturing processes.

                        {<br/>}{<br/>}
                        The technological foundation of our facility showcases our commitment to excellence. We have invested in cutting-edge manufacturing equipment from industry leaders SACMI, UNIMAK, and HEXIANG. This advanced machinery enables an impressive annual production capacity of 1.5 million pieces, positioning us as a significant player in the regional market.
                        A particularly noteworthy achievement in our company's history is our technical collaboration with Siam Sanitary Ware Industry Co. Ltd. of Thailand. Through this partnership, CHARU manufactures the internationally acclaimed COTTO brand in Bangladesh, bringing world-renowned quality and design to the local market.
                        While our initial focus has been on meeting the growing domestic demand for high-quality sanitary ware in Bangladesh, we have established a solid foundation for expanding into international markets. Our export strategy is a key component of our business development plan, reflecting our confidence in the quality and competitiveness of our products on the global stage.
                    </Typography>
                </Container>

            </Box>
        </Box>
    );
};

export default CompanyInfo;