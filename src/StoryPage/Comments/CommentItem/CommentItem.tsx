import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { CommentInfo } from "../../../types";
import parse from "html-react-parser";
import { Loader } from "../../../Loader/Loader";
import styles from "./CommentsItem.module.css";
import { useFetchData } from "../../../hoc/useFetchData";

interface CommentItemProps {
  comment: CommentInfo;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const { data, isLoading } = useFetchData<CommentInfo[]>({
    dataType: "comments",
    shouldFetch: shouldFetch,
    id: comment.id,
  });

  useEffect(() => {
    setShouldFetch(false);
  }, [isLoading, data]);

  if (comment.deleted && !comment.text) {
    return (
      <li className={styles.comment}>
        <span className={styles.comment_deleted}>Comment is deleted</span>
      </li>
    );
  }

  return (
    <>
      <li className={styles.comment}>
        <div onClick={() => setShouldFetch(true)}>
          <div className={styles.comment_by}>
            <FaUser color="gray" />
            {<span>{comment.by}</span>}
          </div>
          <span>{parse(comment.text)}</span>
        </div>
        <Loader isShow={isLoading} size={20} />
        {data.length > 0 && (
          <ul className={styles.comment_ul}>
            {data.map((el) => (
              <CommentItem key={el.id} comment={el} />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};
