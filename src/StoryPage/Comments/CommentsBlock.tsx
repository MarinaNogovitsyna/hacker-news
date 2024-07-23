import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import styles from "./CommentsBlock.module.css";
import { Loader } from "../../Loader/Loader";
import { CommentsList } from "./CommentsList/CommentsList";
import { CommentInfo } from "../../types";

interface CommentsBlockProps {
  id: number;
}

export const CommentsBlock: React.FC<CommentsBlockProps> = ({ id }) => {
  const [comments, setComments] = useState<CommentInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`
      );
      const story = await response.json();
      if (story.kids?.length){
        const commentsPromises = story.kids.map((id: number) =>
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) =>
              res.json()
            )
          );
          const comments:CommentInfo[] = await Promise.all(commentsPromises);
          setComments(comments);
      }     
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleUpdate();
  }, [])

  return (
    <>
      <div className={styles.comments_header}>
        <div className={styles.comments_header_number}>
          <FaComments color="gray" size={20} />
          <span>{comments ? comments.length : "0"}</span>
        </div>
        <div className={styles.comments_header_update} onClick={handleUpdate}>
          <span>Update comments</span>
          <RxUpdate color="gray" size={20} />
        </div>
      </div>
      {(isLoading || error) && <div className={styles.loader}>
        <Loader isShow={isLoading} size={40} />
        {error && <span>Data retrieval error</span>}
      </div>}
      {comments.length > 0 && <CommentsList kids={comments}/>}
    </>
  );
};
