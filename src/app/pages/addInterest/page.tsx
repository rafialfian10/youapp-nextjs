"use client";

import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { Toast } from "@capacitor/toast";
import {
  IonItemDivider,
  IonItemSliding,
  IonItemGroup,
  IonText,
} from "@ionic/react";

import AuthUser from "@/app/components/authUser/authUser";
import BackButton from "@/app/components/backButton/backButton";
import Loading from "@/app/loading";
import { getProfile, updateProfile } from "@/redux/features/profileSlice";
import { ProfileValues } from "@/types/profile";
// ------------------------------------------------------------------

function AddInterest() {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();

  const user = useAppSelector((state: RootState) => state.authSlice.user);
  const profile = useAppSelector(
    (state: RootState) => state.profileSlice.profile
  );
  const loading = useAppSelector(
    (state: RootState) => state.profileSlice.loading
  );

  useEffect(() => {
    dispatch(getProfile({ token: user?.access_token }));
  }, [user]);

  // handle submit
  const { register, handleSubmit, reset } = useForm<ProfileValues>();

  const onSubmit: SubmitHandler<ProfileValues> = async (data, e) => {
    e?.preventDefault();
    try {
      const newInterest = data?.interests;
      const updatedInterests = profile?.interests
        ? [...profile.interests, newInterest]
        : [newInterest];

      const formData = {
        interests: updatedInterests,
      };

      const body = JSON.stringify(formData);

      const response = await dispatch(
        updateProfile({ formData: body, token: user?.access_token })
      );
      if (response.payload && response.payload.data) {
        await Toast.show({
          text: "interest has been successfully updated",
          duration: "short",
          position: "center",
        });
        dispatch(getProfile({ token: user?.access_token }));
        reset();
      }
    } catch (e) {
      console.log("API Error:", e);
      await Toast.show({
        text: "interest failed to updated",
        duration: "short",
        position: "center",
      });
    }
  };

  const onError = () => {
    console.log("Update interest failed");
  };

  // handle delete interest
  const handleDeleteInterest = async (data: string) => {
    try {
      const updatedInterests = profile.interests.filter(
        (item: any) => item !== data
      );

      const formData = {
        interests: updatedInterests,
      };

      const response = await dispatch(
        updateProfile({
          formData: JSON.stringify(formData),
          token: user?.access_token,
        })
      );
      if (response.payload && response.payload.data) {
        await Toast.show({
          text: "Interest has been deleted",
          duration: "short",
          position: "center",
        });
        dispatch(getProfile({ token: user?.access_token }));
        reset();
      }
    } catch (err) {
      console.log(err, "error delete interest failed");
    }
  };

  return (
    <IonItemDivider className="w-full md:w-60 min-h-screen md:max-h-dvh m-auto py-10 flex flex-col items-center">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
        <IonItemGroup className="w-full mb-24 px-3 md:px-0 flex justify-between items-center">
          <BackButton />
          <button
            type="submit"
            className="w-1/2 px-3 text-end text-base font-light outline-none md:pr-10"
            style={{
              background:
                "linear-gradient(134.86deg, #ABFFFD 2.64%, #4599DB 102.4%, #AADAFF 102.4%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Save
          </button>
        </IonItemGroup>
        <IonItemSliding className="w-full mb-8 px-10">
          <IonText
            className="w-full mb-3 text-start text-lg md:text-2xl font-light outline-none"
            style={{
              background:
                "linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Tell everyone about yourself
          </IonText>
          <input
            type="text"
            placeholder="What interest you?"
            className="w-full text-start text-2xl md:text-3xl text-[#FFFFFF] font-normal font-inter rounded-lg outline-none bg-transparent focus:font-normal focus:no-underline"
            {...register("interests")}
          />
        </IonItemSliding>
      </form>
      <IonItemSliding className="w-90 h-auto m-auto mb-5 flex flex-wrap py-3 px-4 rounded-xl bg-[#243C3C]">
        {loading ? (
          <Loading />
        ) : (
          profile?.interests &&
          profile.interests.length > 0 &&
          profile?.interests.map((interest: string, index: number) => (
            <IonItemDivider
              key={index}
              className="m-1 flex py-1 px-3 rounded-xl bg-[#325252]"
            >
              <IonText className="me-2 text-base text-[#FFFFFF] font-normal font-inter">
                {interest}
              </IonText>
              <button
                type="button"
                className="text-base text-[#FFFFFF] font-normal font-inter"
                onClick={() => handleDeleteInterest(interest)}
              >
                X
              </button>
            </IonItemDivider>
          ))
        )}
      </IonItemSliding>
    </IonItemDivider>
  );
}

export default AuthUser(AddInterest);
