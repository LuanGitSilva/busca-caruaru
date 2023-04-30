import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import { News } from "../../../types/News";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import api from "../../../libs/api";

type Props = {
    news: News[];
}

const Delete = ({ news }: Props) => {
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

            await fetch(`/api/news/${id}`, {
                method: 'DELETE'
            });

            alert('Notícia deletada com sucesso!')

        } else {
            alert("Preencha os dados!")
        }
    }

    return (
        <>
            {sessionStatus === 'authenticated' &&
                <>
                    <h1 className={styles.title}>Insira os dados para deletar a notícia</h1>

                    <h2 className={styles.subtitle}>Selecione a notícia: <small>{title}</small></h2>
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
                            {news.map((item, index) => (
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
    const news = await api.getAllNews();  
    return { 
        props: { news }
    }
}

export default Delete;