import StyleCSS from '@/styles/general.module.css'

export default function InitiativeTracker({activeChars, setActiveChars, setStorySlab, populateActiveCharacter, setCombatActive, setInactiveChars, setCurrentTurn, setLockDatabase, setActiveIndex}) {

const handleKeyPress = (e) => {
  if(e.keyCode === 13){
    e.target.blur(); 
  }
}

const setInitiative = async () => {
  setCombatActive(true)
  setInactiveChars(activeChars.filter(activeChars => activeChars.initiative === undefined)) 

  var initiatedChar = activeChars.filter(activeChars => activeChars.initiative)
  if(initiatedChar.length==0){
    alert('Please provide initiative to at least 1 character.')
    return
  }

  let sortedChar = activeChars.sort(
    (a, b) => (a.initiative < b.initiative) ? 1 : (a.initiative > b.initiative) ? -1 : 0);
    await setActiveChars(sortedChar)

    var initiatedChar = activeChars.filter(activeChars => activeChars.initiative)
    var villainHP=0
    var villainMaxHP=0
    for (let i=0; i < initiatedChar.length; i++) {
      if (initiatedChar[i].player == false){
        initiatedChar[i].villainhp = true
        villainHP = villainHP + initiatedChar[i].hp
        villainMaxHP = villainMaxHP + initiatedChar[i].maxhp
      }
    }
    
    var highestInitiative = highestInitiative = 0
    if (initiatedChar.length>1) {highestInitiative = initiatedChar.findIndex(initiatedChar => Math.max(initiatedChar.initiative))}

    setActiveChars(initiatedChar)
    populateActiveCharacter(activeChars.findIndex(activeChars => activeChars._id == initiatedChar[highestInitiative]._id))
 		await setStorySlab(0); //necessary to update the notes of the character
    setStorySlab(2)
    setActiveIndex(0)


    await fetch('/api/viewer/update',{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          initiatedChar: initiatedChar,
          currentTurn:   initiatedChar[highestInitiative],
          villainCurrentHP: villainHP,
          villainMaxHP: villainMaxHP
      }),
  });
  setCurrentTurn(initiatedChar[highestInitiative])
  setLockDatabase(false)
}

const returnToStory = () => {
  setStorySlab(1)
  setLockDatabase(false)
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
            onBlur={(e) => {
              if(e.target.value.length>0){activeChars.initiative=e.target.valueAsNumber}
              else{delete activeChars.initiative}}
            }
            className={`${StyleCSS.initvalue}`}
            onKeyDown={(e) => handleKeyPress(e)}
            onFocus={(e) => e.target.select()}
          >           
          </input>
        </div>
    ))}
</div>
<div className={`${StyleCSS.charslabbuttonwrapper}`}>
  <div onClick={()=>{returnToStory()}} className={`${StyleCSS.charslabbutton}`}>Return to Story</div>
  <div onClick={()=>{setInitiative()}} className={`${StyleCSS.charslabbutton}`}>Initiate Combat</div>
</div>           
</div>
}

    
  