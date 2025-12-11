import { Box, Container, Typography } from "@mui/material";

const TandC = () =>{
    return (
       <Box>
  <Container sx={{ py: 10 }}>
    <Typography variant="h6" gutterBottom>
      Terms & Conditions
    </Typography>

    <Typography paragraph>
      Last Updated: <Box component="span" fontWeight="bold">December 2, 2025</Box>
    </Typography>

    <Typography paragraph>
      Welcome to <Box component="span" fontWeight="bold">charuceramic.com</Box>. These Terms & 
      Conditions outline the rules and regulations for the use of 
      <Box component="span" fontWeight="bold"> Charu Ceramic's</Box> website, located at 
      <Box component="span" fontWeight="bold"> CharuCeramic.net</Box>.
    </Typography>

    <Typography paragraph>
      By accessing this website, you acknowledge and agree that you accept these Terms & Conditions. 
      If you do not agree to all the terms stated on this page, please do not continue to use 
      <Box component="span" fontWeight="bold"> charuceramic.com</Box>.
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      Website Use
    </Typography>

    <Typography paragraph>
      The content provided on <Box component="span" fontWeight="bold">charuceramic.com</Box> is for 
      general informational purposes only. The website acts as a digital catalog to display our 
      ceramic products, provide detailed information, and share user reviews.
    </Typography>

    <Typography paragraph>
      • This website does not offer e-commerce capabilities. Products displayed on 
      <Box component="span" fontWeight="bold"> CharuCeramic.net</Box> cannot be purchased directly 
      through the site.
      <br />• The information provided is maintained by Charu Ceramic. While we strive to keep it 
      accurate and updated, we make no representations or warranties of any kind regarding its 
      completeness, reliability, or suitability.
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      Intellectual Property Rights
    </Typography>

    <Typography paragraph>
      Unless otherwise stated, Charu Ceramic and/or its licensors own all intellectual property 
      rights for material on <Box component="span" fontWeight="bold">charuceramic.com</Box>. This 
      includes—but is not limited to—text, images, graphics, logos, and the design layout.
    </Typography>

    <Typography paragraph>
      You may access material for personal, non-commercial use, but you must not:
      <br />• Republish material  
      <br />• Sell, rent, or sub-license material  
      <br />• Reproduce, duplicate, or copy material  
      <br />• Redistribute content from the website  
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      User Responsibilities & Conduct
    </Typography>

    <Typography paragraph>
      You agree to use <Box component="span" fontWeight="bold">charuceramic.com</Box> only for 
      lawful purposes.
    </Typography>

    <Typography paragraph>
      <Box component="span" fontWeight="bold">User-Generated Content (Reviews):</Box>  
      Parts of the website allow users to post reviews and opinions. Charu Ceramic does not filter 
      or edit comments before they appear. Reviews reflect the opinions of the individuals posting 
      them—not Charu Ceramic or its affiliates.
    </Typography>

    <Typography paragraph>
      By posting a review, you confirm that:
      <br />• You have the right to post the content  
      <br />• Your content does not violate any intellectual property rights  
      <br />• Your content is not defamatory, offensive, indecent, or unlawful  
    </Typography>

    <Typography paragraph>
      Charu Ceramic reserves the right to monitor and remove any review considered inappropriate or 
      in violation of these Terms.
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      Limitation of Liability
    </Typography>

    <Typography paragraph>
      In no event shall Charu Ceramic or its officers, directors, or employees be held liable for 
      any issues arising out of your use of this website. This includes indirect, consequential, or 
      special liabilities.
    </Typography>

    <Typography paragraph>
      We do not warrant that the website will always be available or that its information is 
      complete, accurate, or reliable. Nothing on this website constitutes professional advice.
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      Indemnification
    </Typography>

    <Typography paragraph>
      You agree to indemnify Charu Ceramic against any liabilities, damages, expenses, or demands 
      resulting from your breach of these Terms & Conditions.
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      Changes to Terms
    </Typography>

    <Typography paragraph>
      Charu Ceramic reserves the right to update or revise these Terms at any time. You are 
      encouraged to review this page regularly to ensure you understand the conditions governing 
      your use of the website.
    </Typography>

    {/* ------------------------------------------------------------ */}

    <Typography variant="h6" gutterBottom>
      Governing Law & Jurisdiction
    </Typography>

    <Typography paragraph>
      These terms are governed by the laws of the jurisdiction in which Charu Ceramic is located. 
      You agree to submit to the non-exclusive jurisdiction of the state and federal courts in that 
      region for dispute resolution.
    </Typography>
  </Container>
</Box>

    );
};

export default TandC;