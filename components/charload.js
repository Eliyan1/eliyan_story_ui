import UIcomp from '../styles/story.module.css'

export default function CharLoad({characters, setActiveChars}) {

  const addChar = async ({e, char}) => {
    e.preventDefault();
    
    console.log(char)

    const res = await fetch(`/api/characters/update?id=${char._id}`,{
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          active:   true
      }),
  });

  characters[characters.findIndex((characters)=> characters._id == char._id)].active=true
  setActiveChars(characters.filter((characters)=> characters.active == true))
  console.log(characters.filter((characters)=> characters.active == true))

  if (!res.ok) {
    throw new Error("Failed to edit the Character")
  }

}

    return <div spellCheck="false" className={`${UIcomp.storyslab}`}>
         <div type="text" className={`${UIcomp.loadtitle}`}>Select your Character</div>
         {characters.map(characters => (
					<div className={`${UIcomp.charoption}`} key={characters._id} onClick={(e) => {addChar({e, char:characters})}}> - {characters.name}</div>
         ))}
            

    </div>
    }
  