
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditStyle from '../styles/storyeditor.module.css'
import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'
import { useState } from 'react';

const StoryEditor = ({activeStoryTitle, activeStoryContent, setActiveStoryContent, setStorySlab, checkStoryPresent, saveStory}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: activeStoryContent,
  });

  const [newStoryList, setNewStoryList] = useState([])

  const saveClick = async (e) => {
    e.preventDefault()
    
    const content = await editor.getJSON()
    const storyNumber = checkStoryPresent()
    console.log(storyNumber)
    setActiveStoryContent(content)

    if (storyNumber==-1){
      if (newStoryList.includes(activeStoryTitle)){
        await fetch(`/api/story/updatebytitle?title=${activeStoryTitle}`,{ 
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title:		activeStoryTitle,
            content:	content
          }),
        });
      }else{
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
        setNewStoryList([...newStoryList, activeStoryTitle])
      }

    }else{
      saveStory(storyNumber, content)
    }
  };

  return (
    <div className={EditStyle.editor}>
        <EditorContent spellCheck="false" editor={editor} onBlur={saveClick}/>
        <div className={`${Flexstyle.storysaveload}`}>
					<div onClick={saveClick} className={`${StoryStyle.storysave}`}>Save</div>
					<div onClick={()=>{setStorySlab(4)}} className={`${StoryStyle.storyload}`}>Load</div>
				</div>
    </div>
  )
}

export default StoryEditor