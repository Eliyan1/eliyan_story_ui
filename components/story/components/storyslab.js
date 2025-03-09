import StyleCSS from '@/styles/general.module.css'
import StoryEditor from './storyeditor'

export default function StorySlab({setActiveStoryContent, activeStoryTitle, activeStoryContent, setActiveStoryTitle, setStorySlab, setStoryList, storyList, work}) {

  const saveClick = async (content) => {
    const storyNumber = checkStoryPresent()

    if(activeStoryTitle == 'Title of New Journey') {
      alert('Please give a title to the journey')
    }
    else{
      console.log(activeStoryTitle)
      console.log(content)
      if (storyNumber==-1){
          await fetch('/api/story/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:    activeStoryTitle,
                content:  content,
                work:     work,
            }),
          });
          setStoryList([...storyList, {title: activeStoryTitle, content: content}])
        }
      else{
        saveStory(storyNumber, content, work)
      }
    }
  };

  const autoSave = async (content) => {
    const storyNumber = checkStoryPresent()
    if(activeStoryTitle != 'Title of New Journey') {
      if (storyNumber!=-1){
        saveStory(storyNumber, content, work)
      }
    }
  };
  

  const saveStory = async (storyIndex, content, work) => {
		await fetch(`/api/story/updatebytitle?title=${storyList[storyIndex].title}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title:		activeStoryTitle,
				content:	content,
        work: work,
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
        onBlur={()=>autoSave(activeStoryContent)}
      />
    </div>
      <StoryEditor
      setActiveStoryContent={setActiveStoryContent} 
      activeStoryContent={activeStoryContent} 
      setStorySlab={setStorySlab}
      autoSave={autoSave}
      saveClick={saveClick}
      />
  </div>
}