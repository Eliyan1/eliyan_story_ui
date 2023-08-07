import Flexstyle from '../styles/flexbox.module.css'
import Link from'next/link';
import UIcomp from '../styles/ui_components.module.css'
import React from'react';

export default function Audio() {
    return <>
    <div className={`${Flexstyle.visualcontainer}`}>
        <div className={`${Flexstyle.visualbox}`}>
            <div className={`${UIcomp.visualmain}`}/>
            <div className={`${Flexstyle.visualbar}`}>
                <div className={`${UIcomp.visualcontrolbutton}`}>Add Scene</div>
                <div className={`${UIcomp.visualcontrolbutton}`}>Save Scenes</div>
                <div className={`${UIcomp.visualcontrolbutton}`}>Load Scenes</div>
            </div>
        </div>

        <div className={`${Flexstyle.visualcontrol}`}>
            <div className={`${UIcomp.visualside4}`}/>
            <div className={`${UIcomp.visualside1}`}/>
            <div className={`${UIcomp.visualside2}`}/>
            <div className={`${UIcomp.visualside3}`}/>
        </div>
    </div>


    <div className={`${Flexstyle.container}`}>
        <div className={`${Flexstyle.headeritem}`}><Link href="/story">Story</Link></div>
        <div className={`${Flexstyle.headeritem}`}><Link href="/audio">Audio</Link></div>
        <div className={`${Flexstyle.headeritem}`}><Link href="/visual">Visual</Link></div>
    </div>
    </>
}