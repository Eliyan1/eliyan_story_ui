import UIcomp from '../styles/story.module.css'

export default function CharLoad({characters, setActiveChars, activeChars, setStorySlab, uniqueChar, setUniqueChar}) {

  const addChar = async ({e, char}) => {
    e.preventDefault();  
  const newEntry = JSON.parse(JSON.stringify([...activeChars, char]));
  newEntry[newEntry.length-1].uniquechar= uniqueChar;
  setUniqueChar(uniqueChar+1)
  setActiveChars(newEntry)
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
  