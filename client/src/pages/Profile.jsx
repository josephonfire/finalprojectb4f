import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardSearch from '../components/Search Bar/CardSearch.jsx';
import profilePhoto from '../images/profile_photo.jpg';
import ListButton from '../components/list_btn.jsx';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import React from "react";
import "../index.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CardSearch from "../components/Search Bar/CardSearch.jsx";
import profilePhoto from "../images/profile_photo.jpg";
import ListButton from "../components/list_btn.jsx";
import NavBarHome from "../components/NavBarHome";


// Componente de perfil do usuário, que exibe informações do usuário e permite navegar para outras páginas
// O username é obtido da URL, por exemplo, /profile/testuser
// O usuário pode criar um novo deck, ver suas cartas, estatísticas e tutoriais
// O componente também inclui uma barra de pesquisa para buscar cartas

function Profile() {
  const { username } = useParams(); // vai pegar "testuser" da url /profile/testuser
  const navigate = useNavigate(); // hook para navegar entre paginas

  const handleCreateDeck = () => { 
    navigate(`/create-deck?user=${username}`); // Navega para a página de criação de deck com o username como parâmetro
  };

  return (
    <>
      {/* cabecalho para colocar a navbar */}
      <header>
        <NavBarHome />
      </header>
      {/* barra de pesquisa */}
      <div className="mb-0 flex justify-center">
        <CardSearch />
      </div>
      {/* foto do perfil */}
      <div className="mb-0 flex justify-center">
        <img
          src={profilePhoto}
          alt="user-profile-photo"
          className="rounded-full w-52 h-52 object-cover drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] m-5"
        />
      </div>

      {/* caixa com user name FALTA CORES NO FUNDO DA CAIXA*/}
      <div className="m-10 flex flex-col justify-center bg-gradient-to-br from-red-950/90 to-gray-950/90 object-cover drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] mt-7">
        <h2 className="mx-auto w-fit text-white text-2xl font-bold">
          {username}
        </h2>
      </div>

      {/* menu com botoes para as outras paginas */}
      <div className="m-10 flex flex-col justify-center">
        <ListButton text="Statistics" link="/statsPage/" />
        {/*  substituir pelo link correto */}
        <ListButton text="My Cards" link="/userCards/" />
        {/*  substituir pelo link correto */}
        <ListButton
          text="Create New Deck"
          link="#"
          onClick={() => handleCreateDeck()}
        />
        <ListButton text="My Decks" link="/userDecks/" />
        {/*  substituir pelo link correto */}
        <ListButton text="Tutorials" link="/Tutorials/" />
      </div>

      {/* rodape */}
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 -
        Bytes4Future
      </footer>
    </>
  );
}

export default Profile;
