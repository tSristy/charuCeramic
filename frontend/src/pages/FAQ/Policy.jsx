import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";

const Policy = () => {
  const [details, setDetails] = useState("");

  useEffect(() => {
    ServerApi(`/policy-terms/1`, "GET", null, null)
      .then(res => res.json())
      .then(res => {
        setDetails(res.content);
      })
  }, [])

  return (
    <Box>
      <Container sx={{ py: 10, textAlign: 'justify' }}>
        <Box px={{ sm: 5, md: 10 }}>
           <Typography sx={{ fontSize: '3rem', fontWeight: 600, color: '#6c6c6c', mb: 3, textAlign: 'center' }}>Privacy & Policy</Typography>
                        
         <Box sx={{ mt: 5, fontSize: '.925rem', textAlign: 'justify', fontWeight: 500, color: '#454545' }}>
            <div
            className="rendered-content"
            dangerouslySetInnerHTML={{ __html: details }}
          />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Policy;