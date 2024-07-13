import UIcomp from '../styles/story.module.css'
import CharNotes from './charnotes'
import { useState } from "react";

export default function CharSlab(activeChars, setStorySlab, characterName) {

    const [activeIndex, setActiveIndex] = useState(0)
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
            console.log(activeCharIndex);
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
		setName(e.target.value);
		activeChars[activeIndex].name=e.target.value;
	}

    const acUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setAC(e.target.value)
            activeChars[activeIndex].ac=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
        
	}

    const hpUpdate = (e) => {
        if (e.target.value.startsWith("-") && !isNaN(e.target.value.substring(1))) {
            setHP(e.target.value)
            activeChars[activeIndex].temphp = charCurTHP - e.target.value.substring(1)
                if (activeChars[activeIndex].temphp < 0) {
                    activeChars[activeIndex].temphp = 0;
                    activeChars[activeIndex].hp=charCurHP + charCurTHP - e.target.value.substring(1)
                    console.log(charCurHP - e.target.value.substring(1))
                }
            setTHP(activeChars[activeIndex].temphp)
        }else if (e.target.value.startsWith("+") && !isNaN(e.target.value.substring(1))) {
            setHP(e.target.value)
            activeChars[activeIndex].hp=charCurHP + Number(e.target.value.substring(1))
            console.log(charCurHP + Number(e.target.value.substring(1)))
            console.log(charHP)
        }else if (!isNaN(e.target.value)) {
            setHP(Number(e.target.value));
            console.log(charHP)
            activeChars[activeIndex].hp=Number(e.target.value)
        }
	}

    const hpSelect = (e) => {
        setCurHP(activeChars[activeIndex].hp);
        setCurTHP(activeChars[activeIndex].temphp);
        e.target.select()
    }

    const thpUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<1000){
            setTHP(e.target.value);
            activeChars[activeIndex].temphp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const mhpUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<1000){
            setMHP(e.target.value);
            activeChars[activeIndex].maxhp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const strUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setStr(e.target.value);
            activeChars[activeIndex].str=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const dexUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setDex(e.target.value);
            activeChars[activeIndex].dex=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const conUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setCon(e.target.value);
            activeChars[activeIndex].con=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const wisUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setWis(e.target.value);
            activeChars[activeIndex].wis=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const intUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setInt(e.target.value);
            activeChars[activeIndex].intel=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const chaUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100) {
            setCha(e.target.value);
            activeChars[activeIndex].cha=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const urlUpdate = (e) => {
        setURL(e.target.value)
        activeChars[activeIndex].url=e.target.value;
    }


    const noteButtonClick = () => {
    setCharSlab(1);
    setExtButtonText("External Info");
    }

    const externalButtonClick = () => {
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

    const updateCharDatabase = async (e) => {
        e.preventDefault();
        if(activeChars[activeIndex].hp<0) {activeChars[activeIndex].hp=0};
        if(activeChars[activeIndex].hp >activeChars[activeIndex].maxhp) {activeChars[activeIndex].hp=activeChars[activeIndex].maxhp};
        setHP(activeChars[activeIndex].hp)
        // if (characters[activeIndex].name=="" || 
        // characters[activeIndex].ac==null ||
        // characters[activeIndex].hp==null||
        // characters[activeIndex].temphp==null ||
        // characters[activeIndex].maxhp==null ||
        // characters[activeIndex].str==null ||
        // characters[activeIndex].dex==null ||
        // characters[activeIndex].con==null ||
        // characters[activeIndex].wis==null ||
        // characters[activeIndex].intel==null ||
        // characters[activeIndex].cha==null
        // ) {
        //     e.target.focus()
        //     alert("Please don't leave the value empty")
        //     return;
        // }

        
        const res = await fetch(`/api/characters/update?id=${activeChars[activeIndex]._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:   activeChars[activeIndex].name,
                hp:     activeChars[activeIndex].hp,
                maxhp:  activeChars[activeIndex].maxhp,
                temphp: activeChars[activeIndex].temphp,
                ac:     activeChars[activeIndex].ac,
                str:    activeChars[activeIndex].str,
                dex:    activeChars[activeIndex].dex,
                con:    activeChars[activeIndex].con,
                intel:  activeChars[activeIndex].intel,
                wis:    activeChars[activeIndex].wis,
                cha:    activeChars[activeIndex].cha,
                url:    activeChars[activeIndex].url
            }),
        });

        console.log(activeChars[activeIndex].url)

        if (!res.ok) {
            throw new Error("Failed to edit the Character")
        }
    };


    return {populateActiveCharacter,
        charPanel:(<>
        {charSlab == 1 && <div spellCheck="false" className={`${UIcomp.charslab}`}>
        <div className={`${UIcomp.frontslabshort}`}/>
        <div className={`${UIcomp.namewrapper}`}> 
            <input 
                type="text"
                maxLength={12} 
                value={`${charName}`} 
                className={`${UIcomp.charname}`} 
                onChange={(e) => nameUpdate(e)}
                onBlur={(e) => updateCharDatabase(e)}
                onKeyDown={(e) => handleKeyPress(e)}
                onFocus={(e) => e.target.select()}
            />
        </div>
        <div className={`${UIcomp.charslabhprow}`}>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabac}`}>AC:</div>
                <input
                    type="number"
                    value={`${charAC}`}
                    className={`${UIcomp.charslabacvalue}`}
                    onChange={(e) => acUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabhp}`}>HP:</div>
                <input 
                    type="text"
                    maxLength={4}
                    value={`${charHP}`} 
                    className={`${UIcomp.charslabhpvalue}`}
                    onFocus={(e) => hpSelect(e)}
                    onChange={(e) => hpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                />
                <div className={`${UIcomp.charslabhp}`}>/</div>
                <input 
                    type="number"
                    value={`${charMHP}`}
                    className={`${UIcomp.charslabmaxhpvalue}`}
                    onChange={(e) => mhpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabac}`}>Temp HP:</div>
                <input
                    type="number"
                    value={`${charTHP}`}
                    className={`${UIcomp.charslabacvalue}`}
                    onChange={(e) => thpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
        </div>
        <div className={`${UIcomp.charslabstatrow}`}>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstat}`}>Str:</div>
                <input 
                    type='number'
                    value={charStr}
                    className={`${UIcomp.charslabstatvalue}`}
                    onChange={(e) => strUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstat}`}>Dex:</div>
                <input 
                    type='number'
                    value={charDex}
                    className={`${UIcomp.charslabstatvalue}`}
                    onChange={(e) => dexUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstat}`}>Con:</div>
                <input 
                    type='number'
                    value={charCon}
                    className={`${UIcomp.charslabstatvalue}`}
                    onChange={(e) => conUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstat}`}>Wis:</div>
                <input 
                    type='number'
                    value={charWis}
                    className={`${UIcomp.charslabstatvalue}`}
                    onChange={(e) => wisUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstat}`}>Int:</div>
                <input 
                    type='number'
                    value={charInt}
                    className={`${UIcomp.charslabstatvalue}`}
                    onChange={(e) => intUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstat}`}>Cha:</div>
                <input 
                    type='number'
                    value={charCha}
                    className={`${UIcomp.charslabstatvalue}`}
                    onChange={(e) => chaUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    onFocus={(e) => e.target.select()}
                />
            </div>
        </div>

        <div className={`${UIcomp.charslabline}`}/>
        
        <CharNotes
            activeCharacter={activeChars[activeIndex]}
            charNotes={charNotes}
            setNotes={setNotes} 
        />
    </div>}

    {charSlab == 2 && <div className={`${UIcomp.charexternal}`}>
        <iframe className={`${UIcomp.charexternalframe}`} src={charURL}  width="100%" height="100%"></iframe>
    
    </div>}

    <div className={`${UIcomp.charexternal}`} style={{display: charSlab == 3 ? "flex" : "none"}}>
        <div className={`${UIcomp.charexternaltext}`}>
        Please enter external URL:
        </div>
        <input 
        className={`${UIcomp.charexternalinput}`} 
        onChange={(e) => urlUpdate(e)} 
        value={charURL}
        onBlur={(e) => updateCharDatabase(e)}/>
    </div>

    <div className={`${UIcomp.charslabbuttonwrapper}`}>
        <div onClick={()=>{setStorySlab(1)}} className={`${UIcomp.charslabbutton}`}>Return to Story</div>
        <div onClick={noteButtonClick} className={`${UIcomp.charslabbutton}`}>Character Notes</div>
        <div onClick={externalButtonClick} className={`${UIcomp.charslabbutton}`}>{extButtonText} </div>
    </div>

    </>)
  }}