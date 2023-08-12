import Flexstyle from '../styles/flexbox.module.css'
import AudioStyle from '../styles/audio.module.css'
import React from'react';
import Footer from '../components/footer'

export default function Audio() {
    return <>
    <div className={`${Flexstyle.container}`}>
        <div className={`${Flexstyle.audiobox}`}>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
            <div className={`${AudioStyle.audiobutton}`}>Audio Button</div>
        </div>

        <div className={`${Flexstyle.audioline}`}/>

        <div className={`${Flexstyle.audiocontrol}`}>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Save Layout</div>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Load Layout</div>
            <div className={`${AudioStyle.audiocontrolspacer}`}></div>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Open Audio</div>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Make Button</div>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Reassign Button</div>
            <div className={`${AudioStyle.audiocontrolspacer}`}></div>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Open Youtube</div>
        </div>
    </div>

    <div className={`${Flexstyle.container}`}>
        <div className={`${AudioStyle.audiobar}`}/>
    </div>

    <div className={`${Flexstyle.audiobar}`}>
        <div className={`${AudioStyle.audioplay}`}/>
        <div className={`${AudioStyle.audiopause}`}/>
        <div className={`${AudioStyle.audiostop}`}/>
    </div>

    
    <Footer/>
    </>;				
    }