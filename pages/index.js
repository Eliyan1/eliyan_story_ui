import React from'react';
import Footer from '@/components/footer'
import Story from '@/components/story/story';
import { useState } from 'react';
import Audio from '@/components/audio/audio';
import Visual from '@/components/visual/visual'
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

export default function IndexPage({dbCharacters, stories, audios, visuals, audiolayouts, visuallayouts, chargroups}) {

	const [activePage, setActivePage] = useState(1)

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
	
	return <>
	<Head>
        <title>Journey Conductor</title>
        <meta name="description" content="To guide the Journey from potential to essence" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
		<link rel="icon" type="image/png" href="/favicon.png"></link>
    </Head>

	<div className={`${StyleCSS.aspectwrapper}`}>
		<Story activePage={activePage} dbCharacters={sortedCharacters} stories={stories} chargroups={sortedGroups}/>
		<Audio activePage={activePage} audios={audios} audiolayouts={audiolayouts}/>
		<Visual activePage={activePage} visuals={visuals} visuallayouts={visuallayouts}/>
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
	const audiolayouts = await AudioLayout.find();
	const visuallayouts = await VisualLayout.find();
	const chargroups = await CharGroup.find();

	
	return{
		props: {
			dbCharacters: JSON.parse(JSON.stringify(dbCharacters)),
			stories: JSON.parse(JSON.stringify(stories)),
			audios: JSON.parse(JSON.stringify(audios)),
			visuals: JSON.parse(JSON.stringify(visuals)),
			audiolayouts: JSON.parse(JSON.stringify(audiolayouts)),
			visuallayouts: JSON.parse(JSON.stringify(visuallayouts)),
			chargroups: JSON.parse(JSON.stringify(chargroups))
		}
	}
	}