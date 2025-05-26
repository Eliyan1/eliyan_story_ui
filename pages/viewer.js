import { useEffect, useState } from "react"
import StyleCSS from '@/styles/general.module.css'
import connectMongoDB from "@/libs/mongodb";
import ViewerDB from "@/models/viewer"
import Head from "next/head";

export default function Viewer() {
    
    const [displayImage, setDisplayImage] = useState('https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png')
    const [hpOverlay, setHPOverlay] = useState(false)
    const [initiativeOverlay, setInitiativeOverlay] = useState(false)
    const [activeChars, setActiveChars] = useState([{hp:100, maxhp:100, uniquechar:0, name:'Nothing Entered Yet'}])
    const [currentTurn, setCurrentTurn] = useState([{hp:100, maxhp:100, uniquechar:0}])
    const [villainCurrentHP, setVillainCurrentHP] = useState(100)
    const [villainMaxHP, setVillainMaxHP] = useState(100)
    const [villainName, setVillainName] = useState('Enemy Forces')

    const updateDisplayImage = async () => {
        await fetch('api/viewer/get',{
            method: 'GET'
        }).then(response => response.json()).then((response) => updateUI(response))
    }

    const sortChar = (unsortedChar) => {
        while (unsortedChar.initiatedChar[0].uniquechar != unsortedChar.currentTurn[0].uniquechar){
            unsortedChar.initiatedChar.push(unsortedChar.initiatedChar.splice(unsortedChar.initiatedChar[0], 1)[0])
        }
        const beforeTurnOrder = JSON.stringify(activeChars)
        const afterTurnOrder = JSON.stringify(unsortedChar.initiatedChar)
        if (beforeTurnOrder != afterTurnOrder){setActiveChars(unsortedChar.initiatedChar); console.log('Updated Turn Order')}
    }

    const updateUI = (response) => {
        console.log('Updating...')
        const beforeCurrentTurn = JSON.stringify(currentTurn)
        const afterCurrentTurn = JSON.stringify(response.displayImage.currentTurn)
        if(displayImage != response.displayImage.url){setDisplayImage(response.displayImage.url); console.log('Updated Image')}
        if(hpOverlay != response.displayImage.hpOverlay){setHPOverlay(response.displayImage.hpOverlay); console.log ('Updated Boss Health Bar')}
        if(initiativeOverlay != response.displayImage.initiativeOverlay){setInitiativeOverlay(response.displayImage.initiativeOverlay); console.log('Updated Initiative Visibility')}
        if(beforeCurrentTurn != afterCurrentTurn){setCurrentTurn(response.displayImage.currentTurn); console.log('Updated Turn')}
        if(response.displayImage.initiatedChar.length>0) {sortChar(response.displayImage)}
        if(villainCurrentHP != response.displayImage.villainCurrentHP) {setVillainCurrentHP(response.displayImage.villainCurrentHP); console.log('Updated Villain HP')}
        if(villainMaxHP != response.displayImage.villainMaxHP){setVillainMaxHP(response.displayImage.villainMaxHP); console.log(villainMaxHP)}
        if(villainName != response.displayImage.villainName) {setVillainName(response.displayImage.villainName) ; console.log('Updated Villain Name')}
    }

    useEffect(() => {
        console.log('Starting Operations')
        const interval = setInterval(() => {updateDisplayImage()}, 1000);
        return () => clearInterval(interval);
    }, [currentTurn, villainCurrentHP, villainMaxHP, villainName, activeChars, displayImage, hpOverlay, initiativeOverlay])

    return<>
    	<Head>
            <title>Journey Viewer</title>
            <meta name="description" content="To Visualize the Journey from Potential to Essence" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
            <link rel="icon" type="image/png" href="/favicon.png"></link>
        </Head>
        <div className={`${StyleCSS.viewerwrapper}`}>
            <div className={`${StyleCSS.vieweraspectwrapper}`}>
                <img className={`${StyleCSS.viewer}`} src={displayImage}/>
                <div className={`${StyleCSS.initiativewrapper}`} style={{display: initiativeOverlay ? "flex" : "none"}}>
                    {activeChars.length > 0 && activeChars[0].name != 'Nothing Entered Yet' && <div className={activeChars[0].hp > activeChars[0].maxhp*0.5 ? `${StyleCSS.viewercurrentturn}` : `${StyleCSS.viewercurrentturnhalf}`}>{activeChars[0].name}</div>}
                    {activeChars.length > 1 && <div className={activeChars[1].hp > activeChars[1].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[1].name}</div>}
                    {activeChars.length > 2 && <div className={activeChars[2].hp > activeChars[2].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[2].name}</div>}
                    {activeChars.length > 3 && <div className={activeChars[3].hp > activeChars[3].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[3].name}</div>}
                    {activeChars.length > 4 && <div className={activeChars[4].hp > activeChars[4].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[4].name}</div>}
                </div>
                <div className={`${StyleCSS.baddiehpwrapper}`} style={{display: hpOverlay ? "flex" : "none"}}>
                    <div className={`${StyleCSS.baddiename}`}>{villainName}</div>
                    <div className={`${StyleCSS.totalhealth}`}/>
                    <div className={`${StyleCSS.baddiehealth}`} style={{width: `${villainCurrentHP/(villainMaxHP+0.000001)*92}cqw`}}/>
                </div>
            </div>
        </div>
        
    </>
}

export const getServerSideProps = async () => {

	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const viewerDB = await ViewerDB.find();
	
	return{
		props: {
			viewerDB: JSON.parse(JSON.stringify(viewerDB))
		}
	}
	}