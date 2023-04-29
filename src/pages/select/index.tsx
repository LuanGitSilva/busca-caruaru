import { useState } from 'react';
import styles from '../../styles/Category.module.css';
import Link from 'next/link';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import router from 'next/router';
import { BackButton } from '../../../components/BackButton';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { AuthUser } from '../../../types/AuthUser';

type Props = {
    loggedUser: AuthUser;
}

const Select = ({ loggedUser }: Props) => {
    return (
        <>
            {loggedUser &&
                <div>
                    <h1 className={styles.title}>Olá {loggedUser.name}, escolha a ação que quer executar.</h1>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(
        context.req, context.res, authOptions
    );
    if (!session) { return { redirect: { destination: '/', permanent: true } } }

    return {
        props: {
            loggedUser: session.user
        }
    }
}

export default Select;