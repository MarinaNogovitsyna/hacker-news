import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import styles from "./CommentsBlock.module.css";
import { Loader } from "../../Loader/Loader";
import { CommentsList } from "./CommentsList/CommentsList";
import { CommentInfo } from "../../types";
import { useFetchData } from "../../hoc/useFetchData";
import { LoaderAndError } from "../../LoaderAndError/LoaderAndError";

interface CommentsBlockProps {
  id: number;
}

export const CommentsBlock: React.FC<CommentsBlockProps> = ({ id }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const { data, isLoading, error } = useFetchData<CommentInfo[]>({
    dataType: "comments",
    shouldFetch: shouldFetch,
    id: id,
  });

  useEffect(() => {
    setShouldFetch(false);
  }, [isLoading, data]);

  return (
    <>
      <div className={styles.comments_header}>
        <div className={styles.comments_header_number}>
          <FaComments color="gray" size={20} />
          <span>{data.length}</span>
        </div>
        {!isLoading ? (
          <div
            className={styles.comments_header_update}
            onClick={() => setShouldFetch(true)}
          >
            <span>Update comments</span>
            <RxUpdate color="gray" size={20} />
          </div>
        ) : (
          <Loader isShow={isLoading} size={25} />
        )}
      </div>
      <LoaderAndError
        errorText="Failed to load comments."
        loaderSize={40}
        showError={error}
        showLoader={false}
        backgroundColor="#ededed"
      />
      {data.length > 0 && <CommentsList kids={data} />}
    </>
  );
};
