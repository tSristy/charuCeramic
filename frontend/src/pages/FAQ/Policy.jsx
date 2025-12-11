import { Box, Container, Typography } from "@mui/material";

const Policy = () =>{
    return (
        <Box>
            <Container sx={{ py:10 }}>
      <Typography variant="h6" gutterBottom>
        Introduction
      </Typography>
      <Typography paragraph>
        Welcome to <Box component="span" fontWeight="bold">Charu Ceramic Industries Limited</Box>. 
        We respect your privacy and are committed to protecting the personal information you share 
        with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your 
        information when you visit our website 
        <Box component="span" fontWeight="bold"> www.charuceramic.net</Box>.  
      </Typography>

      <Typography paragraph>
        Please read this Privacy Policy carefully. By accessing or using our Site, you acknowledge 
        that you have read, understood, and agree to be bound by this Privacy Policy. If you do not 
        agree with our policies and practices, please do not use our Site.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Information We Collect
      </Typography>

      <Typography variant="h6" gutterBottom>
        Information You Provide to Us
      </Typography>

      <Typography paragraph>
        We may collect information that you voluntarily provide when you:
        <br />• Sign up for our newsletter
        <br />• Contact our customer service
        <br />• Complete surveys or forms
        <br />• Participate in promotions or contests
      </Typography>

      <Typography paragraph>
        This information may include:
        <br />• Name
        <br />• Email address
        <br />• Phone number
        <br />• Product preferences
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Information Automatically Collected
      </Typography>

      <Typography paragraph>
        When you visit our Site, we may automatically collect certain information about your device 
        and usage patterns, including:
        <br />• IP address
        <br />• Browser type
        <br />• Operating system
        <br />• Pages viewed
        <br />• Time spent on pages
        <br />• Referral source
        <br />• Clickstream data
      </Typography>

      <Typography paragraph>
        We collect this information using cookies and similar technologies. For more information 
        about our use of cookies, please see the 
        <Box component="span" fontWeight="bold"> "Cookies and Similar Technologies"</Box> section below.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        How We Use Your Information
      </Typography>

      <Typography paragraph>
        We use the information we collect for various purposes, including to:
        <br />• Process and fulfill your orders
        <br />• Provide customer service and respond to inquiries
        <br />• Send transactional emails
        <br />• Send marketing communications (with your consent)
        <br />• Improve our website and services
        <br />• Personalize your experience
        <br />• Analyze usage patterns
        <br />• Protect against fraud
        <br />• Comply with legal obligations
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Children's Privacy
      </Typography>

      <Typography paragraph>
        Our Site is appropriate for all ages, including children. We comply with all applicable laws 
        regarding children's data.
      </Typography>

      <Typography paragraph>
        We do not knowingly collect personal information from children under 13 without parental 
        consent. If you believe we have collected information from your child without consent, 
        please contact us at 
        <Box component="span" fontWeight="bold"> [Your Privacy Email]</Box>.
      </Typography>

      <Typography paragraph>
        For users under 13, we limit data collection to what is reasonably necessary for 
        participation in online activities.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Cookies and Similar Technologies
      </Typography>

      <Typography paragraph>
        We use cookies and similar technologies to collect information and improve your browsing 
        experience.
      </Typography>

      <Typography paragraph>
        <Box component="span" fontWeight="bold">Types of Cookies We Use:</Box>
        <br />• Essential Cookies  
        <br />• Preference Cookies  
        <br />• Analytics Cookies  
        <br />• Marketing Cookies  
      </Typography>

      <Typography paragraph>
        You can control cookies through your browser settings, but disabling them may limit certain 
        features on our Site.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Information Sharing
      </Typography>

      <Typography paragraph>
        We do not sell, rent, or lease your personal information to third parties.
      </Typography>

      <Typography paragraph>
        We may share your information with:
        <br />• Service Providers  
        <br />• Legal authorities  
        <br />• Business transfer entities  
        <br />• Third parties with your consent  
      </Typography>

      <Typography paragraph>
        All third parties are required to protect your information and use it only for the services 
        they provide.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Data Security
      </Typography>

      <Typography paragraph>
        We implement technical and organizational measures to protect your personal information, 
        but no method of data transmission is 100% secure.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Your Rights and Choices
      </Typography>

      <Typography paragraph>
        Depending on your location, you may have rights to:
        <br />• Access your information
        <br />• Correct data
        <br />• Delete data
        <br />• Restrict processing
        <br />• Data portability
        <br />• Object to processing
        <br />• Withdraw consent
      </Typography>

      <Typography paragraph>
        To exercise these rights, contact us at 
        <Box component="span" fontWeight="bold"> info@charuceramic.net</Box>.
      </Typography>

      {/* ------------------------------------------------------------ */}

      <Typography variant="h6" gutterBottom>
        Updates to This Privacy Policy
      </Typography>

      <Typography paragraph>
        We may update this Privacy Policy from time to time. The updated version will include a 
        revised “Last Updated” date. We encourage you to review it regularly.
      </Typography>
    
            </Container>
        </Box>
    );
};

export default Policy;