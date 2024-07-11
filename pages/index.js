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
import VisualDB from "@/models/visual";
import AudioLayoutDB from '@/models/audioLayout';
import VisualLayoutDB from '@/models/visualLayout';
	
export default function IndexPage({dbCharacters, stories, audios, visuals, audioLayouts, visualLayouts}) {

	const [activePage, setActivePage] = useState(1)
	


	return <div className={`${Flexstyle.aspectwrapper}`}>
		<Story activePage={activePage} dbCharacters={dbCharacters} stories={stories}/>
		<Audio activePage={activePage} audios={audios} audiolayouts={audioLayouts}/>
		<Visual activePage={activePage} visuals={visuals} visuallayouts={visualLayouts}/>
		<Footer setActivePage={setActivePage}/>	
	</div>
}


export const getServerSideProps = async () => {

	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const dbCharacters = await Character.find();
	const stories = await StoryDB.find();
	const audios = await AudioDB.find();
	const visuals = await VisualDB.find();
	const audioLayouts = await AudioLayoutDB.find();
	const visualLayouts = await VisualLayoutDB.find();

	
	return{
		props: {
			dbCharacters: JSON.parse(JSON.stringify(dbCharacters)),
			stories: JSON.parse(JSON.stringify(stories)),
			audios: JSON.parse(JSON.stringify(audios)),
			visuals: JSON.parse(JSON.stringify(visuals)),
			audioLayouts: JSON.parse(JSON.stringify(audioLayouts)),
			visualLayouts: JSON.parse(JSON.stringify(visualLayouts)),
		}
	}
	}