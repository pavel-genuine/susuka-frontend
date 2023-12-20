"use client";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import BasicArea from "@/components/partials/chart/appex-chart/BasicArea";
import { Icon } from "@iconify/react";
import Textinput from "@/components/ui/Textinput";
import IconButton from "@mui/material/IconButton";
import Flatpickr from "react-flatpickr";
import axios from "axios";
import SaveIcon from "@mui/icons-material/Save";

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import { Tab } from "@headlessui/react";
import { advancedTable } from "@/constant/table-data";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { AppDispatch } from "@/store/index";
import { fetchUserProfile } from "@/redux/features/user/userProfileSlice";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/navigation";
import { IUser } from "@/interfaces";
import Select from "@/components/ui/Select";
import { base_url, getAllPlans, updateUserProfile } from "@/api/api";
import { fetchAllPlans } from "@/redux/features/plan/allPlansSlice";
import { subscriptionUpdate } from "@/redux/features/subscription/updateSubscriptionSlice";
import { fetchAllSubscriptions } from "@/redux/features/subscription/allSubscriptionsSlice";
import { updateProfile } from "@/redux/features/user/updateUserSlice";
import { subscriptionCreate } from "@/redux/features/subscription/createSubscriptionSlice";

const columns = [
  {
    label: "BROWSER",
    field: "age",
  },
  {
    label: "DEVICE",
    field: "first_name",
  },
  {
    label: "Location",
    field: "first_name",
  },

  {
    label: "RECENT ACTIVITY",
    field: "date",
  },
];
// slice(0, 10) is used to limit the number of rows to 10
const rows = advancedTable.slice(0, 7);

const buttons = [
  {
    title: "Personal Details",
    icon: "heroicons-outline:identification",
  },
  {
    title: "Security",
    icon: "heroicons-outline:shield-check",
  },
  {
    title: "Billing",
    icon: "heroicons-outline:banknotes",
  },
  {
    title: "Notification",
    icon: "heroicons-outline:bell",
  },
  {
    title: "Settings",
    icon: "heroicons-outline:cog",
  },
];

const statistics = [
  {
    topic: "Credit Used (Monthly)",

    title: "Words",
    title2: "Images",
    count: "45",
    bg: "bg-success-500",
    text: "text-success-500",
    percent: "8.67%",
    icon: "heroicons-outline:chart-pie",
  },
  {
    topic: "Credit Used (Lifetime)",
    title: "Words",
    title2: "Images",
    count: "45",
    bg: "bg-warning-500",
    text: "text-warning-500",
    percent: "8.67%",
    icon: "heroicons-outline:chart-pie",
  },
  {
    topic: "Document Generated",
    title: "Words",
    count: "64",
    bg: "bg-info-500",
    text: "text-info-500",
    percent: "25.67% ",
    icon: "heroicons-outline:menu-alt-1",
  },
];

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const GroupChart = ({ profile: IUser }) => {
  return (
    <div className="md:flex md:space-x-5 space-y-5 md:space-y-0  md:py-8 py-5  ">
      {statistics.map((item, i) => (
      <div
          key={i}
          className={`${item.bg} lg:w-[20vw] rounded-md p-4 bg-opacity-[0.15] dark:bg-opacity-50 flex items-center justify-between  `}
        >
          <div>
            <p className="text-lg text-slate-600 dark:text-white mb-3">
              {item.topic}
            </p>
            {item?.title2 ? (
              <div>
                <p className="block  text-[black] font-medium dark:text-white mb-1">
                  {item.title}: 1000
                </p>
                <p className="block  text-[black] font-medium dark:text-white mb-1">
                  {item.title2}: 100
                </p>
              </div>
            ) : (
              <p className="block  text-[black] text-lg font-semibold dark:text-white mb-1">
                20
              </p>
            )}
          </div>

          <div
            className={`${item.text} h-10 w-10 flex flex-col items-center justify-center rounded-full bg-white text-2xl mt-6 `}
          >
            <Icon icon={item.icon} />
          </div>
        </div>
      ))}
    </div>
  );
};

