import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import api from "../../../libs/api";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { News } from "../../../types/News";

type Props = {
    news: News[];
}

const EditNews = ({ news }: Props) => {
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
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');

    // está havendo a troca dos valores de image, date e author e nã identifico o porque

    const sendInfo = async () => {
        if(id && title || image || text || date || author) {

            let response = await fetch(`/api/news/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: title,
                    text: text,
                    image: author,
                    date: image,
                    author: date
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();

            if(json.status) {
                alert('Notícia alterada com sucesso!');
                setId(0);
                setTitle('');
                setImage('');
                setText('');
                setDate('');
                setAuthor('');
            }

        } else {
            alert("Preencha algum dado!")
        }
    }

    return (
        <>
            {sessionStatus === 'authenticated' &&
            <>
                <h1 className={styles.title}>Insira os dados para alteração</h1>

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
                
                <h2 className={styles.subtitle}>Url da imagem da notícia:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={image}
                        onChange={(e)=>setImage(e.target.value)}
                        placeholder="Digite a url da primeira imagem do local" />
                    <KeyboardIcon
                        style={{
                            display: image ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>
                
                <h2 className={styles.subtitle}>Texto da notícia:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e)=>setText(e.target.value)}
                        placeholder="Digite uma descrição sobre o local" />
                    <KeyboardIcon
                        style={{
                            display: text ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Data da notícia:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                        placeholder="Digite a data da notícia" />
                    <KeyboardIcon
                        style={{
                            display: date ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <h2 className={styles.subtitle}>Autor:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={author}
                        onChange={(e)=>setAuthor(e.target.value)}
                        placeholder="Digite o nome do autor da notícia" />
                    <KeyboardIcon
                        style={{
                            display: author ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div 
                    style={{
                        display: id && title || image || text || date || author ? 'flex' : 'none'
                    }}
                    className={styles.btn}
                >
                    <button onClick={sendInfo}>Enviar</button>
                </div>

                <div 
                    style={{
                        display: id && title || image || text || date || author ? 'none' : 'flex'
                    }}
                    className={styles.btn}
                >
                    <BackButton />
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

export default EditNews;