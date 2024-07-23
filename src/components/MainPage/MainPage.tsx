import React, { useCallback, useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { StoriesList } from "./StoriesList/StoriesList";
import { Story } from "../../types";
import { UpdateButton } from "./UpdateButton/UpdateButton";
import { useFetchData } from "../../hoc/useFetchData";
import { LoaderAndError } from "../Loadind/LoaderAndError/LoaderAndError";

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
      <LoaderAndError
        errorText="Failed to load news."
        loaderSize={80}
        showError={error}
        showLoader={isLoading}
      />
      {data.length > 0 && <StoriesList stories={data} />}
      <UpdateButton onUpdate={() => setShouldFetch(true)} />
    </>
  );
};
