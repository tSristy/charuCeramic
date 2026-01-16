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

const ProjectList = () => {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([]);
    const [searchVariable, setSearchVariable] = useState('');
    const [paginationDetails, setPaginationDetails] = useState({
        pageNo: 1,
        totalRows: 0,
        totalPages: 0
    });

    useEffect(() => {
        const body = {
            pageNo: paginationDetails.pageNo,
            searchVariable: searchVariable
        };
        ServerApi(`/project/list`, 'POST', null, body)
            .then(res => res.json())
            .then(res => {
                setProjectList(res.items);
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
        const tempArr = projectList.filter(project => project.id !== id);
        ServerApi(`/project/delete/${id}`, 'DELETE', null, null)
            .then(res => res.json())
            .then(res => {
                setProjectList(tempArr);
            })
    }

    const handlePanel = (arg)=>{
        if (typeof(arg) === "string") {
                navigate(arg);
        }
        else navigate(`/project-panel?id=${arg}`);
    };

    return (
        <Box py={5}>
            <Container>
                <Stack direction={{sm: "column", md: "row"}} justifyContent="space-between" alignItems="center">
                    <Box mb={3}>
                        <Typography variant="h5" fontWeight={600} mt={5} mb={1}>Projects Explorer  <Chip label="Projects" color="error" /></Typography>
                        <Typography variant="overline" color="text.secondary">System Database • {paginationDetails.totalRows} active entries</Typography>
                    </Box>

                    <Box sx={{ width: {sm:"100%", md:"30%"}, display: "flex", gap: 1 }}>
                         <BtnAdminSearch
                            onChange={(e) => {setPaginationDetails(prev=>({...prev, pageNo:1}));setSearchVariable(e.target.value)}}
                        />
                        <BtnAdminSubmit text="Create" onClick={(e) => {handlePanel('/project-panel')}} />
                    </Box>
                </Stack>



                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead sx={{ bgcolor: "#000" }}>
                            <TableRow>
                                <TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
                                <TableCell>Project Title</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Location</TableCell>
                                <TableCell>Content</TableCell>
                                <TableCell colSpan={3} sx={{ textAlign: "center" }}> Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {projectList?.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
                                    <TableCell> {item.title} </TableCell>
                                    <TableCell> <img src={ urlAPI + item.featured_image} alt={item.title} width="50" /> </TableCell>
                                    <TableCell> {item.location} </TableCell>
                                    <TableCell> {item.content?.substring(0, 50)}... </TableCell>
                                    <TableCell><Tooltip title="Edit"><IconButton onClick={(e) => handlePanel(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Info"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                    <TableCell><Tooltip title="Delete"><IconButton onClick={(e) => HandleDelete(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}>
                                        <DeleteForeverRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
                                </TableRow>
                            ))}

                            {/* -----------------------------pagination row----------------------------- */}
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Typography variant="overline" sx={{ fontWeight: 500, color: "#94a3b8" }}>
                                        Page No.
                                    </Typography>
                                </TableCell>
                                <TableCell colSpan={7} align="right">

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

export default ProjectList;
