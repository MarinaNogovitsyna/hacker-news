import React, { useEffect, useState } from "react";
import { CommentInfo } from "../../../../types";
import parse from "html-react-parser";
import styles from "./CommentsItem.module.css";
import { useFetchData } from "../../../../hoc/useFetchData";
import { LoaderAndError } from "../../../Loadind/LoaderAndError/LoaderAndError";
import { Author } from "../../../Author/Author";

interface CommentItemProps {
  comment: CommentInfo;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const { data, isLoading, error } = useFetchData<CommentInfo[]>({
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
          <Author name={comment.by} textColor="#696e30"/>
          <span>{parse(comment.text)}</span>
        </div>
        <LoaderAndError
          errorText="Failed to load comments."
          loaderSize={20}
          showError={error}
          showLoader={isLoading}
        />
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
