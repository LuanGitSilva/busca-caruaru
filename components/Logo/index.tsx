import Link from 'next/link';
import styles from './Logo.module.css';
import SearchIcon from '@mui/icons-material/Search';

export const Logo = () => {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                <div className={styles.icon}>
                    <h1>BUSCA</h1>
                    <SearchIcon className={styles.image} />
                </div>
                <h1 className={styles.margin}>CARUARU</h1>
            </Link>
        </div>
    );
}