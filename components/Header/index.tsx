import { Logo } from '../Logo';
import { Navbar } from '../Navbar';
import styles from './Header.module.css';

export const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Logo />
                <Navbar />
            </div>
        </div>

    );
}