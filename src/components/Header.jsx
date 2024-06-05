import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Header = ({ className }) => {
  const { currUser, handleSignIn, handleSignOut } = useContext(AuthContext);
  return (
    <div className={className}>
      <h3>CRUD-26</h3>
      <ul>
        <li>Link1</li>
        <li>Link1</li>
        <li>Link1</li>
      </ul>
      <button onClick={currUser ? handleSignOut : handleSignIn}>{currUser ? currUser.displayName : "Sign In"}</button>
    </div>
  );
};

export default Header;
