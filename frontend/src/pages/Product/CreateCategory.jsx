import React, { use, useEffect, useState } from "react";
import { Button, TextField, Autocomplete, Stack, Container } from "@mui/material";
import { ServerApi, urlAPI } from "../../route/ServerAPI";
import { useSearchParams } from "react-router-dom";

const CreateCategory = () => {
const [searchParam] = useSearchParams();
  const [ID] = useState(searchParam.get("id") || null);

    const [category, setCategory] = useState({
        name: "",
        slug: "",
        description: ""
    });


    const handleSubmit = () => {
        if (ID) {
            handleUpdate();
            return;
        } else {
        ServerApi(`/category/add`, "POST", null, category)
            .then((res) => res.json())
            .then((res) => {
                console.log("create response:", res);
            })
            .catch((err) => console.error(err));
        }
    };
    

    


    const handleUpdate = () => {

        fetch(urlAPI + "/category/update/" + ID, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then((res) => res.json())
            .then((res) => console.log("update response:", res))
            .catch((err) => console.error(err));
    };

    const handleDelete = () => {
if (ID === null) {

} else {
        fetch(urlAPI + "/category/delete/" + ID, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => console.log("delete response:", res))
            .catch((err) => console.error(err));
    }};

    useEffect(() => {
        if (ID !== null) {
            ServerApi(`/category/${ID}`, "GET", null, null)
                .then((res) => res.json())
                .then((res) => {
                    setCategory({
                        id: res.id,
                        name: res.name,
                        slug: res.slug,
                        description: res.description
                    });
                });
        }
    }, [ID]);

    return (
        <>
        <Container>
            <Stack spacing={2} mt={5}>
                <TextField label="Name" size="small" value={category.name} onChange={(e) => setCategory(p => ({ ...p, name: e.target.value }))} />
                <TextField label="Url Path" size="small" value={category.slug} onChange={(e) => setCategory(p => ({ ...p, slug: e.target.value }))} />
                <TextField label="Description" size="small" value={category.description} onChange={(e) => setCategory(p => ({ ...p, description: e.target.value }))} />
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={handleSubmit}>{ID ? "Update" : "Create"}</Button>
                    <Button variant="contained" color="error" onClick={handleDelete}>{ID ? "Delete" : "Go back"}</Button>
                </Stack>
            </Stack>
        </Container>
            
        </>
    );
};

export default CreateCategory;