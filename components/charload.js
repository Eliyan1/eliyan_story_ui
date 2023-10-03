import UIcomp from '../styles/story.module.css'

export default function CharLoad({characters, setActiveChars, activeChars, setStorySlab}) {

  const addChar = async ({e, char}) => {
    e.preventDefault();

    const res = await fetch(`/api/characters/update?id=${char._id}`,{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          active:   true
      }),
  });
  
  const newEntry = JSON.parse(JSON.stringify([...activeChars, char]));
  newEntry[newEntry.length-1].init=newEntry.length-1;
  setActiveChars(newEntry)

  if (!res.ok) {
    throw new Error("Failed to edit the Character")
  }

}

    return <div spellCheck="false" className={`${UIcomp.charslab}`}>
      <div className={`${UIcomp.frontslabshort}`}/>
      <div type="text" className={`${UIcomp.loadtitle}`}>Select your Character</div>
      <div className={`${UIcomp.charoptionwrapper}`}>
      {characters.map(characters => (
      <div 
      className={`${UIcomp.charoption}`} 
      key={characters._id} 
      onClick={(e) => {addChar({e, char:characters})}}> 
      
      - {characters.name}
      
      </div>
      ))}
      </div>
      <div className={`${UIcomp.loadslabbuttonwrapper}`}>
        <div onClick={()=>{setStorySlab(1)}} className={`${UIcomp.loadslabbutton}`}>Return to Current Story</div>
    </div>           
    </div>
    }
  