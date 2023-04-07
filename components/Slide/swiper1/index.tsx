import styles from './Swiper1.module.css';
import Image from 'next/image';
import Img1 from '../image/remedio.png';

const Swiper1 = () => {
    return (
        <div className={styles.swiper1}>
            <div className={styles.text1}>
                <h3>
                    Peça seu medicamento já e receba em casa
                </h3>
                <button>Fazer pedido</button>
            </div>
            <div className={styles.image}>
                <Image src={Img1} alt='' />
            </div>
            <div className={styles.text2}>
                <h2>
                    FC
                </h2>
                <h3>
                    Famácias Caruaru
                </h3>
            </div>
        </div>
    );
}

export default Swiper1;