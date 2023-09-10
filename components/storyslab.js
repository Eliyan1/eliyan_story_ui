import UIcomp from '../styles/story.module.css'
import StoryEditor from './storyeditor'
import { useState } from "react";

export default function StorySlab(changeName) {

    const [storyTitle, setTitle] = useState("Title of Adventure");

    return {
      setTitle, storyTitle,
      storyPanel: (<div spellCheck="false" className={`${UIcomp.storyslab}`}>
         <input type="text" value={`${storyTitle}`} className={`${UIcomp.storytitle}`} onChange={(e) => changeName(e.target.value)}/>
        <StoryEditor storytitle={storyTitle} setTitle={setTitle} />
    </div>)}
  }