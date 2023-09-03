import { useState } from "react";
import { useRouter } from "next/router";
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";

export default  function EditChar(character) {

    const [charName, setName] = useState(character.character.name);
    const [charHP, setHP] = useState(character.character.hp);
    const [charAC, setAC] = useState(character.character.ac);
    const [charStr, setStr] = useState(character.character.str);
    const [charDex, setDex] = useState(character.character.dex);
    const [charCon, setCon] = useState(character.character.con);
    const [charInt, setInt] = useState(character.character.intel);
    const [charWis, setWis] = useState(character.character.wis);
    const [charCha, setCha] = useState(character.character.cha);
    const charID = character.character._id;

    const router = useRouter();

    const editChar = async (e) => {
        e.preventDefault();
        
        console.log(charName)

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

        if (charName.length>12 ) {
            alert("Character name cannot be longer than 12 characters")
            return;
        }

        if (charHP>999 || charHP<1 ) {
            alert("HP cannot be higher than 999 or lower than 1")
            return;
        }

        if (charAC>50 || charHP<1 ) {
            alert("AC cannot be higher than 50 or lower than 1")
            return;
        }

        if (charStr>50 || charStr<1 ||
            charDex>50 || charDex<1 ||
            charCon>50 || charCon<1 ||
            charInt>50 || charInt<1 ||
            charWis>50 || charWis<1 ||
            charCha>50 || charCha<1
            ) {
            alert("Character stats cannot be higher than 50 or lower than 1")
            return;
        }

        
        const res = await fetch(`/api/characters/update?id=${charID}`,{
            method: 'PUT',
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
            throw new Error("Failed to edit the Character")
        }

        const data = await res.json();
        console.log(data);
    };


    return <form>
        <input type="text" value={`${charName}`} onChange={(e) => setName(e.target.value)}/>
        <input type="number" value={`${charHP}`} onChange={(e) => setHP(e.target.value)}/>
        <input type="number" value={`${charAC}`} onChange={(e) => setAC(e.target.value)}/>
        <input type="number" value={`${charStr}`} onChange={(e) => setStr(e.target.value)}/>
        <input type="number" value={`${charDex}`} onChange={(e) => setDex(e.target.value)}/>
        <input type="number" value={`${charCon}`} onChange={(e) => setCon(e.target.value)}/>
        <input type="number" value={`${charInt}`} onChange={(e) => setInt(e.target.value)}/>
        <input type="number" value={`${charWis}`} onChange={(e) => setWis(e.target.value)}/>
        <input type="number" value={`${charCha}`} onChange={(e) => setCha(e.target.value)}/>
        <button onClick={editChar}>Add Character</button>
    </form>
}

export const getServerSideProps = async (req,res) => {


	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const character = await Character.findById(req.query._id);
	
	return{
		props: {
			character: JSON.parse(JSON.stringify(character))
		}
	}
	}