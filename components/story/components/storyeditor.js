import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import StyleCSS from '@/styles/general.module.css'

const StoryEditor = ({activeStoryContent, setStorySlab, autoSave, setActiveStoryContent, saveClick}) => {
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
    autoSave(content)
  }

  return (
    <div className={StyleCSS.editorstory}>
        <EditorContent spellCheck="false" editor={editor} onBlur={updateContent}/>
        <div className={`${StyleCSS.storyloadwrapper}`}>
          <div onClick={()=>{saveClick(activeStoryContent)}} className={`${StyleCSS.storysave}`}>Save</div>
					<div onClick={()=>{setStorySlab(4)}} className={`${StyleCSS.storyload}`}>Load</div>
				</div>
    </div>
  )
}

export default StoryEditor