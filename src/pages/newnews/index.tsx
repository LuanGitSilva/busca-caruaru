import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NewNews = () => {    
    const { data: session, status: sessionStatus } = useSession();

    const router = useRouter();

    const [id, setId] = useState();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [author, setAuthor] = useState('');

    const sendInfo = async () => {
        if(title && image && text && date && author ) {
            let response = await fetch("/api/places", {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    title: title,
                    image: image,
                    text: text,
                    date: date,
                    author: author
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            if(json.status) {
                alert('Local cadastrado com sucesso!');
                setTitle('');
                setImage('');
                setText('');
                setDate('');
                setAuthor('');
            }
        } else {
            alert("Preencha todos os dados!")
        }
    }

    return (
        <> 
            {sessionStatus === 'unauthenticated' &&
                <div>
                    <h2>Acesso não autorizado, por favor entre em contato com a administração.</h2>
                    <button
                        onClick={() => router.replace('/')}
                    >Painel geral</button>
                </div>
            }
            {sessionStatus === 'authenticated' &&        
                <div>
                    {session &&
                        <>
                        
                            <h1>Olá {session.user?.name}.</h1>
                        </>
                    }

                    <h1 className={styles.title}>Insira os dados para o cadastro</h1>
                    
                    <h2 className={styles.subtitle}>Título da notícia:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder="Digite o título da notícia" />
                        <KeyboardIcon
                            style={{
                                display: title ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    
                    <h2 className={styles.subtitle}>Url da imagem da notícia:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                            placeholder="Digite a url da primeira imagem da notícia" />
                        <KeyboardIcon
                            style={{
                                display: image ? 'none' : 'block'
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
                            placeholder="Digite a data da notícia (ex.: 01/06/2023)" />
                        <KeyboardIcon
                            style={{
                                display: date ? 'none' : 'block'
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
                            placeholder="Digite o texto da notícia" />
                        <KeyboardIcon
                            style={{
                                display: text ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    
                    <h2 className={styles.subtitle}>Fonte da notícia:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={author}
                            onChange={(e)=>setAuthor(e.target.value)}
                            placeholder="Digite o nome da fonte da notícia" />
                        <KeyboardIcon
                            style={{
                                display: author ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <div
                        style={{
                            display: title && image && text && date && author ? 'flex' : 'none'
                        }}
                        className={styles.btn}
                    >
                        <button onClick={sendInfo}>Enviar</button>
                    </div>

                    <div
                        style={{
                            display: title && image && text && date && author ? 'none' : 'flex'
                        }}
                    >
                        <BackButton />
                    </div>
                </div>
            }
        </>
    );
}

export default NewNews;