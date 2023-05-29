import React, {  useEffect, useState, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Input,
  Space,
  Tooltip,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "jalali-moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
  cartableReportAllInfo,
  dlcartableReportExcel,
} from "../../../redux/actions";
import { adjusterType } from "../../../shared/ulitities/Enums/adjusterTypeId";
import { messageWarning } from "../../../utils/utils";
import { IReport } from "../../../shared/ulitities/Model/report";
import { workTaskFlowId } from "../../../shared/ulitities/Enums/workTaskFlow";
import AdjusterInfoDetail from ".././Natural/InformationAdjuster/AdjusterInfoDetail/AdjusterInfoDetail";
import { ReactComponent as ArrowLeft } from "../../../assets/images/arrowLeft.svg";
import { ReactComponent as Xls } from "../../../assets/images/xls.svg";

const CompletedDossier = () => {
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(7);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [filterList, setFilterList] = useState<any>([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [record, setRecord] = useState({} as any);
  const [visibleDetailModal, setVisibleDetailModal] = useState(false);
  const searchInput = useRef<any>(null);
  // const [loading, setLoading] = useState(false);
  const [modelReport, setModelReport] = useState({} as any);
  const { allCourseByAdjusterType } = useSelector(
    (state: any) => state?.allCourse
  );

  const {
    cartableReportAllnfo,
    loading: tableDataLoading,
    loadingExcel,
  } = useSelector((state: any) => state?.cartableReportAllInfo);

  const { specializedField } = useSelector(
    (state: any) => state?.specializedField
  );

  let coursesFilter = allCourseByAdjusterType?.Result?.map((course: any) => {
    return {
      key: course.CourseId,
      text: course.Title,
      value: course.CourseId,
    };
  });

  let adjustmentFilter = specializedField?.Result?.map((field: any) => {
    return {
      key: field.AdjustmentFieldId,
      text: field.Title,
      value: field.AdjustmentFieldId,
    };
  });


  let dataSourse = cartableReportAllnfo?.data?.Result?.map((user: IReport) => {
    let obj = {
      AdjustmentFieldId: user.AdjustmentFieldId,
      AdjustmentFieldTitle: user.AdjustmentFieldTitle,
      ApplicantId: user.ApplicantId,
      key: user.ApplicantId,
      CourseTitle: user.CourseTitle,
      FamilyName: user.FamilyName,
      FirstName: user.FirstName,
      LicenseTypeTitle: user.LicenseTypeTitle,
      LicenseType: user.LicenseType,
      Mobile: user.Mobile,
      NationalCode: user.NationalCode,
      RegistrationCode: user.RegistrationCode,
      StateTitle: user.StateTitle,
      StatusTitle: user.StatusTitle,
      User: user?.User?.FullName,
      UserId: user.UserId,
      CartableId: user.CartableId,
      InterviewTime:
        user?.InterviewTime == null
          ? "تعیین نگردیده "
          : moment(user?.InterviewTime?.split("T")[0]).format("jYYYY-jMM-jDD"),
    };
    return obj;
  });


  const usersListNotEditted = useSelector(
    (state: any) => state.usersForCartable.users?.Result
  );
  const usersListFilter = usersListNotEditted?.map((i: any) => {
    return { value: i?.UserId, text: i?.UserName, key: i?.UserId };
  });

  const exelHandler = () => {
    cartableReportAllnfo?.data?.Result.length === 0
      ? messageWarning("لیستی برای خروجی اکسل وجود ندارد")
      : dispatch(dlcartableReportExcel(modelReport, adjusterType.natural));
  };

  useEffect(() => {
    let cartableReport = {
      firstPageSize: pageSize,
      pageSize: pageSize,
      pageIndex: pageIndex,
      orderBy: "ApplicantId",
      filters:
        filterList.length === 0
          ? [
              {
                operator: 1,
                propertyName: "StateId",
                value: workTaskFlowId.CompletedDossier,
              },
            ]
          : filterList,
    };
    setModelReport(cartableReport);
    dispatch(
      cartableReportAllInfo(cartableReport, adjusterType.natural, () => {})
    );
  }, [filterList, pageSize, pageIndex]);


  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    setFilterList([]);
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`جستجو ${
            dataIndex === "RegistrationCode"
              ? "کدرهگیری"
              : dataIndex === "FirstName"
              ? "نام"
              : dataIndex === "FamilyName"
              ? "نام خانوادگی"
              : dataIndex === "NationalCode"
              ? "کد ملی"
              : dataIndex === "degree"
              ? "مدرک تحصیلی"
              : dataIndex === "AdjusterCode"
              ? "کد ارزیابی"
              : dataIndex === "AdjustmentFieldTitle"
              ? "زمینه تخصصی"
              : dataIndex === "Mobile"
              ? "تلفن همراه"
              : null
          }`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            باز نشانی
          </Button>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            جستجو
          </Button>
        </Space>
      </div>
    ),
    render: (text: any) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const fileDetail = (record: any) => {
    setRecord(record);
    setVisibleDetailModal(true);
  };

  const columns = [
    {
      title: "زمان مصاحبه",
      dataIndex: "InterviewTime",
      key: "InterviewTime",
      width: "7%",
    },

    {
      title: "نام",
      dataIndex: "FirstName",
      key: "firstName",
      width: "8%",
      ...getColumnSearchProps("FirstName"),
    },

    {
      title: "نام خانوادگی",
      dataIndex: "FamilyName",
      key: "familyName",
      width: "10%",
      ...getColumnSearchProps("FamilyName"),
      // sorter: (a: any, b: any) => a?.FamilyName?.localeCompare(b?.FamilyName),
    },
    {
      title: "کدملی",
      dataIndex: "NationalCode",
      key: "NationalCode",
      width: "7%",
      ...getColumnSearchProps("NationalCode"),
    },
    {
      title: "تلفن همراه",
      dataIndex: "Mobile",
      key: "Mobile",
      width: "7%",
      ...getColumnSearchProps("Mobile"),
    },
    {
      title: "زمینه تخصصی",
      dataIndex: "AdjustmentFieldTitle",
      width: "10%",
      filters: adjustmentFilter,
    },
    {
      title: "نام و نام خانوادگی کارشناس",
      dataIndex: "User",
      filters: usersListFilter,
      width: "13%",
    },
    {
      title: "دوره",
      dataIndex: "CourseTitle",
      // width: "16%",
      filters: coursesFilter,
    },

    {

      render: (p: any, record: any) => (
        <>
          <div className="detailColum" onClick={() => fileDetail(record)}>
            <ArrowLeft />
          </div>
        </>
      ),
    },
  ];

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    let filteredIndictmentList = [
      {
        operator: 1,
        propertyName: "StateId",
        value: workTaskFlowId.CompletedDossier,
      },
    ] as any;

    


    if (filters.familyName != null) {
      filteredIndictmentList.push({
        propertyName: "FamilyName",
        operator: 1,
        value: filters?.familyName[0],
      });
    }

    if (filters.firstName != null) {
      filteredIndictmentList.push({
        propertyName: "FirstName",
        operator: 1,
        value: filters?.firstName[0],
      });
    }
    if (filters.NationalCode != null) {
      filteredIndictmentList.push({
        propertyName: "NationalCode",
        operator: 1,
        value: filters?.NationalCode[0],
      });
    }
    if (filters.Mobile != null) {
      filteredIndictmentList.push({
        propertyName: "Mobile",
        operator: 1,
        value: filters?.Mobile[0],
      });
    }
    if (filters.AdjusterCode != null) {
      filteredIndictmentList.push({
        propertyName: "AdjusterCode",
        operator: 1,
        value: filters?.AdjusterCode[0],
      });
    }
    if (filters.RegistrationCode != null) {
      filteredIndictmentList.push({
        propertyName: "RegistrationCode",
        operator: 1,
        value: filters?.RegistrationCode[0],
      });
    }
    if (filters.AdjustmentFieldTitle != null) {
      let first = [...filters.AdjustmentFieldTitle].shift();
      let last = [...filters.AdjustmentFieldTitle].pop();
      let fitrstIndex = filters.AdjustmentFieldTitle.indexOf(first);
      let lastIndex = filters.AdjustmentFieldTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "AdjustmentFieldId",
          operator: 1,
          value: filters?.AdjustmentFieldTitle[0],
        });
      }

      if (filters.AdjustmentFieldTitle.length > 1) {
        for (let i = 0; i < filters.AdjustmentFieldTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.AdjustmentFieldTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (
            i !== filters.AdjustmentFieldTitle.length - 1 &&
            i !== fitrstIndex
          ) {
            filteredIndictmentList.push({
              propertyName: "AdjustmentFieldId",
              operator: 1,
              value: filters?.AdjustmentFieldTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (filters.CourseTitle != null) {
      let first = [...filters.CourseTitle].shift();
      let last = [...filters.CourseTitle].pop();
      let fitrstIndex = filters.CourseTitle.indexOf(first);
      let lastIndex = filters.CourseTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "CourseId",
          operator: 1,
          value: filters?.CourseTitle[0],
        });
      }

      if (filters.CourseTitle.length > 1) {
        for (let i = 0; i < filters.CourseTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CourseId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.CourseTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "CourseId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.CourseTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "CourseId",
              operator: 1,
              value: filters?.CourseTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (filters.StateTitle != null) {
      let first = [...filters.StateTitle].shift();
      let last = [...filters.StateTitle].pop();
      let fitrstIndex = filters.StateTitle.indexOf(first);
      let lastIndex = filters.StateTitle.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "StateId",
          operator: 1,
          value: filters?.StateTitle[0],
        });
      }

      if (filters.StateTitle.length > 1) {
        for (let i = 0; i < filters.StateTitle.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.StateTitle.length - 1) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.StateTitle.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "StateId",
              operator: 1,
              value: filters?.StateTitle[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    if (filters.LicenseType != null) {
      let first = [...filters.LicenseType].shift();
      let last = [...filters.LicenseType].pop();
      let fitrstIndex = filters.LicenseType.indexOf(first);
      let lastIndex = filters.LicenseType.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "LicenseType",
          operator: 1,
          value: filters?.LicenseType[0],
        });
      }

      if (filters.LicenseType.length > 1) {
        for (let i = 0; i < filters.LicenseType.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "LicenseType",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.LicenseType.length - 1) {
            filteredIndictmentList.push({
              propertyName: "LicenseType",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.LicenseType.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "LicenseType",
              operator: 1,
              value: filters?.LicenseType[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }
    if (filters.User != null) {
      let first = [...filters.User].shift();
      let last = [...filters.User].pop();
      let fitrstIndex = filters.User.indexOf(first);
      let lastIndex = filters.User.indexOf(last);

      if (fitrstIndex == lastIndex) {
        filteredIndictmentList.push({
          propertyName: "UserId",
          operator: 1,
          value: filters?.User[0],
        });
      }

      if (filters.User.length > 1) {
        for (let i = 0; i < filters.User.length; i++) {
          //اولی
          if (i == fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "UserId",
              operator: 1,
              value: first,
              operand: 1,
              isOpenGroup: true,
              isCloseGroup: false,
            });
          }

          //آخری
          if (i == filters.User.length - 1) {
            filteredIndictmentList.push({
              propertyName: "UserId",
              operator: 1,
              value: last,
              operand: 0,
              isOpenGroup: false,
              isCloseGroup: true,
            });
          }

          //منهای اخری
          if (i !== filters.User.length - 1 && i !== fitrstIndex) {
            filteredIndictmentList.push({
              propertyName: "UserId",
              operator: 1,
              value: filters?.User[i],
              operand: 1,
              isOpenGroup: false,
              isCloseGroup: false,
            });
          }
        }
      }
    }

    setFilterList(filteredIndictmentList);
  };

  return (
    <>
      <Tooltip title="خروجی اکسل">
        <Button
          type="dashed"
          onClick={exelHandler}
          loading={loadingExcel}
          style={{ position: "absolute", left: "32px", top: "101px" }}
          icon={<Xls className="excel" />}
          className="centerIconButton iconCenter"
        ></Button>
      </Tooltip>
      <Table
        columns={columns}
        dataSource={dataSourse}
        loading={tableDataLoading }
        onChange={handleTableChange}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          total: cartableReportAllnfo?.data?.TotalCount,
          onChange: (current: number, pageSize: any) => {
            setPageSize(pageSize);
            setPageIndex(current);
          },
          locale: { items_per_page: "/ صفحه" },
          style: { color: "red" },
          // pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
          // onShowSizeChange: (current: any, pageSize: any) => setPageSize(pageSize),
        }}
        showSorterTooltip={{ title: "ترتیب افزایشی / کاهشی" }}
        footer={() => ` تعداد کل:${cartableReportAllnfo?.data?.TotalCount??0}`}
        locale={{
          filterReset: (
            <span
              onClick={() => {
                document
                  .querySelector(".ant-dropdown")!
                  .classList.add("ant-dropdown-hidden");
                setFilterList([]);
              }}
            >
              باز نشانی
            </span>
          ),
          filterConfirm: "جستجو",
          filterEmptyText: "یافت نشد",
          emptyText: "ارزیاب یافت نشد.",
        }}
      />
      <Modal
        visible={visibleDetailModal}
        title={`پرونده  ${record.FirstName} ${record.FamilyName}`}
        onCancel={() => {
          setVisibleDetailModal(false);
        }}
        footer={null}
        width={1000}
        // destroyOnClose={true}
      >
        <AdjusterInfoDetail
          oneAdjusterList={record}
          closeFileDetail={() => setVisibleDetailModal(false)}
          isFromReportTable={false}
          isInterviewInvitation={true}
          modelReport={modelReport}
          
        />
      </Modal>
    </>
  );
};

export default CompletedDossier;
