import { useEffect, useState } from 'react';
import styles from '@component/styles/Home.module.css';
import { News } from '../../../types/News';
import Aos from 'aos';
import 'aos/dist/aos.css';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useSession } from "next-auth/react";
import api from '../../../libs/api';


type Props = {
  news: News[];
}

export default function Home({ news }: Props) {
  // const { data: session, status: sessionStatus } = useSession();

  const [busca, setBusca] = useState('');
  const [filtered, setFiltered] = useState<News[]>([]);

  const [show, setShow] = useState(false);
      
  news.map(function(place, i) {
      useEffect(() => {
          let newFiltered: News[] = [];
          for(let i of news) {
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
            <h3>Busque sua notícia:</h3>
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
                      <small>Publicado: xx/xx/xxxx xxhxx</small>
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
                {news.map((item, index)=>(
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
                      <small>Fonte: {item.author}</small>
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
  const news = await api.getAllNews();  
  
  return { 
      props: { news }, 
      revalidate: 3600 
  }
}
