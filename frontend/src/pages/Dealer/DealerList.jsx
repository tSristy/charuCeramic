import { Box, Chip, Container, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoIcon from '@mui/icons-material/Info';
import SquareIcon from '@mui/icons-material/Square';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";

import BtnAdminSearch from "../../assets/Button/BtnAdminSearch";
import BtnAdminSubmit from "../../assets/Button/BtnAdminSubmit";

const DealerList = () => {
    const [dealerList, setDealerList] = useState([]);
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
        ServerApi(`/dealers/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setDealerList(res.items);
                setPaginationDetails(previousState => {
                    return {
                        ...previousState,
                        totalRows: res.totalRows,
                        totalPages: Math.round(res.totalRows / 10)
                    }
                });
            })
    }, [searchVariable, paginationDetails.pageNo]);

    const HandleDelete = (id) => {
        const tempArr = dealerList.filter(dealer => dealer.id !== id);
        ServerApi(`/dealers/delete/${id}`, 'DELETE', null, null)
            .then(res => res.json())
            .then(res => {
                setDealerList(tempArr);
            })
    }

    return (
        <Box py={5}>
            <Container>
                {/* ------------------------Title and Description------------------------ */}
                <Stack direction={{ sm: "column", md: "row" }} justifyContent="space-between" alignItems="center">
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight={600} mt={5} mb={1}>Records Explorer <Chip label="Dealer" color="error" /></Typography>
                        <Typography variant="overline" color="text.secondary">System Database • {paginationDetails.totalRows} active entries</Typography>
                    </Box>

                    <Box sx={{ width: {sm:"100%", md:"30%"}, display: "flex", gap: 1 }}>
                        <BtnAdminSearch
                            onChange={(e) => setSearchVariable(e.target.value)}
                        />
                        <BtnAdminSubmit text="Create" onClick={() => { }} />
                    </Box>
                </Stack>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table" sx={{ overflowX: "auto" }}>
                        <TableHead sx={{ bgcolor: "#000" }}>
                            <TableRow>
                                <TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Division</TableCell>
                                <TableCell>District</TableCell>
                                <TableCell>Thana</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Modified</TableCell>
                                <TableCell colSpan={3} sx={{ textAlign: "center" }}> Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dealerList.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
                                    <TableCell> {item.name} </TableCell>
                                    <TableCell> {item.address} </TableCell>
                                    <TableCell> {item.phone} </TableCell>
                                    <TableCell> {item.division} </TableCell>
                                    <TableCell> {item.district} </TableCell>
                                    <TableCell> {item.thana} </TableCell>
                                    <TableCell> {item.created_at.slice(0, 10)} </TableCell>
                                    <TableCell> {item.modified_at.slice(0, 10)} </TableCell>
                                    <TableCell><Tooltip title="Edit"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Info"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Delete"><IconButton onClick={(e) => HandleDelete(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}>
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

export default DealerList;