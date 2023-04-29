import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const RegisterProduct = () => {    
    const { data: session, status: sessionStatus } = useSession();
    const router = useRouter();

    const [title, setTitle] = useState('');

    const sendInfo = async () => {
        if(title) {
            console.log(title)

            let response = await fetch("/api/productstype", {
                method: 'POST',
                body: JSON.stringify({
                    title: title
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            if(json.status) {
                alert('Tipo de produto cadastrado com sucesso!');
                setTitle('');
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
                        <h1>Olá {session.user?.name}.</h1>
                    }

                    <h1 className={styles.title}>Insira os dados do tipo de produto</h1>

                    <h2 className={styles.subtitle}>Título do tipo de produto:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e)=>setTitle(e.target.value)}
                            placeholder="Digite o nome tipo do produto" />
                        <KeyboardIcon
                            style={{
                                display: title ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>

                    <div
                        style={{
                            display: title ? 'flex' : 'none'
                        }}
                        className={styles.btn}
                    >
                        <button onClick={sendInfo}>Enviar</button>
                    </div>

                    <div
                        style={{
                            display: title ? 'none' : 'flex'
                        }}
                    >
                        <BackButton />
                    </div>
                </div>
            }
        </>
    );
}

// export const getStaticProps = async () => {
//     // DRY = Don't Repeat Yourself
//     const places = await api.getAllPlaces();  
//     return { 
//         props: { places }
//     }
// }

export default RegisterProduct;