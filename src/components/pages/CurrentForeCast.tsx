import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { getCurrentForecast } from "../../api";
import type { CurrentForecast } from "../../api/types";
import HeadingText from "../Texts/HeadingText";
import Input from "../Inputs/Input";
import ErrorText from "../Texts/ErrorText";
import Button from "../Buttons/Button";
import CurrentCard from "../Cards/CurrentCard";

const CurrentForeCast = () => {
  const [city, setCity] = useState("");
  const [currentForecast, setCurrentForecast] = useState<
    CurrentForecast[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  const clickHandler = async () => {
    setError(null);

    try {
      const _currentForecast = await getCurrentForecast(city);

      setCurrentForecast(_currentForecast);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <HeadingText heading="Current Forecast" />
      <Input setCity={setCity} />
      <Button
        buttonTitle="Get Current Forecast"
        onClick={clickHandler}
        disableButton={city.length < 3}
      />
      {currentForecast &&
        currentForecast.map((hourlyForecast, hour) => (
          <AnimatePresence key={`current-${hour}`}>
            <CurrentCard
              weatherIcon={hourlyForecast.weatherIcon}
              precipitationProbability={hourlyForecast.precipitationProbability}
              dewPoint={hourlyForecast.dewPoint}
              humidity={hourlyForecast.humidity}
              visibility={hourlyForecast.visibility}
              weatherText={hourlyForecast.weatherText}
              wind={hourlyForecast.wind}
              realFeelTemperature={hourlyForecast.realFeelTemperature}
              temperature={hourlyForecast.temperature}
              iconPhrase={hourlyForecast.iconPhrase}
              hour={hour}
              dateTime={hourlyForecast.dateTime}
            />
          </AnimatePresence>
        ))}
      {error && <ErrorText />}
    </div>
  );
};

export default CurrentForeCast;
