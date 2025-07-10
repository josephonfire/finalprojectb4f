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

function Decks(){

}
export default Decks;