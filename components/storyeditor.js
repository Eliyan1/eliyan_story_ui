
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditStyle from '../styles/storyeditor.module.css'
import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'

const StoryEditor = ({storytitle, setTitle}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Story Notes</p>',
  });

  

  const saveClick = async (e) => {
    e.preventDefault()
    
    const content = await editor.getJSON()
    

    console.log(storytitle.storytitle)

    const res = await fetch('/api/story/create',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title:    storytitle.storytitle,
            content:  content,
        }),
    });
  };

  const loadClick = async (e) => {
    e.preventDefault();
        
    const res = await fetch(`/api/story/get?id=64fc7da636d6ad6f719cfb07`,{
        method: 'PUT',
    }).then(res => res.json()) //same as const res = await res.json()

    editor.commands.setContent(res.story.content);
    setTitle(res.story.title)
    console.log(setTitle)
  }

  return (
    <div className={EditStyle.editor}>
        <EditorContent spellCheck="false" editor={editor} />
        <div className={`${Flexstyle.storysaveload}`}>
					<div onClick={saveClick} className={`${StoryStyle.storysave}`}>Save</div>
					<div onClick={loadClick} className={`${StoryStyle.storyload}`}>Load</div>
				</div>
    </div>
  )
}

export default StoryEditor