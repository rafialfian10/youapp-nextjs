"use client";

import { Fragment, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { Toast } from "@capacitor/toast";
import { create } from "ionicons/icons";
import {
  IonItemDivider,
  IonItemSliding,
  IonItemGroup,
  IonLabel,
  IonText,
  IonIcon,
} from "@ionic/react";

import DisplayAbout from "../displayAbout/displayAbout";
import ButtonImage from "../buttonImage/buttonImage";
import CalculateHoroscope from "../calculateHoroscope/calculateHoroscope";
import { updateProfile } from "@/redux/features/profileSlice";
import { ProfileValues } from "@/types/profile";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// ------------------------------------------------------------------

export interface ProfileProps {
  getProfile: () => void;
  profile: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

function AboutForm({ getProfile, profile }: ProfileProps) {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();
  const user = useAppSelector((state: RootState) => state.authSlice.user);

  // state gender, date, edit mode
  const genderOptions = ["Male", "Female"];
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isFormEditMode, setIsFormEditMode] = useState(false);

  // handle submit
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileValues>({
    defaultValues: {
      name: profile?.name || "",
      birthday: profile?.birthday || "",
      gender: profile?.gender || "",
      horoscope: profile?.horoscope || "",
      zodiac: profile?.zodiac || "",
      height: profile?.height || null,
      weight: profile?.weight || null,
      photo: profile?.photo || "",
    },
  });

  const onSubmit: SubmitHandler<ProfileValues> = async (data, e) => {
    e?.preventDefault();
    try {
      const formData = {
        name: data?.name,
        birthday: data?.birthday,
        gender: selectedGender,
        height: data?.height,
        weight: data?.weight,
        horoscope: data?.horoscope,
        zodiac: data?.zodiac,
        photo: data?.photo,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("gender", JSON.stringify(selectedGender));
      }

      const body = JSON.stringify(formData);

      const response = await dispatch(
        updateProfile({ formData: body, token: user?.access_token })
      );
      if (response.payload && response.payload.data) {
        await Toast.show({
          text: `${response.payload.message}`,
          duration: "short",
          position: "center",
        });
        getProfile();
        setIsFormEditMode(false);
        reset();
      }
    } catch (e) {
      console.log("API Error:", e);
      await Toast.show({
        text: "profile failed to updated",
        duration: "short",
        position: "center",
      });
    }
  };

  const onError = () => {
    console.log("Update profile failed");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedGender = JSON.parse(localStorage.getItem("gender") ?? "null");
      if (storedGender) {
        setSelectedGender(storedGender);
      }
    }
  }, []);

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || "",
        birthday: profile.birthday || "",
        gender: profile.gender || "",
        height: profile.height || "",
        weight: profile.weight || "",
        horoscope: profile.horoscope || "",
        zodiac: profile.zodiac || "",
        photo: profile.photo || "",
      });
    }
  }, [profile, reset]);

  return (
    <IonItemDivider>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <IonItemSliding className="mb-5 flex flex-row">
          <IonText className="w-1/2 flex items-center text-start text-base text-[#FFFFFF] font-normal font-inter">
            Abouts
          </IonText>
          {isFormEditMode ? (
            <button
              type="submit"
              className="w-1/2 text-end text-sm font-light outline-none"
              style={{
                background:
                  "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Save & Update
            </button>
          ) : (
            <IonItemSliding className="text-end">
              <IonIcon
                className="w-5 h-5 text-[#FFFFFF] font-normal cursor-pointer"
                slot="icon-only"
                icon={create}
                onClick={() => setIsFormEditMode(!isFormEditMode)}
              ></IonIcon>
            </IonItemSliding>
          )}
        </IonItemSliding>
        {isFormEditMode ? (
          <IonItemDivider className="mb-3 flex flex-col">
            <ButtonImage getProfile={getProfile} />
            <IonItemDivider className="flex flex-col">
              <IonItemSliding className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Display name:
                </IonLabel>
                <input
                  type="text"
                  placeholder="Enter name"
                  autoComplete="off"
                  className="w-60 h-35 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                  {...register("name")}
                />
              </IonItemSliding>
              <IonItemGroup className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Gender:
                </IonLabel>
                <Listbox value={selectedGender} onChange={setSelectedGender}>
                  {({ open }) => (
                    <div className="w-60 relative flex justify-end rounded-lg border border-[#FFFFFF38]">
                      <Listbox.Button className="w-full h-35 relative flex justify-end items-center px-7 text-end text-[#FFFFFF4D] font-inter rounded-lg outline-none no-underline bg-[#243c41]">
                        <IonText className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-[#ffffff78] font-light"
                            aria-hidden="true"
                          />
                        </IonText>
                        {selectedGender ? (
                          <IonText className="text-sm text-[#ffffff78] font-light">
                            {selectedGender}
                          </IonText>
                        ) : (
                          <IonText className="text-sm text-[#ffffff78] font-light">
                            Select Gender
                          </IonText>
                        )}
                      </Listbox.Button>
                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="w-full max-h-52 mt-9 absolute overflow-auto rounded-lg border border-[#FFFFFF38] bg-[#243C41] py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
                          {genderOptions.map((option: any) => (
                            <Listbox.Option
                              key={option}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? "text-[#FFFFFF]"
                                    : "text-[#FFFFFF78]",
                                  "relative py-2 text-sm font-light cursor-pointer outline-none"
                                )
                              }
                              value={option}
                            >
                              {({ selected, active }) => (
                                <>
                                  <IonItemDivider className="w-10 flex items-center">
                                    <IonText
                                      className={classNames(
                                        selected
                                          ? "text-[#FFFFFF]"
                                          : "text-[#FFFFFF78]",
                                        "ml-3 block text-sm font-light outline-none"
                                      )}
                                    >
                                      {option}
                                    </IonText>
                                  </IonItemDivider>

                                  {selected ? (
                                    <IonText
                                      className={classNames(
                                        active
                                          ? "text-[#FFFFFF]"
                                          : "text-[#FFFFFF]",
                                        "absolute inset-y-0 right-2 flex items-center font-light"
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </IonText>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              </IonItemGroup>
              <IonItemSliding className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Birthday:
                </IonLabel>
                <IonItemDivider className="relative w-60">
                  <input
                    type="text"
                    readOnly
                    value={selectedDate || profile?.birthday || ""}
                    placeholder="DD MM YYYY"
                    autoComplete="off"
                    className="w-full h-35 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                  />
                  <input
                    type="date"
                    autoComplete="off"
                    className="w-full h-35 absolute left-0 opacity-0 z-10 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                    {...register("birthday")}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </IonItemDivider>
              </IonItemSliding>
              <IonItemSliding className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Horoscope:
                </IonLabel>
                <input
                  readOnly
                  type="text"
                  placeholder="--"
                  autoComplete="off"
                  className="w-60 h-35 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                  value={CalculateHoroscope({
                    birthday: selectedDate || profile?.birthday || "",
                  })}
                  {...register("horoscope")}
                />
              </IonItemSliding>
              <IonItemSliding className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Zodiac:
                </IonLabel>
                <input
                  readOnly
                  type="text"
                  placeholder="--"
                  autoComplete="off"
                  className="w-60 h-35 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                  {...register("zodiac")}
                />
              </IonItemSliding>
              <IonItemSliding className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Height:
                </IonLabel>
                <IonItemDivider className="w-60">
                  <input
                    type="text"
                    placeholder="Add height"
                    autoComplete="off"
                    className="w-full h-35 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                    {...register("height", {
                      valueAsNumber: true,
                      validate: {
                        positiveNumber: (value) =>
                          !value ||
                          value >= 0 ||
                          "Height cannot be less than 0",
                        maxDigits: (value) =>
                          !value ||
                          value.toString().length <= 3 ||
                          "Height must be at most 3 digits",
                        isNumber: (value) =>
                          !isNaN(Number(value)) || "Height must be a number",
                      },
                    })}
                  />
                  {errors.height && (
                    <IonText className="text-xs text-red-500 font-light">
                      {errors.height.message}
                    </IonText>
                  )}
                </IonItemDivider>
              </IonItemSliding>
              <IonItemSliding className="mb-5 flex flex-row items-center">
                <IonLabel className="w-40 me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
                  Weight:
                </IonLabel>
                <IonItemDivider className="w-60">
                  <input
                    type="text"
                    placeholder="Add Weight"
                    autoComplete="off"
                    className="w-full h-35 px-3 text-end text-sm text-[#FFFFFF4D] font-light font-inter rounded-lg outline-none no-underline border border-[#FFFFFF38] bg-[#243c41]"
                    {...register("weight", {
                      valueAsNumber: true,
                      validate: {
                        positiveNumber: (value) =>
                          !value ||
                          value >= 0 ||
                          "Weight cannot be less than 0",
                        maxDigits: (value) =>
                          !value ||
                          value.toString().length <= 3 ||
                          "Weight must be at most 3 digits",
                        isNumber: (value) =>
                          !isNaN(Number(value)) || "Weight must be a number",
                      },
                    })}
                  />
                  {errors.weight && (
                    <IonText className="text-xs text-red-500 font-light">
                      {errors.weight.message}
                    </IonText>
                  )}
                </IonItemDivider>
              </IonItemSliding>
            </IonItemDivider>
          </IonItemDivider>
        ) : profile?.name ||
          profile?.birthday ||
          profile?.gender ||
          profile?.height ||
          profile?.weight ? (
          <DisplayAbout profile={profile} />
        ) : (
          <IonText className="text-sm text-[#FFFFFF85] font-inter">
            Add in your information to help others know you better
          </IonText>
        )}
      </form>
    </IonItemDivider>
  );
}

export default AboutForm;
