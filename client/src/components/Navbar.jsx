import React from "react";
import "./style.css";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export const logo = require("../assets/logo.png");

const Navbar = ({ username, surname }) => {
  const [, , removeCookie] = useCookies(["token"]);

  const logOut = () => {
    removeCookie("token");
    localStorage.removeItem("name");
    localStorage.removeItem("surname");
    localStorage.removeItem("role");
  };

  return (
    <div className="navbar-main-class">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo"></img>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="true"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/home">
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/about">
                About <span className="sr-only">(about)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/Dashboard">
                Dashboard <span className="sr-only">(Dashboard)</span>
              </NavLink>
            </li>
            <li className="nav-item active">
              <NavLink className="nav-link" to="/admin">
                Admin <span className="sr-only">(admin)</span>
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <div className="user-icon-name">
              {" "}
              <AccountCircleOutlinedIcon
                style={{ color: "white", fontSize: "35px" }}
              ></AccountCircleOutlinedIcon>
              <div className="username-navbar">{username}</div>
              <div className="surname-navbar">{surname}</div>
            </div>

            <button
              className="btn btn-outline-Light my-2 my-sm-0 buttonLogOut"
              onClick={logOut}
            >
              Log Out
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
