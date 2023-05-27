import { createRouter, createWebHistory } from "vue-router";
import InfoChef from "@/views/InfoChef.vue";
import productList from "@/views/productList.vue";
import productId from "@/views/productId.vue";
import menuMain from "@/views/menuMain.vue";
import category from "@/views/category.vue";
import orderList from "@/views/orderList.vue";
import sellerReport from "@/views/sellerReport.vue";
import Login from "@/views/Login.vue";
import sellerId from "@/views/sellerId.vue";
import sellerUploadBanner from "@/views/sellerUploadBanner.vue";
import bannerPages from "@/views/bannerPages.vue";
import notify from "@/views/notify.vue";
import feedbacks from "@/views/feedbacks.vue";
import feedbacksId from "@/views/feedbacksId.vue";
import addTicket from "@/views/addTicket.vue";
import ticketInfo from "@/views/ticketInfo.vue";
// custmer sections
import customerInfo from "@/views/customerInfo.vue";
import customerId from "@/views/customerId.vue";
import discount from "@/views/discount.vue";
import support from "@/views/support.vue";
import reportCustomer from "@/views/reportCustomer.vue";
import reportComprehensive from "@/views/reportComprehensive.vue";
import ComprehensiveProductReport from "@/views/ComprehensiveProductReport.vue";
import rfmReport from "@/views/rfmReport.vue";
import inventoryInfo from "@/views/inventoryInfo.vue";
import passwordFinder from "@/views/passwordFinder.vue";
import newFactor from "@/views/newFactor.vue";
import selectMenu from "@/views/selectMenu.vue";
import orderDetails from "@/views/orderDetails.vue";
import financial from "@/views/financial.vue";
import financialSupport from "@/views/financialSupport.vue";
import inventoryInfoSeller from "@/views/inventoryInfoSeller.vue";
import ComprehensiveProduction from "@/views/ComprehensiveProduction.vue";
import brandPromotion from "@/views/brandPromotion.vue";
import accessUsers from "@/views/accessUsers.vue";
import newUser from "@/views/newUser.vue";
import customerPayment from "@/views/customerPayment.vue";
import creditCustomer from "@/views/creditCustomer.vue";
import cancellingFactor from "@/views/cancellingFactor.vue";
import cancellOrderList from "@/views/cancellOrderList.vue";
import detailCancellOrder from "@/views/detailsProcessCancell.vue";
import credits from "@/views/credits.vue";
import newTransaction from "@/views/newTransaction.vue";
import newGroup from "@/views/newGroup.vue";
import usersGroup from "@/views/userGroups.vue";
import userGroupsFromTransactions from "@/views/userGroupsFromTransactions.vue";
import transactionsGroup from "@/views/transactionsGroup.vue";
import selectTimeOrder from "@/views/selectTimeOrder.vue";
import finalOrder from "@/views/finalOrder.vue";
import health from "@/views/health.vue";
import questionsSeller from "@/views/questionsSeller.vue";
import manageQuestions from "@/views/manageQuestions.vue";
import returnOrders from "@/views/returnOrders.vue";
import visitHistory from "@/views/visitHistory.vue";
import controlReport from "@/views/controlReport.vue";
import groupRemittance from "@/views/groupRemittance.vue";
import statisticsSeller from "@/views/statisticsSeller.vue";
const routes = [{
        path: "",
        name: "Login",
        redirect: "/Login",
    },
    {
        path: "/",
        name: "/",
        redirect: "/InfoChef",
    },
    {
        path: "/InfoChef",
        name: "میزبانان",
        component: InfoChef,
    },
    {
        path: "/InfoChef/:id/:name",
        name: " اطلاعات میزبان",
        component: sellerId,
    },
    {
        path: "/productList",
        name: "محصولات",
        component: productList,
    },
    {
        path: "/productList/:id/:name",
        name: " لیست محصولات",
        component: productId,
    },
    {
        path: "/menuMain",
        name: "منو",
        component: menuMain,
    },
    {
        path: "/brandPromotion",
        name: "ارتقاء برند",
        component: brandPromotion,
    },
    {
        path: "/financialSupport",
        name: "گزارش مالی پشتیبان",
        component: financialSupport,
    },
    {
        path: "/financial",
        name: "گزارش مالی",
        component: financial,
    },
    {
        path: "/returnOrders",
        name: "سفارشات مرجوعی",
        component: returnOrders,
    },
    {
        path: "/inventoryInfoSeller",
        name: "اطلاع از موجودی ",
        component: inventoryInfoSeller,
    },
    {
        path: "/accessUsers",
        name: "دسترسی ها",
        component: accessUsers,
    },
    {
        path: "/accessUsers/addNewUser",
        name: "کاربر جدید",
        component: newUser,
    },
    {
        path: "/sellerReport",
        name: "گزارش فروش میزبان",
        component: sellerReport,
    },
    {
        path: "/customerPayment",
        name: "پرداخت آنلاین مشتریان",
        component: customerPayment,
    },
    {
        path: "/creditCustomer",
        name: "اعتبار مشتریان",
        component: creditCustomer,
    },
    {
        path: "/canellingFactor",
        name: "لغو جدید",
        component: cancellingFactor,
    },
    {
        path: "/cancellOrderList",
        name: "لغو سفارشات",
        component: cancellOrderList,
    },
    {
        path: "/detailCancellOrder/:id/:status",
        name: "جزئیات لغو سفارشات",
        component: detailCancellOrder,
    },
    {
        path: "/category",
        name: "دسته بندی",
        component: category,
    },
    {
        path: "/orderList",
        name: "سفارشات",
        component: orderList,
    },
    {
        path: "/feedback",
        name: "بازخورد",
        component: feedbacks,
    },
    {
        path: "/feedback/:id/:name",
        name: " بازخورد",
        component: feedbacksId,
    },
    {
        path: "/customerInfo",
        name: "اطلاعات مشتریان",
        component: customerInfo,
    },
    {
        path: "/reportCustomer",
        name: "گزارش جامع مشتری",
        component: reportCustomer,
    },
    {
        path: "/customerInfo/:id/:name",
        name: " اطلاعات مشتریان",
        component: customerId,
    },
    {
        path: "/rfmReport",
        name: "گزارش RFM",
        component: rfmReport,
    },
    {
        path: "/inventoryInfo",
        name: "اطلاع از موجودی",
        component: inventoryInfo,
    },
    {
        path: "/discount",
        name: "تخفیفات",
        component: discount,
    },
    {
        path: "/notify",
        name: "نوتیفای",
        component: notify,
    },
    {
        path: "/support",
        name: "تیکت ها",
        component: support,
    },
    {
        path: "/passwordFinder",
        name: "رمزیاب",
        component: passwordFinder,
    },
    {
        path: '/support/addTicket',
        name: "پیام جدید",
        component: addTicket,
    },    {
        path: '/ticketInfo/:id/:name',
        name: "اطلاعات تیکت",
        component: ticketInfo,
    },
    {
        path: "/pagesUploadBanner",
        name: "بارگذاری بنر",
        component: bannerPages,
    },
    {
        path: "/sellerUploadBanner",
        name: "بارگذاری بنر میزبان",
        component: sellerUploadBanner,
    },
    {
        path: "/ComprehensiveSalesReport",
        name: "گزارش جامع فروش",
        component: reportComprehensive,
    },
    {
        path: "/newFactor",
        name: "سفارش جدید",
        component: newFactor,
    },
    {
        path: "/selectTimeOrder/:id",
        name: "زمان دریافت سفارش",
        component: selectTimeOrder,
    },
    {
        path: "/newFactor/selectMenu/:id",
        name: "انتخاب منو",
        component: selectMenu,
    },
    {
        path: "/finalOrder/:id",
        name: "ثبت نهایی سفارش",
        component: finalOrder,
    },
    {
        path: "/newFactor/orderDetails",
        name: "جزئیات سفارش",
        component: orderDetails,
    },
    {
        path: "/ComprehensiveProductionReport",
        name: "گزارش جامع تولید",
        component: ComprehensiveProduction,
    },
    {
        path: "/ComprehensiveProductReport",
        name: "گزارش جامع محصول",
        component: ComprehensiveProductReport,
    },
    {
        path: "/credits",
        name: "اعتبارات",
        component: credits,
    },
    {
        path: "/credits/newTransaction",
        name: "تراکنش جدید",
        component: newTransaction,
    },
    {
        path: "/credits/newGroup",
        name: "گروه جدید",
        component: newGroup,
    },
    {
        path: "/group/users/:id/:index",
        name: "اعضا",
        component: usersGroup,
    },
    {
        path: "/group/usersFromTransactions/:id/:index",
        name: "اعضا از تراکنش ها",
        component: userGroupsFromTransactions,
    },
    {
        path: "/group/transactionsGroup/:id",
        name: "تراکنش های گروه",
        component: transactionsGroup,
    },
    {
        path: "/health",
        name: "بهداشت و سلامت",
        component: health,
    },
    {
        path: "/questionsSeller/:date/:type/:status/:sellerId",
        name: "آزمون بازدید",
        component: questionsSeller,
    },
    {
        path: "/manageQuestions",
        name: "مدیریت سوالات",
        component: manageQuestions,
    },
    {
        path: "/visitHistory/:id/:name",
        name: "تاریخچه بازدید",
        component: visitHistory,
    },
    {
        path: "/controlReport",
        name: "گزارش کنترلی سفارشات",
        component: controlReport,
    },
    {
        path: "/groupRemittance",
        name: "فایل گزارش مالی",
        component: groupRemittance,
    },
    {
        path: "/statisticsSeller",
        name: "گزارش منو",
        component: statisticsSeller,
    },
    {
        path: "/Login",
        name: "Login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});
router.beforeEach(async(to) => {
    const accessToken = localStorage.getItem("token");
    if (!accessToken && to.name !== "Login") {
        return { name: "Login" };
    }
    if (accessToken && to.name == "Login") {
        return { name: "/" };
    }
});

export default router;
