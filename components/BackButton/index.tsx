import router from 'next/router';
import styles from './BackButton.module.css';

export const BackButton = () => {

    return(
        <div className={styles.btn}>
            <button onClick={()=>router.back()}>Voltar</button>
        </div>
    );
}