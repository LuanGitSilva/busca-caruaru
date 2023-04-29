import { Logo } from '../Logo';
import styles from './Header.module.css';
// import { Navbar } from '../Navbar';

import { navigationLinks } from '../../utils/menu';
import { admLinks } from '../../utils/menu';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';


export const Header = () => {
    // const [desk, setDesk] = useState(false);
    const [close, setClose] = useState(false);

    
    // useEffect(() => {
    //     window.addEventListener('desk', function(){
    //         if (innerWidth > 768) {
    //             setDesk(true);
    //             console.log(innerWidth);
    //         } else {
    //             setDesk(false);
    //             console.log(innerWidth);
    //         }
    //     });
    //     console.log(innerWidth);
    // }, [innerWidth]);

    const abrir = () => {
        setClose(true);
    }
    const fechar = () => {
        setClose(false);
    }

    const { data: session, status: sessionStatus } = useSession();

    return (
        <div className={styles.containerGeral}>
            <div className={styles.top}>
                <div className={styles.nav}
                    style={{
                        left: close ? '0' : '-72vw'
                    }}
                >
                    <div className={styles.close}>
                        <HighlightOffIcon onClick={fechar} className={styles.closeImg} />
                    </div>
                    <ul className={styles.container}>
                        {navigationLinks.map((link, index)=>(
                            <li key={index}>
                                <Link href={link.path}
                                >{link.label}</Link>
                            </li>
                        ))}
                        {sessionStatus === 'unauthenticated' &&
                            <li className={styles.li} onClick={() => signIn()}>Login</li>
                        }
                    </ul>
                    {sessionStatus === 'authenticated' &&
                        <ul className={styles.container}>
                            <li className={styles.title}>Área administrador</li>
                            {admLinks.map((link, index)=>(
                                <li key={index}>
                                    <Link href={link.path}>{link.label}</Link>
                                </li>
                            ))}
                            <li className={styles.li} onClick={() => signOut()}>Sair</li>
                        </ul>
                    }
                </div>
            </div>
            <div className={styles.nav2}>
                <ul className={styles.container2}>
                    {navigationLinks.map((link, index)=>(
                        <li key={index}>
                            <Link href={link.path}
                            >{link.label}</Link>
                        </li>
                    ))}
                    {sessionStatus === 'unauthenticated' &&
                        <li className={styles.li2} onClick={() => signIn()}>Login</li>
                    }
                </ul>
                {sessionStatus === 'authenticated' &&
                    <ul className={styles.container3}>
                        <h4 className={styles.title2}>Área administrador :</h4>
                        {admLinks.map((link, index)=>(
                            <li className={styles.li2} key={index}>
                                <Link href={link.path}>{link.label}</Link>
                            </li>
                        ))}
                        <li className={styles.li2} onClick={() => signOut()}>Sair</li>
                    </ul>
                }
            </div>
            <div className={styles.logo}>
                <MenuIcon className={styles.openImg} onClick={abrir} />
                <Logo />
            </div>
        </div>

    );
}