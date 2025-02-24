import { useEffect, useState } from "react"
import StyleCSS from '@/styles/general.module.css'
import connectMongoDB from "@/libs/mongodb";
import ViewerDB from "@/models/viewer"
import Head from "next/head";

export default function Viewer() {
    
    const [displayImage, setDisplayImage] = useState('https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png')

    const updateDisplayImage = async () => {
        const response = await fetch('api/viewer/get',{
            method: 'GET'
        }).then(response => response.json()).then((response) => setDisplayImage(response.displayImage.url))
    }

    useEffect(() => {
        const interval = setInterval(() => {updateDisplayImage()}, 1000);
        return () => clearInterval(interval);
    }, [])

    return<>
    	<Head>
            <title>Journey Viewer</title>
            <meta name="description" content="To Visualize the Journey from Potential to Essence" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
            <link rel="icon" type="image/png" href="/favicon.png"></link>
        </Head>
        <div className={`${StyleCSS.viewerwrapper}`}>
            <img className={`${StyleCSS.viewer}`} src={displayImage}/>
            <div className={`${StyleCSS.viewercurrentturn}`}>Elise</div>
            <div className={`${StyleCSS.viewerupcomingturn}`}>Yuan</div>
            <div className={`${StyleCSS.viewerupcomingturn}`}>Raphael</div>
            <div className={`${StyleCSS.viewerupcomingturn}`}>Verena</div>
            <div className={`${StyleCSS.viewerupcomingturn}`}>Zombie</div>
            <div className={`${StyleCSS.baddiename}`}>Gazik, King of Pirates</div>
            <div className={`${StyleCSS.totalhealth}`}/>
            <div className={`${StyleCSS.baddiehealth}`}/>
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