import Flexstyle from '../styles/flexbox.module.css'
import Link from'next/link';

export default function Footer() {
    return <div className={`${Flexstyle.container}`}>
        <div className={`${Flexstyle.footeritem}`}><Link href="/story">Story</Link></div>
        <div className={`${Flexstyle.footeritem}`}><Link href="/audio">Audio</Link></div>
        <div className={`${Flexstyle.footeritem}`}><Link href="/visual">Visual</Link></div>
    </div>
}