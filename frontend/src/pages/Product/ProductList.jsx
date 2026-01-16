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

const ProductList = () => {
	const navigate = useNavigate();
	const [productList, setProductList] = useState([]);
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
		ServerApi(`/product/list`, 'POST', null, body)
			.then(res => res.json())
			.then(res => {
				setProductList(res.items);
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
		const tempArr = productList.filter(prod => prod.id !== id);
		ServerApi(`/product/delete/${id}`, 'DELETE', null, null)
			.then(res => res.json())
			.then(res => {
				setProductList(tempArr);
			})
	}

	const handlePanel = (arg) => {
		if (typeof (arg) === "string") {
			navigate(arg);
		}
		else navigate(`/product-panel?id=${arg}`);
	};


	return (
		<Box py={5}>
			<Container>
				<Stack direction={{ sm: "column", md: "row" }} justifyContent="space-between" alignItems="center">
					<Box mb={3}>
						<Typography variant="h5" fontWeight={600} mt={5} mb={1}>Records Explorer  <Chip label="Product" color="error" /></Typography>
						<Typography variant="overline" color="text.secondary">System Database • {paginationDetails.totalRows} active entries</Typography>
					</Box>

					<Box sx={{ width: { sm: "100%", md: "30%" }, display: "flex", gap: 1 }}>
						<BtnAdminSearch
							onChange={(e) => {setPaginationDetails(prev=>({...prev, pageNo:1}));setSearchVariable(e.target.value)}}
						/>
						<BtnAdminSubmit text="Create" onClick={(e) => handlePanel('/product-panel')} />
					</Box>
				</Stack>



				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead sx={{ bgcolor: "#000" }}>
							<TableRow>
								<TableCell><SquareIcon fontSize="small" sx={{ color: "#ff0000" }} /></TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Category</TableCell>
								<TableCell>Description</TableCell>
								<TableCell>Model Number</TableCell>
								<TableCell>Brand Name</TableCell>
								<TableCell colSpan={3} sx={{ textAlign: "center" }}> Actions</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{productList.map((item, index) => (
								<TableRow key={item.id}>
									<TableCell> <Typography variant="overline">{index + 1}</Typography> </TableCell>
									<TableCell> {item.name} </TableCell>
									<TableCell> {item.cat_name} </TableCell>
									<TableCell width={"10%"}> <Box component="img" src={urlAPI + item.image_url} sx={{ width: "100%", objectFit: "cover" }} /></TableCell>
									<TableCell> {item.model_number} </TableCell>
									<TableCell> {item.brand_name} </TableCell>
									<TableCell><Tooltip title="Edit"><IconButton onClick={(e) => handlePanel(parseInt(item.id))} sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><EditRoundedIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
									<TableCell><Tooltip title="Info"><IconButton sx={{ color: "#94a3b8", '&:hover': { color: "#ff0000" } }}><InfoIcon sx={{ fontSize: '1rem' }} /></IconButton></Tooltip></TableCell>
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

		</Box>
	);
};

export default ProductList;
