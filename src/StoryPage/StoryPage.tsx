import React from 'react'
import { useLocation } from 'react-router-dom';
import { Story } from '../types';
import { getDate, getTime } from '../utils/getDate';
import { FaUser } from "react-icons/fa6";

export const StoryPage = () => {
    const location = useLocation();
  const story: Story = location.state;
  console.log(story);
  
  return (
    <div>
        <div>
            <h3>{story.title}</h3>
            <span>{getDate(story.time) + ' ' + getTime(story.time)}</span>
        </div>
        <div>
            <FaUser color='gray'/>
            <span>{story.by}</span>
      </div>
    </div>
  )
}
