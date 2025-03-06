import { useEffect, useState } from "react"
import StyleCSS from '@/styles/general.module.css'
import connectMongoDB from "@/libs/mongodb";
import ViewerDB from "@/models/viewer"
import Head from "next/head";

export default function Viewer() {
    
    const [displayImage, setDisplayImage] = useState('https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png')
    const [hpOverlay, setHPOverlay] = useState(false)
    const [initiativeOverlay, setInitiativeOverlay] = useState(false)
    const [activeChars, setActiveChars] = useState([{hp:100, maxphp:100, uniquechar:0}])
    const [currentTurn, setCurrentTurn] = useState([{hp:100, maxphp:100, uniquechar:0}])
    const [villainCurrentHP, setVillainCurrentHP] = useState(100)
    const [villainMaxHP, setVillainMaxHP] = useState(100)

    const updateDisplayImage = async () => {
        await fetch('api/viewer/get',{
            method: 'GET'
        }).then(response => response.json()).then((response) => updateUI(response))
    }

    const sortChar = (unsortedChar) => {
        while (unsortedChar.initiatedChar[0].uniquechar != unsortedChar.currentTurn[0].uniquechar){
            unsortedChar.initiatedChar.push(unsortedChar.initiatedChar.splice(unsortedChar.initiatedChar[0], 1)[0])
        }
        setActiveChars(unsortedChar.initiatedChar)
    }

    const updateUI = (response) => {
        setDisplayImage(response.displayImage.url)
        setHPOverlay(response.displayImage.hpOverlay)
        setInitiativeOverlay(response.displayImage.initiativeOverlay)
        setCurrentTurn(response.displayImage.currentTurn)
        sortChar(response.displayImage)
        setVillainCurrentHP(response.displayImage.villainCurrentHP)
        setVillainMaxHP(response.displayImage.villainMaxHP)
    }

    useEffect(() => {
        const interval = setInterval(() => {updateDisplayImage()}, 1000);
        return () => clearInterval(interval);
    }, [currentTurn, villainCurrentHP])

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
                    {activeChars.length > 0 && <div className={activeChars[0].hp > activeChars[0].maxhp*0.5 ? `${StyleCSS.viewercurrentturn}` : `${StyleCSS.viewercurrentturnhalf}`}>{activeChars[0].name}</div>}
                    {activeChars.length > 1 && <div className={activeChars[1].hp > activeChars[1].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[1].name}</div>}
                    {activeChars.length > 2 && <div className={activeChars[2].hp > activeChars[2].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[2].name}</div>}
                    {activeChars.length > 3 && <div className={activeChars[3].hp > activeChars[3].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[3].name}</div>}
                    {activeChars.length > 4 && <div className={activeChars[4].hp > activeChars[4].maxhp*0.5 ? `${StyleCSS.viewerupcomingturn}`: `${StyleCSS.viewerupcomingturnhalf}`}>{activeChars[4].name}</div>}
                </div>
                <div className={`${StyleCSS.baddiehpwrapper}`} style={{display: hpOverlay ? "flex" : "none"}}>
                    <div className={`${StyleCSS.baddiename}`}>Enemy Forces</div>
                    <div className={`${StyleCSS.totalhealth}`}/>
                    <div className={`${StyleCSS.baddiehealth}`} style={{width: `${villainCurrentHP/villainMaxHP*92}cqw`}}/>
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