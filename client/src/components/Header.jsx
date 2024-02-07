import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/react.svg";

function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        BooksApp
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/books">Books</NavLink>
      </nav>
    </header>
  );
}

export default Header;
