import { useNavigate } from "react-router-dom";

function ProfileTest() {
  const navigate = useNavigate();
  const username = "testuser";

  const handleCreateDeck = () => {
    navigate(`/create-deck?user=${username}`);
  };

  return (
    <div>
      <h1>Profile Test for {username}</h1>
      <button onClick={handleCreateDeck}>Create Deck</button>
    </div>
  );
}

export default ProfileTest;
