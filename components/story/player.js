import StyleCSS from '@/styles/general.module.css'
import PlayerButton from './components/playerbutton'
import { useEffect, useState } from 'react';
import CharSlab from './components/charslab';
import PartySlab from './components/partyslab';
import CharLoad from './components/charload';

export default function PlayerPage({dbCharacters, activePage, chargroups})  {

    const user = 'Player'
	const [main, setMain] = useState(0)
	const [noSelect, setNoSelect] = useState (1)
	const [characters, setCharacters] = useState(dbCharacters)
	const [storySlab, setStorySlab] = useState(3)
	const [activeChars, setActiveChars] = useState([])
	const [partyChars, setPartyChars] = useState([])
	const [uniqueChar, setUniqueChar] = useState(0) 
	const [characterName, setCharacterName] = useState('Character Name')
	const [lockDatabase, setLockDatabase] = useState(false)
	const {charPanel, populateActiveCharacter, directPopulate, setActiveIndex, activeIndex} = CharSlab(activeChars, setStorySlab, characterName, setCharacterName, user, setLockDatabase, lockDatabase )
	const {partyPanel, populatePartyCharacter} = PartySlab(activeChars, setStorySlab, characterName, setCharacterName, user, noSelect, setMain, populateActiveCharacter, lockDatabase)
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
		active: 1,
		uniquechar: 99999,
		group: 1,
		url: 1
		})

	useEffect(() => {
		if (lockDatabase == false) {
			const interval = setInterval(() => {updateCurrentParty()}, 1000);
			return () => clearInterval(interval);
		}
	}, [mainChar, lockDatabase])

	const updateCurrentParty = async () =>{
		var newParty = await fetch('/api/characters/read',{
			method: 'GET'
		}).then(response => response.json()).then(response => newParty = response.characters.filter((characters) => characters.active == 1))

		if (newParty.length>0) {

			for (let i=0; i < newParty.length; i++) {
				newParty[i].uniquechar = i;
				if (newParty[i].name==mainChar.name){
					newParty[i].uniquechar = 99999
					setMainChar(newParty[i])
				}
			}

			if(activeChars.length>0){
				setActiveIndex(newParty.findIndex((newParty) => newParty.name == activeChars[activeIndex].name))
			}		
			setPartyChars(newParty.filter((newParty) => newParty.uniquechar != 99999))
			setActiveChars(newParty)
		}
	}

	
	const switchToChar = async (char, mainTrue, mutuable) => {
	setMain(mainTrue)
	const activeCharIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == char.uniquechar)
	setActiveIndex(activeCharIndex)
	populateActiveCharacter(activeCharIndex)
	populatePartyCharacter(activeCharIndex)
	await setStorySlab(0); //necessary to update the notes of the character
	if (mutuable==true){setStorySlab(2); setActiveIndex(activeChars.findIndex((activeChars) => activeChars.uniquechar == 99999))}
	if (mutuable==false){setStorySlab(1);}

	const delay = ms => new Promise(res => setTimeout(res, ms));
	setLockDatabase(true)
	await delay(1000)
	setLockDatabase(false)
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
				player:	playerstatus,
				active: 1,
            }),
        });

        if (res.ok) {
			if ('_id' in mainChar) {
				await fetch(`/api/characters/update?id=${mainChar._id}`,{
				  method: 'PUT',
				  headers: {
					  'Content-Type': 'application/json',
				  },
				  body: JSON.stringify({
					  active:   0,
				  }),
				});
			}
			
			await fetch('/api/characters/read',{
				method: 'PUT'
			}).then(response => response.json()).then(async (response) => {
				setCharacters(response.characters);
				var newEntry = JSON.parse(JSON.stringify([response.characters[response.characters.length-1]]));
				newEntry[newEntry.length-1].uniquechar= 99999;
				for (let i=0; i < activeChars.length; i++){
					if (activeChars[i]._id == newEntry[0]._id)
						activeChars.splice(i, 1)
				  }
				  if (main == 0) {
					setActiveChars([...activeChars, newEntry[0]]);
					directPopulate(newEntry[0])
					setActiveIndex(activeChars.length)
				  }
				  if (main == 1) {
					activeChars[activeChars.findIndex((activeChars) => activeChars.uniquechar == 99999)] = newEntry[0];
					populateActiveCharacter(activeChars.findIndex((activeChars) => activeChars.uniquechar == 99999))
				}

				setMainChar(newEntry[0]);
				setMain(1);
				setNoSelect(0)
				await setStorySlab(0); //necessary to update the notes of the character
				setStorySlab(2);
			});
        }else{
            throw new Error("Failed to create a Character")
        }}
	}

	return <div className={`${StyleCSS.playercontent}`} style={{display: activePage==1 ? "flex" : "none"}}>
		<div className={`${StyleCSS.storybox}`}>
			{storySlab == 1 && <>{partyPanel}</>}
			
			{storySlab == 2 && <>{charPanel}</>}

			{storySlab == 3 && 
			<CharLoad 
				characters={characters} 
				setActiveChars={setActiveChars} 
				activeChars={activeChars} 
				setStorySlab={setStorySlab}
				uniqueChar = {uniqueChar}
				setUniqueChar = {setUniqueChar}
				groupList = {chargroups}
                user = {user}
                createNewCharacter={createNewCharacter}
				setMainChar = {setMainChar}
				setMain = {setMain}
				mainChar = {mainChar}
				setNoSelect = {setNoSelect}
				populateActiveCharacter = {populateActiveCharacter}
				setCharacters = {setCharacters}
				directPopulate = {directPopulate}
				setActiveIndex = {setActiveIndex}
				main = {main}
				setPartyChars = {setPartyChars}
				setLockDatabase= {setLockDatabase}
			/>}
		</div>
		
		<div className={`${StyleCSS.characterwrap}`}>
			<div className={`${StyleCSS.playerbox}`}>
                <PlayerButton char={mainChar} 
				charMenu = {switchToChar}
				mutuable= {true}
				/>
			</div>
			<div className={`${StyleCSS.characterline}`}/>
			<div className={`${StyleCSS.characterbox}`}>
				{partyChars.map(partyChars => (
				<PlayerButton key={partyChars.uniquechar} char={
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
				mutuable = {false}
				/>
				))}
			</div>
		</div>
	</div>
}

