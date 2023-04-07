import { useEffect, useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Fillout = () => {
    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [visibility, setVisibility] = useState(false);

    const sendLogin = () => {
        if(email === 'teste@gmail.com' && key === '1234') {
            setConfirm(true);
        } else {
            alert('Dados incorretos');
        }
    }

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const sendInfo = async () => {
        if(name && image && text && contact && address) {

            let response = await fetch("/api/places", {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    name: name,
                    image: image,
                    text: text,
                    contact: contact,
                    address: address
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();

            if(json.status) {
                alert('Local cadastrado com sucesso!')
            }

        } else {
            alert("Preencha todos os dados!")
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
                </div>
            }
            {confirm &&
                <div>
                    <h1 className={styles.title}>Insira os dados para o cadastro</h1>
                    <h2 className={styles.subtitle}>Nome do local:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            placeholder="Digite o nome do local" />
                        <KeyboardIcon
                            style={{
                                display: name ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    
                    <h2 className={styles.subtitle}>Url da imagem do local:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={image}
                            onChange={(e)=>setImage(e.target.value)}
                            placeholder="Digite a url da imagem do local" />
                        <KeyboardIcon
                            style={{
                                display: image ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    
                    <h2 className={styles.subtitle}>Descrição do local:</h2>
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
                    <h2 className={styles.subtitle}>Contato:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={contact}
                            onChange={(e)=>setContact(e.target.value)}
                            placeholder="Digite o contato do local" />
                        <KeyboardIcon
                            style={{
                                display: contact ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    <h2 className={styles.subtitle}>Endereço:</h2>
                    <div className={styles.search}>
                        <input
                            type="text"
                            value={address}
                            onChange={(e)=>setAddress(e.target.value)}
                            placeholder="Digite o endereço do local" />
                        <KeyboardIcon
                            style={{
                                display: address ? 'none' : 'block'
                            }}
                            className={styles.icon}
                        />
                    </div>
                    <div
                        style={{
                            display: name && image && text && contact && address ? 'flex' : 'none'
                        }}
                        className={styles.btn}
                    >
                        <button onClick={sendInfo}>Enviar</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Fillout;