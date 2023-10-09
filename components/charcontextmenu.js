import { useClickAway } from "@uidotdev/usehooks"
import CM from '../styles/charcontextmenu.module.css'

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
        onClick={() => {closeContextMenu(); console.log(closeContextMenu)}} 
        className={`${CM.contextmenu}`} 
        style={{top: `${y}px`, left: `${x}px`}}>
            <button className={`${CM.contextmenuitem}`} onClick={moveUp}> Move Up</button>
            <div className={`${CM.contextmenuline}`}/>
            <button className={`${CM.contextmenuitem}`} onClick={moveDown}> Move Down</button>
            <div className={`${CM.contextmenuline}`}/>
            <button className={`${CM.contextmenuitem}`} onClick={removeChar}> Remove Character</button>
        </div>   
    )
}