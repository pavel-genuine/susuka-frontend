import layout from './layoutReducer';
import todo from '@/components/partials/app/todo/store';
import email from '@/components/partials/app/email/store';
import chat from '@/components/partials/app/chat/store';
import project from '@/components/partials/app/projects/store';
import kanban from '@/components/partials/app/kanban/store';
import calendar from '@/components/partials/app/calender/store';
import auth from '@/components/partials/auth/store';
import allUserProfileReducer from '../redux/features/user/allUsersProfileSlice';
import signUpReducer from '../redux/features/auth/signUpSlice';
import signInReducer from '../redux/features/auth/signInSlice';
import userProfileReducer from '../redux/features/user/userProfileSlice';
import ownProfileReducer from '../redux/features/user/ownProfileSlice';
import allSubscriptionsReducer from '../redux/features/subscription/allSubscriptionsSlice';
import singleSubscriptionDetailReducer from '../redux/features/subscription/singleSubscriptionDetailSlice';
import createSubscriptionReducer from '../redux/features/subscription/createSubscriptionSlice';
import updateSubscriptionReducer from '../redux/features/subscription/updateSubscriptionSlice';
import deleteSubscriptionReducer from '../redux/features/subscription/deleteSubscription';
import allPlansReducer from '../redux/features/plan/allPlansSlice';
import singlePlanDetailReducer from '../redux/features/plan/singlePlanDetailSlice';
import createPlanReducer from '../redux/features/plan/createPlanSlice';
import deletePlanReducer from '../redux/features/plan/deletePlanSlice';

export const rootReducer = {
    signUp: signUpReducer,
    signIn: signInReducer,

    allUserProfile: allUserProfileReducer,
    userProfile: userProfileReducer,
    ownProfile: ownProfileReducer,

    allSubscriptions: allSubscriptionsReducer,
    singleSubscriptionDetail: singleSubscriptionDetailReducer,
    createSubscription: createSubscriptionReducer,
    updateSubscription: updateSubscriptionReducer,
    deleteSubscription: deleteSubscriptionReducer,

    deletePlan: deletePlanReducer,
    allPlans: allPlansReducer,
    singlePlanDetail: singlePlanDetailReducer,
    createPlan: createPlanReducer,

    layout,
    todo,
    email,
    chat,
    project,
    kanban,
    calendar,
    auth,
};

export default rootReducer;
