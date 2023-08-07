import React from'react';
import Link from'next/link';
import Flexstyle from '../styles/flexbox.module.css'
import UIcomp from '../styles/ui_components.module.css'
import CharButton from '../components/charbutton'
import StoryContent from '../components/storycontent'
import CharSaveLoad from '../components/charsaveload'
	
export default class extends React.Component {
	render() {
		return (
		<>
		<div className={`${Flexstyle.container}`}>
      		<div className={`${Flexstyle.storybox}`}>
				<StoryContent/>

				<div className={`${Flexstyle.storysaveload}`}>
					<div className={`${UIcomp.storysave}`}>Save</div>
					<div className={`${UIcomp.storyload}`}>Load</div>
				</div>
			</div>
			<div className={`${Flexstyle.characterwrap}`}>
				<div className={`${Flexstyle.characterbox}`}>
					<CharButton char={{name:'Grumgar'}} />
					<CharButton char={{name:'Lunynn'}} />
					<CharButton char={{name:'Raythor'}} />
					<CharButton char={{name:'Luke v.d. Bolt'}} />
					<CharButton char={{name:'Gary'}} />
				</div>
				<div> 
					<CharSaveLoad/>				
				</div>
			</div>

		</div>
		<div className={`${Flexstyle.container}`}>
			<div className={`${Flexstyle.headeritem}`}><Link href="/story">Story</Link></div>
			<div className={`${Flexstyle.headeritem}`}><Link href="/audio">Audio</Link></div>
			<div className={`${Flexstyle.headeritem}`}><Link href="/visual">Visual</Link></div>
		</div>
		</>
		)
	}
}
