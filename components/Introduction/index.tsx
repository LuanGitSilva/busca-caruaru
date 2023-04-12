import router from "next/router";
import styles from "./Introduction.module.css";
import { useState, useEffect } from "react";

const Introduction = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const [top, setTop] = useState(false);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollTop(position);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if(scrollTop >= 160) {
          setTop(true);
        } else {
          setTop(false);
        }
      }, [scrollTop]);

    return (
        <div className={styles.container}>
            <div data-aos='fade-up' className={styles.question1} >
                <h2 >
                    Como o Busca Caruaru Funciona?
                </h2>
            </div>
            <div data-aos='fade-up' className={styles.question2} >
                <h2 >
                    Como encontrar o lugar que estou procurando?
                </h2>
            </div>

            <div className={styles.btn} data-aos='fade-up'>
                <button onClick={()=>router.push('/category')}>Pesquisar</button>
            </div>
        </div>
    );
}

export default Introduction;