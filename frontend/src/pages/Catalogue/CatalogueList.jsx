import { Box, Chip, Container, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoIcon from '@mui/icons-material/Info';
import SquareIcon from '@mui/icons-material/Square';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnAdminSearch from "../../assets/Button/BtnAdminSearch";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import { useNavigate } from "react-router-dom";

const CatalogueList = () => {
    const navigate = useNavigate();
    const [catalogueList, setCatalogueList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });
    const [searchVariable, setSearchVariable] = useState(null);

    useEffect(() => {
        const body = { pageNo: paginationDetails.pageNo };
        ServerApi(`/catalogue/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setCatalogueList(res.items);
                setPaginationDetails(prev => ({
                    ...prev,
                    totalRows: res.totalRows,
                    totalPages: Math.ceil(res.totalRows / 10)
                }));
            })
            .catch(err => console.error(err));
    }, [paginationDetails.pageNo]);

    const HandleDelete = (id) => {
        const tempArr = catalogueList.filter(c => c.id !== id);
        ServerApi(`/catalogue/delete/${id}`, 'DELETE', null, null)
            .then(res => res.json())
            .then(() => setCatalogueList(tempArr))
            .catch(err => console.error(err));
    }

    const handlePanel = (arg)=>{
        if (typeof(arg) === "string") {
                navigate(arg);
        }
        else navigate(`/catalogue-panel?id=${arg}`);
    };

    return (
        <Box py={5}>
            <Container>
                <Stack direction={{sm: "column", md: "row"}} justifyContent="space-between" alignItems="center">
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight={600} mt={5} mb={1}>Records Explorer  <Chip label="Catalogue" color="error" /></Typography>
                        <Typography variant="overline" color="text.secondary">System Database • {paginationDetails.totalRows} active entries</Typography>
                    </Box>

                    <Box sx={{ width: {sm:"100%", md:"30%"}, display: "flex", gap: 1 }}>
                         <BtnAdminSearch onChange={(e) => setSearchVariable(e.target.value)} />
                        <BtnAdminSubmit text="Create" onClick={(e)=>handlePanel('/catalogue-panel')} />
                    </Box>
                </Stack>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="catalogue table">
                        <TableHead sx={{ bgcolor: "#000" }}>
                            <TableRow>
                                <TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>PDF</TableCell>
                                <TableCell>Summary</TableCell>
                                <TableCell>Series</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell colSpan={3} sx={{ textAlign: "center" }}> Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {catalogueList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
                                    <TableCell> {item.title} </TableCell>
                                    <TableCell>
                                        {item.file_path ? (
                                            <a href={urlAPI + item.file_path} target="_blank" rel="noreferrer">PDF</a>
                                        ) : "-"}
                                    </TableCell>
                                    <TableCell> {item.content.slice(0,150)+"..."} </TableCell>
                                    <TableCell> {item.summary === "1" ? "Product Series" : "N / A"} </TableCell>
                                    <TableCell>
                                        {item.featured_image ? <img src={urlAPI + item.featured_image} alt={item.title} width="50" /> : "-"}
                                    </TableCell>
                                    <TableCell><Tooltip title="Edit"><IconButton onClick={(e)=>handlePanel(parseInt(item.id))} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Info"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Delete"><IconButton onClick={() => HandleDelete(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><DeleteForeverRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                </TableRow>
                            ))}

                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography variant="overline" sx={{ fontWeight: 500, color: "#94a3b8" }}>Page No.</Typography>
                                </TableCell>
                                <TableCell colSpan={10} align="right">
                                    <Pagination color="error" shape="rounded" hidePrevButton hideNextButton
                                        count={paginationDetails.totalPages}
                                        page={paginationDetails.pageNo}
                                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                        onChange={(e, value) => setPaginationDetails(prev => ({ ...prev, pageNo: value }))} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </Box>
    );
};

export default CatalogueList;
