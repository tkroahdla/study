import Head from 'next/head';
import NavBar from '../components/NavBar';
import Seo from '../components/Seo';

export default function about() {
  return (
    <div>
      <Seo title="About" />
      <h1>about</h1>
    </div>
  );
}
