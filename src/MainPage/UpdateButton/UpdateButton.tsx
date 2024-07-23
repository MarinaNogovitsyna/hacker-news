import React from "react";
import { RxUpdate } from "react-icons/rx";
import styles from "./UpdateButton.module.css";

interface UpdateButtonProps {
  onUpdate: () => void;
}

export const UpdateButton: React.FC<UpdateButtonProps> = ({ onUpdate }) => {
  return (
    <div className={styles.update} onClick={onUpdate}>
      <RxUpdate size="40" color="#707070" />
    </div>
  );
};
