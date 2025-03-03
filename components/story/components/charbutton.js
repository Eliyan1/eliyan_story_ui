import { useState } from 'react'
import StyleCSS from '@/styles/general.module.css'
import CharContextMenu from './charcontextmenu'



export default function CharacterButton({char, charMenu, removeActiveChar, moveCharUp, moveCharDown, noSelect}) {
  
  const initialContextMenu = {
    show: false,
    x: 0,
    y: 0
  }

  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  
  const rightClick = (e) => {
    e.preventDefault()
    const {pageX, pageY} = e
    setContextMenu({show: true, x: pageX, y: pageY})
  }

  const closeContextMenu = () => setContextMenu(initialContextMenu);


  return <div>
    <button className={`${StyleCSS.characterbutton}`} onClick={()=>charMenu(char, 0, noSelect)} onContextMenu={rightClick}>  
      <div className={`${StyleCSS.characterbuttoncolumn}`}> 
      <div className={`${StyleCSS.characterbuttonrow}`}>
          <div className={`${StyleCSS.charactername}`}> {char.name} </div>
          <div className={`${StyleCSS.characterhealthwrap}`}>
            <div className={`${StyleCSS.characterhealth}`}> {Number(char.hp) + Number(char.temphp)} </div>
            <div className={`${StyleCSS.characterhealthlabel}`}> HP </div>
          </div>
          <div className={`${StyleCSS.characterhealthwrap}`}>
            <div className={`${StyleCSS.characterhealth}`}> {char.ac} </div>
            <div className={`${StyleCSS.characterhealthlabel}`}> AC </div>
          </div>

        </div>
        <div className={`${StyleCSS.characterbuttonrow}`}>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Str </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.str} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Dex </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.dex} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Con </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.con} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Wis </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.wis} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Int </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.intel} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Cha </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.cha} </div>
          </div>
        </div>
      </div>
    </button>
    {contextMenu.show && <CharContextMenu x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu} uniquechar={char.uniquechar} removeActiveChar={removeActiveChar} moveCharUp={moveCharUp} moveCharDown={moveCharDown}/>}
    </div>
  }