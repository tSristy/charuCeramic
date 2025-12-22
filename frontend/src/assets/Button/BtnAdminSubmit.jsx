import { Button } from "@mui/material"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const BtnAdminSubmit = ({ onClick, text, type }) => {
    return (
        <Button onClick={onClick} type={type}
            variant="outlined" color={ text === "Delete" || text === "Go Back" ? "error" : "primary" }
            startIcon={text === "Delete" || text === "Go Back" ? <HighlightOffIcon fontSize="small"/> : <TaskAltIcon fontSize="small"/>} 
            sx={{
                px:4
            }}>
            {text}
        </Button>
    );
};

export default BtnAdminSubmit;