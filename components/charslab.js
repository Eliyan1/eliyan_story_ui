import UIcomp from '../styles/story.module.css'
import CharNotes from './charnotes'
import { useState } from "react";

export default function CharSlab(characters, setStorySlab) {

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
    

    const populateActiveCharacter = (activeCharIndex) => {
        setActiveIndex(activeCharIndex);
        setName(characters[activeCharIndex].name);
        setAC(characters[activeCharIndex].ac)
        setHP(characters[activeCharIndex].hp)
        setTHP(characters[activeCharIndex].temphp)
        setMHP(characters[activeCharIndex].maxhp)
        setStr(characters[activeCharIndex].str)
        setDex(characters[activeCharIndex].dex)
        setCon(characters[activeCharIndex].con)
        setWis(characters[activeCharIndex].wis)
        setInt(characters[activeCharIndex].intel)
        setCha(characters[activeCharIndex].cha)
        setNotes(characters[activeCharIndex].notes)
    }

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            e.target.blur(); 
        }
    }

    const nameUpdate = (e) => {
		setName(e.target.value);
		characters[activeIndex].name=e.target.value;
	}

    const acUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setAC(e.target.value)
            characters[activeIndex].ac=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
        
	}

    const hpUpdate = (e) => {
        if (e.target.value.startsWith("-") && !isNaN(e.target.value.substring(1))) {
            setHP(e.target.value)
            characters[activeIndex].temphp = charCurTHP - e.target.value.substring(1)
                if (characters[activeIndex].temphp < 0) {
                    characters[activeIndex].temphp = 0;
                    characters[activeIndex].hp=charCurHP + charCurTHP - e.target.value.substring(1)
                    console.log(charCurHP - e.target.value.substring(1))
                }
            setTHP(characters[activeIndex].temphp)
        }else if (e.target.value.startsWith("=") && !isNaN(e.target.value.substring(1))) {
            setHP(e.target.value)
            characters[activeIndex].hp=charCurHP + Number(e.target.value.substring(1))
            console.log(charCurHP + Number(e.target.value.substring(1)))
            console.log(charHP)
        }else if (!isNaN(e.target.value)) {
            setHP(Number(e.target.value));
            console.log(charHP)
            characters[activeIndex].hp=Number(e.target.value)
        }
	}

    const hpSelect = (e) => {
        setCurHP(characters[activeIndex].hp);
        setCurTHP(characters[activeIndex].temphp);
        e.target.select()
    }

    const thpUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<1000){
            setTHP(e.target.value);
            characters[activeIndex].temphp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const mhpUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<1000){
            setMHP(e.target.value);
            characters[activeIndex].maxhp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const strUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setStr(e.target.value);
            characters[activeIndex].str=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const dexUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setDex(e.target.value);
            characters[activeIndex].dex=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const conUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setCon(e.target.value);
            characters[activeIndex].con=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const wisUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setWis(e.target.value);
            characters[activeIndex].wis=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const intUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100){
            setInt(e.target.value);
            characters[activeIndex].intel=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const chaUpdate = (e) => {
        if (e.target.valueAsNumber>0 && e.target.value<100) {
            setCha(e.target.value);
            characters[activeIndex].cha=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
        }
	}

    const updateCharDatabase = async (e) => {
        e.preventDefault();
        characters[activeIndex].hp <0 ? characters[activeIndex].hp=0 : characters[activeIndex].hp=characters[activeIndex].hp;
        characters[activeIndex].hp >characters[activeIndex].maxhp ? characters[activeIndex].hp=characters[activeIndex].maxhp  : characters[activeIndex].hp;
        setHP(characters[activeIndex].hp)
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

        
        const res = await fetch(`/api/characters/update?id=${characters[activeIndex]._id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:   characters[activeIndex].name,
                hp:     characters[activeIndex].hp,
                maxhp:  characters[activeIndex].maxhp,
                temphp: characters[activeIndex].temphp,
                ac:     characters[activeIndex].ac,
                str:    characters[activeIndex].str,
                dex:    characters[activeIndex].dex,
                con:    characters[activeIndex].con,
                intel:  characters[activeIndex].intel,
                wis:    characters[activeIndex].wis,
                cha:    characters[activeIndex].cha
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to edit the Character")
        }
    };


    return {populateActiveCharacter,
        charPanel:(<>
        <div spellCheck="false" className={`${UIcomp.charslab}`}>
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
            activeCharacter={characters[activeIndex]}
            charNotes={charNotes}
            setNotes={setNotes} 
        />
    </div>

    <div className={`${UIcomp.charslabbuttonwrapper}`}>
        <div onClick={()=>{setStorySlab(2)}} className={`${UIcomp.charslabbutton}`}>Character Notes</div>
        <div className={`${UIcomp.charslabbutton}`}>External Info</div>
        <div onClick={()=>{setStorySlab(1)}} className={`${UIcomp.charslabbutton}`}>Return to Story</div>
    </div>

    </>)
  }}