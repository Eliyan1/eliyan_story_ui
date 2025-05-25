import React from'react';
import Footer from '@/components/footer'
import Story from '@/components/story/story';
import { useState } from 'react';
import Audio from '@/components/audio/audio';
import Visual from '@/components/visual/visual'
import ViewerDB from "@/models/viewer"
import StyleCSS from '@/styles/general.module.css'
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";
import StoryDB from "@/models/story";
import AudioDB from "@/models/audio"; 
import VisualDB from "@/models/visual";
import AudioLayout from '@/models/audiolay';
import VisualLayout from '@/models/visuallay';
import CharGroup from '@/models/chargroup';
import Head from 'next/head';

export default function IndexPage({dbCharacters, stories, audios, visuals, viewerDB, audiolayouts, visuallayouts, chargroups}) {

	const [activePage, setActivePage] = useState(1)
	const [activeChars, setActiveChars] = useState([])
	const [combatActive, setCombatActive] = useState(false)
	const work = 0


	const sortedCharacters = dbCharacters.sort(function(a,b) {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	const sortedGroups = chargroups.sort(function(a,b) {
		var textA = a.name.toUpperCase();
		var textB = b.name.toUpperCase();
		return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});

	const fantasyStories = stories.filter((stories) => stories.work == undefined || stories.work == 0)

	const fantasyCharacters = sortedCharacters.filter((sortedCharacters) => sortedCharacters.work == undefined || sortedCharacters.work == 0)

	const fantasyGroups = sortedGroups.filter((sortedGroups) => sortedGroups.work == undefined || sortedCharacters.work == 0)
	
	return <>
	<Head>
        <title>Journey Shaper</title>
        <meta name="description" content="To Shape the Journey from Potential to Essence" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
		<link rel="icon" type="image/png" href="/favicon.png"></link>
    </Head>

	<div className={`${StyleCSS.aspectwrapper}`}>
		<Story 
		activePage={activePage} 
		dbCharacters={fantasyCharacters} 
		stories={fantasyStories} 
		chargroups={fantasyGroups} 
		activeChars={activeChars} 
		setActiveChars={setActiveChars}
		combatActive={combatActive} 
		setCombatActive={setCombatActive}
		work = {work}
		/>

		<Audio 
		activePage={activePage} 
		audios={audios} 
		audiolayouts={audiolayouts}
		/>

		<Visual 
		activePage={activePage} 
		visuals={visuals}
		viewerDB={viewerDB} 
		visuallayouts={visuallayouts} 
		activeChars={activeChars}
		combatActive={combatActive} 
		/>
		
		<Footer setActivePage={setActivePage}/>	
	</div>
	</>
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
	const viewerDB = await ViewerDB.find();
	const audiolayouts = await AudioLayout.find();
	const visuallayouts = await VisualLayout.find();
	const chargroups = await CharGroup.find();

	
	return{
		props: {
			dbCharacters: JSON.parse(JSON.stringify(dbCharacters)),
			stories: JSON.parse(JSON.stringify(stories)),
			audios: JSON.parse(JSON.stringify(audios)),
			visuals: JSON.parse(JSON.stringify(visuals)),
			viewerDB: JSON.parse(JSON.stringify(viewerDB)),
			audiolayouts: JSON.parse(JSON.stringify(audiolayouts)),
			visuallayouts: JSON.parse(JSON.stringify(visuallayouts)),
			chargroups: JSON.parse(JSON.stringify(chargroups))
		}
	}
	}