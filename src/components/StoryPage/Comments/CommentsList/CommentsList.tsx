import React from "react";
import { CommentItem } from "../CommentItem/CommentItem";
import { CommentInfo } from "../../../../types";
import styles from "./CommentaList.module.css";

interface CommentsListProps {
  kids: CommentInfo[];
}

export const CommentsList: React.FC<CommentsListProps> = ({ kids }) => {
  if (!kids.length) {
    return null;
  }

  return (
    <ul className={styles.comment_ul}>
      {kids.map((el) => (
        <CommentItem key={el.id} comment={el} />
      ))}
    </ul>
  );
};
