import { useEffect, useState } from 'react';
import styles from './Weather.module.css';
// import Icons from './icons';

const Weather = () => {
    const [temp, setTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [clima, setClima] = useState([]);

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=-8.28139&lon=-35.9735&lang=pt&appid=b3b2ffb3e7f2db200b942987d2ac4e19&units=metric`;

    const getData = async () => {
        await fetch(URL)
            .then(response => {return response.json()})
            .then( data => {
                console.log(data)
                setMaxTemp(data.main.temp_max.toFixed(0))
                setMinTemp(data.main.temp_min.toFixed(0))
                setTemp(data.main.temp.toFixed(0))
                setClima(data.weather[0].description)
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getData()
    }, [getData])

    return (
        <div className={styles.container}>
            <h2>Previsão do tempo</h2>            
            <div className={styles.box}>
                <p>Máxima:</p>
                <small>{maxTemp}&deg;</small>
            </div>

            <div className={styles.box}>
                <p>Temperatura:</p>
                <small>{temp}&deg;</small>
            </div>

            <div className={styles.box}>
                <p>Mínima:</p>
                <small>{minTemp}&deg;</small>
            </div>

            <div className={styles.box}>
                <p>Clima:</p>
                <small>{clima}</small>
            </div>

            {/* <img className={styles.icon} src={Icons(icon)} alt="icon de tempo" /> */}
        </div>
    );
}

export default Weather;