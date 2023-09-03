import { useClickAway } from "@uidotdev/usehooks"
import CM from '../styles/charcontextmenu.module.css'
import useRouter from "next/router";

export default function CharContextMenu({x, y, closeContextMenu, charid }) {
    
    const ref = useClickAway(() => {closeContextMenu()});
    
    const removeChar = async (e) => {
        e.preventDefault();
        
        console.log(charid)
        
        const res = await fetch(`/api/characters/update?id=${charid}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                active:   false
            }),
        });

        if (res.ok) {
            useRouter.push('/story');
        }else{
            throw new Error("Failed to edit the Character")
        }
    }

    return ( 
        <div 
        ref={ref} 
        onClick={() =>closeContextMenu()} 
        className={`${CM.contextmenu}`} 
        style={{top: `${y}px`, left: `${x}px`}}>
            <button className={`${CM.contextmenuitem}`} onClick={() => {useRouter.push('/editchar?_id='+`${charid}`)}}> Edit Character</button>
            <div className={`${CM.contextmenuline}`}/>
            <button className={`${CM.contextmenuitem}`} onClick={removeChar}> Remove Character</button>
        </div>   
    )
}