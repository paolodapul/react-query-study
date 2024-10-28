import { useQuery } from "@tanstack/react-query";
import { api } from "./lib/api-client";

interface Post {
  id: string;
  title: string;
  body: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const getPosts = async (): Promise<Post[]> => {
  const posts = await api.get<Post[]>("/posts");
  return posts.data;
};

function App() {
  const { isPending, isError, data, error } = useQuery<Post[]>({
    queryKey: ["todos"],
    queryFn: getPosts,
  });

  if (isPending) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export { App };
