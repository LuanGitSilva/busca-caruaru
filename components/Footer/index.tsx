import styles from './Footer.module.css';
import { navigationLinks } from '../../utils/menu';
import Link from 'next/link';

export const Footer = () => {
    return (
        <div className={styles.container}>
            <ul>
                {navigationLinks.map((link, index)=>(
                    <li key={index}>
                        <Link href={link.path}>{link.label}</Link>
                    </li>
                ))}
            </ul>
            <div className={styles.information}>
                <p>O uso deste site está sujeito aos termos e condições do Termo de Uso e Política de privacidade.</p>
                <p>© Todos os direitos reservados.</p>
                <p>Criado por <Link href="https://www.instagram.com/codewithluan/" target="_blank">Luan Silva</Link>.</p>
            </div>
        </div>
    );
}