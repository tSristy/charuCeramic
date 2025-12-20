import { Box, Stack } from "@mui/material"
import React from "react";

const FormLabel = ({ text, icon }) => {
    return (
        <Stack direction="row" spacing={.5} sx={{ color: "#404040ff", fontSize: ".8rem", fontWeight: 500, mb: 1, alignItems: "center" }}>
            <Box>
                {icon &&
                    React.cloneElement(icon, {
                        //   fontSize: "1rem", 
                        sx: { fontSize: "1.2rem", color: "#94a3b8" } // exact control (optional)
                    })}
            </Box>
            <Box>{text}</Box>
        </Stack>
    );
};

export default FormLabel;