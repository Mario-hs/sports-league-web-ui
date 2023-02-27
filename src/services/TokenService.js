import { useEffect, useState } from "react";

// criando o próprio hook para não ter que ficar poluindo o componente
function TokenService(url) {
  const [token, setToken] = useState(null);
  const [isPeding, setIsPeding] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Não foi possível buscar os dados para esse recurso");
          }
          return res.json();
        })
        .then((token) => {
          setToken(token);
          setIsPeding(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("Requisão abortada");
          } else {
            setError(err.message);
            setIsPeding(false);
          }
        });

      return () => abortCont.abort();
    }, 1000);
  }, [url]);

  return { token, isPeding, error };
}

export { TokenService };
