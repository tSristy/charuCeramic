import { Box } from "@mui/material";
import { urlAPI } from "../../route/ServerAPI";

const BtnOpenInTab = ({ fileUrl, children }) => {
    const handleOpen = () => {
        if (!fileUrl) return;
        const fullUrl = urlAPI + fileUrl;
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box 
            onClick={handleOpen} 
            sx={{ 
                width: '100%',
                display: 'inline-block', 
                '&:hover': {
                    cursor: 'pointer',
                    opacity: 0.8 
                }
            }}
        >
            {children}
        </Box>
    );
};

export default BtnOpenInTab;