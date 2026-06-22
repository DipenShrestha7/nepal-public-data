import { Link } from "react-router-dom";
import logo from "../images/logo.png";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="flex gap-2  items-center">
            <img src={logo} alt="Nepal Data Explorer Logo" className="h-12" />
            <h1 className="text-[19px] font-semibold">Nepal Data Explorer</h1>
          </div>
        </Link>

        <nav className="flex gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/dataset"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Dataset
          </Link>
          <Link
            to="/visualizations"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Visualizations
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
