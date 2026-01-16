import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BtnUrlChange = ({ btnTitle, url }) => {

    const navigate = useNavigate();
    const handleClick = (givenUrl) => {
        navigate(givenUrl);
        window.scrollTo(0, 0);
    }

    return (
        <Button variant="contained" sx={{ bgcolor: '#ff0000', textTransform: "uppercase", minWidth: '200px', py: 1, '&:hover': { bgcolor: '#f0141bff' } }} onClick={url ? (e) => handleClick(url) : null}>{btnTitle}</Button>
    );
};

export default BtnUrlChange;