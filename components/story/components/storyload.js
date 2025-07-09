import StyleCSS from '@/styles/general.module.css'

export default function StoryLoad({storyList, setActiveStoryContent, setActiveStoryTitle, setStorySlab}) {

  const loadStory = async({e, storyList}) => {
    e.preventDefault();
    const res = await fetch(`/api/story/get?title=${storyList.title}`);

    const activeStory = JSON.parse(JSON.stringify(storyList));

    setActiveStoryContent(activeStory.content)
    setActiveStoryTitle(activeStory.title)
    setStorySlab(1)
    
  }

  return <div spellCheck="false" className={`${StyleCSS.storyslab}`}>
    <div className={`${StyleCSS.frontslab}`}/>
    <div className={`${StyleCSS.titleloadwrapper}`}>
      <div type="text" className={`${StyleCSS.storytitle}`}>Select your Setting</div>
    </div>
    <div className={`${StyleCSS.storyoptionwrapper}`}>
    {storyList.map(storyList => (
      <div 
      className={`${StyleCSS.storyoption}`} 
      key={storyList.title} 
      onClick={(e)=>(loadStory({e, storyList}))}> 
      
      - {storyList.title}
      
      </div>
      ))}
    </div>
    <div className={`${StyleCSS.storyloadwrapper}`}>
        <div onClick={()=>{setStorySlab(1)}} className={`${StyleCSS.storyload}`}>Cancel</div>
    </div>
  </div>
}

  