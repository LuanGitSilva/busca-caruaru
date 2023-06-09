import { useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from "../../../libs/api";

type Props = {
    places: Place[];
}

const Delete = ({ places }: Props) => {
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
    const [name, setName] = useState('');

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
            {sessionStatus === 'authenticated' &&
                <>
                    <h1 className={styles.title}>Insira os dados para deletar o local</h1>

                    <h2 className={styles.subtitle}>Selecione o local: <small>{name}</small></h2>
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
                            {places.map((item, index) => (
                                <li
                                    onClick={()=>{
                                        setName(item.name)
                                        setId(item.id)
                                        setShow(false)
                                        console.log(name)
                                        console.log(id)
                                    }}
                                    key={index}
                                >{item.name}</li>
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
    const places = await api.getAllPlaces();  
    return { 
        props: { places }
    }
}

export default Delete;