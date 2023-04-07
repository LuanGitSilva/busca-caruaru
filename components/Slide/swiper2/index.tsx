import styles from './Swiper1.module.css';
import Image from 'next/image';
import Img1 from '../image/popcorn.png';

const Swiper2 = () => {
    return (
        <div className={styles.swiper1}>
            <div className={styles.text1}>
                <h3>
                    Experimente nossas pipocas amanteigadas.
                </h3>
                <button>Fazer pedido</button>
            </div>
            <div className={styles.image}>
                <Image src={Img1} alt='' />
            </div>
            <div className={styles.text2}>
                <h2>
                    PC
                </h2>
                <h3>
                    Pipocas Caruaru
                </h3>
            </div>
        </div>
    );
}

export default Swiper2;