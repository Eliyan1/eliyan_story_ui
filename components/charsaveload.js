import UIcomp from '../styles/ui_components.module.css'

export default function CharacterSaveLoad() {
    return <div className={`${UIcomp.charactersavecolumn}`}>
      <div className={`${UIcomp.charactersaverow}`}>
        <div className={`${UIcomp.charactersavebutton}`}>Create Character</div>
        <div className={`${UIcomp.charactersavebutton}`}>Roll Initiative</div>
      </div>
      <div className={`${UIcomp.charactersaverow}`}>
        <div className={`${UIcomp.charactersavebutton}`}>Save Characters</div>
        <div className={`${UIcomp.charactersavebutton}`}>Load Characters</div>
      </div>
    </div>
  }