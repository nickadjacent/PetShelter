import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import styled from "styled-components";
import { Link } from "@reach/router";

const Header = styled.h1`
    display: inline-block;
`;

const Pets = () => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets")
            .then(res => setPets(res.data))
            .catch(console.log);
    }, []);

    const handleDelete = idToDel => {
        axios
            .delete("http://localhost:8000/api/pets/" + idToDel)
            .then(res => {
                const filteredPets = pets.filter(pet => pet._id !== idToDel);
                setPets(filteredPets);
            })
            .catch(console.log);
    };

    return (
        <>
            <div style={{marginTop: "30%"}}>
                <Header style={{backgroundColor: "rgba(0,0,0, 0.75)",
            color: "white",
            fontWeight: "bold"}} className="card-header">These pets are looking for a good home</Header>
            </div>
            <br/>
            <div class="text-right">
                <button class="btn btn-primary">
                    <Link class="text-light" to="/pets/new">Add a pet</Link>
                </button>
            </div>
            <br />
            <div>
                <table class="table table-dark table-hover table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Animal Type</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pets
                            .map((pet, idx) => (
                                <tr key={idx}>
                                    <td>{pet.name}</td>
                                    <td>{pet.petType}</td>
                                    <td>
                                        <Link class="btn btn-success" to={"/pets/" + pet._id}>Details</Link> |{" "}
                                        <Link class="btn btn-warning" to={"/pets/" + pet._id + "/edit"}>Edit</Link> |{" "}
                                        <button class="btn btn-danger" onClick={event => handleDelete(pet._id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Pets;