
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditStyle from '../styles/storyeditor.module.css'
import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'

const StoryEditor = ({activeStoryTitle, activeStoryContent, setStorySlab, checkStoryPresent, saveStory}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: activeStoryContent,
  });

  const saveClick = async (e) => {
    e.preventDefault()
    
    const content = await editor.getJSON()
    const storyNumber = checkStoryPresent()
    console.log(storyNumber)

    if (storyNumber==-1){
    const res = await fetch('/api/story/create',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title:    activeStoryTitle,
            content:  content,
        }),
    });
    }else{
      saveStory(storyNumber, content)
    }


  };

  return (
    <div className={EditStyle.editor}>
        <EditorContent spellCheck="false" editor={editor} />
        <div className={`${Flexstyle.storysaveload}`}>
					<div onClick={saveClick} className={`${StoryStyle.storysave}`}>Save</div>
					<div onClick={()=>{setStorySlab(4)}} className={`${StoryStyle.storyload}`}>Load</div>
				</div>
    </div>
  )
}

export default StoryEditor