const profile = ({ params }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [open, setOpen] = useState(false);
  let [addLeftCredit, setAddLeftCredit] = useState(false);

  const [updatedPlan, setUpdatedPlan] = useState("");

  interface PlanData {
    planId?: Number;
    name?: String;
  }
  const [activeDate, setActiveDate] = React.useState(new Date());
  const [isUpdatePlan, setIsUpdatedPlanData] = React.useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = React.useState(0);
  const [updatePlanData, setUpdatedPlanData] = React.useState<PlanData>({});
  const [updateCreditSummary, setUpdateCreditSummary] = React.useState({});
  const [updateUserPlan, setUpdateUserPlan] = React.useState({});
  const [updateProfileData, setUpdateProfileData] = React.useState({});
  const [updateConfirmPassword, setUpdateConfirmPassword] = React.useState("");
  const [updateNewPassword, setUpdateNewPassword] = React.useState("");
  const [expiredDate, setExpiredDate] = React.useState(new Date());
  // const [wordsCredit,setWordsCredit]=useState(0)
  // const [updatedWordsCredit,setUpdatedWordsCredit]=useState(0)
  // const [leftdWordsCredit,setLeftWordsCredit]=useState(0)
  // const [updatedLeftWordsCredit,setUpdatedLeftWordsCredit]=useState(0)
  // const [expiredDate, setExpiredDate] = React.useState(new Date());
  // const [bonusExpiredDate, setBonusExpiredDate] = React.useState(new Date());
  const [updatedExpiredDate, setUpdatedExpiredDate] = React.useState(
    new Date()
  );
  const [updatedBonusExpiredDate, setupdatedBonusExpiredDate] = React.useState(
    new Date()
  );
  const [saveCreditSummary, setSaveCreditSummary] = useState({});

  const { profile, isLoading, error } = useAppSelector(
    (state) => state?.userProfile
  );
  const subscription = profile?.subscription[profile?.subscription?.length - 1];

  const wordsCredit = profile?.wordCredit;
  const subscriptionWordsCredit = subscription?.wordCredit;

  const [currentWordsCredit, setCurrentWordsCredit] = useState(0);

  const router = useRouter();

  const handleUpdatePlan = () => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { plans } = useAppSelector((state) => state?.allPlans);

  const res = useAppSelector((state) => state?.updateSubscription);
  const res2 = useAppSelector((state) => state?.allSubscriptions);

  const dispatch: AppDispatch = useAppDispatch();

  const selectedPlan = plans.find((plan) => plan?.id == updatePlanData?.planId);

  console.log(profile, "profile");

  const onSubmitSavePersonalDetails = async () => {
    dispatch(updateProfile({ id: params?.profile, data: updateProfileData }));
  };

  const onSubmitChangePassword = () => {
    dispatch(
      updateProfile({
        id: params?.profile,
        data: { newPassword: updateConfirmPassword },
      })
    );
  };

  const onSubmitUpdatePlan = () => {
    setIsUpdatedPlanData(true);

    dispatch(
      updateProfile({
        id: params?.profile,
        data: {
          wordCredit: currentWordsCredit
            ? currentWordsCredit
            : addLeftCredit
            ? Number(selectedPlan?.wordCredit) +
              Number(subscription?.wordCredit ? subscription?.wordCredit : 0)
            : Number(selectedPlan?.wordCredit),
          planExpiredBy:
            expiredDate != new Date() ? expiredDate : planExpiredDate,
          planActiveDate: new Date(),
        },
      })
    );

    const submit = dispatch(
      subscriptionUpdate({
        id: subscription?.id,
        data: {
          planId: selectedPlan?.id,
          wordCredit: currentWordsCredit
            ? currentWordsCredit
            : addLeftCredit
            ? Number(selectedPlan?.wordCredit) +
              Number(subscription?.wordCredit ? subscription?.wordCredit : 0)
            : Number(selectedPlan?.wordCredit),
          createdAt: new Date(),
        },
      })
    );
    // }
  };

  const onSaveCreditSummary = () => {
    setIsUpdatedPlanData(true);

    // if (profile?.subscription?.length) {

    const planId = subscription?.planId;

    dispatch(
      updateProfile({
        id: params?.profile,
        data: {
          wordCredit: currentWordsCredit
            ? currentWordsCredit
            : addLeftCredit
            ? Number(selectedPlan?.wordCredit) +
              Number(subscription?.wordCredit ? subscription?.wordCredit : 0)
            : Number(selectedPlan?.wordCredit),
          planExpiredBy:
            expiredDate != new Date() ? expiredDate : planExpiredDate,
        },
      })
    );

    const submit = dispatch(
      subscriptionUpdate({
        id: subscription?.id,
        data: {
          planId: planId,
          wordCredit: currentWordsCredit,
          createdAt: new Date(),
        },
      })
    );
    // }
  };

  const handleCancelSubscription = () => {
    if (profile?.subscription?.length) {
      const id = subscription?.id;
      const submit = dispatch(
        subscriptionUpdate({
          id,
          data: {
            status: "cancelled",
          },
        })
      );
    }
  };

  const today = new Date();
  const planExpiredDate = new Date(
    new Date().setDate(
      profile?.subscription?.length > 0
        ? new Date(
            profile?.subscription[
              profile?.subscription?.length - 1
            ]?.plan?.createdAt
          ).getDate() + subscription?.plan?.expiresBy
        : new Date(plans[0]?.createdAt).getDate() + plans[0]?.expiresBy
    )
  );

  const userPlanExpiredDate = profile?.planExpiredBy
    ? new Date(profile?.planExpiredBy)
    : new Date(
        new Date().setDate(
          profile?.planActiveDate
            ? new Date(profile?.planActiveDate).getDate()
            : new Date(profile?.createdAt).getDate() + +30
        )
      );

  const diff: any = Math.ceil(
    Math.abs(expiredDate[0]?.getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const bonusExpiredDate = new Date(
    new Date().setDate(
      profile?.bonusActiveDate
        ? new Date(profile?.bonusActiveDate).getDate() + profile?.bonusExpiredBy
        : today.getDate() + profile?.bonusExpiredBy
    )
  );
  const selectedPlanExpiredDate = new Date(
    new Date().setDate(today.getDate() + selectedPlan?.expiresBy)
  );

  const usedWordsCredit =
    // profile?.subscription?.length ?
    profile?.usedWordCredit;
  // : 0;

  const selectedPlanCredit = selectedPlan?.wordCredit;

  const leftWordsCdredit = wordsCredit - usedWordsCredit;

  const updatedWordsCredit = selectedPlanCredit;

  const updatedWordsCreditAdding = selectedPlanCredit + leftWordsCdredit;

  useEffect(() => {
    dispatch(fetchUserProfile(params?.profile));
    dispatch(fetchAllSubscriptions());

    dispatch(fetchAllPlans());
  }, []);

  return (
    <div>
      <div className="space-y-5 profile-page">
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-4 col-span-12">
            <div className=" md:p-8 p-5 rounded-lg bg-white dark:bg-slate-800 flex  justify-center items-center md:h-[350px]">
              <div className=" flex-none md:text-start text-center">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex-none">
                    <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                      <img
                        src={
                          profile?.profilePicture
                            ? profile?.profilePicture
                            : "https://i.ibb.co/vj0Ctmj/user.png"
                        }
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                      <span className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]">
                        <Icon icon="heroicons:pencil-square" />
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 md:pt-5 pt-3 ">
                    <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px] text-center">
                      {profile?.name}
                    </div>
                    <div className="text-sm font-light text-slate-600 dark:text-slate-400 text-center">
                      {profile?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 col-span-12 ">
            <Card
              className="custom-class bg-white dark:bg-slate-800   md:h-[350px] "
              title="User Overview"
            >
              <GroupChart profile={profile}></GroupChart>
            </Card>
          </div>
        </div>

        <div>
          <Dialog
            fullWidth={true}
            maxWidth={"md"}
            className="rounded-md  "
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <div className="relative">
              <span className="absolute right-3 top-3">
                <IconButton
                  onClick={() => handleClose()}
                  color="default"
                  className=" bg-gray-400"
                  aria-label="delete"
                >
                  <CloseIcon />
                </IconButton>
              </span>
              <DialogTitle className=" bg-slate-800 text-[white]">
                {"Update Plan (Manually)"}
              </DialogTitle>
              <DialogContent>
                <form className="space-y-4 pl-1 pr-3 py-5">
                  <div className="pb-5 border-b dark:border-slate-700 border-gray-200 flex justify-between items-center ">
                    <p className=" font-semibold text-sm md:text-md ">
                      Active Plan :{" "}
                      <span className="text-success-500">
                        {profile?.subscription?.length > 0
                          ? subscription?.plan?.name
                          : "Free Plan"}
                      </span>
                    </p>

                    <div className="flex items-center">
                      <p className="font-semibold text-sm md:text-md mr-5 ">
                        Select Plan :{" "}
                      </p>
                      <Select
                        icon=""
                        className=""
                        options={plans?.map((plan) => {
                          return {
                            value: plan?.id,
                            label: plan?.name,
                          };
                        })}
                        onChange={(e) => {
                          setUpdatedPlanData((updatePlanData) => ({
                            ...updatePlanData,
                            planId: e.target.value,
                          }));

                          setUpdatedPlan(
                            e.target.value == 1
                              ? "Free Plan"
                              : e.target.value == 2
                              ? "Basic"
                              : e.target.value == 3
                              ? "Premium"
                              : e.target.value == 4 && "Premimum Old"
                          );
                        }}
                      ></Select>
                    </div>
                  </div>

                  <div className="md:flex  justify-between md:space-x-5 space-y-5 md:space-y-0">
                    <div className="space-y-4 ">
                      <p className=" mb-2 text-center">Current Plan</p>

                      <div className="flex items-center space-x-5">
                        <p className="font-semibold text-sm text-slate-400 mb-2 w-[100px]">
                          Active Plan
                        </p>
                        <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                          {profile?.subscription?.length > 0
                            ? subscription?.plan?.name
                            : ""}
                        </p>
                      </div>

                      <div className="flex items-center space-x-5">
                        <p className="font-semibold text-sm text-slate-400 mb-2 w-[100px]">
                          Current Plan Credit
                        </p>
                        <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                          {wordsCredit}
                        </p>
                      </div>

                      <div className="flex items-center space-x-5">
                        <p className="font-semibold text-sm text-slate-400 mb-2 w-[100px]">
                          Left Credit
                        </p>
                        <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                          {leftWordsCdredit}
                        </p>
                      </div>

                      <div className="flex items-center space-x-5">
                        <p className="font-semibold text-sm text-slate-400 mb-2 w-[100px]">
                          Active Date
                        </p>
                        <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                          {profile?.planActiveDate
                            ? new Date(
                                profile?.planActiveDate
                              )?.toLocaleDateString()
                            : new Date(
                                profile?.createdAt
                              )?.toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-5">
                        <p className="font-semibold text-sm text-slate-400 mb-2 w-[100px]">
                          Expired Date
                        </p>
                        <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                          {""}
                        </p>
                      </div>
                    </div>

                    {/* new plan */}

                    <div className="space-y-4 ">
                      <p className=" mb-2 text-center">New Plan</p>

                      <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                        {selectedPlan?.name}
                      </p>

                      <Textinput
                        // name={" "}
                        // register={register}
                        className="px-3 py-1 border border-[black]  h-[37.5px] w-[220px]"
                        type="text"
                        defaultValue={selectedPlan?.wordCredit}
                        horizontal
                        onChange={(e) => {
                          setCurrentWordsCredit(e.target.value);
                        }}
                      />

                      <div className="md:pb-2">
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) =>
                                setAddLeftCredit(e.target.checked)
                              }
                            />
                          }
                          label="Add Left Credit?"
                        />
                      </div>
                      <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                        {selectedPlan && new Date()?.toLocaleDateString()}
                      </p>
                      <p className="px-3 py-1  h-[37.5px] w-[220px] border border-grey-800 rounded">
                        {selectedPlan &&
                          selectedPlanExpiredDate?.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="space-y-4 ">
                      <p className=" mb-2 text-center">
                        Updated Plan (Summary)
                      </p>

                      <p className="px-3 py-1 h-[37.5px] w-[220px] border border-grey-800 rounded">
                        {selectedPlan ? (
                          <span>
                            {subscription?.plan?.name} ={">"}
                            {selectedPlan?.name}
                          </span>
                        ) : (
                          ""
                        )}
                      </p>

                      <Textinput
                        // name={" "}
                        // register={register}
                        className="px-3 py-1 border border-[black]  h-[37.5px] w-[220px]"
                        id="h_Words_Credit"
                        type="text"
                        defaultValue={
                          addLeftCredit
                            ? selectedPlanCredit + wordsCredit
                            : selectedPlan && selectedPlanCredit
                        }
                        horizontal
                        onChange={(e) => {
                          setCurrentWordsCredit(e.target.value);
                        }}
                      />

                      <div className=" md:h-[52px]"></div>

                      <p className="px-3 py-1 h-[37.5px] w-[220px] border border-grey-800 rounded">
                        {selectedPlan && new Date()?.toLocaleDateString()}
                      </p>
                      <Flatpickr
                        label="Expired Date"
                        value={
                          selectedPlan &&
                          selectedPlanExpiredDate?.toLocaleDateString()
                        }
                        // value={new Date(new Date().setDate(new Date().getDate() - 30))}

                        id="disabled-picker"
                        className="rounded border border-[black] w-[220px] px-3 py-2"
                        onChange={(date) => {
                          setExpiredDate(date);
                        }}
                        options={{
                          dateFormat: "d/m/Y",
                          disable: [
                            {
                              from: new Date(),
                              // eslint-disable-next-line no-mixed-operators
                              to: new Date(
                                new Date().getTime() + 120 * 60 * 60 * 1000
                              ),
                            },
                          ],
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-row-reverse">
                  {isLoadingBtn==7 ? (
                      <LoadingButton
                      className={"normal-case"}
                      size="medium"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Applying
                      </LoadingButton>
                    ):
                    <Button
                      className={"normal-case my-5"}
                      size="medium"
                      style={{ backgroundColor: "black" }}
                      onClick={() => {
                      
                        setTimeout(() => {
                          handleClose();
                        }, 2000);

                        setIsLoadingBtn(7);
                        setTimeout(() => {
                          setIsLoadingBtn(0);
                        }, 2000);

                        setTimeout(() => {
                          onSubmitUpdatePlan();
                        }, 2000);
                      }}
                      variant="contained"
                    >
                      Apply
                    </Button>
}
                  </div>
                </form>
              </DialogContent>
            </div>
          </Dialog>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-4 col-span-12 relative  ">
            <Card bodyClass="p-0">
              <form>
                <div className=" md:flex justify-between w-[100%] px-5 pt-5">
                  <p className="mb-4 md:mb-0 text-lg md:text-md font-semibold">
                    User Credit Summary
                  </p>
                  <Button
                    onClick={() => handleClickOpen()}
                    className={"normal-case "}
                    size="medium"
                    style={{ backgroundColor: "black" }}
                    startIcon={<UpdateIcon></UpdateIcon>}
                    variant="contained"
                  >
                    Update Plan
                  </Button>
                </div>
                <div className="border-b dark:border-slate-700 border-gray-200 ">
                  <p className="px-5 pt-2 pb-5 font-semibold ">
                    Active Plan :{" "}
                    <span className="text-success-500">
                      {isUpdatePlan
                        ? selectedPlan?.name
                        : profile?.subscription?.length > 0
                        ? subscription?.plan?.name
                        : "Free Plan"}
                    </span>
                  </p>
                </div>
                <div className="space-y-4 p-5 mt-2 capitalize">
                  <p className=" ">
                    {/* Free Trial : <span className=""> Activated/ Expired</span> */}
                  </p>
                  <Textinput
                    className="capitalize"
                    label="Subscription"
                    id="h_Subscription"
                    type="text"
                    defaultValue={profile?.status ? profile?.status : ""}
                    horizontal
                  />
                  <Textinput
                    // name={" "}
                    // register={register}
                    label="Words Credit"
                    id="h_Words_Credit"
                    type="text"
                    defaultValue={
                      currentWordsCredit && isUpdatePlan
                        ? currentWordsCredit
                        : selectedPlan && addLeftCredit && isUpdatePlan
                        ? updatedWordsCreditAdding
                        : selectedPlan && isUpdatePlan
                        ? updatedWordsCredit
                        : wordsCredit
                    }
                    horizontal
                    onChange={(e) => {
                      setCurrentWordsCredit(e.target.value);

                      setUpdateCreditSummary((prev) => ({
                        ...prev,
                        wordCredit: e.target.value,
                      }));
                    }}
                  />

                  <Textinput
                    defaultValue={
                      selectedPlan && addLeftCredit && isUpdatePlan
                        ? updatedWordsCreditAdding - usedWordsCredit
                        : selectedPlan && isUpdatePlan
                        ? updatedWordsCredit - usedWordsCredit
                        : leftWordsCdredit
                    }
                    label="Left Words Credit"
                    id="h_Left_Words_Credit"
                    type="text"
                    horizontal
                    readonly={true}

                    // onChange={(e) => {
                    //   setSaveCreditSummary((prev) => ({
                    //     ...prev,
                    //     wordsCredit: e.target.value,
                    //   }));
                    // }}
                  />
                  <Textinput
                    defaultValue={
                      selectedPlan
                        ? selectedPlanExpiredDate?.toLocaleDateString()
                        : profile?.planActiveDate
                        ? new Date(
                            profile?.planActiveDate
                          )?.toLocaleDateString()
                        : new Date(profile?.createdAt)?.toLocaleDateString()
                    }
                    label="Plan Active Date"
                    type="text"
                    horizontal
                    readonly={true}
                  />

                  <div className="flex">
                    <p className="w-[20%] form-label">Plan Expired Date</p>
                    <Flatpickr
                      label="Expired Date"
                      value={
                        selectedPlan
                          ? selectedPlanExpiredDate?.toLocaleDateString()
                          : profile?.planExpiredBy
                          ? new Date(
                              profile?.planExpiredBy
                            )?.toLocaleDateString()
                          : ""
                      }
                      // value={new Date(new Date().setDate(new Date().getDate() - 30))}

                      id="disabled-picker"
                      className="rounded border px-3 ml-[25px]"
                      onChange={(date) => {
                        setExpiredDate(date);
                      }}
                      options={{
                        dateFormat: "d/m/Y",
                        disable: [
                          {
                            from: new Date(),
                            // eslint-disable-next-line no-mixed-operators
                            to: new Date(
                              new Date().getTime() + 120 * 60 * 60 * 1000
                            ),
                          },
                        ],
                      }}
                    />
                  </div>

                  {/* <Textinput
                    readonly={true}
                    defaultValue={userPlanExpiredDate?.toLocaleDateString()}
                    label="Updated Expired Date"
                    id="h_Plan_expired_Date"
                    type="text"
                    horizontal
                  /> */}

                  <div className="flex justify-between">
                    <div></div>
                    {isLoadingBtn==1 ? (
                      <LoadingButton
                      className={"normal-case"}
                      size="medium"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Saving
                      </LoadingButton>
                    ) : (
                      <Button
                        className={"normal-case"}
                        size="medium"
                        style={{ backgroundColor: "black" }}
                        variant="contained"
                        onClick={() => {
                          setIsLoadingBtn(1);
                          setTimeout(() => {
                            setIsLoadingBtn(0);
                          }, 2000);
                          onSaveCreditSummary;
                        }}
                      >
                        Save
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </Card>
          </div>

          <div className="lg:col-span-8 col-span-12 md:h-[400px]">
            <Card title="Profile Info">
              <Tab.Group>
                <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                  {buttons.map((item, i) => (
                    <Tab as={Fragment} key={i}>
                      {({ selected }) => (
                        <button
                          className={` inline-flex items-start text-sm font-medium mb-7 capitalize bg-white dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute
                     before:left-1/2 before:bottom-[-6px] before:h-[1.5px]
                      before:bg-primary-500 before:-translate-x-1/2
              
              ${
                selected
                  ? "text-primary-500 before:w-full"
                  : "text-slate-500 before:w-0 dark:text-slate-300"
              }
              `}
                        >
                          <span className="text-base relative top-[1px] ltr:mr-1 rtl:ml-1">
                            <Icon icon={item.icon} />
                          </span>
                          {item.title}
                        </button>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel>
                    <form
                      onSubmit={handleSubmit(onSubmitSavePersonalDetails)}
                      className="md:flex  md:space-x-5 "
                    >
                      <div className="space-y-4 w-[100%]">
                        <Textinput
                          label="First Name"
                          id="h_Fullname2"
                          type="text"
                          defaultValue={profile?.name ? profile?.name : ""}
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              name: e.target.value,
                            }));
                          }}
                        />
                        <Textinput
                          name={"email"}
                          register={register}
                          label="Email"
                          id="h_email2"
                          type="email"
                          readonly={true}
                          defaultValue={profile?.email ? profile?.email : ""}
                        />
                        <Textinput
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              website: e.target.value,
                            }));
                          }}
                          defaultValue={
                            profile?.website ? profile?.website : ""
                          }
                          label="Website"
                          id="h_website"
                          type="text"
                        />
                        <Textinput
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              city: e.target.value,
                            }));
                          }}
                          defaultValue={profile?.city ? profile?.city : ""}
                          label="City"
                          type="text"
                        />
                        <Textinput
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              postalCode: e.target.value,
                            }));
                          }}
                          defaultValue={
                            profile?.postalCode ? profile?.postalCode : ""
                          }
                          label="Post Code"
                          id="h_post_code"
                          type="text"
                        />
                      </div>

                      <div className="space-y-4 w-[100%]">
                        <Textinput
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              phone: e.target.value,
                            }));
                          }}
                          defaultValue={profile?.phone ? profile?.phone : ""}
                          label="Phone"
                          id="h_Lastname2"
                          type="text"
                        />
                        <Textinput
                          label="Registration On"
                          id="h_reg"
                          type=""
                          readonly={true}
                          defaultValue={
                            profile?.createdAt
                              ? new Date(
                                  profile?.createdAt
                                ).toLocaleDateString()
                              : ""
                          }
                        />
                        <Textinput
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              companyName: e.target.value,
                            }));
                          }}
                          defaultValue={
                            profile?.companyName ? profile?.companyName : ""
                          }
                          label="Company Name"
                          id="h_des"
                          type="text"
                        />
                        <Textinput
                          onChange={(e) => {
                            setUpdateProfileData((updateProfileData) => ({
                              ...updateProfileData,
                              country: e.target.value,
                            }));
                          }}
                          label="Country"
                          id="h_country"
                          type="text"
                        />
                      </div>
                    </form>

                    <div className="flex justify-between">
                      <div></div>
                      {isLoadingBtn==2 ? (
                      <LoadingButton
                      className={"normal-case"}
                      size="medium"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Saving
                      </LoadingButton>
                    ):
                      <Button
                        className={"normal-case my-4"}
                        size="medium"
                        style={{ backgroundColor: "black" }}
                        variant="contained"
                        onClick={() => {
                          setIsLoadingBtn(2);
                          setTimeout(() => {
                            setIsLoadingBtn(0);
                          }, 2000);
                          onSubmitSavePersonalDetails}}
                      >
                        Save
                      </Button>
                      }
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <Card title="Change Password">
                      <form
                        onSubmit={handleSubmit(onSubmitChangePassword)}
                        className="md:flex md:space-x-5"
                      >
                        <div className="md:w-[40%]">
                          <Textinput
                            onChange={(e) => {
                              setUpdateNewPassword(e.target.value);
                            }}
                            label="New Password"
                            id="h_pass1"
                            type="text"
                          />
                        </div>
                        <div className="md:w-[40%]">
                          <Textinput
                            onChange={(e) => {
                              setUpdateConfirmPassword(e.target.value);
                            }}
                            label="Confirm Password"
                            id="h_pass2"
                            type="text"
                          />
                        </div>
                      </form>
                      <p className="text-[brown] text-sm">
                        {updateNewPassword != updateConfirmPassword &&
                          updateConfirmPassword &&
                          "Pasword did not match."}
                      </p>
                      {isLoadingBtn==3 ? (
                      <LoadingButton
                      className={"normal-case"}
                      size="medium"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Saving
                      </LoadingButton>
                    ):
                      <Button
                        className={"normal-case my-5  "}
                        size="medium"
                        style={{ backgroundColor: "black" }}
                        variant="contained"
                        onClick={() => {
                          setIsLoadingBtn(3);
                          setTimeout(() => {
                            setIsLoadingBtn(0);
                          }, 2000);

                          updateNewPassword == updateConfirmPassword &&
                          onSubmitChangePassword
                        }}
                      >
                        Save
                      </Button>
}
                      <div className="mt-7">
                        <p className="font-semibold  mb-2">
                          Two-Steps Verification
                        </p>
                        <p>Two factor verificaion is not enabled yet</p>
                        <Button
                          className={"normal-case my-5 "}
                          size="medium"
                          style={{ backgroundColor: "black" }}
                          variant="contained"
                        >
                          Enable 2FA
                        </Button>
                      </div>
                    </Card>
                    <div className="h-10"></div>
                    <Card title="Recent Devices" noborder>
                      <div className="overflow-x-auto -mx-6">
                        <div className="inline-block min-w-full align-middle">
                          <div className="overflow-hidden ">
                            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                              <thead className=" border-t border-slate-100 dark:border-slate-800">
                                <tr>
                                  {columns.map((column, i) => (
                                    <th
                                      key={i}
                                      scope="col"
                                      className=" table-th "
                                    >
                                      {column.label}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                {rows.map((row, i) => (
                                  <tr key={i}>
                                    <td className="table-td">{row.id}</td>
                                    <td className="table-td">{row.order}</td>
                                    <td className="table-td ">
                                      {row.quantity}
                                    </td>
                                    <td className="table-td ">{row.date}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="mt-7">
                      <p className="font-semibold  mb-2">
                        Current Plan :{" "}
                        <span className="text-success-500 font-bold">
                          {" "}
                          {profile?.subscription?.length > 0 &&
                            profile?.subscription[
                              profile?.subscription?.length - 1
                            ]?.plan?.name}
                        </span>
                      </p>
                      <p className="">
                        Current Subscription :{" "}
                        <span className="text-success-500 font-bold capitalize">
                          {profile?.status}
                        </span>
                      </p>

                      {isLoadingBtn==4 ? (
                      <LoadingButton
                      className={"normal-case"}
                      size="medium"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        working
                      </LoadingButton>
                    ):
                      <Button
                        className={"normal-case my-5  "}
                        size="medium"
                        onClick={() => {
                          setIsLoadingBtn(4);
                          setTimeout(() => {
                            setIsLoadingBtn(0);
                          }, 2000);
                          handleCancelSubscription}}
                        variant="outlined"
                      >
                        <p className="text-danger-500">Cancel Subscription</p>
                      </Button>
}
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                      No Notifications Available
                    </div>
                  </Tab.Panel>
                  <Tab.Panel>
                    <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                      No Settings Available
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-4 col-span-12 relative  ">
            <Card title="Bonus Credit">
              <div className="space-y-4 p-5 mt-2 capitalize">
                <Textinput
                  // name={" "}
                  // register={register}
                  label="Bonus Words Credit"
                  onChange={(e) =>
                    setUpdateProfileData((updateProfileData) => ({
                      ...updateProfileData,
                      bonusCredit: Number(e.target.value),
                    }))
                  }
                  type="text"
                  horizontal
                  defaultValue={
                    profile?.bonusCredit ? profile?.bonusCredit : ""
                  }
                />

                <Textinput
                  // name={" "}
                  // register={register}
                  label="Expired By"
                  id="h_expired_by"
                  type="text"
                  horizontal
                  defaultValue={bonusExpiredDate.toLocaleDateString()}
                  readonly={true}
                />

                <div className="flex justify-between">
                  <div></div>
                  {isLoadingBtn==5 ? (
                      <LoadingButton
                      className={"normal-case"}
                      size="medium"
                        loading
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                      >
                        Applying
                      </LoadingButton>
                    ):
                  <Button
                    className={"normal-case"}
                    size="medium"
                    style={{ backgroundColor: "black" }}
                    variant="contained"
                    onClick={() => {
                      setIsLoadingBtn(5);
                      setTimeout(() => {
                        setIsLoadingBtn(0);
                      }, 2000);
                      onSubmitSavePersonalDetails}}
                  >
                    Appy
                  </Button>
                  }
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default profile;
