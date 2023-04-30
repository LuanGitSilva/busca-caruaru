import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from "../../../libs/api";
import { Party } from "../../../types/Party";

type Props = {
    party: Party[];
}

const DeleteParty = ({ party }: Props) => {
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

            await fetch(`/api/party/${id}`, {
                method: 'DELETE'
            });

            alert('Festa deletada com sucesso!')

        } else {
            alert("Preencha os dados!")
        }
    }

    return (
        <>
            {sessionStatus === 'authenticated' &&
                <>
                    <h1 className={styles.title}>Insira os dados para deletar a festa</h1>

                    <h2 className={styles.subtitle}>Selecione a festa: <small>{title}</small></h2>
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
                            {party.map((item, index) => (
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
    const party = await api.getAllParties();  
    return { 
        props: { party }
    }
}

export default DeleteParty;