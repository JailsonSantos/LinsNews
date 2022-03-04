import { GetStaticProps } from 'next';
//import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';

// 3 Formas principais de fazer uma chamada a uma API
// Client-side
// Server-side Rendering (SSR)
// Static Site Generation (SSG) -  usado principalmente para gerar um HTML para todas as  pessoas que estão acessando a pagina, ex: Blog, Post, pois precisam de indexação do Google

/* Exemplo em um Blog */
// Post do blog
// Conteudo (SSG)
// Comentarios (Client-side) vai mostrar só depois que  pagina for carregada

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title> Home | lins.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>To our <br /> the <span>technology</span> news portal.</h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}

// Chamadas a API do STRIPE
export const getStaticProps: GetStaticProps = async () => {

  const price = await stripe.prices.retrieve('price_1KWiFxEGOfPUfWB8riFkecco');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

/* 
// Chamadas a API do STRIPE
export const getServerSideProps: GetServerSideProps = async () => {

  
   Essa forma é usada quando se quer mostra informações como nome do produto entre outras
  const price = await stripe.prices.retrieve('price_1KWiFxEGOfPUfWB8riFkecco', {
     expand: ['product']
   }) 

   const price = await stripe.prices.retrieve('price_1KWiFxEGOfPUfWB8riFkecco');

   const product = {
     priceId: price.id,
     amount: new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
     }).format(price.unit_amount / 100),
   };
 
   return {
     props: {
       product
     }
   }
 }
*/