"use client";

import Link from "next/link";
import {
  IonItemDivider,
  IonItemSliding,
  IonHeader,
  IonTitle,
  IonText,
} from "@ionic/react";

import RegisterForm from "@/app/components/registerForm/registerForm";
import BackButton from "@/app/components/backButton/backButton";
// ---------------------------------------------------------------------

export default function Register() {

  return (
    <IonItemSliding className="w-full md:w-60 min-h-screen md:max-h-dvh m-auto py-10 md:py-16 flex flex-col items-center">
      <IonHeader className="w-full mb-14 px-5 md:hidden">
      <BackButton />
      </IonHeader>
      <IonTitle className="w-80 mb-8 px-5 text-3xl text-left md:text-center text-[#FFFFFF] font-inter font-bold leading-10">
        Register
      </IonTitle>
      <IonItemDivider className="w-80 text-center">
        <RegisterForm />
        <IonItemDivider className="w-full">
          <IonText className="font-inter text-13 font-normal leading-6 text-center text-[#FFFFFF]">
            Have an account?{" "}
          </IonText>
          <Link href={`/pages/login`} className="font-inter text-13 font-normal text-[#FFFFFF] hover:cursor-pointer">
            Login here
          </Link>
        </IonItemDivider>
      </IonItemDivider>
    </IonItemSliding>
  );
}
