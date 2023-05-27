import {createStore} from "vuex";
import Axios from "axios";
import FormData from "form-data";

export default createStore({
    state: {
         // baseUrl: "http://172.20.1.103:8000/",
        baseUrl: "https://apisp.khoonegi.app/",
        //  baseUrl: "https://stagesupport.khoonegi.app/",

        // get address revers api
        baseUrlAddress: "http://195.110.39.18:46000/",
        hideConfigButton: false,
        isPinned: true,
        showConfig: false,
        isTransparent: "",
        isRTL: false,
        mcolor: "",
        isNavFixed: false,
        isAbsolute: false,
        showNavs: true,
        showSidenav: true,
        showNavbar: true,
        showFooter: true,
        showMain: true,
        // main state *******************************
        status: localStorage.getItem("token") != null,
        token: localStorage.getItem("token"),
        typeUser: localStorage.getItem("type"),
        sellerStatus: [
            {
                value: 0,
                title: "همه",
            },
            {
                value: 1,
                title: "جدید",
            },
            {
                value: 2,
                title: "بررسی قرارداد",
            },
            {
                value: 3,
                title: "بررسی پروفایل",
            },
            {
                value: 5,
                title: "تائید شده",
            },
            {
                value: 6,
                title: "بررسی",
            },
            {
                value: 7,
                title: "غیر فعال",
            },
        ],
        productStatus: [
            {
                value: 0,
                title: "همه",
            },
            {
                value: 1,
                title: "جدید",
            },
            {
                value: 4,
                title: "درخواست تغییر",
            },
            {
                value: 5,
                title: "تائید شده",
            },
        ],
        prodactSellerMenuStore: [],
        customerAccountType: [
            {
                value: -1,
                title: "همه",
            },
            {
                value: 0,
                title: "شارژ آنلاین کیف پول",
            },
            {
                value: 1,
                title: "اعتبار هدیه معرفی",
            },
            {
                value: 2,
                title: "کنسلی سفارش",
            },
            {
                value: 3,
                title: "خرید اعتباری",
            },
            {
                value: 4,
                title: "خرید آنلاین",
            },
            {
                value: 5,
                title: "اصلاحیه افزایش اعتبار",
            },
            {
                value: 6,
                title: "اصلاحیه کاهش اعتبار",
            },
            {
                value: 7,
                title: "ویرایش سفارش اعتباری",
            },
            {
                value: 8,
                title: "ثبت فیدبک",
            },
            {
                value: 9,
                title: "اعتبار هدیه",
            },
        ],
        prodactList: [],
        sellerList: [],
        sellerActive: [],
        orderStatus: [],
        formData: new FormData(),
        userName: localStorage.getItem("userName"),
        feedbackStatus: [
            {
                value: -1,
                title: "وضعیت: همه",
            },
            {
                value: 0,
                title: "بدون جواب",
            },
            {
                value: 1,
                title: "تائید شده",
            },
            {
                value: 2,
                title: "رد شده",
            },
        ],
        ticketStatus: [
            {
                value: -1,
                title: "همه",
            },
            {
                value: 0,
                title: "در انتظار پاسخ پشتیبان",
            },
            {
                value: 1,
                title: "پاسخ داده شده",
            },
            {
                value: 3,
                title: "بسته شده توسط میزبان",
            },
            {
                value: 4,
                title: "بسته شده توسط پشتیبان",
            },
        ],
        likeCount: [
            {
                title: "همه",
                value: -1,
            },
            {
                title: "20",
                value: 20,
            },
            {
                title: "40",
                value: 40,
            },
            {
                title: "60",
                value: 60,
            },
            {
                title: "80",
                value: 80,
            },
            {
                title: "100",
                value: 100,
            },
            {
                title: "120",
                value: 120,
            },
            {
                title: "140",
                value: 140,
            },
            {
                title: "160",
                value: 160,
            },
            {
                title: "180",
                value: 180,
            },
        ],
        getewayType: [
            {
                value: -1,
                title: "همه"
            },
            {
                value: 0,
                title: "آسان پرداخت"
            },
            {
                value: 1,
                title: "به پرداخت ملت"
            }
        ],
        transactionTypeCustomer: [
            {
                title: "انتخاب کنید",
                value: -1
            },
            {
                title: "کاهش موردی",
                value: 0
            },
            {
                title: "افزایش موردی",
                value: 2
            },
            {
                title: "افزایش گروهی",
                value: 3
            },
            {
                title: "کاهش گروهی",
                value: 1
            },
        ],
        bankAccount: [
            {
                title: "حساب تاک",
                value: 0
            }
        ],
        transactionGroup: [
            {
                title: "کارکنان تاک",
                value: 0
            }
        ],
        numberReturnList: [],
        computingOrder: {
            totalOrders: "",
            totalPeyment: ""
        },
        orderNumberNewFactor: Number,
        cancellStateUser: [
            {
                value: 0,
                title: "پشتیبانی"
            },
            {
                value: 1,
                title: "مدیریت"
            },
            {
                value: 2,
                title: "واحد مالی"
            }
        ],
        customerNameDelivery: localStorage.getItem("customerName"),
        customerMenuDelivery: localStorage.getItem("orderCustomer"),
        customerOrderDelivery: JSON.parse(localStorage.getItem("finalOrders")),
        visitTypes: [
            {
                value: 0,
                title: "حضوری"
            },
            {
                value: 1,
                title: "آنلاین"
            }
        ],
        visitStatus: [
            {
                value: 0,
                title: "عدم حضور"
            },
            {
                value: 1,
                title: "عدم همکاری"
            },
            // {
            //     value: 2,
            //     title: "بازدید انجام شده"
            // }
        ],
        answerQuestion:[
            {
                value: 10,
                title: "بله",
                bgColor: "",
                color:"",
                select: false
            },
            {
                value: 20,
                title: "خیر",
                bgColor: "",
                color:"",
                select: false
            },
            {
                value: 30,
                title: "مصداق ندارد",
                bgColor: "",
                color:"",
                select: false
            },
            {
                value: 40,
                title: "اصلاح در محل",
                bgColor: "",
                color:"",
                select: false
            }
        ]
    },
    mutations: {
        logIn(state) {
            state.status = true;
        },
        loggedOut() {
            localStorage.removeItem("token");
        },
        setToken(state, payload) {
            state.token = payload;
            localStorage.setItem("token", payload);
        },
        setTypeUser(state, payload) {
            state.typeUser = payload;
            localStorage.setItem("type", payload);
        },
        setUserName(state, payload) {
            state.userName = payload;
            localStorage.setItem("userName", payload);
        },

        toggleConfigurator(state) {
            state.showConfig = !state.showConfig;
        },
        navbarMinimize(state) {
            const sidenav_show = document.querySelector(".g-sidenav-show");
            const sidenav = document.getElementById("sidenav-main");
            if (sidenav_show.classList.contains("g-sidenav-pinned")) {
                sidenav_show.classList.remove("g-sidenav-pinned");
                setTimeout(function () {
                    sidenav.classList.remove("bg-white");
                }, 100);
                sidenav.classList.remove("bg-transparent");
                state.isPinned = true;
            } else {
                sidenav_show.classList.add("g-sidenav-pinned");
                // sidenav.classList.remove("bg-transparent");
                state.isPinned = false;
            }
        },
        sidebarType(state, payload) {
            state.isTransparent = payload;
        },
        navbarFixed(state) {
            if (state.isNavFixed === false) {
                state.isNavFixed = true;
            } else {
                state.isNavFixed = false;
            }
        },
    },
    actions: {
        login({commit, dispatch}, credentials) {
            return new Promise((resolve, reject) => {
                dispatch("loginRequest", credentials)
                    .then((response) => {
                        commit("setUserName", response.data.name);
                        commit("setToken", response.data.token);
                        commit("setTypeUser", response.data.type);
                        commit("logIn");
                        resolve(response);
                    })
                    .catch((error) => {
                        commit("failed");
                        reject(error);
                    });
            });
        },
        handleError({commit}, error) {
            console.log(error);
            if (!error.response) {
                // Vue.prototype.$snackMessage("لطفا اتصال خود را بررسی کنید!");
                console.log(error);
            } else if (error.response.status === 401) {
                console.log(error);
                commit("loggedOut");
                this.$router.push({
                    path: "/login",
                });
            } else if (error.response.status >= 500) {
                console.log(error);
            } else {
                if (error.response.data) {
                    console.log(error);
                }
            }
        },
        loginRequest({getters}, data) {
            return getters.axios.post("Account/Login", data);
        },
        toggleSidebarColor({commit}, payload) {
            commit("sidebarType", payload);
        },
        // apis sellers
        getSellerList({getters}, data) {
            console.log(getters.axios)
            return getters.axios.post("Seller/Index", data);
        },
        getSellerMenuReport({getters}, data) {
            return getters.axios.post("Product/MenuReport/V1", data);
        },

        getSellerContract({getters}, data) {
            return getters.axios.post("Seller/Contract", data);
        },
        confirmInfoSeller({getters}, data) {
            return getters.axios.post("Seller/SetContract", data);
        },
        getSellerProfile({getters}, data) {
            return getters.axios.post("Seller/Profile", data);
        },
        confirmProfileInfoSeller({getters}, data) {
            return getters.axios.post("Seller/SetProfile", data);
        },
        getSellerProductList({getters}, data) {
            return getters.axios.post("Seller/Products", data);
        },
        getSellerMenuList({getters}, data) {
            return getters.axios.post("Seller/Menu", data);
        },
        getSellerDeliveryList({getters}, data) {
            return getters.axios.post("Seller/Delivery", data);
        },
        getSellerActive({getters}, data) {
            return getters.axios.post("Seller/ActiveIndex", data);
        },
        // product List
        getProductList({getters}, data) {
            return getters.axios.post("Product/Products", data);
        },
        // profile Product
        getProductProfile({getters}, data) {
            return getters.axios.post("Product/Profile", data);
        },
        confirmProductProfileInfo({getters}, data) {
            return getters.axios.post("Product/AcceptProduct", data);
        },
        // product menu
        getProductMenu({getters}, data) {
            return getters.axios.post("Product/Menu", data);
        },
        getProductMenuV1({getters}, data) {
            return getters.axios.post("Product/Menu/V2", data);
        },
        // product history Price
        getProductHistoryPrice({getters}, data) {
            return getters.axios.post("Product/Price", data);
        },
        getProductListIndex({getters}, data) {
            return getters.axios.post("Product/Index", data);
        },
        //  category apis
        getCategoryList({getters}) {
            return getters.axios.get("Product/Categories");
        },
        // edit category
        editCategory({getters}, data) {
            return getters.axios.put("Product/EditCategory", data);
        },
        // create category
        createCategory({getters}, data) {
            return getters.axios.put("Product/AddCategory", data);
        },
        // report list
        getReportList({getters}, data) {
            return getters.axios.post("Order/SellReport", data);
        },
        // order list main
        getOrderListMain({getters}, data) {
            return getters.axios.post("Order/index", data);
        },
        returningOrdersIndex({getters}, data) {
            return getters.axios.post("Order/ReturningOrdersIndex", data);
        },
        getOrderStatus({getters}) {
            return getters.axios.get("Nanegha/OrderStatus");
        },

        // api customers
        getDiscountsList({getters}, data) {
            return getters.axios.post("Order/DiscountCodes", data);
        },
        createDiscountCode({getters}, data) {
            return getters.axios.put("Order/DiscountCode", data);
        },
        getDiscountCode({getters}, data) {
            return getters.axios.post("Order/DiscountCode", data);
        },
        editDiscountCodeHandle({getters}, data) {
            return getters.axios.post("Order/EditDiscountCode", data);
        },
        getSellerBanner({getters}, data) {
            return getters.axios.post("Product/SellerBanner", data);
        },
        createSellerBanner({getters}, data) {
            return getters.axios.put("Product/Banner", data);
        },
        editSellerBanner({getters}, data) {
            return getters.axios.post("Product/Banner", data);
        },
        deleteSellerBanner({getters}, data) {
            return getters.axios.delete(`Product/Banner/${data.BannerId}`);
        },
        getBannerList({getters}, data) {
            return getters.axios.post("Product/Banners", data);
        },
        // notify
        getCustomerList({getters}, data) {
            return getters.axios.post("Customer/Customers", data);
        },
        createNotify({getters}, data) {
            return getters.axios.post("Customer/MessageNotify", data);
        },
        // customer list
        CustomerList({getters}, data) {
            return getters.axios.post("Customer/Index", data);
        },
        creditList({getters}, data) {
            return getters.axios.post("Customer/Credits", data);
        },
        addressesList({getters}, data) {
            return getters.axios.post("Customer/Addresses", data);
        },
        profileList({getters}, data) {
            return getters.axios.post("Customer/Profile", data);
        },
        orderList({getters}, data) {
            return getters.axios.post("Customer/Orders/v1", data);
        },
        orderDetailsList({getters}, data) {
            return getters.axios.post("Customer/Order", data);
        },
        feedbackList({getters}, data) {
            return getters.axios.post("Order/Comments", data);
        },
        customerFeedbackList({getters}, data) {
            return getters.axios.post("Customer/Feedbacks", data);
        },
        feedbackDetails({getters}, data) {
            return getters.axios.post("Order/Comment", data);
        },
        ticketList({getters}, data) {
            return getters.axios.post("Seller/Tickets", data);
        },
        ticketInfo({getters}, data) {
            return getters.axios.post("Seller/Tiket", data);
        },
        closeTicket({getters}, data) {
            return getters.axios.post("Seller/CloseTicket", data);
        },
        getTicketParts({getters}) {
            return getters.axios.get("Seller/TiketPart");
        },
        reportList({getters}, data) {
            if (data.Type == 0) {
                delete data.Type;
                return getters.axios.post("Customer/Comprehensive", data);
            } else if (data.Type == 1) {
                delete data.Type;
                return getters.axios.post("Customer/Comprehensive/v1", data);
            } else if (data.Type == 2) {
                delete data.Type;
                return getters.axios.post("Customer/Comprehensive/v2", data);
            }

        },
        sendNotifyReport({getters}, data) {
            return getters.axios.post("Customer/TiketPart", data);
        },
        getReversAddress({getters}, data) {
            return getters.axiosAddress.post("Nanegha/ReverseAddress", data);
        },
        getCodeLogin({getters}, data) {
            if (data.type == 0) {
                delete data.Type;
                return getters.axios.put("Customer/Code", data);
            } else if (data.type == 1) {
                delete data.Type;
                return getters.axios.put("Seller/Code", data);
            }
        },
        verifyCustomer({getters}, data) {
            return getters.axios.post("Customer/Verify", data);
        },
        registerNewAddress({getters}, data) {
            return getters.axios.post("Customer/NewAddress", data);
        },
        registerNewCustomer({getters}, data) {
            return getters.axios.put("Customer/Register", data);
        },
        factorDeliveryMenu({getters}, data) {
            return getters.axios.post("Product/MenuDelivery", data);
        },
        reportSales({getters}, data) {
            return getters.axios.post("Customer/ComprehensiveSales", data);
        },
        customerMenu({getters}, data) {
            return getters.axios.post("Product/CustomerMenu", data);
        },
        financialList({getters}, data) {
            return getters.axios.post("Seller/Finance/V2", data);
        },
        financialListMain({getters}, data) {
            return getters.axios.post("FinancialPanel/Finance/V2", data);
        },
        inventoryInformation({getters}, data) {
            return getters.axios.post("Customer/InventoryInfo", data);
        },
        inventoryInformationSeller({getters}, data) {
            return getters.axios.post("Seller/InventoryInfo", data);
        },
        ComprehensiveProduct({getters}, data) {
            return getters.axios.post("Seller/ComprehensiveProduct", data);
        },
        ComprehensiveProduction({getters}, data) {
            return getters.axios.post("Seller/ComprehensiveProduction", data);
        },
        messageList({getters}, data) {
            return getters.axios.post("Seller/MessageList", data);
        },
        editProductCategory({getters}, data) {
            return getters.axios.post("Product/EditProductCategory", data);
        },
        hintsList({getters}, data) {
            return getters.axios.post("Seller/HintsList", data);
        },
        addHint({getters}, data) {
            return getters.axios.put("Seller/AddHints", data);
        },
        editHint({getters}, data) {
            return getters.axios.put("Seller/EditHints", data);
        },
        editMessageStatus({getters}, data) {
            return getters.axios.post("Seller/EditMessageStatus", data);
        },
        customerRfmType({getters}, data) {
            return getters.axios.get("Nanegha/CustomerRfmType", data);
        },
        customerRFMReport({getters}, data) {
            return getters.axios.post("Customer/CustomerRFMReport", data);
        },
        userPanelList({getters}, data) {
            return getters.axios.post("Account/Users", data);
        },
        registerNewUser({getters}, data) {
            return getters.axios.put("Account/Register", data);
        },
        editUser({getters}, data) {
            return getters.axios.put("Account/Edit", data);
        },
        addAccessUser({getters}, data) {
            return getters.axios.put("Account/Authrization", data);
        },
        routeAccessV1({getters}, data) {
            return getters.axios.post("Account/Routes/V1", data);
        },
        routeAccessV2({getters}, data) {
            return getters.axios.post("Account/Routes/V2", data);
        },
        routeAccess({getters}, data) {
            return getters.axios.post("Account/Routes", data);
        },
        unreadTicksCount({getters}) {
            return getters.axios.get("Seller/UnreadTicksCount");
        },
        unreadProductCount({getters}) {
            return getters.axios.get("Product/ChangedProductsCount");
        },
        unreadProcessTicketCountApi({getters}) {
            return getters.axios.get("Order/UnreadProcessTicketCount");
        },
        onlinePaymentCustomer({getters}, data) {
            return getters.axios.post("FinancialPanel/OnlinePayment", data);
        },
        creditReportCustomer({getters}, data) {
            return getters.axios.post("FinancialPanel/CreditReport", data);
        },
        paymentControlReport({getters}, data) {
            return getters.axios.post("FinancialPanel/PaymentControlReport", data);
        },
        deactivateSeller({getters}, data) {
            return getters.axios.post("Seller/DeactivateSeller", data);
        },
        balaySofreApi({getters}, data) {
            return getters.axios.post("Order/BalaySofre", data);
        },
        orderDetailsById({getters}, data) {
            return getters.axios.post("Order/OrderDetails", data);
        },
        referallCancell({getters}, data) {
            return getters.axios.post("Order/ProcessTicket/V1", data);
        },
        cancellOrderEnd({getters}, data) {
            return getters.axios.post("Order/CancelOrder", data);
        },
        processTicketIndex({getters}, data) {
            return getters.axios.post("Order/ProcessTicketIndex", data);
        },
        CancelOrderDetails({getters}, data) {
            return getters.axios.post("Order/CancelOrderDetails", data);
        },
        calculateOrderChanges({getters}, data) {
            return getters.axios.post("Order/CalculateOrderChanges", data);
        },
        transactionHistoryList({getters}, data) {
            return getters.axios.post("FinancialPanel/TransactionHistory", data);
        },
        findCustomer({getters}, data) {
            return getters.axios.post("Customer/FindCustomer", data);
        },
        addNewGroup({getters}, data) {
            return getters.axios.put("Customer/AddNewGroup", data);
        },
        groupIndex({getters}) {
            return getters.axios.get("Customer/GroupIndex");
        },
        removeGroupMembers({getters}, data) {
            return getters.axios.post("Customer/RemoveGroupMembers", data);
        },
        addGroupMembers({getters}, data) {
            return getters.axios.put("Customer/AddGroupMembers", data);
        },
        getGroupMembers({getters}, data) {
            return getters.axios.post("Customer/GetGroupCustomers", data);
        },
        getGroupMembersFromTransactions({getters}, data) {
            return getters.axios.post("Customer/GetTransactionCustomers", data);
        },
        creditTransfer({getters}, data) {
            return getters.axios.post("FinancialPanel/CreditTransfer", data);
        },
        bankFinanceTextFile({getters}, data) {
            return getters.axios.post("FinancialPanel/Finance/TextFile", data);
        },
        getGroupTransaction({getters}, data) {
            return getters.axios.post("Customer/GetGroupTransaction", data);
        },
        registerOrder({getters}, data) {
            return getters.axios.put("Order/Register", data);
        },
        supportOrder({getters}, data) {
            return getters.axios.post("Order/SupportOrder", data);
        },
        editProduct({getters}, data) {
            return getters.axios.post("Product/EditProduct", data);
        },
        kitchenVisitIndex({getters}, data) {
            return getters.axios.post("Seller/KitchenVisitIndex", data);
        },
        kitchenVisitsHistory({getters}, data) {
            return getters.axios.get(`Seller/KitchenVisitsHistory/${data}`);
        },
        addHealthQuestionCategory({getters}, data) {
            return getters.axios.put(`Seller/AddHealthQuestionCategory`, data);
        },
        healthQuestionCategoriesList({getters}) {
            return getters.axios.get(`Seller/HealthQuestionCategories`);
        },
        addHealthQuestion({getters}, data) {
            return getters.axios.put(`Seller/AddHealthQuestion`, data);
        },
        healthQuestions({getters}) {
            return getters.axios.get(`Seller/HealthQuestions`);
        },
        editHealthQuestion({getters}, data) {
            return getters.axios.post(`Seller/EditHealthQuestion`, data);
        },
        addKitchenVisit({getters}, data) {
            return getters.axios.put(`Seller/AddKitchenVisit/v3`, data);
        },
        enabledHealthQuestionsList({getters}, data) {
            return getters.axios.get(`Seller/EnabledHealthQuestions/${data}`);
        },
        addKitchenVisitAnswers({getters}, data) {
            return getters.axios.put(`Seller/AddKitchenVisitAnswers/v2`, data);
        },
        healthStatusDescription({getters}) {
            return getters.axios.get(`Nanegha/HealthStatusDescription`);
        },
        CustomerListExell({getters}, data) {
            return getters.axios.post(`Customer/SpecificNumberOfCustomers`, data);
        },
        getCategoriesList({getters}) {
            return getters.axios.get(`Product/GetCategories`);
        },
        redirectInAppTypeDescription({getters}) {
            return getters.axios.get(`Nanegha/RedirectInAppTypeDescription`);
        },

    },
    getters: {
        axios(state, getters) {
            return Axios.create({
                baseURL: getters.getBaseUrl,
                headers: {
                    Authorization: "Bearer " + getters.getToken,
                },
            });
        },
        axiosAddress(state, getters) {
            return Axios.create({
                baseURL: getters.getBaseUrlAddress,
                headers: {
                    Authorization: "Bearer " + getters.getToken,
                },
            });
        },
        getBaseUrl(state) {
            return state.baseUrl;
        },
        getBaseUrlAddress(state) {
            return state.baseUrlAddress;
        },
        isLoggedIn(state) {
            return state.token;
        },
        getToken(state) {
            return state.token;
        },
        getFormData(state) {
            return state.formData;
        },
    },
});
