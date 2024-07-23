import React, { useEffect, useState } from "react";
import { Header } from "./Header/Header";
import { StoriesList } from "./StoriesList/StoriesList";
import { Story } from "../types";
import { UpdateButton } from "./UpdateButton/UpdateButton";
import { Loader } from "../Loader/Loader";
import styles from './MainPage.module.css'

export const MainPage = () => {
    const [stories, setStories] = useState<Story[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
  
    const fetchStories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const storyPromises = storyIds.slice(0, 100).map((id: number) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) =>
            res.json()
          )
        );
        const stories = await Promise.all(storyPromises);
        console.log(stories);
        
        setStories(stories);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(() => {
    fetchStories();
    const interval = setInterval(fetchStories, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />
      <div className={styles.loader}>
        <Loader isShow={isLoading} size={80}/>
      </div>
      <StoriesList stories={stories}/>
      <UpdateButton onUpdate={fetchStories}/>
    </>
  );
};
