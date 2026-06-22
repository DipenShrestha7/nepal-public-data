import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="flex gap-2  items-center">
            <img src={logo} alt="Nepal Data Explorer Logo" className="h-12" />
            <h1 className="text-[19px] font-semibold">Nepal Data Explorer</h1>
          </div>
        </Link>

        <nav className="flex gap-8">
          <Link
            to="/"
            className={`font-medium transition-colors border-b-2 pb-1 ${
              isActive("/")
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 hover:text-blue-600 border-transparent"
            }`}
          >
            Home
          </Link>
          <Link
            to="/dataset"
            className={`font-medium transition-colors border-b-2 pb-1 ${
              isActive("/dataset")
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 hover:text-blue-600 border-transparent"
            }`}
          >
            Dataset
          </Link>
          <Link
            to="/visualizations"
            className={`font-medium transition-colors border-b-2 pb-1 ${
              isActive("/visualizations")
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 hover:text-blue-600 border-transparent"
            }`}
          >
            Visualizations
          </Link>
          <Link
            to="/about"
            className={`font-medium transition-colors border-b-2 pb-1 ${
              isActive("/about")
                ? "text-blue-600 border-blue-600"
                : "text-gray-700 hover:text-blue-600 border-transparent"
            }`}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
