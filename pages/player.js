import { useEffect, useState } from "react"
import connectMongoDB from "@/libs/mongodb";
import Head from "next/head";
import PlayerPage from '@/components/story/player';
import React from'react';
import Character from "@/models/character";
import CharGroup from '@/models/chargroup';
import StyleCSS from '@/styles/general.module.css'

export default function PlayerUI({dbCharacters, chargroups}) {
    
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

	const fantasyCharacters = sortedCharacters.filter(sortedCharacters => sortedCharacters.work == undefined || sortedCharacters.work == 0)

	const fantasyGroups = sortedGroups.filter(sortedGroups => sortedGroups.work == undefined || sortedGroups.work == 0)

    return<>
    	<Head>
            <title>Journey Player</title>
            <meta name="description" content="The One who Journeys from Potential to Essence" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
            <link rel="icon" type="image/png" href="/favicon.png"></link>
        </Head>
        <div className={`${StyleCSS.aspectwrapper}`}>
            <PlayerPage activePage={1} dbCharacters={fantasyCharacters} chargroups={fantasyGroups}/>
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
	const chargroups = await CharGroup.find();

	
	return{
		props: {
			dbCharacters: JSON.parse(JSON.stringify(dbCharacters)),
			chargroups: JSON.parse(JSON.stringify(chargroups))
		}
	}
	}