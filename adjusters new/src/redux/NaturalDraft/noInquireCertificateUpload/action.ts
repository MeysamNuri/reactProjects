import {
  NO_INQUIRE_CERTIFICATE_UPLOAD,
  NO_INQUIRE_CERTIFICATE_UPLOAD_SUCCESS,
  NO_INQUIRE_CERTIFICATE_UPLOAD_FAILD,
} from "../../../constant/actionTypes";
import { apiRegistrationToken } from "../../../httpServices/service";
import { toast } from "react-toastify";

export const noInquireCertificateUploadEdit = (
  gotIdForMainEdit: any,
  file: any,
  fieldId: any,
  successFunction: () => void
) => async (dispatch: any) => {
  let formData = new FormData();
  formData.append("id", gotIdForMainEdit);
  formData.append("fieldId", fieldId);
  formData.append("adjusterType", "1");
  formData.append("file", file);

  try {
    dispatch({
      type: NO_INQUIRE_CERTIFICATE_UPLOAD,
    });
    const { data } = await apiRegistrationToken.post(
      `/applicant-80hour-certificate`,
      formData
    );
    if (data?.IsSucceed === true) {
      toast.success("گواهینامه رشته تخصصی به درستی آپلود گردید", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      successFunction();
    } else {
      toast.error(`${data?.Message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    dispatch({
      type: NO_INQUIRE_CERTIFICATE_UPLOAD_SUCCESS,
      payload: data,
    });
    successFunction();
  } catch (error: any) {
    dispatch({
      type: NO_INQUIRE_CERTIFICATE_UPLOAD_FAILD,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};