import { NextPage } from 'next';
import Auth from '@/components/pages/Auth';

const Page: NextPage = () => {
  return <Auth type={'login'} />;
};

export default Page;
