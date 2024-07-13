import StyleCSS from '@/styles/general.module.css'
import StoryEditor from './storyeditor'

export default function StorySlab({setActiveStoryContent, activeStoryTitle, activeStoryContent, setActiveStoryTitle, setStorySlab, setStoryList, storyList}) {

    return <div spellCheck="false" className={`${StyleCSS.storyslab}`}>
      <div className={`${StyleCSS.frontslab}`}/>
      <div className={`${StyleCSS.titlewrapper}`}>
        <input 
          type="text" 
          value={`${activeStoryTitle}`} 
          className={`${StyleCSS.storytitle}`} 
          onChange={(e) => setActiveStoryTitle(e.target.value)}
        />
      </div>
        <StoryEditor 
        setActiveStoryContent={setActiveStoryContent}
        activeStoryTitle={activeStoryTitle} 
        activeStoryContent={activeStoryContent} 
        setStorySlab={setStorySlab}
        setStoryList={setStoryList}
        storyList={storyList}
        />
    </div>
  }