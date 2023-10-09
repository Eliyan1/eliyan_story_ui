import { useState } from 'react'
import UIcomp from '../styles/story.module.css'
import CharContextMenu from './charcontextmenu'



export default function CharacterButton({char, charMenu, removeActiveChar, moveCharUp, moveCharDown}) {
  
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
  }

  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  
  const rightClick = (e) => {
    e.preventDefault()
    const {pageX, pageY} = e
    console.log(pageX, pageY)
    setContextMenu({show: true, x: pageX, y: pageY})
  }

  const closeContextMenu = () => setContextMenu(initialContextMenu);


  return <div>
    <button className={`${UIcomp.characterbutton}`} onClick={()=>charMenu(char)} onContextMenu={rightClick}>  
      <div className={`${UIcomp.characterbuttoncolumn}`}> 
      <div className={`${UIcomp.characterbuttonrow}`}>
          <div className={`${UIcomp.charactername}`}> {char.name} </div>
          <div className={`${UIcomp.characterhealthwrap}`}>
            <div className={`${UIcomp.characterhealth}`}> {char.hp + char.temphp} </div>
            <div className={`${UIcomp.characterhealthlabel}`}> HP </div>
          </div>
          <div className={`${UIcomp.characterhealthwrap}`}>
            <div className={`${UIcomp.characterhealth}`}> {char.ac} </div>
            <div className={`${UIcomp.characterhealthlabel}`}> AC </div>
          </div>

        </div>
        <div className={`${UIcomp.characterbuttonrow}`}>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Str </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.str} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Dex </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.dex} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Con </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.con} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Wis </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.wis} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Int </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.intel} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Cha </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.cha} </div>
          </div>
        </div>
      </div>
    </button>
    {contextMenu.show && <CharContextMenu x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu} uniquechar={char.uniquechar} removeActiveChar={removeActiveChar} moveCharUp={moveCharUp} moveCharDown={moveCharDown}/>}
    </div>
  }