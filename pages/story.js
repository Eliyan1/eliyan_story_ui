import Flexstyle from '../styles/flexbox.module.css'
import StoryStyle from '../styles/story.module.css'
import CharButton from '../components/charbutton'
import StorySlab from '../components/storyslab'
import Footer from '../components/footer'
import Link from 'next/link';
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";
import StoryDB from "@/models/story";
import { useState } from 'react';
import CharSlab from '@/components/charslab';
import CharLoad from '@/components/charload';
import StoryLoad from '@/components/storyload';
import InitiativeTracker from '@/components/initiativetracker'
	
export default function Story({characters, stories})  {

	const [storySlab, setStorySlab] = useState(1)

	const [activeStoryContent, setActiveStoryContent] = useState("") 
	const [activeStoryTitle, setActiveStoryTitle] = useState("Title of Adventure")
	
	const [activeChars, setActiveChars] = useState([])

	const {charPanel, populateActiveCharacter} = CharSlab(activeChars, setStorySlab)

	
	const checkStoryPresent = () => {
		console.log(stories.findIndex((stories)=> stories.title == activeStoryTitle))
		return stories.findIndex((stories)=> stories.title == activeStoryTitle)
	}

	const saveStory = async (storyIndex, content) => {
		const res = await fetch(`/api/story/update?id=${stories[storyIndex]._id}`,{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title:		activeStoryTitle,
				content:	content
			}),
		});
		stories[storyIndex].content=content;
		console.log (activeStoryTitle);
	}

	const removeActiveChar =  (charID) => {
		characters[characters.findIndex((characters)=> characters._id == charID)].active=false
		setActiveChars(characters.filter((characters)=> characters.active == true))
		console.log(activeChars)
	}
	
	const switchToChar = async (e, char) => {
	e.preventDefault();
	const activeCharIndex = activeChars.findIndex((activeChars)=> activeChars.init == char.init)
	populateActiveCharacter(activeCharIndex)
	await setStorySlab(0); //necessary to update the notes of the character
	setStorySlab(2);
	}

	return <div className={`${Flexstyle.aspectwrapper}`}>
		<div className={`${Flexstyle.maincontent}`}>
			<div className={`${Flexstyle.storybox}`}>
				{storySlab == 1 && 
				<StorySlab 
				activeStoryTitle={activeStoryTitle} 
				activeStoryContent={activeStoryContent} 
				setActiveStoryTitle={setActiveStoryTitle} 
				setStorySlab={setStorySlab}
				checkStoryPresent={checkStoryPresent}
				saveStory={saveStory}
				/>}

				{storySlab == 2 && <>{charPanel}</>}

				{storySlab == 3 && 
				<CharLoad 
					characters={characters} 
					setActiveChars={setActiveChars} 
					activeChars={activeChars} 
					setStorySlab={setStorySlab}
				/>}

				{storySlab == 4 && 
				<StoryLoad 
					stories={stories} 
					setActiveStoryContent={setActiveStoryContent} 
					setActiveStoryTitle={setActiveStoryTitle} 
					setStorySlab={setStorySlab}
				/>}

				{storySlab == 5 && 
				<InitiativeTracker 
					activeChars={activeChars} 
					setStorySlab={setStorySlab}
					setActiveChars={setActiveChars}
					populateActiveCharacter={populateActiveCharacter}
				/>}

	  		</div>
			
			<div className={`${Flexstyle.characterwrap}`}>
				<div className={`${Flexstyle.characterbox}`}>
					{activeChars.map(activeChars => (
					<CharButton key={activeChars.init} char={
						{name:activeChars.name, 
						hp:activeChars.hp,
						temphp:activeChars.temphp, 
						ac:activeChars.ac, 
						str:activeChars.str,
						dex:activeChars.dex,
						con:activeChars.con,
						intel:activeChars.intel,
						wis: activeChars.wis,
						cha: activeChars.cha,
						_id: activeChars._id,
						active: activeChars.active,
						init: activeChars.init
					}} 
					charMenu = {switchToChar}
					removeActiveChar = {removeActiveChar}
					/>
					))}
				</div>
				<div> 
					<div className={`${StoryStyle.charactersavecolumn}`}>
      					<div className={`${StoryStyle.charactersaverow}`}>
        					<Link href={"/addchar"} className={`${StoryStyle.charactersavebutton}`}>Create Character</Link>
        					<div onClick={()=>{setStorySlab(5)}} className={`${StoryStyle.charactersavebutton}`}>Roll Initiative</div>
      					</div>
						<div className={`${StoryStyle.charactersaverow}`}>
							<div className={`${StoryStyle.charactersavebutton}`}>Save Group</div>
							<div onClick={()=>{setStorySlab(3)}} className={`${StoryStyle.charactersavebutton}`}>Load Characters</div>
						</div>
					</div>			
				</div>
			</div>

		</div>
		
		<Footer/>
	</div>
}

export const getServerSideProps = async () => {

	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const characters = await Character.find();
	const stories = await StoryDB.find();
	
	return{
		props: {
			characters: JSON.parse(JSON.stringify(characters)),
			stories: JSON.parse(JSON.stringify(stories))
		}
	}
	}