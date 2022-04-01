import { useSession, signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';


import { useState } from 'react';
import ReactLoading from 'react-loading';


export function SubscribeButton() {

  const [session] = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {

    if (!session) {
      signIn('github')
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return
    }

    try {

      setLoading(true);

      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      console.log(response.data);

      const stripe = await getStripeJs()

      stripe.redirectToCheckout({ sessionId })

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      {loading ? <ReactLoading type="spokes" height="25px" width="25px" color="#fff" /> : 'Subscribe now'}
    </button>
  );
}