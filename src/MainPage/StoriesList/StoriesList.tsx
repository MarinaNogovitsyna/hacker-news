import React, { useEffect, useState } from "react";
import { Story } from "../../types";
import styles from "./StoriesList.module.css";
import { StoryItem } from "../StoryItem/StoryItem";
import { useLocation, useNavigate } from "react-router-dom";

interface StoriesListProps {
  stories: Story[];
}

export const StoriesList: React.FC<StoriesListProps> = ({ stories }) => {
  const [sortStories, setSortStories] = useState<Story[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sort = stories.sort((a, b) => b.time - a.time);
    setSortStories(sort);
  }, [stories]);

  return (
    <div className={styles.container}>
      {sortStories.map((el) => (
        <StoryItem story={el} key={el.id} handleClick={() => navigate(`story/${el.id}`, { state: el })}/>
      ))}
    </div>
  );
};
