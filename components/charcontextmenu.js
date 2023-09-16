import { useClickAway } from "@uidotdev/usehooks"
import CM from '../styles/charcontextmenu.module.css'
import useRouter from "next/router";

export default function CharContextMenu({x, y, closeContextMenu, charid, removeActiveChar}) {
    
    const ref = useClickAway(() => {closeContextMenu()});
    
    const removeChar = async (e) => {
        e.preventDefault();
        
        const res = await fetch(`/api/characters/update?id=${charid}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                active:   false
            }),
        });

        console.log(removeActiveChar)
        removeActiveChar(charid)

        if (res.ok) {
        }else{
            throw new Error("Failed to edit the Character")
        }
    }

    return ( 
        <div 
        ref={ref} 
        onClick={() => {closeContextMenu(); console.log(closeContextMenu)}} 
        className={`${CM.contextmenu}`} 
        style={{top: `${y}px`, left: `${x}px`}}>
            <button className={`${CM.contextmenuitem}`} onClick={() => {useRouter.push('/editchar?_id='+`${charid}`)}}> Edit Character</button>
            <div className={`${CM.contextmenuline}`}/>
            <button className={`${CM.contextmenuitem}`} onClick={removeChar}> Remove Character</button>
        </div>   
    )
}