import { useState } from "react";
import { Place } from "../../../types/Place";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';

type Props = {
    places: Place[];
}

const Alter = () => {
    const [show, setShow] = useState(false);

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const sendInfo = async () => {
        if(name && image && text && contact && address) {

            let response = await fetch("/api/places/${}", {
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

            <div className={styles.btn}>
                <button onClick={sendInfo}>Enviar</button>
            </div>
        </>
    );
}

export default Alter;