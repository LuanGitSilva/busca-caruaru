import { useState } from 'react';
import styles from '../../styles/Category.module.css';
import Link from 'next/link';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/router';
import { BackButton } from '../../../components/BackButton';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { AuthUser } from '../../../types/AuthUser';

type Props = {
    loggedUser: AuthUser;
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

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
                router.push('/select');
            }
        } else {
            alert('Dados incorretos!');
            setEmail('');
            setPassword('');
        }
    }

    return (
        <>
            <div>
                <h1 className={styles.title}>Faça o login para ter acesso!</h1>
                
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
                        <button 
                            onClick={handleSubmit}
                            disabled={loading}
                        >Enviar</button>
                </div>

                {loading && "carregando..."}

                <div
                    style={{
                        display: email && password ? 'none' : 'flex'
                    }}
                    className={styles.btn}
                >
                        <BackButton/>
                </div>
            </div>
        </>
    );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const session = await unstable_getServerSession(
//         context.req, context.res, authOptions
//     );
//     if (!session) { return { 
//         redirect: { destination: '/login', permanent: true } 
//     } }

//     return {
//         props: {
//             loggedUser: session.user
//         }
//     }
// }

export default Login;