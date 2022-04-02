import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'
import ReactLoading from 'react-loading';
import { useState } from 'react';

export function SubscribeButton() {
  const [session] = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubscribe() {

    if (!session) {
      signIn('github')
      return
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/subscribe')

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId })
    } catch (err) {
      alert(err.message);
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
  )
}