import React from'react';
import Footer from '../components/footer'
import Story from './story';
import { useState } from 'react';
import Audio from './audio';
import Visual from './visual'
import Flexstyle from '../styles/flexbox.module.css'
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";
import StoryDB from "@/models/story";
import AudioDB from "@/models/audio"; 
	
export default function IndexPage({characters, stories, audios}) {
		const [activePage, setActivePage] = useState(1)

		return (<div className={`${Flexstyle.aspectwrapper}`}>
		<Story activePage={activePage} characters={characters} stories={stories}/>
		<Audio activePage={activePage} audios={audios}/>
		<Visual activePage={activePage}/>
		<Footer setActivePage={setActivePage}/>	
		</div>

		)
}


export const getServerSideProps = async () => {

	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const characters = await Character.find();
	const stories = await StoryDB.find();
	const audios = await AudioDB.find()
	
	return{
		props: {
			characters: JSON.parse(JSON.stringify(characters)),
			stories: JSON.parse(JSON.stringify(stories)),
			audios: JSON.parse(JSON.stringify(audios))
		}
	}
	}