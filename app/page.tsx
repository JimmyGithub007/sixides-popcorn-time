import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/movie?page=1');

  return null;
}

export default Home;