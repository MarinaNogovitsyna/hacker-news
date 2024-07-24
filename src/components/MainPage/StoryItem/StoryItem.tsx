import React from "react";
import { Story } from "../../../types";
import styles from "./StoryItem.module.css";
import { FaComments } from "react-icons/fa";
import { getDate, getTime } from "../../../utils/getDate";
import { Author } from "../../Author/Author";

interface StoryItemProps {
  story: Story;
  handleClick: () => void;
}

export const StoryItem: React.FC<StoryItemProps> = ({ story, handleClick }) => {
  const getRatingColor = () => {
    const color =
      story.score < 20
        ? styles.rating_bad
        : story.score < 100
        ? styles.rating_normal
        : styles.rating_good;
    return styles.rating + " " + color;
  };

  return (
    <div className={styles.story} onClick={handleClick}>
      <div className={styles.story_title_and_rating}>
        <span className={styles.story_title}>{story.title}</span>
        <span className={getRatingColor()}>{story.score}</span>
      </div>
      <Author name={story.by} />
      <div className={styles.story_comments_and_date}>
        <div className={styles.story_comments}>
          <FaComments color="gray" />
          <span>{story.kids ? story.kids.length : "0"}</span>
        </div>
        <span className={styles.story_date}>
          {getDate(story.time) + " " + getTime(story.time)}
        </span>
      </div>
    </div>
  );
};
