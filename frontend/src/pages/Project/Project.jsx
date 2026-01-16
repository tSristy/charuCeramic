import { Box, Container, Grid, Stack, TextField, Typography } from "@mui/material";
import bgImg from '../../img/bg1.jpg';
import { useEffect, useState } from "react";
import { ServerApi, urlAPI } from "../../route/ServerAPI";

const Project = () => {
    const [projectList, setProjectList] = useState([]);
    const [searchVariable, setSearchVariable] = useState('');

    useEffect(() => {
        ServerApi(`/project/list`, 'POST', null, { searchVariable: searchVariable })
            .then(res => res.json())
            .then(res => {
                setProjectList(res.items);
            })
    }, [searchVariable]);


    return (
        <>
            <Box sx={{
                borderBottom: 4,
                borderColor: "#ED1C24",
                display: 'block',
                aspectRatio: '16/4',
                width: '100%',
                height: "auto", 
                overflow: 'hidden',
                bgcolor: '#f0f0f0'
            }}>
                <Box 
                    component="img" 
                    src={bgImg} 
                    fetchPriority="high" 
                    loading="eager" 
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </Box>

            <Box sx={{ py: 10 }}>
                <Container>
                    <Typography sx={{ fontSize: '2.5rem', fontWeight: 600, mb: 5, textAlign: 'center' }}>
                        Mega Project Reference
                    </Typography>

                    <Box sx={{ my: 5 }}>
                        <TextField fullWidth size="small" onChange={(e) => { setPaginationDetails(prev => ({ ...prev, pageNo: 1 })); setSearchVariable(e.target.value) }} label="Search" />
                    </Box>
                </Container>

                <Container maxWidth='xl'>
                    <Grid container spacing={3}>
                        {
                            projectList?.map((item, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={item.id} sx={{ mt: 4 }}>
                                    <Stack direction='column' spacing={1} sx={{
                                        position: 'relative', overflow: 'hidden'
                                    }}>
                                        <Box component='img' src={urlAPI + item.featured_image} alt={item.title} sx={{
                                            width: '100%', aspectRatio: '16/10', height: 'auto'
                                        }} />
                                        {
                                            index < 6 && (
                                                <Box sx={{
                                                    position: 'absolute',
                                                    transform: 'rotate(-45deg)',
                                                    bgcolor: '#fffb00ff',
                                                    py: 1, px: 6, top: 0, left: -40, zIndex: 2
                                                }}>
                                                    New
                                                </Box>
                                            )
                                        }
                                        <Typography variant="h6">{item.title}</Typography>
                                        <Box pt={2} pb={1}>
                                            <Typography variant="overline" sx={{ fontSize: '.9rem', border: 1, px: 2, py: 1, borderRadius: 10 }}>{item.location}</Typography>
                                        </Box>
                                    </Stack>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>

            </Box>
        </>
    );
};

export default Project;