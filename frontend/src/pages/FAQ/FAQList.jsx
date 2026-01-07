import { Box, Chip, Container, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoIcon from '@mui/icons-material/Info';
import SquareIcon from '@mui/icons-material/Square';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";
import BtnAdminSearch from "../../assets/Button/BtnAdminSearch";
import { useNavigate } from "react-router-dom";

const FAQList = () => {
    const navigate = useNavigate();
    const [faqList, setFaqList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });
    const [searchVariable, setSearchVariable] = useState(null);


    useEffect(() => {
        const body = {
            pageNo: paginationDetails.pageNo,
            searchVariable: searchVariable
        };

        ServerApi(`/faq/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setFaqList(res.items);
                setPaginationDetails(previousState => {
                    return {
                        ...previousState,
                        totalRows: res.totalRows,
                        totalPages: Math.ceil(res.totalRows / 10)
                    }
                });
            })
    }, [searchVariable, paginationDetails.pageNo]);

    const HandleDelete = (id) => {
        const tempArr = faqList.filter(faq => faq.id !== id);
        ServerApi(`/faq/delete/${id}`, 'DELETE', null, null)
            .then(res => res.json())
            .then(res => {
                setFaqList(tempArr);
            })
    }

    const handlePanel = (arg)=>{
        if (typeof(arg) === "string") {
                navigate(arg);
        }
        else navigate(`/faq-panel?id=${arg}`);
    };

    return (
        <Box py={5}>
            <Container>
                {/* ------------------------Title and Description------------------------ */}
                <Stack direction={{sm: "column", md: "row"}}  justifyContent="space-between" alignItems="center">
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight={600} mt={5} mb={1}>Records Explorer <Chip label="FAQ" color="error" /></Typography>
                        <Typography variant="overline" color="text.secondary">System Database • {paginationDetails.totalRows} active entries</Typography>
                    </Box>

                   <Box sx={{ width: {sm:"100%", md:"30%"}, display: "flex", gap: 1 }}>
                        <BtnAdminSearch
                            onChange={(e) => setSearchVariable(e.target.value)}
                        />
                        <BtnAdminSubmit text="Create" onClick={(e) => {handlePanel('/faq-panel')}} />
                    </Box>
                </Stack>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table" sx={{ overflowX: "auto" }}>
                        <TableHead sx={{ bgcolor: "#000" }}>
                            <TableRow>
                                <TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
                                <TableCell>Questions</TableCell>
                                <TableCell>Answer</TableCell>
                                <TableCell colSpan={3} sx={{ textAlign: "center" }}> Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {faqList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
                                    <TableCell> {item.question} </TableCell>
                                    <TableCell> {item.answer} </TableCell>
                                    <TableCell><Tooltip title="Edit"><IconButton onClick={(e) => handlePanel(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Info"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Delete"><IconButton onClick={(e) => HandleDelete(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000"} }}>
                                        <DeleteForeverRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                </TableRow>
                            ))}

                            {/* -------------------------------------pagination row----------------------------- */}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography variant="overline" sx={{ fontWeight: 500, color: "#94a3b8" }}>
                                        Page No.
                                    </Typography>
                                </TableCell>
                                <TableCell colSpan={10} align="right">

                                    <Pagination color="error" shape="rounded" hidePrevButton hideNextButton
                                        count={paginationDetails.totalPages}
                                        page={paginationDetails.pageNo}
                                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                                        onChange={(e, value) => {
                                            setPaginationDetails(previousState => {
                                                return { ...previousState, pageNo: value }
                                            })
                                        }} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Container>
        </Box>
    );
};

export default FAQList;