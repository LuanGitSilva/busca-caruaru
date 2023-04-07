import { ReactElement } from 'react';
import styles from './Layout.module.css';
import { Header } from '../Header';
import { Footer } from '../Footer';

type Props = {
    children: ReactElement;
}

export const Layout = ({ children }:Props) => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Header />
            </header>

            <main className={styles.main}>
                
                {children}
            </main>

            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
}