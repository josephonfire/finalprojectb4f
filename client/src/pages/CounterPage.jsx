import LifeCounter from "../components/LifeCounter";

function CounterPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-12 p-4">
        <h1 className="text-3xl font-bold text-red-500">Life Counter</h1>
        <LifeCounter />
        <footer className="mt-4 text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Magic Deck Builder created by Group 5 - Bytes4Future
        </footer>
        </div>
    );
    }