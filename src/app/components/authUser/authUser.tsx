"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { SetUser } from "@/redux/features/authSlice";
// -----------------------------------------------------------------------

export default function AuthUser(Component: React.ComponentType<any>) {
  return function withAuth(props: any) {
    const dispatch = useDispatch();

    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        try {
          if (typeof window !== "undefined" && window.localStorage) {
            const token = JSON.parse(localStorage.getItem("token") ?? "null");

            if (!token) {
              router.push("/pages/login");
              return;
            } else {
              dispatch(
                SetUser({
                  message: "User has been logged in successfully",
                  access_token: token,
                })
              );
            }
          }
        } catch (error) {
          console.error(error);
        }
      };

      checkSession();
    }, [dispatch, router]);

    return <Component {...props} />;
  };
}
