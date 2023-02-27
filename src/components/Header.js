import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <img src="./Images/logo.svg" alt="logo" className="logo_icon" />
      </Link>
      <nav className="navigation">
        <div className="nav_link">
          <img src="./Images/schedule.png" alt="icon schedule" />
          <Link to="/schedule">Schedule</Link>
        </div>
        <div className="nav_link">
          <img src="./Images/leaderboard.png" alt="icon leaderboard" />
          <Link to="/leaderboard">Leaderboard</Link>
        </div>
      </nav>
    </header>
  );
}

export { Header };
