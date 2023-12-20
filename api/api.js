import axios from 'axios';

export const base_url = '/api';
// export const base_url = 'https://geniematic.com/api';
// export const base_url = ' http://localhost:8000/api';

// Auth

export const signIn = (data) =>
    axios.post(`${base_url}/auth/login`, data, { withCredentials: true });
export const verifyEmail = (data) =>
    axios.post(`${base_url}/auth/verifyEmail`, data, { withCredentials: true });
export const sendVerificationEmail = (data) =>
    axios.post(`${base_url}/auth/sendVerificationEmail`, data, {
        withCredentials: true,
    });

export const signUp = (data) => axios.post(`${base_url}/auth/signup`, data);
export const logOut = () =>
    axios.get(`${base_url}/auth/logout`, { withCredentials: true });

export const googleLogin = () => axios.get(`${base_url}/auth/google/`);

export const forgotPassword = (data) =>
    axios.post(`${base_url}/user/forgetPassword`, data);

export const changePassword = (data) =>
    axios.patch(`${base_url}/user/changePassword`, data);

const axiosInstance = axios.create({
    baseURL: base_url,
    withCredentials: true,
});

//user
export const getOwnProfileInfo = () => axiosInstance.get(`/user/me`);
export const getUserProfileInfo = (id) =>
    axiosInstance.get(`/user/profile/${id}`);
export const getAllUserProfileInfo = () => axiosInstance.get(`/user/all`);
export const updateUserProfile = (id, data) =>
    axiosInstance.patch(`/user/${id}`, data);

//subscription
export const createSubscription = (data) =>
    axiosInstance.post(`/subscription`, data);
export const getAllSubscriptions = () => axiosInstance.get(`/subscription/all`);
export const getSingleSubscriptionDetail = (id) =>
    axiosInstance.get(`/subscription/${id}`);
export const deleteSubscription = (id) =>
    axiosInstance.delete(`/subscription/${id}`);
export const updateSubscription = (id, data) =>
    axiosInstance.patch(`/subscription/${id}`, data);

//plan
export const createPlan = (data) => axiosInstance.post(`/plan`, data);
export const getAllPlans = () => axiosInstance.get(`/plan`);
export const getSinglePlanDetail = (id) => axiosInstance.get(`/plan/${id}`);
export const deletePlan = (id) => axiosInstance.delete(`/plan/${id}`);
export const updatePlan = (id, data) =>
    axiosInstance.patch(`/plan/${id}`, data);

//transaction

// export const getAllTransactions = () => axiosInstance.get(`/transaction/all`);

export const createStripeTransaction = (data) =>
    axiosInstance.post(`/transaction/stripe/payment`, data);

export const getStripePublickey = () =>
    axiosInstance.get(`/transaction/stripe/public-key`);
    
export const getSslCommerz = (id,country,email) =>
    axiosInstance.get(`/transaction/sslcommerz/payment-intent/${id}?country=${country}&email=${email}`);

//openAi
export const getOpenAi = (data) => axiosInstance.get(`/openaiApi`, data);


