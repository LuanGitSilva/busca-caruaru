import styles from './Category.module.css';
import { categoryLinks } from '../../utils/category';
import Link from 'next/link';

export const Category = () => {
    return(
        <div className={styles.category}>
            <div className={styles.p}>
                <p>categorias</p>
            </div>
            <ul className={styles.container}>
                {categoryLinks.map((link, index)=>(
                    <li key={index}>
                        <Link href={link.path}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}