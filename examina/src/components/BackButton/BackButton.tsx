'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from './BackButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    if (pathname === '/') return null;

    return <button className={styles.button} onClick={() => router.push('/')}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '0.5rem' }} />
        home
    </button>

}
