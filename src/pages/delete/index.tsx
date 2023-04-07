import { useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";

type Props = {
    places: Place[];
}

const Delete = () => {
    const [show, setShow] = useState(false);

    const [id, setId] = useState<number>();

    const sendInfo = async () => {
        if(id) {

            await fetch(`/api/places/${id}`, {
                method: 'DELETE'
            });

            alert('Local deletado com sucesso!')

        } else {
            alert("Preencha os dados!")
        }
    }

    return (
        <>
            <h1 className={styles.title}>Insira os dados para deletar o local</h1>

            <h2 className={styles.subtitle}>Digite o ID do local a ser deletado:</h2>
            <div className={styles.search}>
                <input 
                    type="number"
                    value={id}
                    onChange={(e)=>setId(parseInt(e.target.value))}
                    placeholder="Digite o ID do local" />
                <KeyboardIcon
                    style={{
                        display: id ? 'none' : 'block'
                    }}
                    className={styles.icon}
                />
            </div>

            <div 
                style={{
                    display: id ? 'flex' : 'none'
                }}
                className={styles.btn}
            >
                <button onClick={sendInfo}>Deletar</button>
            </div>

            <div 
                style={{
                    display: id ? 'none' : 'flex'
                }}
                className={styles.btn}
            >
                <BackButton/>
            </div>
        </>
    );
}

export default Delete;