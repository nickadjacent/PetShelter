import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";
import styled from 'styled-components'

const Header = styled.h3`
    display: inline-block;
`;

// id prop comes from the URL, see routing :id
const PetDetails = ({ id }) => {
    const [pet, setPet] = useState(null);
    const [msg, setMsg] = useState("loading...");
    const [alreadyLiked, setAlreadyLiked] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/pets/" + id)
            .then(res => setPet(res.data))
            .catch(setMsg("Sumtin Wrong"));
    }, [id]);

    const handleLike = isUpvote => {
        if (alreadyLiked) {
            return;
        }

        if (isUpvote) {
            pet.likeCount++;
        } else {
            pet.dislikeCount++;
        }

        axios
            .put("http://localhost:8000/api/pets/" + id, pet)
            .then(res => {
                const updatedPet = res.data;
                setPet(updatedPet);
                setAlreadyLiked(true);
            })
            .catch(console.log);
    };

    if (pet === null) {
        return msg;
    }

    return (
        <div className="text-center">
            <div class="text-right">
                <button class="btn btn-primary">
                    <Link class="text-light" to="/">Home</Link>
                </button>
            </div>
            <br/>
            <div>
                <Header style={{backgroundColor: "rgba(0,0,0, 0.75)",
            color: "white",
            fontWeight: "bold"}} className="card-header">Learn more about {pet.name}!</Header>
            </div>
            <br/>
            <div class="container">
                <div class="row">
                    <div class="col border bg-dark text-white">Pet Type</div>
                    <div class="col border bg-dark text-white">Description</div>
                </div>
                <div class="row">
                    <div class="col border bg-dark text-white">{pet.petType}</div>
                    <div class="col border bg-dark text-white">{pet.description}</div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col border bg-dark text-white">Skills</div>
                </div>
                <div class="row">
                    <div class="col border bg-dark text-white">{pet.firstSkill}</div>
                    <div class="col border bg-dark text-white">{pet.secondSkill}</div>
                    <div class="col border bg-dark text-white">{pet.thirdSkill}</div>
                </div>
            </div>
            <span onClick={event => handleLike(true)} className="arrow">
                {pet.likeCount}<img style={{width:70, height: 70}} src="https://media.istockphoto.com/vectors/cartoon-cute-dog-giving-thumbs-up-vector-id1131055434?k=6&m=1131055434&s=170667a&w=0&h=udxkXKRWjAc-E-ydL5FRwArXD0ukfrz9yUWf_VsbxM8=" alt=""/>{" "}
            </span>
            <span onClick={event => handleLike(false)} className="arrow">
                {pet.dislikeCount}<img style={{width:70, height: 70}} src="https://i.pinimg.com/originals/40/6d/4c/406d4c6a43f03a54288685fda8351d85.jpg" alt=""/>
            </span>
        </div>
    );
};

export default PetDetails;