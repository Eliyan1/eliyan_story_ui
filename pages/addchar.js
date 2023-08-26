import { useState } from "react";
import { useRouter } from "next/router";

export default function AddChar() {
    const [charName, setName] = useState("");
    const [charHP, setHP] = useState(NaN);
    const [charAC, setAC] = useState(NaN);
    const [charStr, setStr] = useState(NaN);
    const [charDex, setDex] = useState(NaN);
    const [charCon, setCon] = useState(NaN);
    const [charInt, setInt] = useState(NaN);
    const [charWis, setWis] = useState(NaN);
    const [charCha, setCha] = useState(NaN);

    const router = useRouter();


    const creatorChar = async (e) => {
        e.preventDefault();
        console.log("You pressed a button");

        if (charName=="" || 
        isNaN(parseFloat(charHP)) ||
        isNaN(parseFloat(charAC)) ||
        isNaN(parseFloat(charStr)) ||
        isNaN(parseFloat(charDex)) ||
        isNaN(parseFloat(charCon)) ||
        isNaN(parseFloat(charInt)) ||
        isNaN(parseFloat(charWis)) ||
        isNaN(parseFloat(charCha))
        ) {
            alert("Please fill in a name and assign values")
            return;
        }

        
        const res = await fetch('/api/characters/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:   charName,
                hp:     charHP,
                ac:     charAC,
                str:    charStr,
                dex:    charDex,
                con:    charCon,
                intel:  charInt,
                wis:    charWis,
                cha:    charCha,
            }),
        });

        if (res.ok) {
            router.push('/story');
        }else{
            throw new Error("Failed to create a Character")
        }

        const data = await res.json();
        console.log(data);
    };


    return <form>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
        <input type="number" placeholder="HP" onChange={(e) => setHP(e.target.value)}/>
        <input type="number" placeholder="AC" onChange={(e) => setAC(e.target.value)}/>
        <input type="number" placeholder="Str" onChange={(e) => setStr(e.target.value)}/>
        <input type="number" placeholder="Dex" onChange={(e) => setDex(e.target.value)}/>
        <input type="number" placeholder="Con" onChange={(e) => setCon(e.target.value)}/>
        <input type="number" placeholder="Int" onChange={(e) => setInt(e.target.value)}/>
        <input type="number" placeholder="Wis" onChange={(e) => setWis(e.target.value)}/>
        <input type="number" placeholder="Cha" onChange={(e) => setCha(e.target.value)}/>
        <button onClick={creatorChar}>Add Character</button>
    </form>
}