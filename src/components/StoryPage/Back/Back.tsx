import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styles from "./Back.module.css";

export const Back = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div onClick={handleClick} className={styles.back}>
      <IoMdArrowBack color="gray" size={40} />
    </div>
  );
};
