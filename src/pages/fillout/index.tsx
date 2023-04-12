import { useState } from "react";
import styles from '../../styles/Category.module.css';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { BackButton } from "../../../components/BackButton";


const Fillout = () => {

    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [text, setText] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [maps, setMaps] = useState('');

    const sendInfo = async () => {
        if(name && image && text && contact && address && maps) {
            let response = await fetch("/api/places", {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    name: name,
                    image: image,
                    text: text,
                    contact: contact,
                    address: address,
                    maps: maps
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let json = await response.json();
            if(json.status) {
                alert('Local cadastrado com sucesso!');
                setName('');
                setImage('');
                setText('');
                setContact('');
                setAddress('');
                setMaps('');

            }
        } else {
            alert("Preencha todos os dados!")
        }
    }

    return (
        <>
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

                <h2 className={styles.subtitle}>link do GoogleMaps:</h2>
                <div className={styles.search}>
                    <input
                        type="text"
                        value={maps}
                        onChange={(e)=>setMaps(e.target.value)}
                        placeholder="Digite o link do GoogleMaps" />
                    <KeyboardIcon
                        style={{
                            display: maps ? 'none' : 'block'
                        }}
                        className={styles.icon}
                    />
                </div>

                <div
                    style={{
                        display: name && image && text && contact && address && maps ? 'flex' : 'none'
                    }}
                    className={styles.btn}
                >
                    <button onClick={sendInfo}>Enviar</button>
                </div>

                <div
                    style={{
                        display: name && image && text && contact && address && maps ? 'none' : 'flex'
                    }}
                >
                    <BackButton />
                </div>
            </div>
        </>
    );
}

export default Fillout;