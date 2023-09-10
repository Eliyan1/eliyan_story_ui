import UIcomp from '../styles/story.module.css'
import CharNotes from './charnotes'
import { useState } from "react";

export default function CharSlab(changeName) {

    const [charName, setName] = useState("Character Name");

    const allNameChange = (e) => {
		setName(e.target.value);
		changeName(e);
	}

    return {setName, charName,
        charPanel:(<div spellCheck="false" className={`${UIcomp.charslab}`}>
        <input type="text" value={`${charName}`} className={`${UIcomp.charname}`} onChange={(e) => allNameChange(e)}/>
        <div className={`${UIcomp.charslabhprow}`}>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabacvalue}`}>AC:</div>
                <div className={`${UIcomp.charslabacvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabhpvalue}`}>HP:</div>
                <div className={`${UIcomp.charslabhpvalue}`}>20</div>
                <div className={`${UIcomp.charslabhpvalue}`}>/</div>
                <div className={`${UIcomp.charslabhpvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabacvalue}`}>Temp HP:</div>
                <div className={`${UIcomp.charslabacvalue}`}>20</div>
            </div>
        </div>
        <div className={`${UIcomp.charslabstatrow}`}>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstatvalue}`}>Str:</div>
                <div className={`${UIcomp.charslabstatvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstatvalue}`}>Dex:</div>
                <div className={`${UIcomp.charslabstatvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstatvalue}`}>Con:</div>
                <div className={`${UIcomp.charslabstatvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstatvalue}`}>Wis:</div>
                <div className={`${UIcomp.charslabstatvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstatvalue}`}>Int:</div>
                <div className={`${UIcomp.charslabstatvalue}`}>20</div>
            </div>
            <div className={`${UIcomp.charslabstatwrap}`}>
                <div className={`${UIcomp.charslabstatvalue}`}>Cha:</div>
                <div className={`${UIcomp.charslabstatvalue}`}>20</div>
            </div>
        </div>

        <div className={`${UIcomp.charslabline}`}/>
        
        <CharNotes/>
    </div>)
  }}