import Flexstyle from '../styles/flexbox.module.css'
import VisualStyle from '../styles/visual.module.css'
import React, { useState } from'react';

export default function Visual({activePage}) {

    const [visualButtons, setVisualButtons] = useState([])

    return <div className={`${Flexstyle.visualcontainer}`} style={{display: activePage==3 ? "flex" : "none"}}> 
        <div className={`${Flexstyle.visualbox}`}>
            <div className={`${VisualStyle.visualmain}`}/>
            <div className={`${Flexstyle.visualbar}`}>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Add Scene</div>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Load Scene</div>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Save Setup</div>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Load Setup</div>
            </div>
        </div>

        <div className={`${Flexstyle.visualcontrol}`}>
            {visualButtons.map(visualButtons => (
            <div 
            className={`${VisualStyle.visualside1}`} 
            key={visualButtons._id} 
            // onClick={(e) => {buttonPlay({e, audioButtons})}}
            > 
                <div>Image Div</div>
                <dib>Portrait Border Div</dib>
            </div>
            ))}
            <div className={`${VisualStyle.visualside4}`}/>
            <div className={`${VisualStyle.visualside1}`}/>
            <div className={`${VisualStyle.visualside2}`}/>
            <div className={`${VisualStyle.visualside3}`}/>
        </div>
    </div>
}