import StyleCSS from '@/styles/general.module.css'
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";
import Head from "next/head";

export default function ResetButton({dbCharacters}) {
    
    const resetDatabase = async () => {

        if (confirm('Are you sure you want to reset the current journey, losing all its settings?')) {
            await fetch('/api/viewer/update',{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: 'Default',
                    url: 'https://storage.googleapis.com/eliyan_multimedia/Images/Commissioned/Background%20BW.png',
                    currentTurn: [{hp:100, maxphp:100, uniquechar:0}],
                    initiatedChar: [{hp:100, maxphp:100, uniquechar:0, name:'Nothing Entered Yet'}],
                    villainMaxHP: 100,
                    villainCurrentHP: 100,
                    hpOverlay: false,
                    initiativeOverlay: false,
                    villainName: 'Enemy Forces',
                }),
            });

            for (let i=0; i < dbCharacters.length; i++) {
                if (dbCharacters[i].player == true && dbCharacters[i].active == 1) {
                    const response = await fetch(`/api/characters/update?id=${dbCharacters[i]._id}`,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            active:   0,
                        }),
                    });
                
                    if (!response.ok) {
                        throw new Error("Failed to edit the Character")
                    }
                }
            }     
          } else {
            // Do nothing!
          }
    }

    return<>
        <Head>
            <title>Journey Reset</title>
            <meta name="description" content="To Reset the Journey, making Room for the Next" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg"></link>
            <link rel="icon" type="image/png" href="/favicon.png"></link>
        </Head>
        <div className={`${StyleCSS.viewerwrapper}`}>
            <div className={`${StyleCSS.resetaspectwrapper}`}>
                <div className={`${StyleCSS.resetbutton}`} onClick={()=>{resetDatabase()}}> Reset </div>
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
    const dbCharacters = await Character.find();
    
    return{
        props: {
            dbCharacters: JSON.parse(JSON.stringify(dbCharacters))
        }
    }
    }