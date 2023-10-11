import { useEffect, useState } from "react"
import Visualstyle from '../styles/visual.module.css'
import connectMongoDB from "@/libs/mongodb";
import ViewerDB from "@/models/viewer"

export default function Viewer() {
    
    const [displayImage, setDisplayImage] = useState('https://storage.cloud.google.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png')

    const updateDisplayImage = async () => {
        const response = await fetch('api/viewer/get',{
            method: 'GET'
        }).then(response => response.json()).then((response) => setDisplayImage(response.displayImage.url))
    }

    useEffect(() => {
        const interval = setInterval(() => {updateDisplayImage()}, 1500);
        return () => clearInterval(interval);
    }, [])

    return<img 
    className={`${Visualstyle.viewer}`} 
    src={displayImage} 
    onClick={console.log(displayImage)}/>
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