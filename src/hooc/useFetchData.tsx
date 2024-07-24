import React, { useEffect, useState } from "react";

interface FetchOptions {
  id?: number;
  dataType: "stories" | "comments";
  shouldFetch: boolean;
}

export const useFetchData = <T,>({
  id,
  dataType,
  shouldFetch,
}: FetchOptions) => {
  const [data, setData] = useState<T | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const firstUrl =
        dataType === "stories"
          ? "https://hacker-news.firebaseio.com/v0/topstories.json"
          : `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
      const response = await fetch(firstUrl);
      const responseJson = await response.json();

      const nextDataToFetch =
        dataType === "stories" ? responseJson.slice(0, 100) : responseJson.kids;

      if (Array.isArray(nextDataToFetch) && nextDataToFetch.length > 0) {
        const dataPromises = nextDataToFetch.map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
            (res) => res.json()
          )
        );
        const result = await Promise.all(dataPromises);
        setData(result as T);
      }
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch]);

  return { data, isLoading, error };
};
