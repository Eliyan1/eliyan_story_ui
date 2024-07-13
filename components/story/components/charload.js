import { useState } from 'react';
import StyleCSS from '@/styles/general.module.css'

export default function CharLoad({characters, setActiveChars, activeChars, setStorySlab, uniqueChar, setUniqueChar, groupList}) {

  const [characterType, setCharacterType] = useState(characters.filter((characters) => characters.player == true))
  const [groupTab, setGroupTab] = useState(0)

  const charTypeList = (pc) => {
    setCharacterType(characters.filter((characters) => characters.player == pc));
    setGroupTab(0);
  }

  const addChar = async ({e, char}) => {
    e.preventDefault();
    const newEntry = JSON.parse(JSON.stringify([...activeChars, char]));
    newEntry[newEntry.length-1].uniquechar= uniqueChar;
    setUniqueChar(uniqueChar+1)
    setActiveChars(newEntry)
  }

  const addGroup = async ({addgroup}) => {
    const newgroup = JSON.parse(JSON.stringify(addgroup))
    for (let i=0; i < newgroup.length; i++) {
      newgroup[i].uniquechar = i + activeChars.length;
    }
    setActiveChars(activeChars.concat(newgroup))
    setUniqueChar(uniqueChar+newgroup.length)
  }

  return <div spellCheck="false" className={`${StyleCSS.charslab}`}>
    <div className={`${StyleCSS.frontslabshort}`}/>
    <div type="text" className={`${StyleCSS.loadtitle}`}>Select your Character</div>
    <div className={`${StyleCSS.charoptionwrapper}`}>
    {groupTab == 0 && characterType.map(characterType => (
      <div 
      className={`${StyleCSS.charoption}`} 
      key={characterType._id} 
      onClick={(e) => {addChar({e, char:characterType})}}> 
      
      - {characterType.name}
      
      </div>
    ))}
    {groupTab == 1 && groupList.map(groupList => (
      <div 
      className={`${StyleCSS.charoption}`} 
      key={groupList.name}
      onClick={() => addGroup({addgroup: groupList.group})}> 
      
      - {groupList.name}
      
      </div>
    ))}
    </div>

    <div className={`${StyleCSS.charslabbuttonwrapper}`}>
      <div onClick={()=>{setStorySlab(1)}} className={`${StyleCSS.loadslabbutton}`}>Cancel</div>
      <div className={`${StyleCSS.loadslabbutton}`} onClick={()=>{charTypeList(true)}}>Players</div>
      <div className={`${StyleCSS.loadslabbutton}`} onClick={()=>{charTypeList(false)}}>Mobs</div>
      <div className={`${StyleCSS.loadslabbutton}`} onClick={()=>{setGroupTab(1)}}>Groups</div>
  </div>           
  </div>
  }
  