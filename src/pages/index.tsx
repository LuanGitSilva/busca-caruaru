import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '@component/styles/Home.module.css';
import { Slide } from '../../components/Slide';
import { SlideMini } from '../../components/Slide copy';
import Introduction from '../../components/Introduction';
import Aos from 'aos';
import 'aos/dist/aos.css';
import api from '../../libs/api';
import Link from 'next/link';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { News } from '../../types/News';
import { Party } from '../../types/Party';
import { Tourism } from '../../types/Tourism';
import Weather from '../../components/Weather';

type Props = {
  news: News[];
  parties: Party[];
  tourism: Tourism[];
}

export default function Home({ news, parties, tourism }: Props) {
  // const { data: session, status: sessionStatus } = useSession();

  const [busca, setBusca] = useState('');
  const [filtered, setFiltered] = useState<News[]>([]);
  const [filtered2, setFiltered2] = useState<Party[]>([]);
  const [filtered3, setFiltered3] = useState<Tourism[]>([]);

  // const [show, setShow] = useState(false);
      
  // news.map(function(place, i) {
  //     useEffect(() => {
  //         let newFiltered: News[] = [];
  //         for(let i of news) {
  //             if(i.title.toLowerCase().indexOf(busca.toLowerCase()) > -1) {
  //                 newFiltered.push(i);
  //             }
  //         }
  //         setFiltered(newFiltered);
  //         if(busca) {
  //             setShow(true);
  //         } else {
  //             setShow(false);
  //         }
  //     }, [busca]);
  // });

  useEffect(() => {
    let newNews: News[] = news.slice(0, 4);
    setFiltered(newNews);
  }, []);

  useEffect(() => {
    let newParty: Party[] = parties.slice(0, 4);
    setFiltered2(newParty);
  }, []);

  useEffect(() => {
    let newTourism: Tourism[] = tourism.slice(0, 4);
    setFiltered3(newTourism);
  }, []);

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
      <Head>
        <title>Busca Caruaru</title>
        {/* <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <main className={styles.main}>
        <div className={styles.caruaru}>
          <h1>Tudo sobre a Capital do Forró em um só lugar.</h1>
        </div>

        <Introduction />
    
        <div className={styles.allNews}>

          <Weather />
        
          <Slide />
          <div className={styles.div1}>
            <div>
              <div className={styles.body}>
                <div className={styles.adds}>
                <h2>Últimas notícias</h2>
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
              <small className={styles.small}>
                <Link data-aos='fade-up' href={'/news'}>
                  <ChevronRightIcon className={styles.right} />
                  Ver mais...
                  <ChevronLeftIcon className={styles.left} />
                </Link>
              </small>
            </div>
            <div className={styles.div2}>
              <div className={styles.div3}>
                <h3>Mais lidas da semana</h3>
                <ul>
                  <li>
                    <small>1</small>
                    Chuvas na região
                  </li>
                  <li>
                    <small>2</small>
                    Tempestade de raios
                  </li>
                  <li>
                    <small>3</small>
                    Festival Infantil
                  </li>
                  <li>
                    <small>4</small>
                    Festival do jeans
                  </li>
                  <li>
                    <small>5</small>
                    Viagem de férias escolar
                  </li>
                </ul>
              </div>
              <SlideMini />
            </div>
          </div>     
          <Slide />
          <div>
            <div className={styles.body}>
              <div className={styles.adds}>
              <h2>Últimas festas</h2>
                {filtered2.map((item, index)=>(
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
            <small className={styles.small}>
              <Link data-aos='fade-up' href={'/parties'}>
                <ChevronRightIcon className={styles.right} />
                Ver mais...
                <ChevronLeftIcon className={styles.left} />
              </Link>
            </small>
          </div>
          <Slide />
          <div>
            <div className={styles.body}>
              <div className={styles.adds}>
              <h2>Últimos turismos</h2>
                {filtered3.map((item, index)=>(
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
            <small className={styles.small}>
              <Link data-aos='fade-up' href={'/tourism'}>
                <ChevronRightIcon className={styles.right} />
                Ver mais...
                <ChevronLeftIcon className={styles.left} />
              </Link>
            </small>
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const news = await api.getAllNews();
  const parties = await api.getAllParties();  
  const tourism = await api.getAllTourism();
  
  return { 
      props: { 
        news,
        parties,
        tourism
      }, 
      revalidate: 3600 
  }
}
