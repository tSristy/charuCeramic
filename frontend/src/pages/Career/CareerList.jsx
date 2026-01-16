import { Backdrop, Box, Chip, Container, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ServerApi, urlAPI } from "../../route/ServerAPI";
import BtnAdminSearch from "../../assets/Button/BtnAdminSearch";

import InfoIcon from '@mui/icons-material/Info';
import SquareIcon from '@mui/icons-material/Square';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const CareerList = () => {
	const navigate = useNavigate();
	const [careerList, setCareerList] = useState([]);
	const [paginationDetails, setPaginationDetails] = useState({
		pageNo: 1,
		totalRows: 0,
		totalPages: 0
	});
	const [searchVariable, setSearchVariable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [detailResume, setDetailResume] = useState({});

	useEffect(() => {
		const body = {
			pageNo: paginationDetails.pageNo,
			searchVariable: searchVariable
		};
		ServerApi(`/career/list`, 'POST', null, body)
			.then(res => res.json())
			.then(res => {
				setCareerList(res.items);
				setPaginationDetails(previousState => {
					return {
						...previousState,
						totalRows: res.totalRows,
						totalPages: Math.ceil(res.totalRows / 12)
					}
				});
			})
	}, [searchVariable, paginationDetails.pageNo]);

	const HandleDelete = (id) => {
		const tempArr = careerList.filter(item => item.id !== id);
		ServerApi(`/career/delete/${id}`, 'DELETE', null, null)
			.then(res => res.json())
			.then(res => {
				setCareerList(tempArr);
			})
	}

	return (
		<Box py={5}>
			<Container>
				<Stack direction={{ sm: "column", md: "row" }} justifyContent="space-between" alignItems="center">
					<Box mb={3}>
						<Typography variant="h5" fontWeight={600} mt={5} mb={1}>Records Explorer <Chip label="Career" color="error" /></Typography>
						<Typography variant="overline" color="text.secondary">System Database • {paginationDetails.totalRows} active entries</Typography>
					</Box>

					<Box sx={{ width: { sm: "100%", md: "30%" }, display: "flex", gap: 1 }}>
						<BtnAdminSearch
							onChange={(e) => {setPaginationDetails(prev=>({...prev, pageNo:1}));setSearchVariable(e.target.value)}}
						/>
					</Box>
				</Stack>

				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table" sx={{ overflowX: "auto" }}>
						<TableHead sx={{ bgcolor: "#000" }}>
							<TableRow>
								<TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Email</TableCell>
								<TableCell>Phone</TableCell>
								<TableCell>Address</TableCell>
								<TableCell>Cover Letter</TableCell>
								<TableCell colSpan={2} sx={{ textAlign: "center" }}> Actions</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{careerList?.map((item, index) => (
								<TableRow key={item.id}>
									<TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
									<TableCell> {item.name} </TableCell>
									<TableCell> {item.email} </TableCell>
									<TableCell> {item.phone} </TableCell>
									<TableCell> {item.address} </TableCell>
									<TableCell> {item.cover_letter ? (item.cover_letter.length > 100 ? item.cover_letter.slice(0, 100) + '...' : item.cover_letter) : ''} </TableCell>
									{/* <TableCell><Tooltip title="Edit"><IconButton  onClick={(e)=>handlePanel(parseInt(item.id))} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell> */}
									<TableCell><Tooltip title="Info"><IconButton onClick={(e) => { setDetailResume(item); setLoading(true) }} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
									<TableCell><Tooltip title="Delete"><IconButton onClick={(e) => HandleDelete(item.id)} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}>
										<DeleteForeverRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
								</TableRow>
							))}

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


			<Backdrop onClick={(e) => { setLoading(false); setDetailResume({}) }}
				sx={{
					color: '#3939396c',
					zIndex: 9,
				}}
				open={loading}
			>
				<Box p={4} sx={{ bgcolor: '#fff', width: '50vw' }} onClick={(e) => e.stopPropagation()}>
					<Stack direction='column'>
						Hi, Meet {detailResume?.name}.
						{detailResume.file_path ?
							<Box>
								<a href={urlAPI + detailResume?.file_path} target="_blank">Click</a> to download the resure
							</Box> : null}
						<br />
						<Typography variant="overline">Basic Details</Typography>
						<Box> Name : <Typography variant="overline">{detailResume?.name}</Typography></Box>
						<Box> Email : <Typography variant="overline">{detailResume?.email}</Typography></Box>
						<Box> Phone : <Typography variant="overline">{detailResume?.phone}</Typography></Box>
						<Box> Address : <Typography variant="overline">{detailResume?.address}</Typography></Box>
						<br/>
						<Box sx={{ height: '150px', overflow: 'auto'}}> Cover letter : {detailResume?.cover_letter}</Box>
					</Stack>
				</Box>

			</Backdrop>
		</Box>
	);
};

export default CareerList;
