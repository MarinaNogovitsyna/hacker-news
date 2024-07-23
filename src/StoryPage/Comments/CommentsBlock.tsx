import React, { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import styles from "./CommentsBlock.module.css";
import { Loader } from "../../Loader/Loader";
import { CommentsList } from "./CommentsList/CommentsList";
import { CommentInfo } from "../../types";
import { useFetchData } from "../../hoc/useFetchData";

interface CommentsBlockProps {
  id: number;
}

export const CommentsBlock: React.FC<CommentsBlockProps> = ({ id }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const { data, isLoading, error } = useFetchData<CommentInfo[]>({
    dataType: "comments",
    shouldFetch: shouldFetch,
    id: id
  });

  // useEffect(() => {
  //   console.log(isLoading);
  //   if (!isLoading && (data.length > 0)) {
  //     setShouldFetch(false); 
  //   }
  // }, [isLoading, data]);

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
        <div className={styles.comments_header_update} onClick={() => setShouldFetch(true)}>
          <span>Update comments</span>
          <RxUpdate color="gray" size={20} />
        </div>
      </div>
      {(isLoading || error) && <div className={styles.loader}>
        <Loader isShow={isLoading} size={40} />
        {error && <span>Data retrieval error</span>}
      </div>}
      {data.length > 0 && <CommentsList kids={data}/>}
    </>
  );
};
