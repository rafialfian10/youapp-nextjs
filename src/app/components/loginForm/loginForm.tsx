"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Toast } from "@capacitor/toast";
import { eye, eyeOff } from "ionicons/icons";
import { IonItemDivider, IonItemSliding, IonItem, IonText, IonIcon } from "@ionic/react";

import { loginUser } from "@/redux/features/authSlice";
import { LoginValues } from "@/types/login";
import AuthUser from "../authUser/authUser";
// ---------------------------------------------------------

function LoginForm() {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  // state password visibe
  const [passwordVisible, setPasswordVisible] = useState(false);

  const errorMessages = {
    email: "Email is required",
    password: "Password is required",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit: SubmitHandler<LoginValues> = async (data, e) => {
    e?.preventDefault();
    try {
      const response = await dispatch(loginUser({ data }));
      if (response?.payload && response?.payload?.access_token) {
        await Toast.show({
          text: "Login successfully",
          duration: "short",
          position: "center",
        });
        reset();
        router.push(`/pages/initialState`);
        return;
      } else if (
        response?.payload?.message === "Incorrect password" ||
        response?.payload?.message === "User not found"
      ) {
        await Toast.show({
          text: "Login failed, wrong email or password",
          duration: "short",
          position: "center",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onError = () => {
    console.log("Login failed");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("token") ?? "null");
      if (token) {
        router.push("/pages/initialState");
      }
    }
  }, []);

  return (
    <IonItemDivider className="w-full mb-5">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <IonItem className="w-full h-50 rounded-md bg-[#243c41]">
          <input type="hidden" {...register("username")} />
        </IonItem>
        <IonItemSliding className="mb-5">
          <IonItem className="w-full h-50 rounded-md text-left bg-[#243c41]">
            <input
              type="text"
              placeholder="Enter Username/Email"
              className="w-full h-50 px-3 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
              {...register("email", {
                required: errorMessages.email,
              })}
            />
            {errors.email && (
              <IonText className="text-sm text-red-500">
                {errors.email.message}
              </IonText>
            )}
          </IonItem>
        </IonItemSliding>
        <IonItemSliding className="mb-8">
          <IonItem className="w-full h-50 relative rounded-md text-left bg-[#243c41]">
            <input
              id="input"
              type={passwordVisible ? "text" : "password"}
              placeholder="Create Password"
              autoComplete="off"
              className="w-full h-50 px-3 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
              {...register("password", {
                required: errorMessages.password,
              })}
            />
            <div className="absolute top-3 right-3">
              <IonIcon
                slot="icon-only"
                icon={passwordVisible ? eye : eyeOff}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-2xl font-light text-[#FFFFFF]"
              ></IonIcon>
            </div>
            {errors.password && (
              <IonText className="text-sm text-red-500">
                {errors.password.message}
              </IonText>
            )}
          </IonItem>
        </IonItemSliding>
        <button
          type="submit"
          className="w-full h-50 mb-5 transition-opacity duration-300 ease-in-out hover:opacity-100 opacity-30 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 hover:cursor-pointer outline-none"
        >
          <IonText className="text-center text-lg text-[#FFFFFF] font-medium font-inter leading-5 tracking-wide">
            Login
          </IonText>
        </button>
      </form>
    </IonItemDivider>
  );
}

export default AuthUser(LoginForm);
