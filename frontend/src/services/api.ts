// Lê a URL da API definida no .env e remove "/" no final para evitar duplicação nas rotas.
const API_BASE_URL = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

// Falha cedo para deixar explícito o erro de configuração em ambiente local/produção.
if (!API_BASE_URL) {
  throw new Error("VITE_API_URL não definido no arquivo .env");
}

export { API_BASE_URL };
