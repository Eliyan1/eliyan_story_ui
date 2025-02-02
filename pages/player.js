import { useEffect, useState } from "react"
import connectMongoDB from "@/libs/mongodb";
import Head from "next/head";
import PlayerPage from '@/components/story/player';
import React from'react';
import Character from "@/models/character";
import StoryDB from "@/models/story";
import AudioDB from "@/models/audio"; 
import VisualDB from "@/models/visual";
import AudioLayout from '@/models/audiolay';
import VisualLayout from '@/models/visuallay';
import CharGroup from '@/models/chargroup';
import StyleCSS from '@/styles/general.module.css'

export default function PlayerUI({dbCharacters, stories, audios, visuals, audiolayouts, visuallayouts, chargroups}) {
    
    const [displayImage, setDisplayImage] = useState('https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png')

    const updateDisplayImage = async () => {
        const response = await fetch('api/viewer/get',{
            method: 'GET'
        }).then(response => response.json()).then((response) => setDisplayImage(response.displayImage.url))
    }

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

    useEffect(() => {
        const interval = setInterval(() => {updateDisplayImage()}, 1000);
        return () => clearInterval(interval);
    }, [])

    return<>
    	<Head>
            <title>Journey Player</title>
            <meta name="description" content="The Journeyer from potential to essence" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
            <link rel="icon" type="image/png" href="/favicon.png"></link>
        </Head>
        <div className={`${StyleCSS.aspectwrapper}`}>
            <PlayerPage activePage={1} dbCharacters={sortedCharacters} stories={stories} chargroups={sortedGroups}/>
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