"use client";

import Link from "next/link";
import {
  IonItemDivider,
  IonItemSliding,
  IonHeader,
  IonTitle,
  IonText,
} from "@ionic/react";

import LoginForm from "@/app/components/loginForm/loginForm";
import BackButton from "@/app/components/backButton/backButton";
// -----------------------------------------------------------

export default function Login() {

  return (
    <IonItemSliding className="w-full md:w-60 min-h-screen md:max-h-dvh m-auto py-10 md:py-16 flex flex-col items-center">
      <IonHeader className="w-full mb-14 px-5 md:hidden">
      <BackButton route="/pages/register" />
      </IonHeader>
      <IonTitle className="w-80 mb-8 px-5 text-3xl text-left md:text-center text-[#FFFFFF] font-inter font-bold leading-10">
        Login
      </IonTitle>
      <IonItemDivider className="w-80 text-center">
        <LoginForm />
        <IonItemDivider className="w-full">
          <IonText className="font-inter text-13 font-normal leading-6 text-center text-[#FFFFFF]">
            No account?{" "}
          </IonText>
          <Link href={`/pages/register`} className="font-inter text-13 font-normal text-[#FFFFFF] hover:cursor-pointer">
            Register here
          </Link>
        </IonItemDivider>
      </IonItemDivider>
    </IonItemSliding>
  );
}
