import Flexstyle from '../styles/flexbox.module.css'
import VisualStyle from '../styles/visual.module.css'
import React from'react';
import Footer from '../components/footer'

export default function Audio() {
    return <>
    <div className={`${Flexstyle.visualcontainer}`}>
        <div className={`${Flexstyle.visualbox}`}>
            <div className={`${VisualStyle.visualmain}`}/>
            <div className={`${Flexstyle.visualbar}`}>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Add Scene</div>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Save Scenes</div>
                <div className={`${VisualStyle.visualcontrolbutton}`}>Load Scenes</div>
            </div>
        </div>

        <div className={`${Flexstyle.visualcontrol}`}>
            <div className={`${VisualStyle.visualside4}`}/>
            <div className={`${VisualStyle.visualside1}`}/>
            <div className={`${VisualStyle.visualside2}`}/>
            <div className={`${VisualStyle.visualside3}`}/>
        </div>
    </div>


    <Footer/>
    </>
}