"use client";
import { useState } from "react";
import React, { useEffect } from "react";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AirIcon from "@mui/icons-material/Air";

export default function Home() {
  const [cidade, setCidade] = useState("");
  const [resultado, setResultado] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [humidade, setHumidade] = useState("");
  const [vento, setVento] = useState("");
  const [temperatura, setTemperatura] = useState(0);
  const [pais, setPais] = useState("");
  const [nuvens, setNuvens] = useState("");
  const [icon, setIcon] = useState("");
  const [controle, setControle] = useState(false);
  const [newTemp, setNewTemp] = useState("");

  const handleCidadeChange = (event) => {
    setCidade(event.target.value);
  };

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=ba605efc18f1572f61892fe426f18a1a&lang=pt_br`;

  const buscaClima = async () => {
    try {
      const response = await axios.get(url);
      setResultado(response.data); // Armazena o resultad

      console.log(resultado);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (resultado) {
      setControle(true);
      setLocalidade(resultado.name);
      setHumidade(resultado.main.humidity);
      setVento(resultado.wind.speed);
      setTemperatura(resultado.main.temp);
      setPais(resultado.sys.country);
      setNuvens(resultado.weather[0].description);
      setIcon(resultado.weather[0].icon);
      console.log(temperatura);
    }
  }, [resultado]);

  useEffect(() => {
    if (temperatura) {
      setNewTemp((temperatura / 10).toFixed(2));
    }
  }, [temperatura]);

  return (
    <div className="flex flex-col  justify-center items-center h-screen text-white text-2xl w-full bg-blue-700 ">
      <div className="border-2 border-white rounded-lg p-6">
        <div>
          <h2 className="text-4xl pb-2">Confira o clima de uma cidade:</h2>
        </div>
        <form className="flex items-center gap-3 mb-3">
          <input
            id="cidade"
            onChange={handleCidadeChange}
            type="text"
            placeholder="Digite o nome da cidade"
            className="w-full gap-x-2 h-14 border-none text-purple-900 p-8 rounded-full placeholder:text-purple-400 uppercase"
          ></input>
          <button type="button" onClick={buscaClima}>
            <SearchIcon className="text-4xl bg-none hover:bg-purple-500 hover:h-14 w-14" />
          </button>
        </form>

        {resultado && (
          <div>
            <div className="flex justify-center items-center text-4xl gap-2">
              <LocationOnIcon className="bg-none text-4xl" />
              <p>{localidade}</p>
              {cidade && (
                <img
                  src={`https://flagsapi.com/${pais}/flat/64.png`}
                  alt="bandeira pais"
                />
              )}
            </div>
            <div className="flex justify-center text-6xl gap-2 m-6">
              <p>{newTemp}</p>
              <p>ºC</p>
            </div>
            <div className="flex justify-center text-4xl gap-2 m-5">
              <p>{nuvens}</p>
              <img
                src={`https://openweathermap.org./img/wn/${icon}.png`}
                alt="icone do clima"
              />
            </div>
            <div className="flex justify-center text-2xl gap-2 m-6">
              <WaterDropIcon className="bg-none text-4xl" />
              <p>{humidade}%</p>
              <AirIcon className="bg-none text-4xl" />
              <p>{vento} km/h</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
