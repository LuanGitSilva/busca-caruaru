import { MouseEventHandler, useEffect, useState } from 'react';
import styles from './Login.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import { BackButton } from '../../BackButton';
import { signIn } from 'next-auth/react';

const Login = (props: { event: MouseEventHandler<HTMLButtonElement> | undefined; }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const listener = props.event;

    const handleSubmit = async () => {
        setLoading(true);
        const request = await signIn('credentials', {
            redirect: false,
            email, password
        });
        setLoading(false);
        

        if (request && request.ok) {
            if (router.query.callbackUrl) {
                router.push(router.query.callbackUrl as string)
            } else {
                router.push('/');
            }
            setEmail('');
            setPassword('');
        } else {
            alert('Dados incorretos!');
            setEmail('');
            setPassword('');
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.painel}>
                <h3 className={styles.title}>Faça o login para ter acesso!</h3>
                
                <h2 className={styles.subtitle}>E-mail:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        disabled={loading}
                        required
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
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        disabled={loading}
                        required
                    />
                    <KeyboardIcon
                        style={{
                            display: password ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                    {!visibility &&
                        <VisibilityIcon
                            onClick={() => setVisibility(true)}
                            style={{
                                cursor: 'pointer',
                                display: password ? 'block' : 'none'
                            }}
                            className={styles.icon}
                        />
                    }
                    {visibility &&
                        <VisibilityOffIcon
                            onClick={() => setVisibility(false)}
                            style={{
                                cursor: 'pointer',
                                display: password ? 'block' : 'none'
                            }}
                            className={styles.icon}
                        />
                    }
                </div>
                <div
                    style={{
                        display: email && password ? 'flex' : 'none'
                    }}
                    className={styles.btn}
                    >
                    {/* onClick={listener} */}
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                        >Entrar</button>
                </div>

                {loading && "carregando..."}

                <div
                    style={{
                        display: email && password ? 'none' : 'flex'
                    }}
                    className={styles.btn}
                >
                    <button 
                        onClick={listener}
                        disabled={loading}
                    >Fechar</button>
                </div>
            </div>
        </div>
    );
}

export default Login;