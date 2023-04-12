import Link from 'next/link';
import styles from './Logo.module.css';

export const Logo = () => {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <h1>BUSCA CARUARU</h1>
            </Link>
        </div>
    );
}