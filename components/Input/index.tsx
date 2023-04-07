import styles from './Input.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { Place } from '../../types/Place';

export const Input = () => {
    const [busca, setBusca] = useState('');
    const [filtered, setFiltered] = useState<Place[]>([]);
    const handleSearch = () => {
        console.log(busca);
    }
    useEffect(() => {
        let newFiltered: Place[] = [];
    }, [busca]);

    return(
        <div className={styles.container}>
            {/* <input 
                type="text" 
                value={busca}
                onChange={(e)=>setBusca(e.target.value)}
                placeholder="Digite sua busca" />
            <SearchIcon 
                className={styles.icon} 
                onClick={handleSearch}
            /> */}
        </div>
    );
}