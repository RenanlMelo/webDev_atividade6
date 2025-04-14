import { useState } from "react";

export default function Cep() {
  const [cep, setCep] = useState("");
  const [cepData, setCepData] = useState(null);
  const [response, setResponse] = useState("");

  function verify_cep() {
    return cep.length !== 8;
  }

  async function handle_cep(event) {
    event.preventDefault();

    try {
      if (verify_cep()) {
        throw "O número do CEP não é válido";
      }
    } catch (err) {
      setResponse(err);
      setTimeout(() => setResponse(""), 3000);
      return;
    }

    const showTemporaryMessage = (message, duration = 3000) => {
      setResponse(message);
      setTimeout(() => setResponse(""), duration);
    };

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
        method: "GET",
      });
      const data = await res.json();
      setCepData(data);
    } catch (err) {
      showTemporaryMessage("Não foi possível encontrar o CEP");
    }
  }

  return (
    <>
      <h2 className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent text-3xl font-bold pb-10">
        CEP Searcher
      </h2>
      <main>
        {response && <label for="cep">{response}</label>}
        <form className="flex gap-x-4" onSubmit={handle_cep} action="submit">
          <input
            id="cep"
            placeholder="XXXXXXXX"
            onChange={(e) => {
              setCep(e.target.value);
            }}
            value={cep}
            type="number"
          />
          <button className="buttons" type="submit">
            Buscar
          </button>
        </form>
        {cepData && (
          <div className="grid grid-rows-5 text-[#ccc] text-2xl gap-y-2 pt-4">
            <p className="font-bold">CEP: {cepData.cep}</p>
            <p>Região: {cepData.regiao}</p>
            <p>Estado: {cepData.estado}</p>
            <p>Cidade: {cepData.localidade}</p>
            <p>Bairro: {cepData.bairro}</p>
            <p>Logradouro: {cepData.logradouro}</p>
          </div>
        )}
      </main>
    </>
  );
}
