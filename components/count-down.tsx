"use client";
// count down timer project
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const [minutes, setMinutes] = useState<number | string>("");
  const [seconds, setSeconds] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
//  handle set duration of time
  const handleSetDuration = (): void => {
    const totalSeconds =
      (typeof minutes === "number" ? minutes * 60 : 0) +
      (typeof seconds === "number" ? seconds : 0);

    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsActive(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
// when the time start 
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handlePause = (): void => {
    if (isActive) {
      setIsPaused(true);
      setIsActive(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };
//  when we reset the time 
  const handleReset = (): void => {
    setIsActive(false);
    setIsPaused(false);
    const totalSeconds =
      (typeof minutes === "number" ? minutes * 60 : 0) +
      (typeof seconds === "number" ? seconds : 0);
    setTimeLeft(totalSeconds);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
//  for minutes
  const handleMinutesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMinutes(Number(e.target.value) || "");
  };
// for secondds
  const handleSecondsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSeconds(Number(e.target.value) || "");
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
  <div className="bg-red-600 rounded-lg p-4 md:p-8 w-full h-auto md:h-80  max-w-sm md:max-w-md">

        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
          Countdown Timer
        </h1>
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="minutes"
            value={minutes}
            onChange={handleMinutesChange}
            placeholder="Minutes"
            className="flex-1 mr-2 rounded-md border-gray-300 dark:border-gray-700 dark:text-gray-200 text-xl"
          />
          <Input
            type="number"
            id="seconds"
            value={seconds}
            onChange={handleSecondsChange}
            placeholder="Second"
            className="flex-1 ml-2 rounded-md border-gray-300 dark:border-gray-700 dark:text-gray-200 text-xl "
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200 text-xl  ml-4"
          >
            Set
          </Button>
        </div>
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200 text-xl"
          >
            {isPaused ? "Resume" : "Start"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200  text-xl"
          >
            Pause
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-red-700 text-xl"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
