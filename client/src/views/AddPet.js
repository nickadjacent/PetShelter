import React, { useState } from "react";
import { navigate, Link } from "@reach/router";
import axios from "axios";
import styled from 'styled-components'

const Header = styled.h3`
    display: inline-block;
`;


const AddPet = props => {
    const [name, setName] = useState("");
    const [petType, setPetType] = useState("");
    const [description, setDescription] = useState("");
    const [firstSkill, setFirstSkill] = useState("");
    const [secondSkill, setSecondSkill] = useState("");
    const [thirdSkill, setThirdSkill] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = event => {
        event.preventDefault();

        const newPet = {
            // long-form
            name: name,
            // shorthand because key name and value stored in matching var name
            petType,
            description,
            firstSkill,
            secondSkill,
            thirdSkill,
        };

        axios
            .post("http://localhost:8000/api/pets", newPet)
            .then(res => {
                navigate("/");
            })
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
            <br />
            <div>
                <Header style={{
                    backgroundColor: "rgba(0,0,0, 0.75)",
                    color: "white",
                    fontWeight: "bold"
                }} className="card-header">Do you know a pet who needs a home?</Header>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label>Pet Name:</label>
                    <input class="form-control" onChange={event => setName(event.target.value)} type="text" />
                    {errors.name ? (
                        <span className="error">{errors.name.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Pet Type:</label>
                    <input class="form-control"
                        onChange={event => setPetType(event.target.value)}
                        type="text"
                    />
                    {errors.petType ? (
                        <span className="error">{errors.petType.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Pet Description:</label>
                    <textarea class="form-control"
                        onChange={event => setDescription(event.target.value)}
                        type="text"
                    />
                    {errors.description ? (
                        <span className="error">{errors.description.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Skill 1: </label>
                    <input class="form-control"
                        onChange={event => setFirstSkill(event.target.value)}
                        type="text"
                    />
                    {errors.firstSkill ? (
                        <span className="error">{errors.firstSkill.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Skill 2: </label>
                    <input class="form-control"
                        onChange={event => setSecondSkill(event.target.value)}
                        type="text"
                    />
                    {errors.secondSkill ? (
                        <span className="error">{errors.secondSkill.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="form-group">
                    <label>Skill 3: </label>
                    <input class="form-control"
                        onChange={event => setThirdSkill(event.target.value)}
                        type="text"
                    />
                    {errors.thirdSkill ? (
                        <span className="error">{errors.thirdSkill.message}</span>
                    ) : (
                            ""
                        )}
                </div>

                <div class="text-right">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddPet;