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
	
export default function Story({characters, stories})  {

	const [storySlab, setStorySlab] = useState(1)

	const [activeStoryContent, setActiveStoryContent] = useState("") 
	const [activeStoryTitle, setActiveStoryTitle] = useState("Title of Adventure") 

	const {charPanel, populateActiveCharacter} = CharSlab(characters)

	const [activeChar, setActiveChars] = useState(characters.filter((characters)=> characters.active == true))
	
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
		console.log(activeChar)
	}
	
	const switchToChar = async (e, char) => {
	e.preventDefault();
	const activeCharIndex = characters.findIndex((characters)=> characters._id == char._id)
	console.log(characters.filter((characters)=> characters.active == true));
	populateActiveCharacter(activeCharIndex)
	setStorySlab(2);
	setActiveChars(characters.filter((characters)=> characters.active == true))
	console.log(activeChar)
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
				{storySlab == 3 && <CharLoad characters={characters} setActiveChars={setActiveChars}/>}
				{storySlab == 4 && <StoryLoad stories={stories} setActiveStoryContent={setActiveStoryContent} setActiveStoryTitle={setActiveStoryTitle} setStorySlab={setStorySlab}/>}
	  		</div>
			
			<div className={`${Flexstyle.characterwrap}`}>
				<div className={`${Flexstyle.characterbox}`}>
					{activeChar.map(characters => (
					<CharButton key={characters._id} char={
						{name:characters.name, 
						hp:characters.hp,
						temphp:characters.temphp, 
						ac:characters.ac, 
						str:characters.str,
						dex:characters.dex,
						con:characters.con,
						intel:characters.intel,
						wis: characters.wis,
						cha: characters.cha,
						_id: characters._id,
						active: characters.active
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
        					<div onClick={()=>{setStorySlab(1)}} className={`${StoryStyle.charactersavebutton}`}>Roll Initiative</div>
      					</div>
						<div className={`${StoryStyle.charactersaverow}`}>
							<Link href={"/editchar"} className={`${StoryStyle.charactersavebutton}`}>Save Group</Link>
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