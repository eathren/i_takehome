import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white hover:text-gray-400">
          <h1 className="text-2xl font-bold">SSS</h1>
        </Link>
        <nav></nav>
      </div>
    </header>
  );
}

export default Header;
