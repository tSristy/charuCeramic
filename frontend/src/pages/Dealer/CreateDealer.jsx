import { Button } from "@mui/material";
import { ServerApi, urlAPI } from "../../route/ServerAPI";

const CreateDealer = () => {

    const handleSubmit = ()=>{
        const body={
            name: "maliha uddin",
            address: "shewara para",
            phone: "01796299885",
            division: "mymensingh",
            district: "mymensingh sodor",
            thana: "mirpur10"
        }
ServerApi(`/dealer/add`, 'POST', null, body)
            .then(res => res.json())
            .then(res=>{
                setDealerList(res)
            })
    }
    


    const handleUpdate = ()=>{

         const body={
            id: 11,
            name: "sristy uddin",
            address: "shewara para",
            phone: "01796299885",
            division: "mymensingh",
            district: "mymensingh sodor",
            thana: "mirpur10"
        }


        fetch(urlAPI+'/dealer/update',{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }) .then(res => res.json())
            .then(res=>{
                setDealerList(res)
            })
    }

     const handleDelete = ()=>{

         const body={
            id: 6,
        }


        fetch(urlAPI+'/dealer/delete',{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        }) .then(res => res.json())
            .then(res=>{
                setDealerList(res)
            })
    }


    return (
        <>
        <Button variant="contained" onClick={handleSubmit}>Create</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        <Button variant="contained" color="secondary" onClick={handleUpdate}>update</Button>
        </>
    )
};

export default CreateDealer;