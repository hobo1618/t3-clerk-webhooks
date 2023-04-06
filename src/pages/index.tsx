import { type NextPage } from "next";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { userId } = useAuth();
  // const { data: user } = api.user.getById.useQuery({ id: "test" });
  const { data: users, refetch } = api.user.getAll.useQuery();
  const { mutate: createUser } = api.user.create.useMutation({
    onSuccess: () => {
      refetch();
    },
  });
  console.log("clerk user added; this function was called from index.tsx");
  return (
    <main
      style={{
        width: "100%",
        padding: "20px",
      }}
    >
      {userId ? <UserButton /> : <Link href="/sign-in">Sign in</Link>}
      <br />
      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid blue",
        }}
        onClick={() =>
          createUser({
            name: uniqueNamesGenerator({
              dictionaries: [adjectives, colors, animals],
            }),
          })
        }
      >
        create user through TRPC
      </button>
      <div style={{
        padding: "20px"
      }}>
        Users in DB:
        <br />
        <br />
        {users ? (
          users.map((user) => <div>{user.name}</div>)
        ) : (
          <div>no user in SQLite DB</div>
        )}
      </div>
    </main>
  );
};

export default Home;
