import CardSearch from "../components/Search Bar/CardSearch";

function Home() {
  return (
    <div className="App min-h-screen flex flex-col items-center pt-16">
      <br />
      <h1 className="text-4xl font-bold mb-6">Magic: The Gathering</h1>
      <p className="text-lg mb-4">Search for your favorite cards</p>
      <p className="text-sm text-gray-600 mb-6">
        Use the search bar below to find cards by name, type, or set.
      </p>
      <br />
      <p className="text-lg font-semibold mb-4"></p>
      <CardSearch />
        <p className="text-lg font-medium mb-2">New to Magic?</p>
        <button className="px-6 py-3 bg-red-600 text-white rounded-4x1 hover:bg-red-700 transition">
          Get Started
        </button> <br></br>
        <button className="px-6 py-3 bg-white text-red-600 rounded hover:bg-red-300 transition">
          Login
        </button> <br></br>
        <button>Sign up</button>
      </div>
  );
}

export default Home;
