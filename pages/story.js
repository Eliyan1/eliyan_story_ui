import React from'react';
import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'
import CharButton from '../components/charbutton'
import StoryContent from '../components/storycontent'
import Footer from '../components/footer'
	
export default function Story()  {
	return <>
		<div className={`${Flexstyle.container}`}>
      		<div className={`${Flexstyle.storybox}`}>
				<StoryContent/>

				<div className={`${Flexstyle.storysaveload}`}>
					<div className={`${StoryStyle.storysave}`}>Save</div>
					<div className={`${StoryStyle.storyload}`}>Load</div>
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
					<div className={`${StoryStyle.charactersavecolumn}`}>
      					<div className={`${StoryStyle.charactersaverow}`}>
        					<div className={`${StoryStyle.charactersavebutton}`}>Create Character</div>
        					<div className={`${StoryStyle.charactersavebutton}`}>Roll Initiative</div>
      					</div>
						<div className={`${StoryStyle.charactersaverow}`}>
							<div className={`${StoryStyle.charactersavebutton}`}>Save Characters</div>
							<div className={`${StoryStyle.charactersavebutton}`}>Load Characters</div>
						</div>
					</div>			
				</div>
			</div>

		</div>
		
		<Footer/>
	</>
}
