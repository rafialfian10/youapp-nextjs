"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { RootState, useAppSelector } from "@/redux/store";
import { create } from "ionicons/icons";
import {
  IonItemDivider,
  IonItemSliding,
  IonText,
  IonIcon,
} from "@ionic/react";

import CalculateAge from "../calculateAge/calculateAge";

import aquarius from "@/assets/aquarius.png";
import aries from "@/assets/aries.png";
import cancer from "@/assets/cancer.png";
import capricorn from "@/assets/capricorn.png";
import gemini from "@/assets/gemini.png";
import leo from "@/assets/leo.png";
import libra from "@/assets/libra.png";
import pisces from "@/assets/pisces.png";
import sagittarius from "@/assets/sagittarius.png";
import scorpius from "@/assets/scorpius.png";
import taurus from "@/assets/taurus.png";
import virgo from "@/assets/virgo.png";

import rabbit from "@/assets/rabbit.png";
import tiger from "@/assets/tiger.png";
import ox from "@/assets/ox.png";
import rat from "@/assets/rat.png";
import pig from "@/assets/pig.png";
import dog from "@/assets/dog.png";
import rooster from "@/assets/rooster.png";
import monkey from "@/assets/monkey.png";
import goat from "@/assets/goat.png";
import horse from "@/assets/horse.png";
import snake from "@/assets/snake.png";
import dragon from "@/assets/dragon.png";
// ---------------------------------------------

export interface JumbotronProps {
  profile: any;
}

interface HoroscopeImageMap {
  Aquarius: StaticImageData;
  Pisces: StaticImageData;
  Aries: StaticImageData;
  Taurus: StaticImageData;
  Gemini: StaticImageData;
  Cancer: StaticImageData;
  Leo: StaticImageData;
  Virgo: StaticImageData;
  Libra: StaticImageData;
  Scorpius: StaticImageData;
  Sagittarius: StaticImageData;
  Capricorn: StaticImageData;
}

interface ZodiacImageMap {
  Rabbit: StaticImageData;
  Tiger: StaticImageData;
  Ox: StaticImageData;
  Rat: StaticImageData;
  Pig: StaticImageData;
  Dog: StaticImageData;
  Rooster: StaticImageData;
  Monkey: StaticImageData;
  Goat: StaticImageData;
  Horse: StaticImageData;
  Snake: StaticImageData;
  Dragon: StaticImageData;
}

function Jumbotron({ profile }: JumbotronProps) {
  const image = useAppSelector(
    (state: RootState) => state.selectImageSlice.selectedImage
  );

  const [gender, setGender] = useState<string | null>(null);

  // gender
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGender = JSON.parse(localStorage.getItem("gender") ?? "null");
      if (storedGender) {
        setGender(storedGender);
      }
    }
  }, []);

  // calculaete horoscope icon
  const horoscopeIcon = () => {
    const horoscopeImageMap: HoroscopeImageMap = {
      Aquarius: aquarius,
      Pisces: pisces,
      Aries: aries,
      Taurus: taurus,
      Gemini: gemini,
      Cancer: cancer,
      Leo: leo,
      Virgo: virgo,
      Libra: libra,
      Scorpius: scorpius,
      Sagittarius: sagittarius,
      Capricorn: capricorn,
    };

    const horoscopeKey = profile?.horoscope as keyof HoroscopeImageMap;
    return horoscopeImageMap[horoscopeKey] || null;
  };

  // calculaete zodiac icon
  const ZodiacIcon = () => {
    const zodiacImageMap: ZodiacImageMap = {
      Rabbit: rabbit,
      Tiger: tiger,
      Ox: ox,
      Rat: rat,
      Pig: pig,
      Dog: dog,
      Rooster: rooster,
      Monkey: monkey,
      Goat: goat,
      Horse: horse,
      Snake: snake,
      Dragon: dragon,
    };

    const zodiacKey = profile?.zodiac as keyof ZodiacImageMap;
    return zodiacImageMap[zodiacKey] || null;
  };

  return (
    <IonItemDivider>
      {image && (
        <Image
          src={image}
          alt="photo"
          layout="fill"
          className="w-full h-full absolute"
          priority={true}
        />
      )}
      <IonItemSliding className="w-full h-full p-3 flex flex-col justify-between absolute">
        <IonItemSliding className="mb-10 text-end">
          <IonIcon
            className="w-5 h-5 text-[#FFFFFF] font-normal cursor-pointer"
            slot="icon-only"
            icon={create}
          ></IonIcon>
        </IonItemSliding>
        <IonItemSliding className="w-full flex flex-col md:mb-10">
          <IonText className="mb-1 text-[#FFFFFF] text-lg md:text-2xl font-light font-inter">
            @{profile?.name}, <CalculateAge birthDate={profile?.birthday} currentDate={new Date()} />
          </IonText>
          <IonText className="mb-2 text-[#FFFFFF] text-sm md:text-xl font-normal font-inter">
            {gender}
          </IonText>
          <IonItemSliding className="w-full flex items-center">
            <IonItemSliding className="w-40 mr-3 my-2 flex items-center py-1 md:py-2 px-4 rounded-3xl bg-[#1D2F2F]">
              {horoscopeIcon() && (
                <Image
                  src={horoscopeIcon()}
                  alt="horoscope"
                  className="w-5 h-5 mr-2 flex items-center text-base"
                  priority={true}
                  style={{
                    filter: "invert(100%)",
                  }}
                />
              )}
              <IonText className="flex items-center text-base text-[#FFFFFF] font-normal font-inter">
                {profile?.horoscope}
              </IonText>
            </IonItemSliding>
            <IonItemSliding className="w-40 mr-3 my-2 flex items-center py-1 md:py-2 px-4 rounded-3xl bg-[#1D2F2F]">
              {ZodiacIcon() && (
                <Image
                  src={ZodiacIcon()}
                  alt="zodiac"
                  className="w-5 h-5 mr-2 flex items-center"
                  priority={true}
                  style={{
                    filter: "invert(100%)",
                  }}
                />
              )}
              <IonText className="flex items-center text-base text-[#FFFFFF] font-normal font-inter">
                {profile?.zodiac}
              </IonText>
            </IonItemSliding>
          </IonItemSliding>
        </IonItemSliding>
      </IonItemSliding>
    </IonItemDivider>
  );
}

export default Jumbotron;
