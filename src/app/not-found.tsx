"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IonItemDivider, IonItemSliding, IonText } from "@ionic/react";
// ----------------------------------------------------

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);

  return (
    <IonItemDivider className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
      <IonItemSliding className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
        <IonText className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">
          404
        </IonText>
        <IonText className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">
          Page Not Found
        </IonText>
        <IonText className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">
          Sorry, the page you are looking for could not be found.
        </IonText>
      </IonItemSliding>
    </IonItemDivider>
  );
}
