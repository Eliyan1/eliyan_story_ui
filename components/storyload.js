import { set } from 'mongoose';
import UIcomp from '../styles/story.module.css'

export default function StoryLoad({storyList, setActiveStoryContent, setActiveStoryTitle, setStorySlab}) {

//   const addChar = async ({e, char}) => {
//     e.preventDefault();
    
//     console.log(char)

//     const res = await fetch(`/api/characters/update?id=${char._id}`,{
//       method: 'PUT',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//           active:   true
//       }),
//   });

//   characters[characters.findIndex((characters)=> characters._id == char._id)].active=true
//   setActiveChars(characters.filter((characters)=> characters.active == true))
//   console.log(characters.filter((characters)=> characters.active == true))

//   if (!res.ok) {
//     throw new Error("Failed to edit the Character")
//   }

// }

  const loadStory = async({e, storyList}) => {
    e.preventDefault();

    console.log(storyList.content)
    const res = await fetch(`/api/story/get?title=${storyList.title}`);

    const activeStory = JSON.parse(JSON.stringify(storyList));

    setActiveStoryContent(activeStory.content)
    setActiveStoryTitle(activeStory.title)
    setStorySlab(1)
    
  }

  return <div spellCheck="false" className={`${UIcomp.charslab}`}>
    <div className={`${UIcomp.frontslabshort}`}/>
    <div type="text" className={`${UIcomp.loadtitle}`}>Select your Story</div>
    <div className={`${UIcomp.charoptionwrapper}`}>
    {storyList.map(storyList => (
      <div 
      className={`${UIcomp.charoption}`} 
      key={storyList.title} 
      onClick={(e)=>(loadStory({e, storyList}))}> 
      
      - {storyList.title}
      
      </div>
      ))}
    </div>
    <div className={`${UIcomp.loadslabbuttonwrapper}`}>
        <div onClick={()=>{setStorySlab(1)}} className={`${UIcomp.loadslabbutton}`}>Return to Current Story</div>
    </div>
  </div>
}

  