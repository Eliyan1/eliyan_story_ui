'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import StyleCSS from '@/styles/general.module.css'
import { useEffect } from "react";

const CharNotes = ({activeCharacter, charNotes, mutuable, activeIndex, lockDatabase, setLockDatabase, activeChars}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: charNotes,
    editable: mutuable,
  });

  useEffect(() => {
    if (lockDatabase == false) {
            const interval = setInterval(() => {updateContent()}, 1000);
            return () => clearInterval(interval);
    }
  }, [activeChars, lockDatabase])

  const updateContent = () => {
    if(activeChars[activeIndex].notes && editor){
      if (activeChars[activeIndex].notes != editor.getJSON()){
        editor.commands.setContent(activeChars[activeIndex].notes)
      }
    }
  }

  const saveNotes = async (e) => {
    e.preventDefault();
    setLockDatabase(false)
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
        <EditorContent spellCheck="false" editor={editor} onFocus={() => setLockDatabase(true)} onBlur={(e) => saveNotes(e)}/>
    </div>
  )
}

export default CharNotes