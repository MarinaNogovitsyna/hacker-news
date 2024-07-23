import React from "react";
import { FaUser } from "react-icons/fa6";
import styles from "./Author.module.css";

interface AuthorProps {
  name: string;
  textColor?:string
}

export const Author: React.FC<AuthorProps> = ({ name, textColor }) => {
  return (
    <div className={styles.author} style={{color: textColor}}>
      <FaUser color="gray" />
      <span>{name}</span>
    </div>
  );
};
