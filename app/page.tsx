import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/movie/p/1');

  return (<></>);
}

export default Home;