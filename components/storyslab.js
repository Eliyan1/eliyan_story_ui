import UIcomp from '../styles/story.module.css'
import StoryEditor from './storyeditor'
import { useState } from "react";

export default function StorySlab({activeStoryTitle, activeStoryContent, setActiveStoryTitle, setStorySlab, checkStoryPresent, saveStory}) {

    return <div spellCheck="false" className={`${UIcomp.storyslab}`}>
      <input type="text" value={`${activeStoryTitle}`} className={`${UIcomp.storytitle}`} onChange={(e) => setActiveStoryTitle(e.target.value)}
      />
        <StoryEditor 
        activeStoryTitle={activeStoryTitle} 
        activeStoryContent={activeStoryContent} 
        setStorySlab={setStorySlab}
        checkStoryPresent={checkStoryPresent}
        saveStory={saveStory}
        />
    </div>
  }