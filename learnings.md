**On type-checking the `data` object from `useQuery`**

- By default, `data` will have the type of `unknown`. This will cause you to not know what properties to fetch if let's say you need to render UI components that contains the data you fetched.

Example:

```jsx
return (
  <ul>
    {/* data is of type `unknown` */}
    {data.map((todo) => (
      {/* Parameter 'todo' implicitly has an 'any' type. */}
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
);
```

**What do I need to add to my `useQuery` implementation to make `data` type-safe?**

- Provide a type that represents the shape of your data. If your expected data is a list of Todos, you can implement your `useQuery` type checking to be like:

```jsx
// The shape of each Todo
interface Todo {
    id: string;
    title: string;
}

// The expected data is a list of Todo, hence `useQuery<Todo[]>`
const { data } = useQuery<Todo[]>({ queryKey: ["todos"], queryFn: fetchTodoList });
```

**Why is this appearing? `No QueryClient set, use QueryClientProvider to set one`**

- This error appears when you use the React Query hooks but not set the context on where these hooks should run.
- To fix this issue, wrap your root component with `<QueryClientProvider>`

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
```
