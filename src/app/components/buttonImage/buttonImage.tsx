import Image from "next/image";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, useAppSelector } from "@/redux/store";
import { Toast } from "@capacitor/toast";
import { IonItemSliding, IonText } from "@ionic/react";

import { setSelectedImage } from "@/redux/features/selectImageSlice";
// ----------------------------------------

export interface ButtonImageProps {
  getProfile: () => void;
}

function ButtonImage({ getProfile }: ButtonImageProps) {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();
  const image = useAppSelector(
    (state: RootState) => state.selectImageSlice.selectedImage
  );

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];

      // Convert the selected file to a data URL
      const reader = new FileReader();

      reader.onload = async (event) => {
        if (event.target && typeof event.target.result === "string") {
          try {
            const response = await dispatch(setSelectedImage(event.target.result));
            if (response.payload) {
              await Toast.show({
                text: "photo has been successfully updated",
                duration: "short",
                position: "center",
              });
              getProfile();
            }
          } catch (err) {
            console.log(err, "photo failed to update")
          }
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  return (
    <IonItemSliding className="mb-5 flex flex-row items-center">
      <IonItemSliding className="w-50px h-50 relative me-3 flex justify-center items-center rounded-xl overflow-hidden bg-[#243c41] hover:cursor-pointer">
        {image && (
          <Image
            src={image}
            alt="photo"
            className="w-full h-full absolute"
            width={50}
            height={50}
            priority={true}
          />
        )}
        <button
          type="button"
          className="w-full h-full absolute z-10 outline-none"
          onClick={handleOpenImage}
        >
          {!image ? (
            <IonText className="w-full h-full flex justify-center items-center text-3xl text-[#FFFFFF] font-light font-inter">
              +
            </IonText>
          ) : (
            <IonText className="w-full h-full flex justify-center items-center opacity-0">+</IonText>
          )}
        </button>
        <input
          type="file"
          ref={inputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </IonItemSliding>
      <IonText className="text-sm text-[#FFFFFF] font-normal font-inter">Add image</IonText>
    </IonItemSliding>
  );
}

export default ButtonImage;
