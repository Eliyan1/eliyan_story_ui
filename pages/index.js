import React from'react';
import Head from 'next/head'
import Link from'next/link';
import Flexstyle from '../styles/flexbox.module.css'
import Image from 'next/image';
import UIcomp from '../styles/ui_components.module.css'
	
export default class extends React.Component {
	render() {
		return (
		<>
		<div className={`${Flexstyle.container}`}>
			<div className={`${Flexstyle.headeritem}`}><Link href="/story">Story</Link></div>
			<div className={`${Flexstyle.headeritem}`}><Link href="/story">Audio</Link></div>
			<div className={`${Flexstyle.headeritem}`}><Link href="/story">Visual</Link></div>
		</div>
		<div className={`${Flexstyle.container}`}>
      		<div className={`${Flexstyle.storybox}`}><Image href="../image/Stone_Story_Frame.png"/></div>
		</div>
		</>
		)
	}
}
