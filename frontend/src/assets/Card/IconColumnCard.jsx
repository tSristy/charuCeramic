import { Avatar, Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

const IconColumnCard = ({ item }) => {
    const [hoverVar, setHoverVar] = useState(false)
    return (
        <Box sx={{
            p: 3,
            // transition: "all 0.3s ease",
            // '&:hover': {
            //     transform: 'scale(1.2)',
            //     bgcolor: myTheme.palette.green,
            //     cursor: "pointer",
            //     color: 'white'
            // }
        }}
        // onMouseEnter={() =>
        //     setHoverVar(true)}
        // onMouseLeave={() =>
        //     setHoverVar(false)
        // }
        >
            <Typography sx={{
                color: '#ED1C24'
                // color: hoverVar ? 'white' : myTheme.palette.yellow
            }}>
                {item.icon}
            </Typography>
            <Typography sx={{ py: 1, fontWeight: 600 }}>
                {item.title}
            </Typography>
            <Typography sx={{ fontSize: ".9rem", whiteSpace: "pre-line" }}>
                {item.details}
            </Typography>
        </Box>
    )
}


export default IconColumnCard;