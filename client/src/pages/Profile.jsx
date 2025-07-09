import React from 'react'; 
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import './ProfilePage.css';
import CardSearch from '../components/Search Bar/CardSearch.jsx';
import profile_photo from '../images/profile_photo.jpg';

function Profile() {
  return (
   <div>

    <h1>Olá</h1>

    <CardSearch />
      <div>
    <img src="src/images/profile_photo.jpg" alt="Foto de Perfil" />
      </div>
   </div>
  );
}

export default Profile;