import StyleCSS from '@/styles/general.module.css'
import CharButton from './components/charbutton'
import StorySlab from './components/storyslab'
import { useState } from 'react';
import CharSlab from './components/charslab';
import CharLoad from './components/charload';
import StoryLoad from './components/storyload';
import InitiativeTracker from './components/initiativetracker'

export default function PlayerPage({dbCharacters, stories, activePage, chargroups})  {

    const user = 'Player'
	const [characters, setCharacters] = useState(dbCharacters)
	const [storyList, setStoryList] = useState(stories)
	const [storySlab, setStorySlab] = useState(3)
	const [activeStoryContent, setActiveStoryContent] = useState("") 
	const [activeStoryTitle, setActiveStoryTitle] = useState("Title of New Journey")
	const [activeChars, setActiveChars] = useState([])
	const [uniqueChar, setUniqueChar] = useState(0) 
	const [characterState, setCharacterState] = useState(0) 
	const [characterName, setCharacterName] = useState('Character Name') 
	const [groupList, setGroupList] = useState(chargroups)
	const {charPanel, populateActiveCharacter} = CharSlab(activeChars, setStorySlab, characterName)

	const saveGroup = async () =>{

        const currentGroupNames = groupList.map(({name}) => name)

		if(document.getElementById('namedGroup').value == 'Group Name'){
            alert('Please name the Group')
        }else{
            if(currentGroupNames.includes(document.getElementById('namedGroup').value)){
                await fetch(`/api/characters/updategroupname?name=${document.getElementById('namedGroup').value}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name:		document.getElementById('namedGroup').value,
                        group:     activeChars,
                    }),
                });
                const changedGroupEntry = groupList.findIndex((groupList)=> groupList.name == document.getElementById('namedGroup').value)
                groupList[changedGroupEntry].group = activeChars
            }else{ 
                await fetch('/api/characters/creategroup',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name:    document.getElementById('namedGroup').value,
                        group:   activeChars,
                    }),
                });
                setGroupList([...groupList, {name: document.getElementById('namedGroup').value, group:activeChars}])
            }
            setCharacterState(0);
        }
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
	}

	const createNewCharacter = async ([e,playerstatus]) =>{
		e.preventDefault();
		if(document.getElementById('namedChar').value == 'Character Name'){
			alert('Please name the new character')
		}else{
		  const res = await fetch('/api/characters/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:   document.getElementById('namedChar').value,
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
				url:	"",
				player:	playerstatus
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
				setCharacterState(0)
			});
        }else{
            throw new Error("Failed to create a Character")
        }

	}

	}

	return <div className={`${StyleCSS.storycontent}`} style={{display: activePage==1 ? "flex" : "none"}}>
		<div className={`${StyleCSS.storybox}`}>
			{storySlab ==1 &&
			<StorySlab 
			activeStoryTitle={activeStoryTitle} 
			activeStoryContent={activeStoryContent} 
			setActiveStoryTitle={setActiveStoryTitle} 
			setActiveStoryContent={setActiveStoryContent}
			setStorySlab={setStorySlab}
			storyList={storyList}
			setStoryList={setStoryList}
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
				groupList = {groupList}
                user = {user}
                createNewCharacter={createNewCharacter}
			/>}

			{storySlab == 4 && 
			<StoryLoad 
				storyList={storyList} 
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
		
		<div className={`${StyleCSS.characterwrap}`}>
                <CharButton key={activeChars.uniquechar} char={
					{name:'Placeholder', 
					hp:1,
					temphp:1, 
					ac:1, 
					str:1,
					dex:1,
					con:1,
					intel:1,
					wis: 1,
					cha: 1,
					_id: 1,
					active: 1,
					uniquechar: 1,
					group: 1,
					url: 1
				}} 
				charMenu = {switchToChar}
				removeActiveChar = {removeActiveChar}
				moveCharUp = {moveCharUp}
				moveCharDown = {moveCharDown}
				/>
			<div className={`${StyleCSS.characterbox}`}>
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
					uniquechar: activeChars.uniquechar,
					group: activeChars.group,
					url: activeChars.url
				}} 
				charMenu = {switchToChar}
				removeActiveChar = {removeActiveChar}
				moveCharUp = {moveCharUp}
				moveCharDown = {moveCharDown}
				/>
				))}
			</div>
		</div>
	</div>
}

