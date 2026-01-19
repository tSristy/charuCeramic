import { Box, Container } from "@mui/material";
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
        <div
          className="rendered-content"
          dangerouslySetInnerHTML={{ __html: details }}
        />
      </Container>
    </Box>
  );
};

export default Policy;