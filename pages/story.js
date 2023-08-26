import React from'react';
import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'
import CharButton from '../components/charbutton'
import StoryContent from '../components/storycontent'
import Footer from '../components/footer'
import Link from 'next/link';
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";


	
export default function Story({characters})  {
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
					{characters.map(characters => (
					<CharButton key={characters._id} char={
						{name:characters.name, 
						hp:characters.hp, 
						ac:characters.ac, 
						str:characters.str,
						dex:characters.dex,
						con:characters.con,
						intel:characters.intel,
						wis: characters.wis,
						cha: characters.cha
					}}/>
					))}
				</div>
				<div> 
					<div className={`${StoryStyle.charactersavecolumn}`}>
      					<div className={`${StoryStyle.charactersaverow}`}>
        					<Link href={"/addchar"} className={`${StoryStyle.charactersavebutton}`}>Create Character</Link>
        					<div className={`${StoryStyle.charactersavebutton}`}>Roll Initiative</div>
      					</div>
						<div className={`${StoryStyle.charactersaverow}`}>
							<Link href={"/editchar"} className={`${StoryStyle.charactersavebutton}`}>Edit Characters</Link>
							<div className={`${StoryStyle.charactersavebutton}`}>Load Characters</div>
						</div>
					</div>			
				</div>
			</div>

		</div>
		
		<Footer/>
	</>
}

export const getServerSideProps = async () => {

	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const characters = await Character.find();
	
	return{
		props: {
			characters: JSON.parse(JSON.stringify(characters))
		}
	}
	}