import { useClickAway } from "@uidotdev/usehooks"
import StyleCSS from '@/styles/general.module.css'

export default function CharContextMenu({x, y, closeContextMenu, uniquechar, removeActiveChar, moveCharUp, moveCharDown}) {
    
    const ref = useClickAway(() => {closeContextMenu()});
    
    const removeChar = (e) => {
        e.preventDefault(); 
        removeActiveChar(uniquechar)
    }

    const moveUp = (e) => {
        e.preventDefault();
        moveCharUp(uniquechar)
    }

    const moveDown = (e) => {
        e.preventDefault();
        moveCharDown(uniquechar)
    }

    return ( 
        <div 
        ref={ref} 
        onClick={() => {closeContextMenu()}} 
        className={`${StyleCSS.contextmenu}`} 
        style={{top: `${y}px`, left: `${x}px`}}>
            <button className={`${StyleCSS.contextmenuitem}`} onClick={moveUp}> Move Up</button>
            <div className={`${StyleCSS.contextmenuline}`}/>
            <button className={`${StyleCSS.contextmenuitem}`} onClick={moveDown}> Move Down</button>
            <div className={`${StyleCSS.contextmenuline}`}/>
            <button className={`${StyleCSS.contextmenuitem}`} onClick={removeChar}> Remove Character</button>
        </div>   
    )
}