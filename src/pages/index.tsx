import { type NextPage } from "next";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { userId } = useAuth();
  return (
    <main>
      {userId ? <UserButton /> : <Link href="/sign-in">Sign in</Link>}
    </main>
  );
};

export default Home;
