import styles from '../../styles/Category.module.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BackButton } from '../../../components/BackButton';

const Places = () => {    
    const { data: session, status: sessionStatus } = useSession();

    const router = useRouter();

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

                    <div className={styles.container}>
                        <h1>Escolha a opção desejada</h1>
                        <div className={styles.listas}>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/register'}>Inserir locais</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/edit'}>Editar locais</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/delete'}>Deletar locais</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/newproduct'}>Inserir produto</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/newproducttype'}>Inserir tipo de produto</Link>
                                </li>
                                {/* <li>
                                    <Link className={styles.subtitle} href={'/delete'}>Deletar produtos</Link>
                                </li> */}
                            </ul>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/newservice'}>Inserir serviço</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/edit'}>Inserir tipo de produto</Link>
                                </li>
                                {/* <li>
                                    <Link className={styles.subtitle} href={'/delete'}>Deletar serviço</Link>
                                </li> */}
                            </ul>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/newpublicservice'}>Inserir serviço público</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/newpublicservicetype'}>Inserir tipo de ser. púb.</Link>
                                </li>
                                {/* <li>
                                    <Link className={styles.subtitle} href={'/delete'}>Deletar serviço público</Link>
                                </li> */}
                            </ul>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/newnews'}>Inserir notícia</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/editnews'}>Editar notícia</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/deletenews'}>Deletar notícia</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/newparty'}>Inserir festa</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/editparty'}>Editar festa</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/deleteparty'}>Deletar festa</Link>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <Link className={styles.subtitle} href={'/newtourism'}>Inserir turismo</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/edittourism'}>Editar turismo</Link>
                                </li>
                                <li>
                                    <Link className={styles.subtitle} href={'/deletetourism'}>Deletar turismo</Link>
                                </li>
                            </ul>
                        </div>
                        <BackButton />
                    </div>
                </div>
            }
        </>
    );
}

export default Places;