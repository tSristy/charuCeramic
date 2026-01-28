import { Box, Chip, Container, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoIcon from '@mui/icons-material/Info';
import SquareIcon from '@mui/icons-material/Square';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnAdminSearch from "../../assets/Button/BtnAdminSearch";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import { useNavigate } from "react-router-dom";

const ClientList = () => {
    const navigate = useNavigate();
    const [clientList, setClientList] = useState([]);
    const [searchVariable, setSearchVariable] = useState('');

    useEffect(() => {
        const body = {
         searchVariable: searchVariable,
        };
        ServerApi(`/client/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setClientList(res.items);
            })
    }, [searchVariable]);

    const handleDelete = (id) => {
        const tempArr = clientList.filter(client => client.id !== id);
        ServerApi(`/client/delete/${id}`, 'DELETE', null, null)
            .then(res => res.json())
            .then(res => {
                setClientList(tempArr);
            })
    };

    const handlePanel = (arg)=>{
        if (typeof(arg) === "string") {
                navigate(arg);
        }
        else navigate(`/client-panel?id=${arg}`);
    };

    return (
        <Box py={5}>
            <Container>
                <Stack direction={{ sm: "column", md: "row" }} justifyContent="space-between" alignItems="center">
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight={600} mt={5} mb={1}>Records Explorer  <Chip label="Client" color="error" /></Typography>
                        <Typography variant="overline" color="text.secondary">System Database •</Typography>
                    </Box>

                    <Box sx={{ width: { sm: "100%", md: "30%" }, display: "flex", gap: 1 }}>
                        <BtnAdminSearch
                            onChange={(e) => {setPaginationDetails(prev=>({...prev, pageNo:1}));setSearchVariable(e.target.value)}}
                        />
                        <BtnAdminSubmit text="Create" onClick={(e)=>handlePanel('/client-panel')} />
                    </Box>
                </Stack>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead sx={{ bgcolor: "#000" }}>
                            <TableRow>
                                <TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Featured Image</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell colSpan={3} sx={{ textAlign: "center" }}> Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {clientList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
                                    <TableCell> {item.title} </TableCell>
                                    <TableCell> {item.featured_image && <img src={urlAPI + item.featured_image} alt={item.title} width="50" /> || "N / A"} </TableCell>
                                    <TableCell> {item.description} </TableCell>
                                    <TableCell><Tooltip title="Edit">
                                        <IconButton onClick={(e)=>handlePanel(parseInt(item.id))} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Info"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Delete"><IconButton onClick={(e) => handleDelete(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}>
                                        <DeleteForeverRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};

export default ClientList;



