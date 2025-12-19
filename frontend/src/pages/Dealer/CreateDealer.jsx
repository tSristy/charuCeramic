import React, { use, useEffect, useState } from "react";
import { Button, TextField, Autocomplete, Stack, Container } from "@mui/material";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import { districtsByDivision, divisions } from "./data";
import { useSearchParams } from "react-router-dom";

const CreateDealer = () => {
const [searchParam] = useSearchParams();
  const [ID] = useState(searchParam.get("id") || null);

    const [dealer, setDealer] = useState({
        name: "",
        address: "",
        phone: "",
        division: null,
        district: null,
        thana: null
    });


    const handleSubmit = () => {
        if (ID) {
            handleUpdate();
            return;
        } else {
        ServerApi(`/dealers/add`, "POST", null, dealer)
            .then((res) => res.json())
            .then((res) => {
                console.log("create response:", res);
            })
            .catch((err) => console.error(err));
        }
    };
    

    


    const handleUpdate = () => {

        fetch(urlAPI + "/dealers/update/" + ID, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(dealer)
        })
            .then((res) => res.json())
            .then((res) => console.log("update response:", res))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {

        fetch(urlAPI + "/dealers/delete", {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => console.log("delete response:", res))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/dealers/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    console.log("fetched dealer:", res);
                    setDealer({
                        id: res.id,
                        name: res.name,
                        address: res.address,
                        phone: res.phone,
                        division: res.division,
                        district: res.district,
                        thana: res.thana
                    });
                });
        }
    }, [ID]);

    return (
        <>
        <Container>
            <Stack spacing={2} mt={5}>
                <TextField label="Name" size="small" value={dealer.name} onChange={(e) => setDealer(p => ({ ...p, name: e.target.value }))} />
                <TextField label="Address" size="small" value={dealer.address} onChange={(e) => setDealer(p => ({ ...p, address: e.target.value }))} />
                <TextField label="Phone" size="small" value={dealer.phone} onChange={(e) => setDealer(p => ({ ...p, phone: e.target.value }))} />

                <Autocomplete size="small"
                    options={divisions}
                    value={dealer.division}
                    onChange={(_, newVal) => setDealer(p => ({ ...p, division: newVal }))}
                    renderInput={(params) => <TextField {...params} label="Division" />}
                    freeSolo
                />

                <Autocomplete size="small"
                    options={dealer.division ? districtsByDivision[dealer.division] || [] : []}
                    value={dealer.district}
                    onChange={(_, newVal) => setDealer(p => ({ ...p, district: newVal }))}
                    renderInput={(params) => <TextField {...params} label="District" />}
                    freeSolo
                />

                <TextField label="Thana" size="small" value={dealer.thana} onChange={(e) => setDealer(p => ({ ...p, thana: e.target.value }))} />

                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleSubmit}>{ID ? "Update" : "Create"}</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                </Stack>
            </Stack>
        </Container>
            
        </>
    );
};

export default CreateDealer;