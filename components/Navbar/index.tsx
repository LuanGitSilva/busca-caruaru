import styles from './Navbar.module.css';
import { navigationLinks } from '../../utils/menu';
import Link from 'next/link';

export const Navbar = () => {
    return (
        <ul className={styles.container}>
            {navigationLinks.map((link, index)=>(
                <li key={index}>
                    <Link className='li' href={link.path}>{link.label}</Link>
                </li>
            ))}
        </ul>
    );
}