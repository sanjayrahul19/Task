import { toast } from "react-toastify";

export const Toastr = (type: "success" | "error", message: string) => {
  toast.dismiss();
  if (type === "success") {
    toast.success(message, {
      pauseOnHover: false,
      closeOnClick: true,
      autoClose: 2000,
    });
  } else if (type === "error") {
    toast.error(message, {
      pauseOnHover: false,
      closeOnClick: true,
      autoClose: 2000,
    });
  }
};