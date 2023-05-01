import { useEffect, useState } from 'react';
import styles from '@component/styles/Home.module.css';
import Aos from 'aos';
import 'aos/dist/aos.css';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useSession } from "next-auth/react";
import api from '../../../libs/api';
import { Party } from '../../../types/Party';


type Props = {
  parties: Party[];
}

const Party = ({ parties }: Props) => {
  // const { data: session, status: sessionStatus } = useSession();

  const [busca, setBusca] = useState('');
  const [filtered, setFiltered] = useState<Party[]>([]);

  const [show, setShow] = useState(false);
      
  parties.map(function(place, i) {
      useEffect(() => {
          let newFiltered: Party[] = [];
          for(let i of parties) {
              if(i.title.toLowerCase().indexOf(busca.toLowerCase()) > -1) {
                  newFiltered.push(i);
              }
          }
          setFiltered(newFiltered);
          if(busca) {
              setShow(true);
          } else {
              setShow(false);
          }
      }, [busca]);
  });

  const [w, setW] = useState(false);
  
  useEffect(() => {
    if(typeof window !== "undefined") {
      let s = window.innerWidth;
      if(s > 899) {
        setW(true);
      } else {
        setW(false);
      }
    }
  }, [w]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <>    
        <div className={styles.allNews}>
          <div className={styles.filtered}>
            <h3>Busque sua festa:</h3>
            <div className={styles.search}>
                <input
                    type="text"
                    value={busca}
                    onChange={(e)=>setBusca(e.target.value)}
                    placeholder="Digite sua busca" />
                {show &&
                    <KeyboardIcon
                        className={styles.icon}
                    />
                }
                {!show &&
                    <SearchIcon
                        className={styles.icon}
                    />
                }
            </div>
          </div>
          
          {show &&
            <div className={styles.body}>
              <div className={styles.adds}>
                {filtered.map((item, index)=>(
                  <div data-aos='fade-up' className={styles.ad} key={index}>
                    <div className={styles.image}>
                      <img
                        src={item.image}
                        alt={item.text}
                      />
                    </div>
                    <div className={styles.adText}>
                      <h3>{item.title}</h3>
                      <small>Publicado: {item.date}</small>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }

          {!show &&
            <div className={styles.body}>
              <div className={styles.adds}>
                {parties.map((item, index)=>(
                  <div data-aos='fade-up' className={styles.ad} key={index}>
                    <div className={styles.image}>
                      <img
                        src={item.image}
                        alt={item.text}
                      />
                    </div>
                    <div className={styles.adText}>
                      <h3>{item.title}</h3>
                      <small>Publicado: {item.date}</small>
                      <p>{item.text}</p>
                      <small>Responsável: {item.responsible}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
    </>
  )
}

export const getStaticProps = async () => {
  const parties = await api.getAllParties();  
  
  return { 
      props: { parties }, 
      revalidate: 3600 
  }
}

export default Party;