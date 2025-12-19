import { Container, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import InfoIcon from '@mui/icons-material/Info';
import SquareIcon from '@mui/icons-material/Square';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { useEffect, useState } from "react";
import { ServerApi } from "../../route/ServerAPI";


const DealerList = () => {
    const [dealerList, setDealerList] = useState([]);
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });


    useEffect(() => {
        const body = {
            pageNo: paginationDetails.pageNo
                };
        ServerApi(`/dealers/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                console.log("dealer list:", res);
                setDealerList(res.items);
                setPaginationDetails(previousState => {
                            return { ...previousState,
                    totalRows: res.totalRows,
                    totalPages: Math.round(res.totalRows/10)
                }
                });
            })
    }, [paginationDetails.pageNo]);

    const HandleDelete = (id) => {
        const tempArr = dealerList.filter(dealer => dealer.id !== id);
        ServerApi(`/dealers/delete/${id}`, 'DELETE', null, null)
            .then(res => res.json())
            .then(res => {
                setDealerList(tempArr);
            })
    }

    return (
        <>
        <Container>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead bgcolor={"#f8fafc"}>
                        <TableRow>
                            <TableCell><SquareIcon fontSize="small" /></TableCell>
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
                                <TableCell><Tooltip title="Edit"><IconButton><EditRoundedIcon sx={{fontSize: '1rem',color: "#94a3b8", '&:hover':{ color: "#5f5f5fff"}}}/></IconButton></Tooltip></TableCell>
                                <TableCell> <Tooltip title="Info"><IconButton><InfoIcon sx={{fontSize: '1rem',color: "#94a3b8", '&:hover':{ color: "#5f5f5fff"}}}/></IconButton></Tooltip></TableCell>
                                <TableCell> <Tooltip title="Delete"><IconButton onClick={(e) => HandleDelete(item.id)} >
                                    <DeleteForeverRoundedIcon sx={{fontSize: '1rem',color: "#94a3b8", '&:hover':{ color: "#5f5f5fff"}}}/> </IconButton></Tooltip></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> 
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" p={2} bgcolor={"#f8fafc"}>
                <Typography variant="overline" sx={{ fontWeight: 500, color: "#94a3b8" }}>
                    Count: {paginationDetails.totalRows} total entries
                </Typography>
                <Pagination  color="disabled" shape="rounded" variant="outlined" hidePrevButton hideNextButton
                        count={paginationDetails.totalPages}
                        page={paginationDetails.pageNo}
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        onChange={(e, value) => {
                            setPaginationDetails(previousState => {
                                return { ...previousState, pageNo: value }
                            })
                        }} />  
            </Stack>
                  
           
        </Container>
            
        </>
    );
};

export default DealerList;