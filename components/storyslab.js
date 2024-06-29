import UIcomp from '../styles/story.module.css'
import StoryEditor from './storyeditor'

export default function StorySlab({setActiveStoryContent, activeStoryTitle, activeStoryContent, setActiveStoryTitle, setStorySlab, checkStoryPresent, saveStory, setStoryList, storyList}) {

    return <div spellCheck="false" className={`${UIcomp.storyslab}`}>
      <div className={`${UIcomp.frontslab}`}/>
      <div className={`${UIcomp.titlewrapper}`}>
        <input 
          type="text" 
          value={`${activeStoryTitle}`} 
          className={`${UIcomp.storytitle}`} 
          onChange={(e) => setActiveStoryTitle(e.target.value)}
        />
      </div>
        <StoryEditor 
        setActiveStoryContent={setActiveStoryContent}
        activeStoryTitle={activeStoryTitle} 
        activeStoryContent={activeStoryContent} 
        setStorySlab={setStorySlab}
        checkStoryPresent={checkStoryPresent}
        saveStory={saveStory}
        setStoryList={setStoryList}
        storyList={storyList}
        />
    </div>
  }