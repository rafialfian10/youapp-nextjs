import Link from "next/link";
import { create } from "ionicons/icons";
import { IonItemDivider, IonItemSliding, IonItem, IonText, IonIcon } from "@ionic/react";
// ------------------------------------------------

export interface InterestProps {
  profile: any;
}

function Interest({ profile }: InterestProps) {
  return (
    <IonItemDivider>
      <IonItemSliding className="mb-2 flex flex-row justify-between">
        <IonText className="w-1/2 text-start text-base text-[#FFFFFF] font-normal font-inter">
          Interest
        </IonText>
        <Link href={`/pages/addInterest`} className="w-1/2 text-end">
          <IonItemSliding className="text-end">
            <IonIcon
              className="w-5 h-5 text-[#FFFFFF] font-normal cursor-pointer"
              slot="icon-only"
              icon={create}
            ></IonIcon>
          </IonItemSliding>
        </Link>
      </IonItemSliding>
      {profile?.interests && profile.interests.length > 0 ? (
        <IonItemSliding className="w-full h-auto mb-5 flex flex-wrap py-3">
          {profile.interests.map((interest: string, index: number) => (
            <IonItem
              key={index}
              className="h-10 me-2 my-2 px-4 flex justify-center items-center rounded-3xl bg-[#243C3C]"
            >
              <IonText className="text-base text-[#FFFFFF] font-normal font-inter m-0">
                {interest}
              </IonText>
            </IonItem>
          ))}
        </IonItemSliding>
      ) : (
        <IonText className="mb-5 text-sm text-[#FFFFFF85] font-inter">
          Add in your interest to find a better match
        </IonText>
      )}
    </IonItemDivider>
  );
}

export default Interest;
