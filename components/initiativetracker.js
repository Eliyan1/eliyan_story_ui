import { useState } from 'react';
import UIcomp from '../styles/story.module.css'

export default function InitiativeTracker({activeChars, setActiveChars, setStorySlab, populateActiveCharacter}) {

const handleKeyPress = (e) => {
  if(e.keyCode === 13){
    e.target.blur(); 
  }
}

const setInitiative = async () => {
  let sortedChar = activeChars.sort(
    (a, b) => (a.initiative < b.initiative) ? 1 : (a.initiative > b.initiative) ? -1 : 0);
    await setActiveChars(sortedChar)
    console.log(activeChars)
    populateActiveCharacter(0)
    setStorySlab(2)
}

return <div spellCheck="false" className={`${UIcomp.charslab}`}>
<div className={`${UIcomp.frontslabshort}`}/>
<div type="text" className={`${UIcomp.loadtitle}`}>Set Initiative</div>
<div className={`${UIcomp.initiativevertwrapper}`}>
      {activeChars.map(activeChars => (
        <div className={`${UIcomp.initiativehorwrapper}`} key={activeChars.uniquechar}>
          <div className={`${UIcomp.initname}`}> {activeChars.name}: </div>
          <input 
            type='number'
            onChange={(e)=> activeChars.initiative=e.target.valueAsNumber}
            className={`${UIcomp.initvalue}`}
            onKeyDown={(e) => handleKeyPress(e)}
            onFocus={(e) => e.target.select()}
          >           
          </input>
        </div>
    ))}
</div>
<div className={`${UIcomp.loadslabbuttonwrapper}`}>
<div onClick={setInitiative} className={`${UIcomp.charslabbutton}`}>Initiate Combat</div>
  <div onClick={()=>{setStorySlab(1)}} className={`${UIcomp.charslabbutton}`}>Return to Story</div>
</div>           
</div>
}

    
  