import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import StyleCSS from '@/styles/general.module.css'

const StoryEditor = ({activeStoryContent, setStorySlab, saveClick, setActiveStoryContent}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: activeStoryContent,
  });

  const updateContent = async () => {
    const content = await editor.getJSON()
    setActiveStoryContent(content)
    console.log(content)
    saveClick(content)
  }

  return (
    <div className={StyleCSS.editorstory}>
        <EditorContent spellCheck="false" editor={editor} onBlur={updateContent}/>
        <div className={`${StyleCSS.storyloadwrapper}`}>
					<div onClick={()=>{setStorySlab(4)}} className={`${StyleCSS.storyload}`}>Load Journey</div>
				</div>
    </div>
  )
}

export default StoryEditor