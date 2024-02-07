import moment from "moment";
import { IonItemDivider, IonItemSliding, IonText } from "@ionic/react";

import CalculateAge from "../calculateAge/calculateAge";
// ------------------------------------------------------------

export interface DisplayAboutProps {
  profile: any;
}

function DisplayAbout({ profile }: DisplayAboutProps) {
  return (
    <IonItemDivider className="flex flex-col">
      <IonItemSliding className="mb-5 flex flex-row items-center">
        <IonText className="w-full me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Birthday:{" "}
          <IonText className="text-sm text-[#FFFFFF]">
            {profile?.birthday
              ? moment(profile?.birthday).format("DD / MM / YYYY")
              : ""}{" "}
            (Age{" "}
            <CalculateAge
              birthDate={profile?.birthday}
              currentDate={new Date()}
            />
            )
          </IonText>
        </IonText>
      </IonItemSliding>
      <IonItemSliding className="mb-5 flex flex-row items-center">
        <IonText className="w-full me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Horoscope:{" "}
          <IonText className="text-sm text-[#FFFFFF]">
            {profile?.horoscope ? profile?.horoscope : ""}
          </IonText>
        </IonText>
      </IonItemSliding>
      <IonItemSliding className="mb-5 flex flex-row items-center">
        <IonText className="w-full me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Zodiac:{" "}
          <IonText className="text-sm text-[#FFFFFF]">
            {profile?.zodiac ? profile?.zodiac : "Pig"}
          </IonText>
        </IonText>
      </IonItemSliding>
      <IonItemSliding className="mb-5 flex flex-row items-center">
        <IonText className="w-full me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Height:{" "}
          <IonText className="text-sm text-[#FFFFFF]">
            {profile?.height ? profile?.height : ""} cm
          </IonText>
        </IonText>
      </IonItemSliding>
      <IonItemSliding className="mb-5 flex flex-row items-center">
        <IonText className="w-full me-3 text-sm text-[#FFFFFF4D] font-light font-inter">
          Weight:{" "}
          <IonText className="text-sm text-[#FFFFFF]">
            {profile?.weight ? profile?.weight : ""} kg
          </IonText>
        </IonText>
      </IonItemSliding>
    </IonItemDivider>
  );
}

export default DisplayAbout;
