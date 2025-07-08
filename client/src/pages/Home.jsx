import CardSearch from "../components/Search Bar/CardSearch";
// import { FaPlay, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Se usar react-icons

function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      {/* Banner */}
      { /* Adicionar algum banner aqui depois */ }

      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
            Magic: The Gathering
          </h1>
          <p className="text-xl mb-2 text-gray-200">
            Search for your favorite cards
          </p>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto">
            Use the search bar below to find cards by name, type, or set.
          </p>
        </div>

        {/* Componente de busca */}
        <div className="mb-0 flex justify-center">
          <CardSearch />
        </div>

        {/* New to Magic + Get Started */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
          <span className="text-lg sm:text-xl font-medium text-white">New to Magic?</span>
          <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:scale-105 transition duration-300 font-medium shadow-lg">
            Get Started
          </button>
        </div>

        {/* Login + Sign up */}
        <div className="flex flex-row justify-center items-center gap-4">
          <button className="px-6 py-3 bg-white text-red-600 rounded-lg hover:bg-gray-100 hover:scale-105 transition duration-300 font-medium shadow-lg">
            Login
          </button>
          <button className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 hover:scale-105 transition duration-300 font-medium shadow-lg">
            Sign up
          </button>
        </div>
      </div>

      {/* Rodapé */}
      <footer className="mt-16 text-gray-500 text-sm">
        © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
      </footer>
    </div>
  );
}

export default Home;
