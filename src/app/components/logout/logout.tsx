import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { Toast } from "@capacitor/toast";
import { logOut } from "ionicons/icons";
import { IonItemSliding, IonIcon } from "@ionic/react";

import { ClearUser } from "@/redux/features/authSlice";
// --------------------------------------------------

function Logout() {
  // dispatch
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await Toast.show({
      text: "Logout successfully",
      duration: "short",
      position: "center",
    });
    dispatch(ClearUser());
    router.push("/pages/login");
  };

  return (
    <button
      type="button"
      className="w-full flex justify-center items-center py-1 px-4 text-center text-sm text-[#FFFFFF] font-normal outline-none"
      onClick={handleLogout}
    >
      <IonItemSliding className="mr-2 flex items-center">
        <IonIcon
          slot="icon-only"
          icon={logOut}
          className="text-2xl font-light text-[#FFFFFF]"
        ></IonIcon>
      </IonItemSliding>
      Logout
    </button>
  );
}

export default Logout;
