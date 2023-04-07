import { useState } from 'react';
import styles from '../../styles/Category.module.css';
import Link from 'next/link';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import router from 'next/router';
import { BackButton } from '../../../components/BackButton';

const Select = () => {
    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const sendLogin = () => {
        if(email === 'teste@gmail.com' && key === '1234') {
            setConfirm(true);
        } else {
            alert('Dados incorretos');
        }
    }

    return (
        <>
            {!confirm &&
                <div>
                    <h1 className={styles.title}>Faça o login para ter acesso!</h1>
                    <h2 className={styles.subtitle}>E-mail:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            placeholder="Digite seu e-mail"
                        />
                        <KeyboardIcon
                            style={{
                                display: email ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    <h2 className={styles.subtitle}>Senha:</h2>
                    <div className={styles.search}>
                        <input
                            type={visibility ? 'text' : 'password'}
                            value={key}
                            onChange={(e)=>setKey(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                        <KeyboardIcon
                            style={{
                                display: key ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                        {!visibility &&
                            <VisibilityIcon
                                onClick={() => setVisibility(true)}
                                style={{
                                    cursor: 'pointer',
                                    display: key ? 'block' : 'none'
                                }}
                                className={styles.icon}
                            />
                        }
                        {visibility &&
                            <VisibilityOffIcon
                                onClick={() => setVisibility(false)}
                                style={{
                                    cursor: 'pointer',
                                    display: key ? 'block' : 'none'
                                }}
                                className={styles.icon}
                            />
                        }
                    </div>
                    <div
                        style={{
                            display: email && key ? 'flex' : 'none'
                        }}
                        className={styles.btn}
                    >
                            <button onClick={sendLogin}>Enviar</button>
                    </div>

                    <div
                        style={{
                            display: email && key ? 'none' : 'flex'
                        }}
                        className={styles.btn}
                    >
                            <BackButton/>
                    </div>
                </div>
            }
            {confirm &&
                <div>
                    <h1 className={styles.title}>Escolha a ação que quer executar</h1>
                    <Link href={'/fillout'}>
                        <h2 className={styles.subtitle2}>Cadastrar um local</h2>
                    </Link>
                    <Link href={'/edit'}>
                        <h2 className={styles.subtitle2}>Editar dados de um local</h2>
                    </Link>
                    <Link href={'/delete'}>
                        <h2 className={styles.subtitle2}>Deletar um local</h2>
                    </Link>

                    <BackButton />
                </div>
            } 
        </>
    );
}

export default Select;