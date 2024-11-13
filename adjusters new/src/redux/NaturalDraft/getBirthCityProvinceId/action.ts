//redux
import {
  GET_BIRTH_CITY_PROVINCE_ID,
  GET_BIRTH_CITY_PROVINCE_ID_SUCCESS,
  GET_BIRTH_CITY_PROVINCE_ID_FAILED,
} from "../../../constant/actionTypes";

//apis
import { apiRegistrationToken } from "../../../httpServices/service";

export const getBirthCityProvinceIdNatural = (provinceId: number) => async (
  dispatch: any
) => {
  try {
    dispatch({ type: GET_BIRTH_CITY_PROVINCE_ID });
    const { data } = await apiRegistrationToken.get(
      `/registration/natural/base-info/city/${provinceId}`
    );
    dispatch({
      type: GET_BIRTH_CITY_PROVINCE_ID_SUCCESS,
      payload: data,
    });
  } catch (error: any) {
    dispatch({
      type: GET_BIRTH_CITY_PROVINCE_ID_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
