import StyleCSS from '@/styles/general.module.css'

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
    populateActiveCharacter(0)
    setStorySlab(2)
}

return <div spellCheck="false" className={`${StyleCSS.charslab}`}>
<div className={`${StyleCSS.frontslabshort}`}/>
<div type="text" className={`${StyleCSS.loadtitle}`}>Set Initiative</div>
<div className={`${StyleCSS.initiativevertwrapper}`}>
      {activeChars.map(activeChars => (
        <div className={`${StyleCSS.initiativehorwrapper}`} key={activeChars.uniquechar}>
          <div className={`${StyleCSS.initname}`}> {activeChars.name}: </div>
          <input 
            type='number'
            onChange={(e)=> activeChars.initiative=e.target.valueAsNumber}
            className={`${StyleCSS.initvalue}`}
            onKeyDown={(e) => handleKeyPress(e)}
            onFocus={(e) => e.target.select()}
          >           
          </input>
        </div>
    ))}
</div>
<div className={`${StyleCSS.charslabbuttonwrapper}`}>
  <div onClick={()=>{setStorySlab(1)}} className={`${StyleCSS.charslabbutton}`}>Return to Story</div>
  <div onClick={setInitiative} className={`${StyleCSS.charslabbutton}`}>Initiate Combat</div>
</div>           
</div>
}

    
  