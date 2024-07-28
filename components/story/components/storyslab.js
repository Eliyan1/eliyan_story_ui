import StyleCSS from '@/styles/general.module.css'
import StoryEditor from './storyeditor'

export default function StorySlab({setActiveStoryContent, activeStoryTitle, activeStoryContent, setActiveStoryTitle, setStorySlab, setStoryList, storyList}) {

  const saveClick = async (content) => {
    const storyNumber = checkStoryPresent()

    if(activeStoryTitle != 'Title of New Journey') {
      if (storyNumber==-1){
          await fetch('/api/story/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:    activeStoryTitle,
                content:  content,
            }),
          });
          setStoryList([...storyList, {title: activeStoryTitle, content: content}])
        }
      else{
        saveStory(storyNumber, content)
      }
    }
  };

  const saveStory = async (storyIndex, content) => {
		await fetch(`/api/story/updatebytitle?title=${storyList[storyIndex].title}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title:		activeStoryTitle,
				content:	content
			}),
		});
		storyList[storyIndex].content=content;
	}

  const checkStoryPresent = () => {
		return storyList.findIndex((storyList)=> storyList.title == activeStoryTitle)
	}

  return <div spellCheck="false" className={`${StyleCSS.storyslab}`}>
    <div className={`${StyleCSS.frontslab}`}/>
    <div className={`${StyleCSS.titlewrapper}`}>
      <input 
        type="text" 
        value={`${activeStoryTitle}`} 
        className={`${StyleCSS.storytitle}`} 
        onChange={(e) => setActiveStoryTitle(e.target.value)}
        onFocus={(e) => e.target.select()}
        onBlur={()=>saveClick(activeStoryContent)}
      />
    </div>
      <StoryEditor
      setActiveStoryContent={setActiveStoryContent} 
      activeStoryContent={activeStoryContent} 
      setStorySlab={setStorySlab}
      saveClick={saveClick}
      />
  </div>
}