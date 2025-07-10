import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardSearch from '../components/Search Bar/CardSearch.jsx';
import profilePhoto from '../images/profile_photo.jpg';
import ListButton from '../components/list_btn.jsx';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBarHome from "../components/NavBarHome";

//lista dos decks do user
//tem que ir a bd do user e ver que decks (listas de cartas) lhe estão associados
import { useEffect, useState } from "react";
import axios from "axios";


//é necessário ligar à db

function OwnedDecks() {

    const { userId } = useParams();
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const res = await axios.get(`/api/user/${userId}/decks`);
                setDecks(res.data);
            } catch (err) {
                console.error("Erro ao carregar decks", err);
            }
        };

        fetchDecks();
    }, []);

    return (

        <>
            < header >
                <NavBarHome />
            </header >

            <div className="p-8 text-center min-h-screen text-white">
                <h1 className="font-bold text-xl mb-6 text-white">Your owned Decks</h1>
            </div>

            <div className="m-10 flex flex-col justify-center">
                {decks.map((deck, index) => (
                    <ListButton
                        key={deck._id || index}
                        text={deck.name}
                        link={`/decks/${deck._id}`}
                    />
                ))}

            </div >






            < footer className="mt-16 text-gray-500 text-sm text-center" >
                © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
            </footer >
        </>
    );
}
export default OwnedDecks;