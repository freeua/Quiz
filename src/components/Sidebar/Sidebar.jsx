import React from "react";
import styles from "./Sidebar.module.css";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";

const Sidebar = ({ handleLogOut }) => {
  return (
    <ul className={styles.menuList}>
      <li className={styles.menuHeader}>
        <span>
          <Link to="/">Dashboard Home</Link>
        </span>
      </li>
      <li className={styles.menuSubeader}>
        <span>User Management</span>
      </li>
      <li>Roles</li>
      <li>Permissions</li>
      <li>Users</li>
      <li className={styles.menuSubeader}>
        <span>Activation Management</span>
      </li>
      <li>
        <Link to="/activation-types">Activation Types</Link>
      </li>
      <li>Activations</li>
      <li>Locations</li>
      <li>People</li>
      <li className={styles.menuSubeader}>
        <span>Quiz Management</span>
      </li>
      <li>
        <Link to="/quizzes">Quizzes</Link>
      </li>
      <li>Questionaries</li>
      <li>Answers</li>
      <li>Products</li>
      <li className={styles.logout}>
        <Button text="log out" onClick={handleLogOut()} />
      </li>
    </ul>
  );
};

export default Sidebar;
