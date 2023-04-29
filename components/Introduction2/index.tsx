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
                        Como o Busca Caruaru Funciona?
                    </h2>
                    <p>
                        Nesta página inicial você verá algumas das notícias mais recentes da região para lhe deixar sempre informado dos acontecimentos mais relevantes.
                    </p>
                </div>
                <div className={styles.question} >
                    <h2 >
                        Como encontrar o lugar que estou procurando?
                    </h2>
                    <p>
                        Em nosso menu você terá acesso à página de locais, nela você poderar filtrar o local que você procura pelo nome, ao clicar no nome você terá acesso as informações sobre o local podendo ser serviços oferecidos, produtos vendidos, telefone para contato, endereço e até a localização via GoogleMaps.
                    </p>
                </div>

            </div>
            <div className={styles.btn}>
                <button onClick={()=>router.push('/category')}>Pesquisar</button>
            </div>
        </div>
    );
}

export default Introduction;