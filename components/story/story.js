import StyleCSS from '@/styles/general.module.css'
import CharButton from './components/charbutton'
import StorySlab from './components/storyslab'
import { useEffect, useState } from 'react';
import CharSlab from './components/charslab';
import CharLoad from './components/charload';
import StoryLoad from './components/storyload';
import InitiativeTracker from './components/initiativetracker'

export default function Story({dbCharacters, stories, activePage, chargroups, activeChars, setActiveChars, combatActive, setCombatActive, work})  {

	const user = 'DM'
	const [characters, setCharacters] = useState(dbCharacters)
	const [storyList, setStoryList] = useState(stories)
	const [storySlab, setStorySlab] = useState(1)
	const [activeStoryContent, setActiveStoryContent] = useState("") 
	const [activeStoryTitle, setActiveStoryTitle] = useState("Title of New Journey")
	const [inactiveChars, setInactiveChars] = useState([])
	const [uniqueChar, setUniqueChar] = useState(0) 
	const [characterState, setCharacterState] = useState(0) 
	const [characterName, setCharacterName] = useState('Character Name') 
	const [groupList, setGroupList] = useState(chargroups)
	const [currentTurn, setCurrentTurn] = useState([{uniquechar: -1}])
	const [lockDatabase, setLockDatabase] = useState(false)
	const {charPanel, populateActiveCharacter, setActiveIndex} = CharSlab(activeChars, setStorySlab, characterName, setCharacterName, user, setLockDatabase, lockDatabase)


		useEffect(() => {
			if (lockDatabase == false) {
				const interval = setInterval(() => {updateCurrentParty()}, 1000);
				return () => clearInterval(interval);
			}
		}, [activeChars, lockDatabase, storySlab])
	
		const updateCurrentParty = async () =>{
			var updatedChars = await fetch('/api/characters/read',{
				method: 'GET'
			}).then(response => response.json()).then(response => updatedChars = response.characters.filter((characters) => characters.active == 1))
			const currentChar = JSON.parse(JSON.stringify(activeChars))
			var somethingChanged = false

	
			for (let i=0; i < updatedChars.length; i++) {
				const sameIndex = currentChar.findIndex((currentChar)=> currentChar._id == updatedChars[i]._id)

				var notesBefore = []
				var notesAfter = []

				if (sameIndex != -1){
					if(currentChar[sameIndex].notes.content){
						notesBefore = JSON.stringify(currentChar[sameIndex].notes.content)
					}

					if(updatedChars[i].notes.content){
						notesAfter = JSON.stringify(updatedChars[i].notes.content)
					}
								
					if (currentChar[sameIndex].hp != updatedChars[i].hp ||
						currentChar[sameIndex].ac != updatedChars[i].ac ||
						currentChar[sameIndex].temphp != updatedChars[i].temphp ||
						currentChar[sameIndex].maxhp != updatedChars[i].maxhp ||
						currentChar[sameIndex].str != updatedChars[i].str ||
						currentChar[sameIndex].dex != updatedChars[i].dex ||
						currentChar[sameIndex].con != updatedChars[i].con ||
						currentChar[sameIndex].wis != updatedChars[i].wis ||
						currentChar[sameIndex].intel != updatedChars[i].intel ||
						currentChar[sameIndex].cha != updatedChars[i].cha ||
						notesBefore != notesAfter
					) {
						currentChar[sameIndex].hp=updatedChars[i].hp
						currentChar[sameIndex].ac=updatedChars[i].ac
						currentChar[sameIndex].temphp=updatedChars[i].temphp
						currentChar[sameIndex].maxhp=updatedChars[i].maxhp
						currentChar[sameIndex].str=updatedChars[i].str
						currentChar[sameIndex].dex=updatedChars[i].dex
						currentChar[sameIndex].con=updatedChars[i].con
						currentChar[sameIndex].wis=updatedChars[i].wis
						currentChar[sameIndex].intel=updatedChars[i].intel
						currentChar[sameIndex].cha=updatedChars[i].cha
						currentChar[sameIndex].notes=updatedChars[i].notes
						somethingChanged=true
					}
				}
			}

			if(somethingChanged == true) {
				var villainHP = 0
				var villainMaxHP = 0
				setActiveChars(currentChar)

				for (let i=0; i < activeChars.length; i++) {
					if (activeChars[i].villainhp==true){
						villainHP= villainHP + activeChars[i].hp
						villainMaxHP = villainMaxHP + activeChars[i].maxhp
					}}

				await fetch('/api/viewer/update',{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						initiatedChar: currentChar,
						villainCurrentHP: villainHP,
						villainMaxHP: villainMaxHP
					}),
				});
			}
		}

	const nextTurn = async () =>{
		var newTurnIndex = 0

		if(currentTurn.uniquechar != -1){
			newTurnIndex=activeChars.findIndex((activeChars) => activeChars.uniquechar == currentTurn.uniquechar)
		}
		
		
		if (newTurnIndex < activeChars.length-1){
			newTurnIndex = newTurnIndex+1
		}else {
			newTurnIndex = 0
		}
		setCurrentTurn(activeChars[newTurnIndex])
		populateActiveCharacter(newTurnIndex, false)
		await setStorySlab(0); //necessary to update the notes of the character
		setStorySlab(2)

		await fetch('/api/viewer/update',{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				initiatedChar: activeChars,
				currentTurn:   activeChars[newTurnIndex]
			}),
		});

		const delay = ms => new Promise(res => setTimeout(res, ms));
		setLockDatabase(true)
		await delay(1000)
		setLockDatabase(false)
	}

	const previousTurn = async () =>{
		var newTurnIndex = 0

		if(currentTurn.uniquechar != -1){
			newTurnIndex=activeChars.findIndex((activeChars) => activeChars.uniquechar == currentTurn.uniquechar)
		}
		
		
		if (newTurnIndex > 0){
			newTurnIndex = newTurnIndex-1
		}else {
			newTurnIndex = activeChars.length-1
		}
		setCurrentTurn(activeChars[newTurnIndex])
		populateActiveCharacter(newTurnIndex, false)
		await setStorySlab(0); //necessary to update the notes of the character
		setStorySlab(2)

		await fetch('/api/viewer/update',{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				initiatedChar: activeChars,
				currentTurn:   activeChars[newTurnIndex]
			}),
		});

		const delay = ms => new Promise(res => setTimeout(res, ms));
		setLockDatabase(true)
		await delay(1000)
		setLockDatabase(false)
	}

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
						work:	 work,
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

	const initiateCombat = () => {
		setLockDatabase(true)
		for (let i=0; i < activeChars.length; i++) {
			delete activeChars[i].initiative
		}
		setStorySlab(5)
	}

	const endCombat = () => {
		setCombatActive(false)
		setActiveChars(activeChars.concat(inactiveChars))
		setCurrentTurn([{uniquechar: -1}])
	}

	const loadCharacters = () => {
		setLockDatabase(true)
		setStorySlab(3)
	}

	
	const switchToChar = async (char) => {
		setLockDatabase(false)
		const activeCharIndex = activeChars.findIndex((activeChars)=> activeChars.uniquechar == char.uniquechar)
		populateActiveCharacter(activeCharIndex, false)
		await setStorySlab(0); //necessary to update the notes of the character
		setStorySlab(2);

		const delay = ms => new Promise(res => setTimeout(res, ms));
		setLockDatabase(true)
		await delay(1000)
		setLockDatabase(false)
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
				player:	playerstatus,
				work:   work
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
				populateActiveCharacter(newEntry.length-1, false)
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
			work = {work}
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
				createNewCharacter = {createNewCharacter}
				work = {work}
				setLockDatabase = {setLockDatabase}
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
				setInactiveChars={setInactiveChars}
				setCombatActive={setCombatActive}
				setActiveIndex={setActiveIndex}
				setCurrentTurn={setCurrentTurn}
				setLockDatabase={setLockDatabase}
			/>}

		</div>
		
		<div className={`${StyleCSS.characterwrap}`}>
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
				currentTurn = {currentTurn}
				/>
				))}
			</div>
			<div> 
				<div className={`${StyleCSS.charactersavecolumn}`}>
					<div className={`${StyleCSS.charactersaverow}`}>
						{characterState == 0 && combatActive==false && <div onClick={()=>{setCharacterState(1)}} className={`${StyleCSS.characteroptionbutton}`}>Create Character</div>}
						{characterState == 0 && combatActive==true && <div onClick={()=>{previousTurn()}} className={`${StyleCSS.characteroptionbutton}`}>Previous Turn</div>}
						{characterState == 0 && combatActive==false && <div className={`${StyleCSS.characteroptionbutton}`} onClick={()=>{setCharacterState(2)}}>Save Group</div>}
						{characterState == 0 && combatActive==true && <div onClick={()=>{nextTurn()}} className={`${StyleCSS.characteroptionbutton}`}>Next Turn</div>}
						{characterState == 1 && <input className={`${StyleCSS.newcharname}`} defaultValue='Character Name' maxLength={12} onChange={(e)=>{setCharacterName(e.target.value)}} id="namedChar" spellCheck='false' autoFocus onFocus={(e) => e.target.select()}/>}
						{characterState == 2 && <input className={`${StyleCSS.newcharname}`} defaultValue='Group Name' id="namedGroup" spellCheck='false' autoFocus onFocus={(e) => e.target.select()}/>}
					</div>
					<div className={`${StyleCSS.charactersaverow}`}>
						{characterState == 0 && <div onClick={()=>{loadCharacters()}} className={`${StyleCSS.characteroptionbutton}`}>Load Characters</div>}
						{characterState == 0 && combatActive==false && <div onClick={()=>{initiateCombat()}} className={`${StyleCSS.characteroptionbutton}`}>Roll Initiative</div>}
						{characterState == 0 && combatActive==true && <div onClick={()=>{endCombat()}} className={`${StyleCSS.characteroptionbutton}`}>End Combat</div>}
						{characterState == 1 && <div onClick={(e)=>{setCharacterState(0)}} className={`${StyleCSS.characteroptionbutton}`}>Cancel</div>}
						{characterState == 1 && <div onClick={(e)=>{createNewCharacter([e,true])}} className={`${StyleCSS.characteroptionbutton}`}>Player</div>}
						{characterState == 1 && <div onClick={(e)=>{createNewCharacter([e,false])}} className={`${StyleCSS.characteroptionbutton}`}>Mob</div>}
						{characterState == 2 && <div onClick={(e)=>{setCharacterState(0)}} className={`${StyleCSS.characteroptionbutton}`}>Cancel</div>}
						{characterState == 2 && <div onClick={(e)=>{saveGroup()}} className={`${StyleCSS.characteroptionbutton}`}>Accept</div>}
					</div>
				</div>			
			</div>
		</div>
	</div>
}

