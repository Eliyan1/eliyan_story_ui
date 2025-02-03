import { useState } from 'react';
import StyleCSS from '@/styles/general.module.css'

export default function CharLoad({characters, setActiveChars, activeChars, setStorySlab, uniqueChar, setUniqueChar, groupList, user, createNewCharacter, setMainChar, mainChar}) {

  const [characterType, setCharacterType] = useState(characters.filter((characters) => characters.player == true))
  const [groupTab, setGroupTab] = useState(0)
  const [characterName, setCharacterName] = useState('Character Name')
  const [characterState, setCharacterState] = useState(0) 

  const charTypeList = (pc) => {
    setCharacterType(characters.filter((characters) => characters.player == pc));
    setGroupTab(0);
  }

  const addChar = async ({e, char}) => {
    if(user == 'DM')
      {e.preventDefault();
      const newEntry = JSON.parse(JSON.stringify([...activeChars, char]));
      newEntry[newEntry.length-1].uniquechar= uniqueChar;
      setUniqueChar(uniqueChar+1)
      setActiveChars(newEntry)
  }

    if(user == 'Player')
      {e.preventDefault();
      setMainChar(char)
    }
  }



  const addGroup = async ({addgroup}) => {
    const newgroup = JSON.parse(JSON.stringify(addgroup))
    for (let i=0; i < newgroup.length; i++) {
      newgroup[i].uniquechar = i + activeChars.length;
    }
    setActiveChars(activeChars.concat(newgroup))
    setUniqueChar(uniqueChar+newgroup.length)
  }

  return <>
  <div spellCheck="false" className={`${StyleCSS.charslab}`}>
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
  </div>

  {user == 'DM' && <div className={`${StyleCSS.loadcharbuttonwrapper}`}>
      <div onClick={()=>{setStorySlab(1)}} className={`${StyleCSS.loadslabbutton}`}>Return</div>
      <div className={`${StyleCSS.loadslabbutton}`} onClick={()=>{charTypeList(true)}}>Players</div>
      <div className={`${StyleCSS.loadslabbutton}`} onClick={()=>{charTypeList(false)}}>Mobs</div>
      <div className={`${StyleCSS.loadslabbutton}`} onClick={()=>{setGroupTab(1)}}>Groups</div>
  </div>}

  {user == 'Player' && <div className={`${StyleCSS.loadcharbuttonwrapper}`}> 
      {characterState == 0 && <div onClick={()=>{setCharacterState(1)}} className={`${StyleCSS.longerloadslabbutton}`}>Create Character</div>}
      {characterState == 1 && <input className={`${StyleCSS.newcharname}`} defaultValue='Character Name' maxLength={12} onChange={(e)=>{setCharacterName(e.target.value)}} id="namedChar" spellCheck='false' autoFocus onFocus={(e) => e.target.select()}/>}
      {characterState == 1 && <div onClick={(e)=>{setCharacterState(0)}} className={`${StyleCSS.loadslabbutton}`}>Cancel</div>}
      {characterState == 1 && <div onClick={(e)=>{createNewCharacter([e,true])}} className={`${StyleCSS.loadslabbutton}`}>Accept</div>}
  </div>}


  </>
  }
  