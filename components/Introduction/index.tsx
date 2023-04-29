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
        <div data-aos='fade-up'>
            <div className={styles.container}>
                <div className={styles.question} >
                    <h2 >
                        O que posso encontrar no Busca Caruaru?
                    </h2>
                    <p>
                        Aqui você fica por dentro das notícias mais recentes de Caruaru e ainda consegue encontrar locais, produtos ou serviços que você esteja procurando.
                    </p>
                </div>
                <div className={styles.boxeContainer} >
                    <div className={styles.boxes}>
                        <div className={styles.box}>Serviços públicos</div>
                        <div className={styles.box}>Serviços</div>
                        <div className={styles.box}>Produtos</div>
                        <div className={styles.box}>Notícias</div>
                        <div className={styles.box}>Festas</div>
                        <div className={styles.box}>Turismo</div>
                        <div className={styles.box}>Todos os locais</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Introduction;