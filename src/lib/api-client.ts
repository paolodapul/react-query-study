const API_BASE_URL = "https://jsonplaceholder.typicode.com";

interface ApiResponse<T> {
  data: T;
  status: number;
}

export const api = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`GET request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return { data, status: response.status };
  },

  async post<T, U>(endpoint: string, payload: T): Promise<ApiResponse<U>> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`POST request failed with status: ${response.status}`);
    }
    const data = await response.json();
    return { data, status: response.status };
  },
};

// Usage examples
// api.get<Todo[]>('/todos').then(({ data }) => console.log(data));
// api.post<NewTodo, Todo>('/todos', { title: 'New Todo' }).then(({ data }) => console.log(data));
