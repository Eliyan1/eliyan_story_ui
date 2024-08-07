'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import StyleCSS from '@/styles/general.module.css'

const CharNotes = ({activeCharacter, charNotes}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: charNotes,
  });

  const saveNotes = async (e) => {
    e.preventDefault();
    const content = await editor.getJSON()
    activeCharacter.notes=content
    
    const res = await fetch(`/api/characters/update?id=${activeCharacter._id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            notes:   content,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to edit the Character")
    }
  }

  return (
    <div className={StyleCSS.editorchar}>
        <EditorContent spellCheck="false" editor={editor} onBlur={(e) => saveNotes(e)}/>
    </div>
  )
}

export default CharNotes