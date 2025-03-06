import StyleCSS from '@/styles/general.module.css'

export default function InitiativeTracker({activeChars, setActiveChars, setStorySlab, populateActiveCharacter, setCombatActive, setTotalChars, setActiveIndex, setCurrentTurn}) {

const handleKeyPress = (e) => {
  if(e.keyCode === 13){
    e.target.blur(); 
  }
}

const setInitiative = async () => {
  setTotalChars(activeChars)
  setCombatActive(true)  
  
  var initiatedChar = activeChars.filter(activeChars => activeChars.initiative)

  let sortedChar = activeChars.sort(
    (a, b) => (a.initiative < b.initiative) ? 1 : (a.initiative > b.initiative) ? -1 : 0);
    await setActiveChars(sortedChar)

    var initiatedChar = activeChars.filter(activeChars => activeChars.initiative)
    for (let i=0; i < initiatedChar.length; i++) {
      if (initiatedChar[i].player == false){
        initiatedChar[i].villainhp = true
      }
    }

    setActiveChars(initiatedChar)
    populateActiveCharacter(activeChars.findIndex(activeChars => Math.max(activeChars.initiative)))
    setStorySlab(2)
    setActiveIndex(0)
    await fetch('/api/viewer/update',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          initiatedChar: activeChars,
          currentTurn:   activeChars[activeChars.findIndex(activeChars => Math.max(activeChars.initiative))]
      }),
  });
  setCurrentTurn(activeChars[activeChars.findIndex(activeChars => Math.max(activeChars.initiative))])
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

    
  