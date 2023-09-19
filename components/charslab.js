import { Link } from 'react-router-dom';
import UIcomp from '../styles/story.module.css'
import CharNotes from './charnotes'
import { useState } from "react";

export default function CharSlab(characters, setStorySlab) {

    const [activeIndex, setActiveIndex] = useState(0)
    const [charName, setName] = useState("Character Name");
    const [charAC, setAC] = useState(0);
    const [charHP, setHP] = useState(0);
    const [charMHP, setMHP] = useState(0);
    const [charTHP, setTHP] = useState(0);
    const [charStr, setStr] = useState(0);
    const [charDex, setDex] = useState(0);
    const [charCon, setCon] = useState(0);
    const [charWis, setWis] = useState(0);
    const [charInt, setInt] = useState(0);
    const [charCha, setCha] = useState(0);
    

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
    }


    const nameUpdate = (e) => {
		setName(e.target.value);
		characters[activeIndex].name=e.target.value;
	}

    const acUpdate = (e) => {
        setAC(e.target.value)
        characters[activeIndex].ac=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const hpUpdate = (e) => {
        setHP(e.target.value);
        characters[activeIndex].hp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const thpUpdate = (e) => {
        setTHP(e.target.value);
        characters[activeIndex].temphp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const mhpUpdate = (e) => {
        setMHP(e.target.value);
        characters[activeIndex].maxhp=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const strUpdate = (e) => {
        setStr(e.target.value);
        characters[activeIndex].str=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const dexUpdate = (e) => {
        setDex(e.target.value);
        characters[activeIndex].dex=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const conUpdate = (e) => {
        setCon(e.target.value);
        characters[activeIndex].con=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const wisUpdate = (e) => {
        setWis(e.target.value);
        characters[activeIndex].wis=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const intUpdate = (e) => {
        setInt(e.target.value);
        characters[activeIndex].intel=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const chaUpdate = (e) => {
        setCha(e.target.value);
        characters[activeIndex].cha=isNaN(e.target.valueAsNumber) ? null : e.target.valueAsNumber;
	}

    const updateCharDatabase = async (e) => {
        e.preventDefault();
        
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
        <div className={`${UIcomp.namewrapper}`}> 
            <input 
                type="text"
                maxLength={12} 
                value={`${charName}`} 
                className={`${UIcomp.charname}`} 
                onChange={(e) => nameUpdate(e)}
                onBlur={(e) => updateCharDatabase(e)}
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
                />
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabhp}`}>HP:</div>
                <input 
                    type="number"
                    value={`${charHP}`} 
                    className={`${UIcomp.charslabhpvalue}`}
                    onChange={(e) => hpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
                />
                <div className={`${UIcomp.charslabhp}`}>/</div>
                <input 
                    type="number"
                    value={`${charMHP}`}
                    className={`${UIcomp.charslabmaxhpvalue}`}
                    onChange={(e) => mhpUpdate(e)}
                    onBlur={(e) => updateCharDatabase(e)}
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
                />
            </div>
        </div>

        <div className={`${UIcomp.charslabline}`}/>
        
        <CharNotes/>
    </div>

    <div className={`${UIcomp.charslabbuttonwrapper}`}>
        <div onClick={()=>{setStorySlab(2)}} className={`${UIcomp.charslabbutton}`}>Character Notes</div>
        <div  className={`${UIcomp.charslabbutton}`}>External Info</div>
        <div onClick={()=>{setStorySlab(1)}} className={`${UIcomp.charslabbutton}`}>Return to Story</div>
    </div>

    </>)
  }}