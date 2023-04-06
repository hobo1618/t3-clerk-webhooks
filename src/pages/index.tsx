import { type NextPage } from "next";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { userId } = useAuth();
  const { data: user } = api.user.getById.useQuery({ id: "test" });
  const { mutate: createUser } = api.user.create.useMutation();
  return (
    <main>
      {userId ? <UserButton /> : <Link href="/sign-in">Sign in</Link>}
      <br />
      <button onClick={() => createUser({ name: "Alice" })}>
        create user through TRPC
      </button>
      <br />
      {user ? (
        <div>{user.name} retrieved from SQLite DB</div>
      ) : (
        <div>no user in SQLite DB</div>
      )}
    </main>
  );
};

export default Home;
