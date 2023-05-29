import React, { useState, FC } from "react";
import { Checkbox, Row, Col, Button, Spin ,Input} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useRejectAllBaseInfo } from "../../../../../Adjusters/AdjustersHook";
import {
  sendReasonReffer,
  fetchListJudicalCartable,
} from "../../../../../../redux/actions";
import { IRejectReasonReffer } from "../../../../../../shared/ulitities/Model/reffer";
import { IAneAdjusterList } from "../../../../../../shared/ulitities/Model/oneAdjuster";
import { adjusterType } from "../../../../../../shared/ulitities/Enums/adjusterTypeId";

interface IRejectReasonProps {
  closeModal: () => void;
  oneAdjusterList?: IAneAdjusterList;
}

const { TextArea } = Input;

const RejectDetemineStatus: FC<IRejectReasonProps> = ({
  closeModal,
  oneAdjusterList,
}) => {
  const { data: rejectAllBaseInfo, isLoading } = useRejectAllBaseInfo();
  const loadingRefer = useSelector((state: any) => state.reffer.loading);
  const dataJudicalModel = useSelector(
    (state: any) => state.listJudicalCartable.ModelJudicalCartable
  );
  const [description, setDescription] = useState("");
  const [other, setOther] = useState(false);
  const [valChecked, setValChecked] = useState([]);
  const dispatch = useDispatch();

  const onChange = (checkedValues: any) => {
    setValChecked(checkedValues);
  };
  const onChangeOther = (e: any) => {
    setOther(e.target.checked);
  };

  let rejectReasonReffer: IRejectReasonReffer = {
    id: oneAdjusterList?.CartableId,
    adjusterTypeId: adjusterType.judical,
    applicantId: oneAdjusterList?.ApplicantId,
    answer: "Return",
    message: null,
    rejectReasonIds: valChecked,
    description: description,
  };

  const returnHandler = () => {
    dispatch(
      sendReasonReffer(rejectReasonReffer, () => {
        dispatch(fetchListJudicalCartable(dataJudicalModel));
      })
    );
  };

  return (
    <div className="rejectDetemineStatus">
       <Row>
        <Col span={4} style={{ padding: "10px" }}>
          <Checkbox onChange={onChangeOther}>سایر</Checkbox>
        </Col>
        <Col span={12} style={{ padding: "10px" }}>
          {other && (
            <TextArea
              onChange={(e: any) => setDescription(e.target.value)}
              autoSize
              allowClear
            />
          )}
        </Col>
      </Row>
      <div className="bodyReject">
        {isLoading ? (
          <div className="customSpin">
            <Spin />
          </div>
        ) : (
          <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
            <Row>
              {rejectAllBaseInfo?.Result?.map(
                ({ Id, Title }: { Id: number; Title: string }) => {
                  return (
                    <Col span={12} key={Id} style={{ padding: "10px" }}>
                      <Checkbox value={Id}>{Title}</Checkbox>
                    </Col>
                  );
                }
              )}
            </Row>
          </Checkbox.Group>
        )}
      </div>
      <div className="submit">
        <Button
          type="primary"
          onClick={returnHandler}
          loading={loadingRefer ? true : false}
        >
          مرجوع
        </Button>
      </div>
    </div>
  );
};

export default RejectDetemineStatus;
