import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';


const BtnAdminSearch = ({ onChange }) => {
    return (
        <TextField onChange={onChange} 
        // disabled 
            placeholder="Search..."
            size="small"
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ fontSize: "1rem", color: "#94a3b8" }} />
                        </InputAdornment>
                    )
                }
            }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    // borderRadius: "20px",
                    backgroundColor: "#dfe6ecff",
                    height: "35px",

                    /* REMOVE BORDER */
                    "& fieldset": {
                        border: "none"
                    },
                    "&:hover fieldset": {
                        border: "none"
                    },
                    "&.Mui-focused fieldset": {
                        border: "none"
                    }
                },

                /* INPUT TEXT */
                "& .MuiOutlinedInput-input": {
                    fontSize: "13px",
                    padding: "6px 10px"
                },

                /* PLACEHOLDER */
                "& .MuiOutlinedInput-input::placeholder": {
                    fontSize: "12px",
                    color: "#94a3b8",
                    opacity: 1
                }
            }}
        />
    );
};

export default BtnAdminSearch;