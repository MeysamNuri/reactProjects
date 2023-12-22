import {
  POST_SUB_FIELD_INFO_DRAFT,
  POST_SUB_FIELD_INFO_DRAFT_SUCCESS,
  POST_SUB_FIELD_INFO_DRAFT_FAILED,
} from "../../../constant/commonTypes";

const INIT_STATE = {
  loading: false,
  feildInfo: null,
  data: null,
};

export default (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case POST_SUB_FIELD_INFO_DRAFT:
      return { ...state, loading: true };
    case POST_SUB_FIELD_INFO_DRAFT_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case POST_SUB_FIELD_INFO_DRAFT_FAILED:
      return { ...state, loading: false, error: action.payload };

    default:
      return { ...state };
  }
};
