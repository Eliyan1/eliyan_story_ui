import UIcomp from '../styles/story.module.css'

export default function CharacterButton({char}) {
    return <div className={`${UIcomp.characterbutton}`}> 
      <div className={`${UIcomp.characterbuttoncolumn}`}> 
      <div className={`${UIcomp.characterbuttonrow}`}>
          <div className={`${UIcomp.charactername}`}> {char.name} </div>
          <div className={`${UIcomp.characterhealthwrap}`}>
            <div className={`${UIcomp.characterhealth}`}> {char.hp} </div>
            <div className={`${UIcomp.characterhealthlabel}`}> HP </div>
          </div>
          <div className={`${UIcomp.characterhealthwrap}`}>
            <div className={`${UIcomp.characterhealth}`}> {char.ac} </div>
            <div className={`${UIcomp.characterhealthlabel}`}> AC </div>
          </div>

        </div>
        <div className={`${UIcomp.characterbuttonrow}`}>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Str </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.str} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Dex </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.dex} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Con </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.con} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Wis </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.wis} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Int </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.intel} </div>
          </div>
          <div className={`${UIcomp.characterstatwrap}`}>
            <div className={`${UIcomp.characterstatlabel}`}> Cha </div>
            <div className={`${UIcomp.characterstatvalue}`}> {char.cha} </div>
          </div>
        </div>
      </div>
    </div>
  }