import { Content } from "@/components/organisms/Home/content";

interface GetServerSideProps {
  req: {
    cookies: {
      access_token: string;
      user: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { access_token } = req.cookies;

  if (!access_token) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      tokens: access_token,
    },
  };
}

interface GetProps {
  tokens: string;
}

const Home = ({ tokens }: GetProps) => {
  return <Content token={tokens} />;
};

export default Home;
