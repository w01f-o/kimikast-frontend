import { NextPage } from 'next';
import AuthPage from '@/components/pages/AuthPage';

const Page: NextPage = () => {
  return <AuthPage type={'login'} />;
};

export default Page;
