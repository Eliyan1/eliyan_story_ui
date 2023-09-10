'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import EditStyle from '../styles/charnotes.module.css'
import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'

const CharNotes = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Character Notes</p>',
  });

  return (
    <div className={EditStyle.editor}>
        <EditorContent spellCheck="false" editor={editor} />
    </div>
  )
}

export default CharNotes