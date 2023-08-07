import Flexstyle from '../styles/flexbox.module.css'
import Link from'next/link';
import UIcomp from '../styles/ui_components.module.css'
import React from'react';

export default function Audio() {
    return <>
    <div className={`${Flexstyle.container}`}>
        <div className={`${Flexstyle.audiobox}`}>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
            <div className={`${UIcomp.audiobutton}`}>Audio Button</div>
        </div>

        <div className={`${Flexstyle.audioline}`}/>

        <div className={`${Flexstyle.audiocontrol}`}>
            <div className={`${UIcomp.audiocontrolbutton}`}>Save Layout</div>
            <div className={`${UIcomp.audiocontrolbutton}`}>Load Layout</div>
            <div className={`${UIcomp.audiocontrolspacer}`}></div>
            <div className={`${UIcomp.audiocontrolbutton}`}>Open Audio</div>
            <div className={`${UIcomp.audiocontrolbutton}`}>Make Button</div>
            <div className={`${UIcomp.audiocontrolbutton}`}>Reassign Button</div>
            <div className={`${UIcomp.audiocontrolspacer}`}></div>
            <div className={`${UIcomp.audiocontrolbutton}`}>Open Youtube</div>
        </div>
    </div>

    <div className={`${Flexstyle.container}`}>
        <div className={`${UIcomp.audiobar}`}/>
    </div>

    <div className={`${Flexstyle.audiobar}`}>
        <div className={`${UIcomp.audioplay}`}/>
        <div className={`${UIcomp.audiopause}`}/>
        <div className={`${UIcomp.audiostop}`}/>
    </div>

    <div className={`${Flexstyle.container}`}>
        <div className={`${Flexstyle.headeritem}`}><Link href="/story">Story</Link></div>
        <div className={`${Flexstyle.headeritem}`}><Link href="/audio">Audio</Link></div>
        <div className={`${Flexstyle.headeritem}`}><Link href="/visual">Visual</Link></div>
    </div>
    </>;				
    }