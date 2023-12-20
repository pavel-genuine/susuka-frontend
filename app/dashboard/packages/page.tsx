"use client";
/* eslint-disable react/display-name */
import React, {
  useState,
  useMemo,
  HTMLAttributes,
  HTMLProps,
  useEffect,
  useRef,
} from "react";
import Card from "@/components/ui/Card";
import { Icon } from "@iconify/react";
import { Menu } from "@headlessui/react";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
  Column,
} from "react-table";
import GlobalFilter from "@/components/partials/table/GlobalFilter";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputLabel,
  Slide,
} from "@mui/material";
import {} from "@material-ui/system";

import Flatpickr from "react-flatpickr";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { TransitionProps } from "@mui/material/transitions";
import Dropdown from "@/components/ui/Dropdown";
import { advancedTable, tableData, tableData2 } from "@/constant/table-data";
import { CSVLink } from "react-csv";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { fetchAllUsersProfile } from "@/redux/features/user/allUsersProfileSlice";
import { IUser, PLAN_STATUS, PLAN_TYPE } from "@/interfaces";
import { AppDispatch } from "@/store/index";

import Textinput from "@/components/ui/Textinput";
import Select from "@/components/ui/Select";
import DownloadIcon from "@mui/icons-material/Download";
import { fetchAllPlans } from "@/redux/features/plan/allPlansSlice";
import { planCreate } from "@/redux/features/plan/createPlanSlice";
import { base_url, createPlan, deletePlan, updatePlan } from "@/api/api";
import { set } from "react-hook-form";
import Textarea from "@/components/ui/Textarea";
import Link from "next/link";
import { subscriptionCreate } from "@/redux/features/subscription/createSubscriptionSlice";

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: any) {
  const ref = React.useRef(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <Checkbox ref={ref} className={className + " cursor-pointer"} {...rest} />
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Packages = () => {
  const COLUMNS: Column<IUser>[] = [
    {
      Header: "Id",
      accessor: "id",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    // {
    //   Header: "Name",
    //   accessor: "name",
    //   Cell: (row) => {
    //     return (
    //       <div className="inline-flex items-center">
    //         <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
    //           <img
    //             src={
    //               row?.cell?.value?.profilePicture
    //                 ? row?.cell?.value?.profilePicture
    //                 : "https://i.ibb.co/vj0Ctmj/user.png"
    //             }
    //             alt=""
    //             className="object-cover w-full h-full rounded-full"
    //           />
    //         </span>
    //         <p className="text-sm text-slate-600 dark:text-slate-300 capitalize w-[100px]">
    //           {row?.cell?.value}
    //         </p>
    //       </div>
    //     );
    //   },
    // },

    {
      Header: "Picture",
      accessor: "img",
      Cell: (row) => {
        return row?.cell?.value && <img className="w-[100px] h-[100px] mr-20 rounded" src={row?.cell?.value} alt="" />;
      },
    },
    
    {
      Header: "YARN COUNT",
      accessor: "yarn_count",
      Cell: (row) => {
        return <span className="normal-case">{row?.cell?.value}</span>;
      },
    },
 
    {
      Header: (
        <span className="text-slate-600 dark:text-slate-300 capitalize w-[100px] text-center">
          Added Date
        </span>
      ),
      accessor: "createdAt",
      Cell: (row) => {
        return (
          <p className="text-sm  text-center text-slate-600  dark:text-slate-300 capitalize w-[100px]">
            {row?.cell?.value ? new Date(row?.cell?.value)?.toDateString() : ""}
          </p>
        );
      },
    },

   

    {
      Header: "Color",
      accessor: "color",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 
                  bg-[${row?.cell?.value}]
               `}
            >
              {row?.cell?.value}
            </span>
          </span>
        );
      },
    },
 
    {
      Header: "Fabric Type",
      accessor: "fabric_type",
      Cell: (row) => {
        return (
          <p className="w-[100px] text-center">
            {row?.cell?.value ? row?.cell?.value : "--"}
          </p>
        );
      },
    },
    {
      Header: "QTY IN PO SHEET",
      accessor: "po_sheet",
      Cell: (row) => {


        return <span>{ row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "FIN. DIA(OPEN)",
      accessor: "fin_dia_open",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "CONS",
      accessor: "cons",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Grey",
      accessor: "grey",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Finish",
      accessor: "finish",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Receive QTY",
      accessor: "receive_qty",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Receiving Binc",
      accessor: "receiving_binc",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Delivery To Cutting",
      accessor: "delivery_to_cutting",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Total Delivery QTY",
      accessor: "total_delivery_qty",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
    {
      Header: "Stock Fabric QTY (KG)",
      accessor: "stock_fabric_qty",
      Cell: (row) => {

        return <span>{row?.cell?.value ? row?.cell?.value : "--"}</span>;
      },
    },
  
    {
      Header: "Action",
      accessor: "action",
      Cell: (row) => {
  

  
        return (
          <div >
            <Dropdown className="z-[10]" style={{zIndex:10}}
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
              classMenuItems="right-0 w-[140px] top-[110%] "
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item key={i}>
                    {item.name !== "delete"? (
                      <Link onClick={()=>{
                        !row?.row?.original?.subscription?.lenght &&
                        dispatch(subscriptionCreate({
                          planId:1,
                          userId:row?.row?.original?.id,
                          frequency:'monthly',
                          wordCredit:1000
                        }))
                      
                      }}
                        href={`/dashboard/utility/profile/${row?.row?.original?.id}`}
                      >
                        <div
                          className={`
              
                ${ "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                }
                 w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                 first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                        >
                          <span className="text-base">
                            <Icon icon={item.icon} />
                          </span>
                          <span>{item.name}</span>
                        </div>
                      </Link>
                    ) : (
                      <div
                        className={`
          
            ${
              item.name === "delete"
                ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
            }
             w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
             first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                      >
                        <span className="text-base">
                          <Icon icon={item.icon} />
                        </span>
                        <span>{item.name}</span>
                      </div>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const actions = [
    {
      name: "edit",
      icon: "heroicons:pencil-square",
    },

    {
      name: "delete",
      icon: "heroicons-outline:trash",
    },
  ];

  const dispatch: AppDispatch = useAppDispatch();
  const { plans } = useAppSelector((state) => state?.allPlans);

  const [datePicker, setDatePicker] = useState(new Date());
  const [actionApply, setActionApply] = React.useState(1);

  const [newPlan, setNewPlan] = React.useState({
    trialExpiredBy: 20,
    trial: true,
    status: PLAN_STATUS.ACTIVE,
    type: PLAN_TYPE.MONTHLY,
    primaryHeading: "",
    expiresBy: 30,
    features: [""],
  });

  const [updatedPlan, setUpdatedPlan] = React.useState({});
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(0);
  const [selectedDeletedId, setSelectedDeletedId] = React.useState(0);
  const [allSelectedDeletedIds, setAllSelectedDeletedIds] = React.useState([]);
  const [newPlans, setNewPlans] = React.useState([]);
  const [leftPlans, setLeftPlans] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(false);
  const [isDeleted, setIsDeleted] = React.useState(false);
  const [isInputFilled, setIsInputFilled] = React.useState(false);

  const [features, setFeatures] = useState("");
  const [editedFeatures, setEditedFeatures] = useState("");

  const [allUpdatedPlans, setAllUpdatedPlans] = useState([]);

  let allNewPlans = useRef([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPlan = async () => {
    setIsUpdated(true);

    setTimeout(() => {
      dispatch(planCreate({ ...newPlan, planFeatures: features.split("*") }));
    }, 2000);

  };

  const selectedPlan = plans?.find((plan) => plan?.id == selectedId);

  const selectedPalnFeatures=selectedPlan?.features?.map(i=>i?.name)

  const handleUpdatePlan = async () => {
    const res = await updatePlan(selectedId, {...updatedPlan , planFeatures: ['ff1','fff2','ff3','ff4']});
    console.log(res, "res");
  };
  const handleDeletePlan = async () => {
    setIsDeleted(true);
    const res = await deletePlan(selectedDeletedId);
    // console.log(res, "res");
  };
  console.log(features.split(","), "sp");

  useEffect(() => {
    allNewPlans.current.push(newPlan);

    setAllUpdatedPlans(() => [...allNewPlans.current]);

    features.split(",")?.length && setNewPlan((prev) => ({ ...prev }));

    dispatch(fetchAllPlans());

    setAllSelectedDeletedIds((prev) => [...prev, selectedDeletedId]);

    isUpdated && setNewPlans([...plans, isUpdated && newPlan]);
  }, [isUpdated, selectedDeletedId, features]);

  console.log(plans, "plans");
  console.log(editedFeatures, "....plans");
  console.log(updatedPlan, "u....plans");

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => newPlans, []);

  const tableInstance = useTable(
    {
      columns,
      data: isUpdated ? tableData2 : isDeleted ? leftPlans : tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    setSelectedDate,
    prepareRow,
    state: { selectedRowIds },
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize, selectedDate } = state;

  const csvData = [
    [
      "Id",
      "Name",
      "Price",
      "Words",
      "Words Shorten Key",
      "Duration",
      "Status",
      "Trial",
    ],
    ...plans.map(({ id, name, price, wordCredit, type, status, trial }) => [
      id,
      name,
      price,
      wordCredit,
      `${Number(wordCredit) / 1000}k`,
      type,
      status,
      trial ? "Yes" : "No",
    ]),
  ];

  // console.log(Object.keys(selectedRowIds),'ids');

  return (
    <>
      <div className="md:flex justify-between items-center  mb-6">
        <div className="w-10"></div>

        <div className="md:flex justify-between items-center space-x-5 ">
          {Object.keys(selectedRowIds).length ? (
            <Button
              className={"normal-case"}
              size="medium"
              style={{ backgroundColor: "red" }}
              startIcon={<DeleteIcon></DeleteIcon>}
              variant="contained"
            ></Button>
          ) : (
            ""
          )}
          <Button
            className={"normal-case"}
            size="medium"
            style={{ backgroundColor: "green" }}
            startIcon={<AddIcon></AddIcon>}
            variant="contained"
            onClick={handleClickOpen}
          >
            Add Product
          </Button>
        </div>
      </div>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <div className="md:flex  items-center md:space-x-10">
            <h4 className="card-title">Products List</h4>

            <CSVLink filename="planlist.csv" data={csvData}>
              <Button
                className={"normal-case"}
                size="medium"
                style={{ backgroundColor: "navy" }}
                startIcon={<DownloadIcon></DownloadIcon>}
                variant="contained"
              >
                CSV
              </Button>
            </CSVLink>

            <div>
              <Dialog
                className="rounded-md"
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle className=" bg-[black] text-[white]">
                  {"Add  New Product"}
                </DialogTitle>
                <DialogContent>
                  <div className="grid md:grid-cols-2 gap-4 mt-5 ">
                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                        Product Picture
                      </p>

                      <Textinput
                        className=""
                        onChange={(e) =>
                          setNewPlan((newPlan) => ({
                            ...newPlan,
                            id: plans[plans?.length - 1]?.id + 1,
                            name: e.target.value,
                          }))
                        }
                        id="outlined-basic"
                        type="text"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                        Product Color
                      </p>

                      <Textinput
                        className=""
                        onChange={(e) =>
                          setNewPlan((newPlan) => ({
                            ...newPlan,
                            price: Number(e.target.value),
                          }))
                        }
                        id="outlined-basic"
                        type="text"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                        Yarn Count
                      </p>

                      <Textinput
                        className=""
                        onChange={(e) =>
                          setNewPlan((newPlan) => ({
                            ...newPlan,
                            wordCredit: Number(e.target.value),
                          }))
                        }
                        id="outlined-basic"
                        type="text"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                        Grey
                      </p>
                      <Select
                        defaultValue={0}
                        options={[
                          { value: 1, label: PLAN_TYPE.MONTHLY },
                          { value: 2, label: PLAN_TYPE.YEARLY },
                        ]}
                        onChange={(e) =>
                          setNewPlan((newPlan) => ({
                            ...newPlan,
                            type:
                              e.target.value == 1
                                ? PLAN_TYPE.MONTHLY
                                : PLAN_TYPE.YEARLY,
                          }))
                        }
                      ></Select>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                        Receive QTY
                      </p>
                      <Select
                        defaultValue={1}
                        options={[
                          { value: 1, label: PLAN_STATUS.ACTIVE },
                          { value: 2, label: PLAN_STATUS.DISABLED },
                        ]}
                        onChange={(e) =>
                          setNewPlan((newPlan) => ({
                            ...newPlan,
                            status:
                              e.target.value == 1
                                ? PLAN_STATUS.ACTIVE
                                : PLAN_STATUS.DISABLED,
                          }))
                        }
                      ></Select>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                        Trial
                      </p>

                      <Select
                        defaultValue={1}
                        options={[
                          { value: 1, label: "Yes" },
                          { value: 2, label: "No" },
                        ]}
                        onChange={(e) =>
                          setNewPlan((newPlan) => ({
                            ...newPlan,
                            trial: e.target.value == 1 ? true : false,
                          }))
                        }
                      ></Select>
                    </div>

                    <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2">
                         Features
                      </p>

                      <Textarea
                        className=""
                        onChange={(e) => {
                          setFeatures(e.target.value);
                        }}
                        id="outlined-basic"
                        type="text"
                      />
                    </div>
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button
                    className={"normal-case"}
                    size="medium"
                    style={{ backgroundColor: "black" }}
                    onClick={() => {
                      handleClose();
                      handleAddPlan();
                    }}
                    variant="contained"
                  >
                    Apply
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

          <div>
            <Dialog
              className="rounded-md"
              open={openUpdate}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setOpenUpdate(false)}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle className=" bg-[black] text-[white]">
                {"Update Plan"}
              </DialogTitle>
              <DialogContent>
                <div className="grid md:grid-cols-2 gap-4 mt-5 ">
                  <div>
                    <p className="font-semibold text-sm text-slate-400 mb-2">
                      Plan Name
                    </p>

                    <Textinput
                      className=""
                      defaultValue={selectedPlan?.name}
                      onChange={(e) =>
                        setUpdatedPlan((updatedPlan) => ({
                          ...updatedPlan,
                          name: e.target.value,
                        }))
                      }
                      id="outlined-basic"
                      type="text"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-400 mb-2">
                      Plan Price
                    </p>

                    <Textinput
                      defaultValue={selectedPlan?.price}
                      className=""
                      onChange={(e) =>
                        setUpdatedPlan((updatedPlan) => ({
                          ...updatedPlan,
                          price: e.target.value,
                        }))
                      }
                      id="outlined-basic"
                      type="text"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-400 mb-2">
                      Words Credit
                    </p>

                    <Textinput
                      defaultValue={selectedPlan?.wordCredit}
                      className=""
                      onChange={(e) =>
                        setUpdatedPlan((updatedPlan) => ({
                          ...updatedPlan,
                          wordCredit: e.target.value,
                        }))
                      }
                      id="outlined-basic"
                      type="text"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-400 mb-2">
                      Duration Type
                    </p>
                    <Select
                      defaultValue={1}
                      options={[
                        { value: 1, label: PLAN_TYPE.MONTHLY },
                        { value: 2, label: PLAN_TYPE.YEARLY },
                      ]}
                      onChange={(e) =>
                        setUpdatedPlan((updatedPlan) => ({
                          ...updatedPlan,
                          type:
                            e.target.value == 1
                              ? PLAN_TYPE.MONTHLY
                              : PLAN_TYPE.YEARLY,
                        }))
                      }
                    ></Select>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-400 mb-2">
                      Status
                    </p>
                    <Select
                      defaultValue={1}
                      options={[
                        { value: 1, label: PLAN_STATUS.ACTIVE },
                        { value: 2, label: PLAN_STATUS.DISABLED },
                      ]}
                      onChange={(e) =>
                        setUpdatedPlan((updatedPlan) => ({
                          ...updatedPlan,
                          status:
                            e.target.value == 1
                              ? PLAN_STATUS.ACTIVE
                              : PLAN_STATUS.DISABLED,
                        }))
                      }
                    ></Select>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-400 mb-2">
                      Trial
                    </p>

                    <Select
                      defaultValue={1}
                      options={[
                        { value: 1, label: "Yes" },
                        { value: 2, label: "No" },
                      ]}
                      onChange={(e) =>
                        setUpdatedPlan((updatedPlan) => ({
                          ...updatedPlan,
                          trial: e.target.value == 1 ? true : false,
                        }))
                      }
                    ></Select>
                  </div>

                  <div>
                      <p className="font-semibold text-sm text-slate-400 mb-2 mt-3">
                        Plan Features
                      </p>

                      <textarea
                        defaultValue={selectedPalnFeatures }
                        className=" outline-[grey] rounded border p-2"
                        onChange={(e) => {
                          setEditedFeatures(e.target.value);
                          
                        }}
                        id="outlined-basic"
                        
                      
                      />
                    </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  className={"normal-case"}
                  size="medium"
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    setOpenUpdate(false);
                    handleUpdatePlan();
                  }}
                  variant="contained"
                >
                  Apply
                </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div>
            <Dialog
              className="rounded-md"
              open={openDelete}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setOpenDelete(false)}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle className=" bg-[black] text-[white]">
                {"Delete Plan"}
              </DialogTitle>
              <DialogContent>
                <div className=" md:w-[20vw] p-10 w-[80vw] md: flex justify-between align-center space-y-5 md:space-y-0">
                  <Button
                    className={"normal-case"}
                    size="medium"
                    style={{ backgroundColor: "red" }}
                    onClick={() => {
                      handleDeletePlan();
                      setOpenDelete(false);
                      setLeftPlans(
                        plans?.filter(
                          (plan) => !allSelectedDeletedIds?.includes(plan.id)
                        )
                      );
                    }}
                    variant="contained"
                  >
                    Delete
                  </Button>

                  <Button
                    className={"normal-case"}
                    size="medium"
                    style={{ backgroundColor: "green" }}
                    onClick={() => {
                      setOpenDelete(false);
                    }}
                    variant="contained"
                  >
                    Cancel
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="md:flex justify-between items-center space-x-5">
            <GlobalFilter
              selectedDate={datePicker}
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />

            <Button
              className="normal-case"
              variant="outlined"
              size="medium"
              startIcon={<FilterAltIcon></FilterAltIcon>}
            >
              {" "}
              Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " 🔽"
                              : " 🔼"
                            : ""}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();

                    return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key, ...restCellProps } = cell.getCellProps();

                          
                          return (
                            row?.original?.name!='Custom' && <td
                              key={key}
                              {...restCellProps}
                              className="table-td text-center"
                            >
                              {  cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse flex-wrap">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>

        <div className="mt-5">
          <p>
            Selected Rows:{" "}
            {Object.keys(selectedRowIds).map(
              (row) => row && <span>{Number(row) + 1}, </span>
            )}
          </p>
          <p>Selected Rows Quantity : {Object.keys(selectedRowIds).length}</p>
        </div>
      </Card>
    </>
  );
};

export default Packages;
