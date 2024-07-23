import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { CommentInfo } from "../../../types";
import parse from "html-react-parser";
import { Loader } from "../../../Loader/Loader";
import styles from './CommentsItem.module.css'

interface CommentItemProps {
  comment: CommentInfo;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [nestedComments, setNestedComments] = useState<CommentInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${comment.id}.json`
      );
      const commentResponse = await response.json();
      if (commentResponse.kids?.length) {
        const commentsPromises = commentResponse.kids.map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        const comments: CommentInfo[] = await Promise.all(commentsPromises);
        setNestedComments(comments); 
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    {comment.text && <li className={styles.comment}>
      <div onClick={handleClick}>
        <div className={styles.comment_by}>
          <FaUser color="gray" />
          {<span>{comment.by}</span>}
        </div>
        <span>{parse(comment.text)}</span>
      </div>
      <Loader isShow={isLoading} size={20} />
      {nestedComments.length > 0 && (
        <ul className={styles.comment_ul}>
          {nestedComments.map((el) => (
            <CommentItem key={el.id} comment={el} />
          ))}
        </ul>
      )}
    </li>}
    </>
  );
};
