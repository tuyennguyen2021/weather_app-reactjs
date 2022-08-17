import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a8210abc2a60546605abd2e7c1e2a860&units=metric&lang=vi `;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
          alert("Vui lòng nhập đúng thành phố");
        });
      setLocation("");
    }
  };

  return (
    <div
      className={
        data.main && Math.round(data.main.temp) > 20 ? "App hot" : "App cold"
      }
    >
      <div className="container">
        <div className="search-bar">
          <input
            value={location}
            type="text"
            onKeyPress={searchLocation}
            placeholder="Nhập vào thành phố..."
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            <h1>{data.main && Math.round(data.main.temp) + "°C"}</h1>
          </div>
          <div className="weather-icon">
            {data.weather ? (
              <img
                src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt="weather-icon"
              />
            ) : null}
          </div>
          <div className="description">
            <p>{data.weather && data.weather[0].description}</p>
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <p className="bold">
                {data.main && Math.round(data.main.feels_like) + "°C"}
              </p>
              <p>Nhiệt độ thực tiễn</p>
            </div>
            <div className="humidity">
              <p className="bold">{data.main && data.main.humidity + "%"}</p>
              <p>Độ ẩm</p>
            </div>
            <div className="wind">
              <p className="bold">{data.main && data.wind.speed + "MPH"}</p>
              <p>Gió</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
