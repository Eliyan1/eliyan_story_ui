import StyleCSS from '@/styles/general.module.css'
import PlayerButton from './components/playerbutton'
import CharButton from './components/charbutton'
import { useEffect, useState } from 'react';
import CharSlab from './components/charslab';
import CharLoad from './components/charload';

export default function PlayerPage({dbCharacters, activePage, chargroups})  {

    const user = 'Player'
	const [main, setMain] = useState(0)
	const [noSelect, setNoSelect] = useState (1)
	const [characters, setCharacters] = useState(dbCharacters)
	const [storySlab, setStorySlab] = useState(3)
	const [activeChars, setActiveChars] = useState([])
	var partyChars = activeChars.filter((activeChars) => activeChars.uniquechar != 99999)
	const [uniqueChar, setUniqueChar] = useState(0) 
	const [characterState, setCharacterState] = useState(0) 
	const [characterName, setCharacterName] = useState('Character Name') 
	const [groupList, setGroupList] = useState(chargroups)
	const {charPanel, populateActiveCharacter} = CharSlab(activeChars, setStorySlab, characterName, setCharacterName, user, main, noSelect, setMain)
	const [mainChar, setMainChar] = useState(					
		{name:'No Character Selected', 
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
		uniquechar: 99999,
		group: 1,
		url: 1
		})

	useEffect(() => {
		const interval = setInterval(() => {updateCurrentParty()}, 1000);
		return () => clearInterval(interval);
	}, [mainChar])

	const updateCurrentParty = async () =>{
		var newParty = await fetch('/api/characters/read',{
            method: 'GET'
        }).then(response => response.json()).then(response => newParty = response.characters.filter((characters) => characters.active == 1 && characters.name != mainChar.name))

		
		for (let i=0; i < newParty.length; i++) {
			newParty[i].uniquechar = i;
		}

		setActiveChars(newParty.concat(mainChar))
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

	
	const switchToChar = async (char, mainTrue, noSelect) => {
	setMain(mainTrue)
	console.log(mainTrue) 
	console.log(noSelect)
	const activeCharIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == char.uniquechar)
	populateActiveCharacter(activeCharIndex)
	await setStorySlab(0); //necessary to update the notes of the character
	setStorySlab(2);
	console.log(partyChars)
	}

	const createNewCharacter = async ([e,playerstatus]) =>{
		e.preventDefault();
		if(document.getElementById('namedChar').value == 'Character Name' || document.getElementById('namedChar').value == ''){
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
				const newEntry = JSON.parse(JSON.stringify([response.characters[response.characters.length-1]]));
				newEntry[newEntry.length-1].uniquechar= 99999;
				setMainChar(newEntry[0]);
				setMain(1);
				activeChars[activeChars.length-1] = newEntry[0];
				console.log(activeChars)
				populateActiveCharacter(activeChars.length-1)
				setNoSelect(0)
				await setStorySlab(0); //necessary to update the notes of the character
				setStorySlab(2);
			});
        }else{
            throw new Error("Failed to create a Character")
        }}
	}

	return <div className={`${StyleCSS.storycontent}`} style={{display: activePage==1 ? "flex" : "none"}}>
		<div className={`${StyleCSS.storybox}`}>
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
				setMainChar = {setMainChar}
				setMain = {setMain}
				setNoSelect = {setNoSelect}
				populateActiveCharacter = {populateActiveCharacter}
				setCharacters = {setCharacters}
			/>}
		</div>
		
		<div className={`${StyleCSS.characterwrap}`}>
			<div className={`${StyleCSS.playerbox}`}>
                <PlayerButton char={mainChar} 
				charMenu = {switchToChar}
				/>
			</div>
			<div className={`${StyleCSS.characterline}`}/>
			<div className={`${StyleCSS.characterbox}`}>
				{partyChars.map(partyChars => (
				<CharButton key={partyChars.uniquechar} char={
					{name:partyChars.name, 
					hp:partyChars.hp,
					temphp:partyChars.temphp, 
					ac:partyChars.ac, 
					str:partyChars.str,
					dex:partyChars.dex,
					con:partyChars.con,
					intel:partyChars.intel,
					wis: partyChars.wis,
					cha: partyChars.cha,
					_id: partyChars._id,
					active: partyChars.active,
					uniquechar: partyChars.uniquechar,
					group: partyChars.group,
					url: partyChars.url
				}} 
				charMenu = {switchToChar}
				removeActiveChar = {removeActiveChar}
				moveCharUp = {moveCharUp}
				moveCharDown = {moveCharDown}
				noSelect = {noSelect}
				/>
				))}
			</div>
		</div>
	</div>
}

