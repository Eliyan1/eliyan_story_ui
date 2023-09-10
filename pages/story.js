import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'
import CharButton from '../components/charbutton'
import StorySlab from '../components/storyslab'
import Footer from '../components/footer'
import Link from 'next/link';
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";
import { useState } from 'react'
import CharSlab from '@/components/charslab';
	
export default function Story({characters})  {

	const [storySlab, setStorySlab] = useState(1)

	const {storyPanel, storyTitle, setTitle} = StorySlab()

	const changeName = (e) => {
		characters[0].name = e.target.value;
	}

	const {charPanel, setName} = CharSlab(changeName)
	
	const switchToChar = async (e, char) => {
	e.preventDefault();
	setName(char)
	setStorySlab(2);
	}



	const switchToStory = (e) => {
	e.preventDefault()
	setStorySlab(1)
	}

	return <>
		<div className={`${Flexstyle.container}`}>
			<div className={`${Flexstyle.storybox}`}>
				{storySlab == 1 && <>{storyPanel}</>}
				{storySlab == 2 && <>{charPanel}</>}
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
						cha: characters.cha,
						id: characters._id
					}} 
					charMenu={switchToChar}
					/>
					))}
				</div>
				<div> 
					<div className={`${StoryStyle.charactersavecolumn}`}>
      					<div className={`${StoryStyle.charactersaverow}`}>
        					<Link href={"/addchar"} className={`${StoryStyle.charactersavebutton}`}>Create Character</Link>
        					<div className={`${StoryStyle.charactersavebutton}`}>Roll Initiative</div>
      					</div>
						<div className={`${StoryStyle.charactersaverow}`}>
							<Link href={"/editchar"} className={`${StoryStyle.charactersavebutton}`}>Save Group</Link>
							<div onClick={switchToStory} className={`${StoryStyle.charactersavebutton}`}>Load Characters</div>
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
	const characters = await Character.find({"active":"true"});
	
	return{
		props: {
			characters: JSON.parse(JSON.stringify(characters))
		}
	}
	}