import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { StoriesList } from "./StoriesList/StoriesList";
import { Story } from "../types";
import { UpdateButton } from "./UpdateButton/UpdateButton";
import { Loader } from "../Loader/Loader";
import styles from "./MainPage.module.css";
import { useFetchData } from "../hoc/useFetchData";

export const MainPage = () => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const { data, isLoading, error } = useFetchData<Story[]>({
    dataType: "stories",
    shouldFetch: shouldFetch,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShouldFetch(true);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setShouldFetch(false);
  }, [isLoading, data]);

  return (
    <>
      <Header />
      <div className={styles.loader}>
        <Loader isShow={isLoading} size={80} />
      </div>
      {data.length > 0 && <StoriesList stories={data} />}
      <UpdateButton onUpdate={() => setShouldFetch(true)} />
    </>
  );
};
