import StyleCSS from '@/styles/general.module.css'
import CharNotes from './charnotes'
import { useEffect, useState } from "react";

export default function CharSlab(activeChars, setStorySlab, characterName, setCharacterName, user, setLockDatabase, lockDatabase) {

    const [activeIndex, setActiveIndex] = useState(0)
    const mutuable = true
    const [charName, setName] = useState("Character Name");
    const [charAC, setAC] = useState(0);
    const [charHP, setHP] = useState('');
    const [charMHP, setMHP] = useState(0);
    const [charTHP, setTHP] = useState(0);
    const [charStr, setStr] = useState(0);
    const [charDex, setDex] = useState(0);
    const [charCon, setCon] = useState(0);
    const [charWis, setWis] = useState(0);
    const [charInt, setInt] = useState(0);
    const [charCha, setCha] = useState(0);
    const [charNotes, setNotes] = useState("Character Notes")
    const [charCurHP, setCurHP] = useState(0)
    const [charURL, setURL] = useState("");

    const [charSlab, setCharSlab] = useState(1)
    const [extButtonText, setExtButtonText] = useState("External Info")

    useEffect(() => {
        if (lockDatabase == false) {
                const interval = setInterval(() => {populateActiveCharacter(activeIndex, true)}, 1000);
                return () => clearInterval(interval);
        }
    }, [activeChars, lockDatabase])

    const directPopulate = (directChar, databaseUpdate) => {
        setName(directChar.name);
        setAC(directChar.ac)
        setHP(directChar.hp)
        setTHP(directChar.temphp)
        setMHP(directChar.maxhp)
        setStr(directChar.str)
        setDex(directChar.dex)
        setCon(directChar.con)
        setWis(directChar.wis)
        setInt(directChar.intel)
        setCha(directChar.cha)
        setNotes(directChar.notes)
        if(databaseUpdate==false){
            setCharSlab(1)
            setExtButtonText("External Info")
        }
        setURL(directChar.url)
    }

    const populateActiveCharacter = (activeCharIndex, databaseUpdate) => {
        if(activeCharIndex < activeChars.length) {
            setActiveIndex(activeCharIndex);
            setName(activeChars[activeCharIndex].name);
            setAC(activeChars[activeCharIndex].ac)
            setHP(activeChars[activeCharIndex].hp)
            setTHP(activeChars[activeCharIndex].temphp)
            setMHP(activeChars[activeCharIndex].maxhp)
            setStr(activeChars[activeCharIndex].str)
            setDex(activeChars[activeCharIndex].dex)
            setCon(activeChars[activeCharIndex].con)
            setWis(activeChars[activeCharIndex].wis)
            setInt(activeChars[activeCharIndex].intel)
            setCha(activeChars[activeCharIndex].cha)
            setNotes(activeChars[activeCharIndex].notes)
            if(databaseUpdate==false){
                setCharSlab(1)
                setExtButtonText("External Info")
            }
            setURL(activeChars[activeCharIndex].url)
        }else{
            setActiveIndex(activeCharIndex);
            setName(characterName);
            setAC(1)
            setHP('1')
            setTHP(0)
            setMHP(1)
            setStr(1)
            setDex(1)
            setCon(1)
            setWis(1)
            setInt(1)
            setCha(1)
            setNotes(1)
            if(databaseUpdate==false){
                setCharSlab(1)
                setExtButtonText("External Info")
            }   
            setURL("")
        }

    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            e.target.blur(); 
        }
    }

    const nameUpdate = (e) => {
        activeChars[activeIndex].name=e.target.value
        setName(e.target.value)
	}

    const acUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            activeChars[activeIndex].ac=e.target.value
            setAC(e.target.value)
        }
        
	}

    const hpUpdate = (e) => {
        if (e.target.value.startsWith("-") && !isNaN(e.target.value.substring(1))) {
            if (Number(charCurHP) + Number(charTHP) + Number(e.target.value) < 0 && e.target.value.length>1){
                activeChars[activeIndex].temphp=0
                activeChars[activeIndex].hp=0 
            }else if (Number(charTHP) + Number(e.target.value) < 0 && e.target.value.length>1){
                activeChars[activeIndex].hp=Number(charCurHP)+Number(e.target.value)+Number(charTHP)
                activeChars[activeIndex].temphp=0
            }else if (e.target.value.length>1){
                activeChars[activeIndex].temphp=Number(charTHP)+Number(e.target.value)
            }
            setHP(e.target.value)

        }else if (e.target.value.startsWith("+") && !isNaN(e.target.value.substring(1))) {
            if (e.target.value.length>1){
                if(Number(charCurHP)+Number(e.target.value)>Number(activeChars[activeIndex].maxhp)){
                    activeChars[activeIndex].hp=activeChars[activeIndex].maxhp
                }else{
                    activeChars[activeIndex].hp=Number(charCurHP)+Number(e.target.value)
                }
            }
            setHP(e.target.value)
        }else if (!isNaN(e.target.value)){
            if (e.target.value.length>0){
                if(Number(e.target.value)>Number(activeChars[activeIndex].maxhp)){
                    activeChars[activeIndex].hp=activeChars[activeIndex].maxhp
                }else{
                    activeChars[activeIndex].hp=Number(e.target.value)
                }
            }
            setHP(e.target.value)
        }
    }

    const hpSelect = (e) => {
        setLockDatabase(true)
        setCurHP(activeChars[activeIndex].hp);
        e.target.select()
    }

    const thpUpdate = (e) => {
        if (e.target.value>0 && e.target.value<1000){
            activeChars[activeIndex].temphp=e.target.value
            setTHP(e.target.value);
        }
	}

    const mhpUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<1000){
            setMHP(e.target.value);
        }
	}

    const strUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            activeChars[activeIndex].str=e.target.value
            setStr(e.target.value);
        }
	}

    const dexUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            activeChars[activeIndex].dex=e.target.value
            setDex(e.target.value);
        }
	}

    const conUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            activeChars[activeIndex].con=e.target.value
            setCon(e.target.value);
        }
	}

    const wisUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            activeChars[activeIndex].wis=e.target.value
            setWis(e.target.value);
        }
	}

    const intUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            activeChars[activeIndex].intel=e.target.value
            setInt(e.target.value);
        }
	}

    const chaUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100) {
            activeChars[activeIndex].cha=e.target.value
            setCha(e.target.value);
        }
	}

    const urlUpdate = (e) => {
        setURL(e.target.value)
        if (user == 'DM') {activeChars[activeIndex].url=e.target.value}
        else{activeChars[activeChars.findIndex(activeChars => activeChars.uniquechar==99999)].url=e.target.value
        }
    }


    const noteButtonClick = () => {
    setCharSlab(1);
    setExtButtonText("External Info");
    }

    const externalButtonClick = () => {

        if(user == 'DM') {
            if(extButtonText == "External Info" && activeChars[activeIndex].url)
            {
                setCharSlab(2);
                setExtButtonText("Edit URL")
            }
        
            if(extButtonText == "External Info" && !activeChars[activeIndex].url)
            {
                setCharSlab(3);
                setExtButtonText("Accept")
            }
        }

        if(user == 'Player') {
            const MCIndex = activeChars.findIndex(activeChars => activeChars.uniquechar==99999);
            if(extButtonText == "External Info" && activeChars[MCIndex].url)
            {
                setCharSlab(2);
                setExtButtonText("Edit URL")
            }
        
            if(extButtonText == "External Info" && !activeChars[MCIndex].url)
            {
                setCharSlab(3);
                setExtButtonText("Accept")
            }
        }

        if(extButtonText == "Accept")
        {
            setCharSlab(2);
            setExtButtonText("Edit URL")
            setLockDatabase(false)
        }

        if(extButtonText == "Edit URL")
        {
            setCharSlab(3);
            setExtButtonText("Accept")
        }
    
    }

    const updateCharURL = async (e) => {
        setLockDatabase(false)
        const res = await fetch(`/api/characters/update?id=${activeChars[activeIndex]._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url:    e.target.value
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to edit the Character")
        }

    }

    const actualUpdate = async (updateIndex) => {    
        
        setHP(activeChars[updateIndex].hp)
        setTHP(activeChars[updateIndex].temphp)
        setLockDatabase(false)

        const res = await fetch(`/api/characters/update?id=${activeChars[updateIndex]._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:   activeChars[updateIndex].name,
                hp:     activeChars[updateIndex].hp,
                maxhp:  activeChars[updateIndex].maxhp,
                temphp: activeChars[updateIndex].temphp,
                ac:     activeChars[updateIndex].ac,
                str:    activeChars[updateIndex].str,
                dex:    activeChars[updateIndex].dex,
                con:    activeChars[updateIndex].con,
                intel:  activeChars[updateIndex].intel,
                wis:    activeChars[updateIndex].wis,
                cha:    activeChars[updateIndex].cha,
                url:    activeChars[updateIndex].url
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to edit the Character")
        }

        if (user == 'DM') {
            var villainHP = 0
            var villainMaxHP = 0

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
                    initiatedChar: activeChars,
                    villainCurrentHP: villainHP,
                    villainMaxHP: villainMaxHP
                }),
            });
        }
    };

    const updateCharDatabase = async (e) => {
        e.preventDefault();
        if (user == 'Player'){
            const MCIndex = activeChars.findIndex(activeChars => activeChars.uniquechar==99999);
            actualUpdate(MCIndex)
        }
        else{
            if(activeIndex > activeChars.length-1) {actualUpdate(activeChars.length-1)}
            else{actualUpdate(activeIndex)}
        }
    };


    return {populateActiveCharacter, directPopulate, setActiveIndex, activeIndex,
        charPanel:(<>
        {charSlab == 1 && <div spellCheck="false" className={`${StyleCSS.charslab}`}>
        <div className={`${StyleCSS.frontslabshort}`}/>
        <div className={`${StyleCSS.namewrapper}`}> 
            <input 
                type="text"
                maxLength={12} 
                value={`${charName}`} 
                className={`${StyleCSS.charname}`} 
                onSelect={() => setLockDatabase(true)}
                onChange={(e) => nameUpdate(e)}
                onBlur={(e) => updateCharDatabase(e)}
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={(e) => e.target.select()}
            />
        </div>
        <div className={`${StyleCSS.charslabhprow}`}>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabac}`}>AC:</div>
                <input
                    type="number"
                    value={`${charAC}`}
                    className={`${StyleCSS.charslabacvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => acUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabhp}`}>HP:</div>
                <input 
                    type="text"
                    inputMode='numeric'
                    maxLength={4}
                    value={`${charHP}`} 
                    className={`${StyleCSS.charslabhpvalue}`}
                    onFocus={(e) => hpSelect(e)}
                    onChange={(e) => hpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                />
                <div className={`${StyleCSS.charslabhp}`}>/</div>
                <input 
                    type="number"
                    value={`${charMHP}`}
                    className={`${StyleCSS.charslabmaxhpvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => mhpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabac}`}>Temp HP:</div>
                <input
                    type="number"
                    value={`${charTHP}`}
                    className={`${StyleCSS.charslabacvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => thpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
        </div>
        <div className={`${StyleCSS.charslabstatrow}`}>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Str:</div>
                <input 
                    type='number'
                    value={charStr}
                    className={`${StyleCSS.charslabstatvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => strUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Dex:</div>
                <input 
                    type='number'
                    value={charDex}
                    className={`${StyleCSS.charslabstatvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => dexUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Con:</div>
                <input 
                    type='number'
                    value={charCon}
                    className={`${StyleCSS.charslabstatvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => conUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Wis:</div>
                <input 
                    type='number'
                    value={charWis}
                    className={`${StyleCSS.charslabstatvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => wisUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Int:</div>
                <input 
                    type='number'
                    value={charInt}
                    className={`${StyleCSS.charslabstatvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => intUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Cha:</div>
                <input 
                    type='number'
                    value={charCha}
                    className={`${StyleCSS.charslabstatvalue}`}
                    onSelect={() => setLockDatabase(true)}
                    onChange={(e) => chaUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
        </div>

        <div className={`${StyleCSS.charslabline}`}/>
        
        <CharNotes
            activeCharacter = {user == 'Player' ? activeChars[activeChars.findIndex(activeChars => activeChars.uniquechar==99999)] : activeChars[activeIndex]}
            charNotes = {charNotes}
            mutuable = {mutuable}
            activeIndex = {activeIndex}
            lockDatabase = {lockDatabase}
            setLockDatabase = {setLockDatabase}
            activeChars = {activeChars}
        />
    </div>}

    {charSlab == 2 && <div className={`${StyleCSS.charexternal}`}>
        <iframe className={`${StyleCSS.charexternalframe}`} src={charURL}  width="100%" height="100%"></iframe>
    
    </div>}

    <div className={`${StyleCSS.charexternal}`} style={{display: charSlab == 3 ? "flex" : "none"}}>
        <div className={`${StyleCSS.charexternaltext}`}>
        Please enter external URL:
        </div>
        <input 
        className={`${StyleCSS.charexternalinput}`}
        onSelect={()=>setLockDatabase(true)} 
        onChange={(e) => urlUpdate(e)} 
        value={charURL}
        onBlur={(e) => updateCharURL(e)}/>
    </div>

    <div className={`${StyleCSS.charslabbuttonwrapper}`}>
        {user == 'DM' && <div onClick={()=>{setStorySlab(1)}} className={`${StyleCSS.charslabbutton}`}>Return to Story</div>}
        {user == 'Player' && <div onClick={()=>{setStorySlab(3)}} className={`${StyleCSS.charslabbutton}`}>Switch Character</div>}
        <div onClick={noteButtonClick} className={`${StyleCSS.charslabbutton}`}>Character Notes</div>
        <div onClick={externalButtonClick} className={`${StyleCSS.charslabbutton}`}>{extButtonText} </div>
    </div>

    </>)
  }}