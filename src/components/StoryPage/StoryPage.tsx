import React from "react";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import styles from "./StoryPage.module.css";
import { Back } from "./Back/Back";
import { getDate, getTime } from "../../utils/getDate";
import { Story } from "../../types";
import { CommentsBlock } from "./Comments/CommentsBlock";
import { Author } from "../Author/Author";

export const StoryPage = () => {
  const location = useLocation();
  const story: Story = location.state;

  return (
    <div className={styles.story_container}>
      <Back />
      <div className={styles.story_title_and_date}>
        <h3>{story.title}</h3>
        <span>{getDate(story.time) + " " + getTime(story.time)}</span>
      </div>
      <Author name={story.by}/>
      <a href={story.url} target="blank" className={styles.story_url}>
        Go to news
      </a>
      <CommentsBlock id={story.id}/>
    </div>
  );
};
