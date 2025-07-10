import '../index.css';
import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardSearch from '../components/Search Bar/CardSearch.jsx';
import profilePhoto from '../images/profile_photo.jpg';
import ListButton from '../components/list_btn.jsx';


function Profile() {
  return (
    <>
    {/* cabecalho para colocar a navbar */}
    <header></header>
    {/* barra de pesquisa */}
      <div className="mb-0 flex justify-center">
        <CardSearch />
      </div>
      {/* foto de perfil */}
      <div className="mb-0 flex justify-center">
        <img src={profilePhoto} alt="user-profile-photo" className="rounded-full w-52 h-52 object-cover drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] m-5"  />
      </div>

      {/* caixa com user name */}
      <div></div>

      {/* menu com botoes para as outras paginas */}
      <div className="m-10 flex justify-center">
        <ListButton/>
        <ListButton/>
      </div>

      {/* rodape */}
      <footer className="mt-4 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </>
  );
}

export default Profile;