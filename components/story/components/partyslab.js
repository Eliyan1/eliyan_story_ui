import StyleCSS from '@/styles/general.module.css'
import CharNotes from './charnotes'
import { useState } from "react";

export default function CharSlab(activeChars, setStorySlab, characterName, setCharacterName, user, noSelect, setMain, populateActiveCharacter) {

    const [activeIndex, setActiveIndex] = useState(0)
    const mutuable = false
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
        populatePartyCharacter(activeCharIndex)
        populateActiveCharacter(activeCharIndex)
        await setStorySlab(0); //necessary to update the notes of the character
        setStorySlab(2);
    }

    const populatePartyCharacter = (activeCharIndex) => {
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
        } 
        if(extButtonText == "External Info" && !activeChars[activeIndex].url)
        {
            setCharSlab(3);
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
    };

    const updateCharDatabase = async (e) => {
        e.preventDefault();
        if(activeIndex > activeChars.length-1) {actualUpdate(activeChars.length-1)}
        else{actualUpdate(activeIndex)}
    };


    return {populatePartyCharacter,
        partyPanel:(<>
        {charSlab == 1 && <div spellCheck="false" className={`${StyleCSS.charslab}`}>
        <div className={`${StyleCSS.frontslabshort}`}/>
        <div className={`${StyleCSS.namewrapper}`}> 
            <div className={`${StyleCSS.charname}`}> {charName} </div>
        </div>
        <div className={`${StyleCSS.charslabhprow}`}>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabac}`}>AC:</div>
                <div className={`${StyleCSS.charslabacvalue}`}> {charAC} </div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabhp}`}>HP:</div>
                <div className={`${StyleCSS.charslabhpvalue}`}> {charHP} </div>
                <div className={`${StyleCSS.charslabhp}`}>/</div>
                <div className={`${StyleCSS.charslabmaxhpvalue}`}>{charMHP}</div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabac}`}>Temp HP:</div>
                <div className={`${StyleCSS.charslabacvalue}`}> {charTHP} </div>
            </div>
        </div>
        <div className={`${StyleCSS.charslabstatrow}`}>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Str:</div>
                <div className={`${StyleCSS.charslabstatvalue}`}> {charStr} </div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Dex:</div>
                <div className={`${StyleCSS.charslabstatvalue}`}> {charDex} </div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Con:</div>
                <div className={`${StyleCSS.charslabstatvalue}`}> {charCon} </div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Wis:</div>
                <div className={`${StyleCSS.charslabstatvalue}`}> {charWis} </div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Int:</div>
                <div className={`${StyleCSS.charslabstatvalue}`}> {charInt} </div>
            </div>
            <div className={`${StyleCSS.charslabstatwrap}`}>
                <div className={`${StyleCSS.charslabstat}`}>Cha:</div>
                <div className={`${StyleCSS.charslabstatvalue}`}> {charCha} </div>
            </div>
        </div>

        <div className={`${StyleCSS.charslabline}`}/>
        
        <CharNotes
            activeCharacter = {activeIndex > activeChars.length-1 ? activeChars[activeChars.length-1] : activeChars[activeIndex]}
            charNotes = {charNotes}
            mutuable = {mutuable}
        />
    </div>}

    {charSlab == 2 && <div className={`${StyleCSS.charexternal}`}>
        <iframe className={`${StyleCSS.charexternalframe}`} src={charURL}  width="100%" height="100%"></iframe>
    
    </div>}

    <div className={`${StyleCSS.charexternal}`} style={{display: charSlab == 3 ? "flex" : "none"}}>
        <div className={`${StyleCSS.charexternaltext}`}>
        No external URL has been given.
        </div>
    </div>

    <div className={`${StyleCSS.charslabbuttonwrapper}`}>
        {user == 'DM' && <div onClick={()=>{setStorySlab(1)}} className={`${StyleCSS.charslabbutton}`}>Return to Story</div>}
        {user == 'Player' && noSelect == 1 && <div onClick={()=>{setStorySlab(3)}} className={`${StyleCSS.charslabbutton}`}>Switch Character</div>}
        {user == 'Player' && noSelect == 0 && <div onClick={activateMain} className={`${StyleCSS.charslabbutton}`}>Return to Main</div>}
        <div onClick={noteButtonClick} className={`${StyleCSS.charslabbutton}`}>Character Notes</div>
        <div onClick={externalButtonClick} className={`${StyleCSS.charslabbutton}`}>{extButtonText} </div>
    </div>

    </>)
  }}