import { useState } from 'react';
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

function ownedDecks() {

    return (<>
        <NavBarHome />
        <div>
        </div>





        {/* Rodapé */}
        <footer className="mt-16 text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
        </footer>

    </>
}
export default ownedDecks;