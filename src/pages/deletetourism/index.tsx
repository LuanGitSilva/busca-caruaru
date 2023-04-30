import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from "../../../libs/api";
import { Tourism } from "../../../types/Tourism";


type Props = {
    tourism: Tourism[];
}

const DeleteTourism = ({ tourism }: Props) => {
    const { data: session, status: sessionStatus } = useSession();

    const [show, setShow] = useState(false);
    const handleClick = () => {
        if(show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const [id, setId] = useState<number>();
    const [title, setTitle] = useState('');

    const sendInfo = async () => {
        if(id) {

            await fetch(`/api/tourism/${id}`, {
                method: 'DELETE'
            });

            alert('Local de turismo deletado com sucesso!')

        } else {
            alert("Preencha os dados!")
        }
    }

    return (
        <>
            {sessionStatus === 'authenticated' &&
                <>
                    <h1 className={styles.title}>Insira os dados para deletar o local de turismo</h1>

                    <h2 className={styles.subtitle}>Selecione o local de turismo: <small>{title}</small></h2>
                    <div className={styles.listName}>
                        <p
                            onClick={handleClick}
                        >
                            Escolher
                            {!show &&
                                <KeyboardArrowDownIcon className={styles.arrow} />
                            }
                            {show &&
                                <KeyboardArrowUpIcon className={styles.arrow} />
                            }
                        </p>
                        <ul
                            style={{
                                transition: '.4s',
                                height: show ? '100%' : '0'
                            }}
                        >
                            {tourism.map((item, index) => (
                                <li
                                    onClick={()=>{
                                        setTitle(item.title)
                                        setId(item.id)
                                        setShow(false)
                                        console.log(title)
                                        console.log(id)
                                    }}
                                    key={index}
                                >{item.title}</li>
                            ))}
                        </ul>
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
            }
        </>
    );
}

export const getStaticProps = async () => {
    // DRY = Don't Repeat Yourself
    const tourism = await api.getAllTourism();  
    return { 
        props: { tourism }
    }
}

export default DeleteTourism;