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
                        
          <div
            className="rendered-content"
            dangerouslySetInnerHTML={{ __html: details }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Policy;