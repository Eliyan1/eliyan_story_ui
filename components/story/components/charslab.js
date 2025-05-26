import StyleCSS from '@/styles/general.module.css'
import CharNotes from './charnotes'
import { useState } from "react";

export default function CharSlab(activeChars, setStorySlab, characterName, setCharacterName, user, setMain) {

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
    const [charCurTHP, setCurTHP] = useState(0)
    const [charURL, setURL] = useState("");

    const [charSlab, setCharSlab] = useState(1)
    const [extButtonText, setExtButtonText] = useState("External Info")
    
    const activateMain = async () => {
        const activeCharIndex = activeChars.length - 1
        setMain(1)
        populateActiveCharacter(activeCharIndex)
        await setStorySlab(0); //necessary to update the notes of the character
        setStorySlab(2);
    }

    const directPopulate = (directChar) => {
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
        setCharSlab(1)
        setExtButtonText("External Info")
        setURL(directChar.url)
    }

    const populateActiveCharacter = (activeCharIndex) => {
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
            setCharSlab(1)
            setExtButtonText("External Info")
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
            setCharSlab(1)
            setExtButtonText("External Info")
            setURL("")
        }

    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            e.target.blur(); 
        }
    }

    const nameUpdate = (e) => {
        setName(e.target.value)
	}

    const acUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setAC(e.target.value)
        }
        
	}

    const hpUpdate = (e) => {setHP(e.target.value)}

    const hpSelect = (e) => {
        if (activeIndex > activeChars.length-1) {
            setCurHP(activeChars[activeChars.length-1].hp);
            setCurTHP(activeChars[activeChars.length-1].temphp);
            e.target.select()
        }else{
            setCurHP(activeChars[activeIndex].hp);
            setCurTHP(activeChars[activeIndex].temphp);
            e.target.select()
        }
    }

    const thpUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<1000){
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
            setStr(e.target.value);
        }
	}

    const dexUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setDex(e.target.value);
        }
	}

    const conUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setCon(e.target.value);
        }
	}

    const wisUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setWis(e.target.value);
        }
	}

    const intUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setInt(e.target.value);
        }
	}

    const chaUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100) {
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
        }

        if(extButtonText == "Edit URL")
        {
            setCharSlab(3);
            setExtButtonText("Accept")
        }
    
    }

    const updateCharURL = async (e) => {
        const updateIndex = activeChars.findIndex(activeChars => activeChars.uniquechar==99999);
        const res = await fetch(`/api/characters/update?id=${activeChars[updateIndex]._id}`,{
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
        var mutateTHP = charTHP
        var mutateHP = String(charHP)

        if (mutateHP.startsWith("-") && !isNaN(mutateHP.substring(1))) {
            mutateTHP = charTHP - Number(charHP.substring(1))
                if (mutateTHP < 0) {
                    mutateTHP = 0;
                    mutateHP=String(Number(charCurHP) + Number(charTHP) - Number(charHP.substring(1)))
                }else(mutateHP=charCurHP)
            setTHP(Number(mutateTHP))
        }else if (mutateHP.startsWith("+") && !isNaN(mutateHP.substring(1))) {
            mutateHP=String(Number(charCurHP) + Number(mutateHP.substring(1)))
        }else if (!isNaN(mutateHP)) {
            mutateHP=String(mutateHP)
        }else{
            mutateHP = charHP
        }


        if(Number(mutateHP)<0) {mutateHP='0'};
        if(Number(mutateHP) >activeChars[updateIndex].maxhp) {mutateHP=String(activeChars[updateIndex].maxhp)};
        setHP(mutateHP)

		activeChars[updateIndex].name=charName;
        activeChars[updateIndex].ac=isNaN(charAC) ? null : charAC;
        activeChars[updateIndex].temphp=isNaN(mutateTHP) ? null : Number(mutateTHP);
        activeChars[updateIndex].hp=isNaN(mutateHP) ? null : Number(mutateHP);
        activeChars[updateIndex].maxhp=isNaN(charMHP) ? null : charMHP;
        activeChars[updateIndex].str=isNaN(charStr) ? null : charStr;
        activeChars[updateIndex].dex=isNaN(charDex) ? null : charDex;
        activeChars[updateIndex].con=isNaN(charCon) ? null : charCon;
        activeChars[updateIndex].wis=isNaN(charWis) ? null : charWis;
        activeChars[updateIndex].intel=isNaN(charInt) ? null : charInt;
        activeChars[updateIndex].cha=isNaN(charCha) ? null : charCha;


        
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


    return {populateActiveCharacter, setActiveIndex, directPopulate,
        charPanel:(<>
        {charSlab == 1 && <div spellCheck="false" className={`${StyleCSS.charslab}`}>
        <div className={`${StyleCSS.frontslabshort}`}/>
        <div className={`${StyleCSS.namewrapper}`}> 
            <input 
                type="text"
                maxLength={12} 
                value={`${charName}`} 
                className={`${StyleCSS.charname}`} 
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