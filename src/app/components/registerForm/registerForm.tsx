"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { Toast } from "@capacitor/toast";
import { eye, eyeOff } from "ionicons/icons";
import { IonItemDivider, IonItemSliding, IonItem, IonText, IonIcon } from "@ionic/react";

import { registerUser } from "@/redux/features/registerSlice";
import { RegisterValues } from "@/types/register";
// ------------------------------------------------------------------

function RegisterForm() {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const errorMessages = {
    username: "Username is required",
    email: "Email is required",
    password: "Password is required",
    cpassword: "Confirm password is required",
    passwordValidation:
      "Password must contain at least one uppercase and lowercase letter, one digit, and be at least 8 characters long.",
    passwordMatch: "The confirm password does not match the password",
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterValues> = async (formData) => {
    try {
      const response = await dispatch(registerUser({ formData }));
      if (response.payload.message === "User has been created successfully") {
        await Toast.show({
          text: "Register successfully !",
          duration: "short",
          position: "center",
        });
        router.push(`/pages/login`);
        reset();
      } else if (response.payload.message === "User already exists") {
        await Toast.show({
          text: "User already exists!",
          duration: "short",
          position: "center",
        });
      }
    } catch (error) {
      console.log("register failed", error);
    }
  };

  const onError = () => {
    console.log("Register failed");
  };

  return (
    <IonItemDivider className="w-full mb-5">
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <IonItemSliding className="mb-5">
          <IonItem className="w-full rounded-md text-left bg-[#243c41]">
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
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
        <IonItemSliding className="mb-5">
          <IonItem className="w-full rounded-md text-left bg-[#243c41]">
            <input
              type="text"
              placeholder="Create Username"
              autoComplete="off"
              className="w-full h-50 px-3 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
              {...register("username", {
                required: errorMessages.username,
              })}
            />
            {errors.username && (
              <IonText className="text-sm text-red-500">
                {errors.username.message}
              </IonText>
            )}
          </IonItem>
        </IonItemSliding>
        <IonItemSliding className="mb-5">
          <IonItem className="w-full relative rounded-md text-left bg-[#243c41]">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Create Password"
              autoComplete="off"
              className="w-full h-50 px-3 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
              {...register("password", {
                required: errorMessages.password,
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*.])[A-Za-z\d@$%^&*#.,]{8,}$/,
                  message: errorMessages.passwordValidation,
                },
              })}
            />
            <IonItemSliding className="absolute top-3 left-28">
              <IonIcon
                slot="icon-only"
                icon={passwordVisible ? eye : eyeOff}
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="text-2xl font-light text-[#FFFFFF]"
              ></IonIcon>
            </IonItemSliding>
            {errors.password && (
              <IonText className="text-sm text-red-500">
                {errors.password.message}
              </IonText>
            )}
          </IonItem>
        </IonItemSliding>
        <IonItemSliding className="mb-8">
          <IonItem className="w-full relative rounded-md text-left bg-[#243c41]">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Create Confirm Password"
              autoComplete="off"
              className="w-full h-50 px-3 rounded-md text-base text-[#FFFFFF] font-inter font-normal leading-4 outline-none bg-[#243c41]"
              {...register("cpassword", {
                required: errorMessages.cpassword,
                validate: (value) =>
                  value === watch("password") || errorMessages.passwordMatch,
              })}
            />
            <IonItemSliding className="absolute top-3 left-28">
              <IonIcon
                slot="icon-only"
                icon={confirmPasswordVisible ? eye : eyeOff}
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className="text-2xl font-light text-[#FFFFFF]"
              ></IonIcon>
            </IonItemSliding>
            {errors.cpassword && (
              <IonText className="text-sm text-red-500">
                {errors.cpassword.message}
              </IonText>
            )}
          </IonItem>
        </IonItemSliding>
        <button
          type="submit"
          className="w-full h-50 mb-5 transition-opacity duration-300 ease-in-out hover:opacity-100 opacity-30 rounded-md bg-gradient-to-r from-teal-500 to-blue-500 hover:cursor-pointer outline-none"
        >
          <IonText className="text-center text-lg text-white font-medium font-inter leading-5 tracking-wide">
            Register
          </IonText>
        </button>
      </form>
    </IonItemDivider>
  );
}

export default RegisterForm;
