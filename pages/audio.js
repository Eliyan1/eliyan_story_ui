import Flexstyle from '../styles/flexbox.module.css'
import AudioStyle from '../styles/audio.module.css'
import React, { useRef, useState } from'react';
import connectMongoDB from "@/libs/mongodb";
import Character from "@/models/character";
import StoryDB from "@/models/story";
import AudioDB from "@/models/audio"; 

export default function Audio({activePage, audios}) {

    const [currentSong, setCurrentSong] = useState([])
    const [volume, setVolume] = useState(100)
    const [playMin, setPlayMin] = useState('00')
    const [playSec, setPlaySec] = useState('00')
    const [totalMin, setTotalMin] = useState('00')
    const [TotalSec, setTotalSec] = useState('00')
    const [audioState, setAudioState] = useState(1)
    const [audioButtons, setAudioButtons] = useState([])

    const [audioTitle, setAudioTitle] = useState('')
    const [audioArtist, setAudioArtist] = useState('')
    const [audioTag, setAudioTag] = useState('')
    const [audioURL, setAudioURL] = useState('')

    const audioElem = useRef();
    const navRef = useRef();
    const volRef = useRef();


    const playMusic = () =>{
        audioElem.current.play();
    }

    const stopMusic = () =>{
        audioElem.current.volume=1;
        audioElem.current.pause();
        audioElem.current.currentTime = 0;
    }

    const pauseMusic = () =>{
        audioElem.current.pause();
    }

    const whilePlaying = () => {
        const duration = audioElem.current.duration;
        const ct = audioElem.current.currentTime;
        var songPlaySec = ct;

        while (songPlaySec >= 60) {songPlaySec = songPlaySec-60}
        Math.floor(songPlaySec)<10 ? setPlaySec('0'+ Math.floor(songPlaySec)) : setPlaySec(Math.floor(songPlaySec));
        Math.floor(ct/60)<10 ? setPlayMin('0'+ Math.floor(ct/60)) : setPlayMin(Math.floor(ct/60));

        setCurrentSong({...currentSong, "progress": ct / duration * 100, "length": duration})
    }

    const onPlay = () => {
        const duration = audioElem.current.duration;
        var songTotalSec = duration;

        while (songTotalSec >= 60) {songTotalSec = songTotalSec-60}
        Math.floor(songTotalSec)<10 ? setTotalSec('0'+ Math.floor(songTotalSec)) : setTotalSec(Math.floor(songTotalSec));        
        Math.floor(duration/60)<10 ? setTotalMin('0'+ Math.floor(duration/60)) : setTotalMin(Math.floor(duration/60));
    }

    const setAudioPosition = (e) => {
        if(audioElem.current.currentTime != 0) {
            let width = navRef.current.clientWidth;
            const offset = e.nativeEvent.offsetX;
    
            const divprogress = offset / width;
            audioElem.current.currentTime = divprogress  * currentSong.length;
        }
    }

    const setAudioVolume = (e) => {
        let width = volRef.current.clientWidth;
        const offset = e.nativeEvent.offsetX;
        const divvolume = offset / width;
        
        audioElem.current.volume = divvolume;
        setVolume(divvolume*100)
    }

    const createSong = async (e) => {
        e.preventDefault()

        await fetch('/api/audio/create',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title:    audioTitle,
                artist:   audioArtist,
                url:      audioURL,
                tag:      audioTag,
            }),
        });

        setAudioState(1)
    };

    const addAudioButton = ({e,audios}) => {
      e.preventDefault()
      const checkIfAdded = audioButtons.findIndex((audioButtons)=> audioButtons._id == audios._id)
      if (checkIfAdded == -1) {
        setAudioButtons([...audioButtons, audios])
        setAudioState(1)
      }else{
        alert("Song is already added")
      }
    }

    const buttonPlay =({e,audioButtons}) => {
        e.preventDefault();
        audioElem.current.pause();
        setCurrentSong(audioButtons);
        setTimeout(function () {audioElem.current.play()}, 1);
    }


    return <div className={`${Flexstyle.audiocontent}`} style={{display: activePage==2 ? "flex" : "none"}}>
    <div className={`${Flexstyle.container}`}>
        <div 
        className={`${Flexstyle.audiobox}`} 
        style={{display: audioState==1 ? "flex" : "none"}}>
            {audioButtons.map(audioButtons => (
            <div 
            className={`${AudioStyle.audiobutton}`} 
            key={audioButtons._id} 
            onClick={(e) => {buttonPlay({e, audioButtons})}}
            > 
                {audioButtons.tag}
            </div>
            ))}
        </div>

        <div className={`${Flexstyle.audiobox}`} style={{display: audioState==2 ? "flex" : "none"}}>
            <div className={`${AudioStyle.newaudiolist}`}>
                <div className={`${AudioStyle.newaudioentry}`}>
                    <div className={`${AudioStyle.newaudioname}`}> Title: </div>
                    <input className={`${AudioStyle.newaudioinput}`} onChange={(e) => setAudioTitle(e.target.value)}/>
                </div>
                <div className={`${AudioStyle.newaudioentry}`}>
                    <div className={`${AudioStyle.newaudioname}`}> Artist: </div>
                    <input className={`${AudioStyle.newaudioinput}`} onChange={(e) => setAudioArtist(e.target.value)}/>
                </div>
                <div className={`${AudioStyle.newaudioentry}`}>
                    <div className={`${AudioStyle.newaudioname}`}> Button Tag: </div>
                    <input className={`${AudioStyle.newaudioinput}`} onChange={(e) => setAudioTag(e.target.value)}/>
                </div>
                <div className={`${AudioStyle.newaudioentry}`}>
                    <div className={`${AudioStyle.newaudioname}`}> URL: </div>
                    <input className={`${AudioStyle.newaudioinput}`} onChange={(e) => setAudioURL(e.target.value)}/>
                </div>
                <button className={`${AudioStyle.newaudiobutton}`} onClick={createSong}> Add </button>
            </div>
        </div>

        <div className={`${Flexstyle.audiobox}`} style={{display: audioState==3 ? "flex" : "none"}}>
        <div className={`${AudioStyle.audiooptionheaderwrapper}`}>
            <div className={`${AudioStyle.audiooptionheader}`}> Select Song </div>
        </div>
        <div className={`${AudioStyle.audiooptionvalues}`}>
                <div className={`${AudioStyle.audiooptionartist}`}> Artist</div>
                <div className={`${AudioStyle.audiooptiontitle}`}> Title</div>
            </div>
            <div className={`${AudioStyle.audiooptionwrapper}`}>


                {audios.map(audios => (
                    <div 
                        className={`${AudioStyle.audiooption}`}
                        key={audios._id} 
                        onClick={(e) => {addAudioButton({e, audios})}}
                        >
                        <div className={`${AudioStyle.audiooptionartist}`}> {audios.artist}</div>
                        <div className={`${AudioStyle.audiooptiontitle}`}> {audios.title}</div>
                    </div>
                ))}
            </div>
        </div>

        <div className={`${Flexstyle.audioline}`}/>

        <div className={`${Flexstyle.audiocontrol}`}>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Save Layout</div>
            <div className={`${AudioStyle.audiocontrolbutton}`}>Load Layout</div>
            <div className={`${AudioStyle.audiocontrolspacer}`}></div>
            <div className={`${AudioStyle.audiocontrolbutton}`} onClick={()=>{setAudioState(2)}}>Add Song</div>
            <div className={`${AudioStyle.audiocontrolbutton}`} onClick={()=>{setAudioState(3)}}>Load Song</div>
            <div className={`${AudioStyle.audiocontrolspacer}`}></div>
            <div className={`${AudioStyle.audiocontrolbutton}`} onClick={()=>{setAudioState(1)}}>Open Youtube</div>
        </div>
    </div>



    <div className={`${Flexstyle.audiobar}`}>

        <div className={`${AudioStyle.audionavigation}`}>
            <div className={`${AudioStyle.audionavbar}`} onClick={setAudioPosition} ref={navRef}>
                <div className={`${AudioStyle.audioprog}`} style={{width: `${currentSong.progress+'%'}`}}/>
            </div>
        </div>
        <div className={`${AudioStyle.playtime}`}>
            <div className={`${AudioStyle.playmin}`}>{playMin}</div>
            :
            <div className={`${AudioStyle.playsec}`}>{playSec}</div>
            /
            <div className={`${AudioStyle.playmin}`}>{totalMin}</div>
            :
            <div className={`${AudioStyle.playsec}`}>{TotalSec}</div>
        </div>
        <div className={`${AudioStyle.audiovolume}`}>
            <div className={`${AudioStyle.audiovolumebar}`} onClick={setAudioVolume} ref={volRef}>
                <div className={`${AudioStyle.audiocurrentvolume}`} style={{width: `${volume+'%'}`}}/>
            </div>
        </div>
        <div className={`${AudioStyle.volumenumber}`}>
            {Math.ceil(volume)}
        </div>
    </div>

    <div className={`${Flexstyle.audiobar}`}>
        <audio 
        src={currentSong.url} 
        ref={audioElem}
        onTimeUpdate={whilePlaying}
        onPlaying={onPlay}
        />
        {/* <span id='current-time-audio' className='time'>0:00</span>
        <input type="range" id="seek-slider-audio" max="100" value="0"/>
        <span id='duration-audio' className='time'>0:00</span>
        <output id="volume-output">100</output>
        <input type="range" id="volume-slider" max="100" value="100"/> */}
    </div>

    <div className={`${Flexstyle.audiobuttonbar}`}>
        <button className={`${AudioStyle.audioplay}`} onClick={playMusic}/>
        <button className={`${AudioStyle.audiopause}`} onClick={pauseMusic}/>
        <button className={`${AudioStyle.audiostop}`}  onClick={stopMusic}/>
    </div>
    </div>;				
}

export const getServerSideProps = async () => {

	/**
	 * @param {import("next").NextApiRequest} req 
	 * @param {import("next").NextApiResponse} res 
	 */
	await connectMongoDB();
	const characters = await Character.find();
	const stories = await StoryDB.find();
	const audios = await AudioDB.find()
	
	return{
		props: {
			characters: JSON.parse(JSON.stringify(characters)),
			stories: JSON.parse(JSON.stringify(stories)),
			audios: JSON.parse(JSON.stringify(audios))
		}
	}
	}