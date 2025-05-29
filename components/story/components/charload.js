import { useState } from 'react';
import StyleCSS from '@/styles/general.module.css'

export default function CharLoad({characters, setActiveChars, activeChars, setStorySlab, uniqueChar, setUniqueChar, groupList, user, createNewCharacter, setMainChar, mainChar, setMain, setNoSelect, populateActiveCharacter, directPopulate, setActiveIndex, main, work, setLockDatabase, setPartyChars}) {

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
      char.uniquechar= 99999;
      var updatedParty= JSON.parse(JSON.stringify(activeChars))
      if (updatedParty.findIndex((updatedParty) => updatedParty._id == char._id) != -1){
        updatedParty[updatedParty.findIndex((updatedParty) => updatedParty._id == char._id)].uniquechar=99999;
      }else{
        updatedParty = [...updatedParty, char]
      }


      if ('_id' in mainChar) { 
      const response = await fetch(`/api/characters/update?id=${mainChar._id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            active:   0,
        }),
      });

    if (!response.ok) {
        throw new Error("Failed to edit the Character")
    }}

      setPartyChars(updatedParty.filter((updatedParty) => updatedParty.uniquechar != 99999))
      
        
      const res = await fetch(`/api/characters/update?id=${char._id}`,{
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              active:   1,
          }),
      });
  
      if (!res.ok) {
          throw new Error("Failed to edit the Character")
      }
      
    
      setNoSelect(0)
      directPopulate(char)
      setActiveIndex(updatedParty.findIndex((updatedParty) => updatedParty.uniquechar == 99999))
      setMainChar(char);
      setMain(1);
      await setStorySlab(0); //necessary to update the notes of the character
      setStorySlab(2)
    }
  }


  const addActiveGroup = async () => {
    var newGroup = await fetch('/api/characters/read',{
      method: 'GET'
  }).then(response => response.json()).then(response => newGroup = response.characters.filter((characters) => characters.active == 1))
    for (let i=0; i < newGroup.length; i++) {
      newGroup[i].uniquechar = i + activeChars.length;
    }
    setActiveChars(activeChars.concat(newGroup))
    setUniqueChar(uniqueChar+newGroup.length)
  }


  const addGroup = async ({addgroup}) => {
    const newgroup = JSON.parse(JSON.stringify(addgroup))
    for (let i=0; i < newgroup.length; i++) {
      newgroup[i].uniquechar = i + uniqueChar;
    }
    setActiveChars(activeChars.concat(newgroup))
    setUniqueChar(uniqueChar+newgroup.length)
  }

  const returnToStory = () => {
    setStorySlab(1)
    setLockDatabase(false)
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
      {groupTab == 1 && work == 0 && <div className={`${StyleCSS.charoption}`} onClick={() => addActiveGroup()}> - Add Active Characters</div>}
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
      <div onClick={()=>{returnToStory()}} className={`${StyleCSS.loadslabbutton}`}>Return</div>
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
  