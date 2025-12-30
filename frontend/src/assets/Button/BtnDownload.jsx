import { Box } from "@mui/material";
import { urlAPI } from "../../route/ServerAPI";

const BtnOpenInTab = ({ fileUrl, children }) => {
    const handleOpen = () => {
        if (!fileUrl) return;
        
        // Construct the full URL
        const fullUrl = urlAPI + fileUrl;
        
        // This is the standard JS way to open in a new tab
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <Box 
            onClick={handleOpen} 
            sx={{ 
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