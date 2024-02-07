"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { ellipsisHorizontal } from "ionicons/icons";
import {
  IonItemDivider,
  IonItemSliding,
  IonItemGroup,
  IonText,
  IonIcon
} from "@ionic/react";

import AboutForm from "@/app/components/aboutForm/aboutForm";
import Interest from "@/app/components/interest/interest";
import Loading from "@/app/loading";
import Jumbotron from "@/app/components/jumbotron/jumbotron";
import AuthUser from "@/app/components/authUser/authUser";
import BackButton from "@/app/components/backButton/backButton";
import Logout from "@/app/components/logout/logout";
import { getProfile } from "@/redux/features/profileSlice";
// ------------------------------------------------------------------

function InitialState() {
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

  const router = useRouter();

  // state show dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <IonItemDivider>
      {loading ? (
        <Loading />
      ) : (
        <IonItemSliding className="w-full md:w-60 min-h-screen md:m-auto py-10 flex flex-col items-center">
          <IonItemGroup className="w-full relative mb-14 px-3 flex justify-between">
            <BackButton />
            <IonText className="w-1/3 md:w-1/2 flex items-center justify-center md:justify-start text-base md:text-xl text-center text-[#FFFFFF] font-normal font-inter">
              {profile?.username}
            </IonText>
            <IonItemDivider
              className=" w-1/3 md:w-1/2 p-0 m-0 text-end text-[#FFFFFF] font-normal outline-none"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <IonItemSliding className="top-0 right-3">
                <IonIcon
                  slot="icon-only"
                  icon={ellipsisHorizontal}
                  className="text-2xl font-light text-[#FFFFFF]"
                ></IonIcon>
              </IonItemSliding>
            </IonItemDivider>
            {showDropdown && (
              <IonItemDivider className="origin-top-right absolute right-3 py-1 mt-8 rounded-lg outline-none bg-[#162329]">
                <Logout />
              </IonItemDivider>
            )}
          </IonItemGroup>
          <IonItemDivider className="w-95 h-200 md:h-400 relative mb-5 rounded-3xl overflow-hidden bg-[#162329]">
            <Jumbotron profile={profile} />
          </IonItemDivider>
          <IonItemSliding className="w-95 mb-5 flex flex-col justify-between py-3 px-6 rounded-3xl bg-[#162329]">
            <AboutForm
              getProfile={() =>
                dispatch(getProfile({ token: user?.access_token }))
              }
              profile={profile}
            />
          </IonItemSliding>
          <IonItemSliding className="w-95 h-auto mb-5 flex flex-col justify-between py-3 px-6 rounded-3xl bg-[#162329]">
            <Interest profile={profile} />
          </IonItemSliding>
        </IonItemSliding>
      )}
    </IonItemDivider>
  );
}

export default AuthUser(InitialState);
