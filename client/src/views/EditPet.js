import React, { useEffect, useState } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios";
import styled from 'styled-components'

const Header = styled.h3`
    display: inline-block;
`;

const EditPet = props => {
    console.log(props);
    const [name, setName] = useState("");
    const [petType, setPetType] = useState("");
    const [description, setDescription] = useState("");
    const [firstSkill, setFirstSkill] = useState("");
    const [secondSkill, setSecondSkill] = useState("");
    const [thirdSkill, setThirdSkill] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/" + props.id)
            .then(res => {
                const pet = res.data;

                setName(pet.name);
                setPetType(pet.petType);
                setDescription(pet.description);
                setFirstSkill(pet.firstSkill);
                setSecondSkill(pet.secondSkill);
                setThirdSkill(pet.thirdSkill);
            })
            .catch(console.log);
    }, [props.id]);

    const handleSubmit = event => {
        event.preventDefault();

        const editedPet = {
            // long-form
            name: name,
            // shorthand because key name and value stored in matching var name
            petType,
            description,
        };

        axios
            .put("http://localhost:8000/api/pets/" + props.id, editedPet)
            .then(res => navigate("/pets/" + res.data._id))
            .catch(err => {
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div>
            <div class="text-right">
                <button class="btn btn-primary">
                    <Link class="text-light" to="/">Home</Link>
                </button>
            </div>
            <br/>
            <div>
                <Header style={{backgroundColor: "rgba(0,0,0, 0.75)",
            color: "white",
            fontWeight: "bold"}} className="card-header">Update {name}'s profile!</Header>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label>Name: </label>
                    <input class="form-control"
                        onChange={event => setName(event.target.value)}
                        value={name}
                        type="text"
                    />
                    {errors.name ? (
                        <span className="error">{errors.name.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Pet Type: </label>
                    <input class="form-control"
                        onChange={event => setPetType(event.target.value)}
                        value={petType}
                        type="text"
                    />
                    {errors.petType ? (
                        <span className="error">{errors.petType.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Description: </label>
                    <textarea class="form-control"
                        onChange={event => setDescription(event.target.value)}
                        value={description}
                        type="text"
                    ></textarea>
                </div>

                <div class="form-group">
                    <label>First Skill: </label>
                    <input class="form-control"
                        onChange={event => setFirstSkill(event.target.value)}
                        value={firstSkill}
                        type="text"
                    ></input>
                </div>

                <div class="form-group">
                    <label>Second Skill: </label>
                    <input class="form-control"
                        onChange={event => setSecondSkill(event.target.value)}
                        value={secondSkill}
                        type="text"
                    ></input>
                </div>

                <div class="form-group">
                    <label>Third Skill: </label>
                    <input class="form-control"
                        onChange={event => setThirdSkill(event.target.value)}
                        value={thirdSkill}
                        type="text"
                    ></input>
                </div>

                <div class=" text-right">
                    <button type="submit" class="btn btn-success">Edit</button>
                </div>
            </form>
        </div>
    );
};

export default EditPet;