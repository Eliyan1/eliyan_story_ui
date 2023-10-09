import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'
import CharButton from '../components/charbutton'
import StorySlab from '../components/storyslab'
import { useState } from 'react';
import CharSlab from '@/components/charslab';
import CharLoad from '@/components/charload';
import StoryLoad from '@/components/storyload';
import InitiativeTracker from '@/components/initiativetracker'

export default function Story({dbCharacters, stories, activePage})  {

	const [characters, setCharacters] = useState(dbCharacters)

	const [storySlab, setStorySlab] = useState(1)

	const [activeStoryContent, setActiveStoryContent] = useState("") 
	const [activeStoryTitle, setActiveStoryTitle] = useState("Title of Adventure")
	
	const [activeChars, setActiveChars] = useState([])

	const [uniqueChar, setUniqueChar] = useState(0) 

	const {charPanel, populateActiveCharacter} = CharSlab(activeChars, setStorySlab)
	
	const checkStoryPresent = () => {
		console.log(stories.findIndex((stories)=> stories.title == activeStoryTitle))
		return stories.findIndex((stories)=> stories.title == activeStoryTitle)
	}

	const saveStory = async (storyIndex, content) => {
		await fetch(`/api/story/update?id=${stories[storyIndex]._id}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title:		activeStoryTitle,
				content:	content
			}),
		});
		stories[storyIndex].content=content;
	}

	const removeActiveChar =  (uniquechar) => {
		const removeIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == uniquechar);
		const removeChar = JSON.parse(JSON.stringify(activeChars))
		removeChar.splice(removeIndex,1);
		setActiveChars(removeChar);
	}

	const moveCharUp = (uniquechar) => {
		const moveIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == uniquechar);
		const moveChar = JSON.parse(JSON.stringify(activeChars));
		if (moveIndex === 0) {return}
		[moveChar[moveIndex], moveChar[moveIndex-1]] = [moveChar[moveIndex-1], moveChar[moveIndex]]
		setActiveChars(moveChar)
	}

	const moveCharDown = (uniquechar) => {
		const moveIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == uniquechar);
		const moveChar = JSON.parse(JSON.stringify(activeChars));
		if (moveIndex === moveChar.length - 1) {return}
		[moveChar[moveIndex], moveChar[moveIndex+1]] = [moveChar[moveIndex+1], moveChar[moveIndex]]
		setActiveChars(moveChar)
	}

	
	const switchToChar = async (char) => {
	const activeCharIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == char.uniquechar)
	populateActiveCharacter(activeCharIndex)
	await setStorySlab(0); //necessary to update the notes of the character
	setStorySlab(2);
	console.log(activeChars)
	}

	const createNewCharacter = async (e) =>{
		e.preventDefault();
		  const res = await fetch('/api/characters/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:   "New Char",
                hp:     1,
                maxhp:  1,
                temphp: 0,
                ac:     1,
                str:    1,
                dex:    1,
                con:    1,
                intel:  1,
                wis:    1,
                cha:    1,
            }),
        });

        if (res.ok) {
			const response = await fetch('/api/characters/read',{
				method: 'PUT'
			}).then(response => response.json()).then(async (response) => {
				setCharacters(response.characters);
				const newEntry = JSON.parse(JSON.stringify([...activeChars, response.characters[response.characters.length-1]]));
				newEntry[newEntry.length-1].uniquechar= uniqueChar;
				setUniqueChar(uniqueChar+1)
				setActiveChars(newEntry)
				populateActiveCharacter(newEntry.length-1)
				await setStorySlab(0); //necessary to update the notes of the character
				setStorySlab(2);
			});
        }else{
            throw new Error("Failed to create a Character")
        }



	}

	return <div className={`${Flexstyle.storycontent}`} style={{display: activePage==1 ? "flex" : "none"}}>
		<div className={`${Flexstyle.storybox}`}>
			{storySlab == 1 && 
			<StorySlab 
			activeStoryTitle={activeStoryTitle} 
			activeStoryContent={activeStoryContent} 
			setActiveStoryTitle={setActiveStoryTitle} 
			setStorySlab={setStorySlab}
			checkStoryPresent={checkStoryPresent}
			saveStory={saveStory}
			/>}

			{storySlab == 2 && <>{charPanel}</>}

			{storySlab == 3 && 
			<CharLoad 
				characters={characters} 
				setActiveChars={setActiveChars} 
				activeChars={activeChars} 
				setStorySlab={setStorySlab}
				uniqueChar = {uniqueChar}
				setUniqueChar = {setUniqueChar}
			/>}

			{storySlab == 4 && 
			<StoryLoad 
				stories={stories} 
				setActiveStoryContent={setActiveStoryContent} 
				setActiveStoryTitle={setActiveStoryTitle} 
				setStorySlab={setStorySlab}
			/>}

			{storySlab == 5 && 
			<InitiativeTracker 
				activeChars={activeChars} 
				setStorySlab={setStorySlab}
				setActiveChars={setActiveChars}
				populateActiveCharacter={populateActiveCharacter}
			/>}

		</div>
		
		<div className={`${Flexstyle.characterwrap}`}>
			<div className={`${Flexstyle.characterbox}`}>
				{activeChars.map(activeChars => (
				<CharButton key={activeChars.uniquechar} char={
					{name:activeChars.name, 
					hp:activeChars.hp,
					temphp:activeChars.temphp, 
					ac:activeChars.ac, 
					str:activeChars.str,
					dex:activeChars.dex,
					con:activeChars.con,
					intel:activeChars.intel,
					wis: activeChars.wis,
					cha: activeChars.cha,
					_id: activeChars._id,
					active: activeChars.active,
					uniquechar: activeChars.uniquechar
				}} 
				charMenu = {switchToChar}
				removeActiveChar = {removeActiveChar}
				moveCharUp = {moveCharUp}
				moveCharDown = {moveCharDown}
				/>
				))}
			</div>
			<div> 
				<div className={`${StoryStyle.charactersavecolumn}`}>
					<div className={`${StoryStyle.charactersaverow}`}>
						<div onClick={(e)=>{createNewCharacter(e)}} className={`${StoryStyle.charactersavebutton}`}>Create Character</div>
						<div onClick={()=>{setStorySlab(5)}} className={`${StoryStyle.charactersavebutton}`}>Roll Initiative</div>
					</div>
					<div className={`${StoryStyle.charactersaverow}`}>
						<div className={`${StoryStyle.charactersavebutton}`} onClick={console.log(dbCharacters)}>Save Group</div>
						<div onClick={()=>{setStorySlab(3)}} className={`${StoryStyle.charactersavebutton}`}>Load Characters</div>
					</div>
				</div>			
			</div>
		</div>

	</div>
}

