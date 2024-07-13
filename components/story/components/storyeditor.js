import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import StyleCSS from '@/styles/general.module.css'

const StoryEditor = ({activeStoryTitle, activeStoryContent, setActiveStoryContent, setStorySlab, setStoryList, storyList}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: activeStoryContent,
  });

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

  const saveClick = async (e) => {
    e.preventDefault()
    
    const content = await editor.getJSON()
    const storyNumber = checkStoryPresent()
    setActiveStoryContent(content)

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
  };

  return (
    <div className={StyleCSS.editorstory}>
        <EditorContent spellCheck="false" editor={editor} onBlur={saveClick}/>
        <div className={`${StyleCSS.storyloadwrapper}`}>
					<div onClick={()=>{setStorySlab(4)}} className={`${StyleCSS.storyload}`}>Load Chronicle</div>
				</div>
    </div>
  )
}

export default StoryEditor