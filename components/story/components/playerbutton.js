import StyleCSS from '@/styles/general.module.css'



export default function PlayerButton({char, charMenu, mutuable}) {


  return <div>
    <button
    className={mutuable ? `${StyleCSS.playerbutton}` : `${StyleCSS.characterbutton}`} 
    onClick={()=>charMenu(char, 1, mutuable)} 
    style={{display: char.name!='No Character Selected' ? "flex" : "none"}}>  
      <div className={`${StyleCSS.characterbuttoncolumn}`}> 
      <div className={`${StyleCSS.characterbuttonrow}`}>
          <div className={`${StyleCSS.charactername}`}> {char.name} </div>
          <div className={`${StyleCSS.characterhealthwrap}`}>
            <div className={`${StyleCSS.characterhealth}`}> {Number(char.hp) + Number(char.temphp)} </div>
            <div className={`${StyleCSS.characterhealthlabel}`}> HP </div>
          </div>
          <div className={`${StyleCSS.characterhealthwrap}`}>
            <div className={`${StyleCSS.characterhealth}`}> {char.ac} </div>
            <div className={`${StyleCSS.characterhealthlabel}`}> AC </div>
          </div>

        </div>
        <div className={`${StyleCSS.characterbuttonrow}`}>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Str </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.str} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Dex </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.dex} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Con </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.con} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Wis </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.wis} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Int </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.intel} </div>
          </div>
          <div className={`${StyleCSS.characterstatwrap}`}>
            <div className={`${StyleCSS.characterstatlabel}`}> Cha </div>
            <div className={`${StyleCSS.characterstatvalue}`}> {char.cha} </div>
          </div>
        </div>
      </div>
    </button>
    </div>
  }