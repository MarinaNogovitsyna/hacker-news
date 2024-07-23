import React from 'react'
import { Story } from '../../types'
import styles from './StoryItem.module.css'
import { FaUser } from "react-icons/fa6";
import { FaComments } from "react-icons/fa";
import { getDate, getTime } from '../../utils/getDate';

interface StoryItemProps {
    story: Story;
    handleClick: () => void
}

export const StoryItem: React.FC<StoryItemProps> = ({story, handleClick}) => {

  const getRatingColor = () => {
    const color = story.score < 20 ? styles.rating_bad : story.score < 100 ? styles.rating_normal : styles.rating_good
    return styles.rating + ' ' + color
  }

  return (
    <div className={styles.story} onClick={handleClick}>
      <div className={styles.story_title_and_rating}>
        <span className={styles.story_title}>{story.title}</span>
        <span className={getRatingColor()}>{story.score}</span>
      </div>
      <div className={styles.story_autor}>
        <FaUser color='gray'/>
        <span>{story.by}</span>
      </div>
      <div className={styles.story_comments_and_date}>
        <div className={styles.story_comments}>
          <FaComments color='gray'/>
          <span>{story.kids ? story.kids.length : '0'}</span>
        </div>
        <span className={styles.story_date}>{getDate(story.time) + ' ' + getTime(story.time)}</span>
      </div>
    </div>
  )
}
