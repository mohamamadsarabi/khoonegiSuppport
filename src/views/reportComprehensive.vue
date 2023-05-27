<template>
  <div
      class="nav-wrapper ComprehensiveReport position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
      id="ComprehensiveReport"
  >
    <div class="header-report">
      <date-picker
          color="#664ECA"
          class="datePicker fromDate"
          placeholder="از تاریخ"
          v-model="fromDate"
          auto-submit
      ></date-picker>

      <date-picker
          color="#664ECA"
          class="datePicker toDate"
          placeholder="تا تاریخ"
          v-model="toDate"
          auto-submit
      ></date-picker>
    </div>
    <div class="content-report" v-if="reportList.length">
      <div class="item" v-for="(item , index)  in reportList" :key="index">
        <div class="orders">
          <h6>سفارشات</h6>
          <div class="item-report">
            <div class="item">
              <span>تعداد سفارشات: </span>
              <p>{{ item.orders.orderCount }} سفارش</p>
            </div>
            <div class="item item-3">
              <span>تعداد خاتون های آنلاین: </span>
              <button @click="getSellerList(item.orders.sellers)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    :id="'iconEye' + i"
                >
                  <path
                      d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                      fill="#393939"
                  />
                </svg>
              </button>
              <p>{{ item.orders.sellersCount }} نفر</p>
            </div>
            <div class="item">
              <span>تعداد پرس غذا: </span>
              <p>{{ item.orders.foodsCount }} پرس</p>
            </div>
            <div class="item item-3">
              <span>تعداد سفارشات (باکد تخفیف): </span>
              <button @click="getOrderList(item.orders.discountedOrders)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    :id="'iconEye' + i"
                >
                  <path
                      d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                      fill="#393939"
                  />
                </svg>
              </button>
              <p>{{ item.orders.discountCodeCount }} سفارش</p>
            </div>
          </div>
        </div>
        <div class="peymentOrders">
          <h6>پرداختی سفارشات</h6>
          <div class="item-report">
            <div class="item">
              <span>مجموع کل فروش: </span>
              <p>{{
                  (item.ordersPayment.totalPayment * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} سفارش</p>
            </div>
            <div class="item" v-if="userState == 1 || userState == 2">
              <span>مجموع سهم شرکت: </span>
              <p>{{
                  (item.ordersPayment.totalCompanyShare * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} ریال</p>
            </div>
            <div class="item">
              <span>مجموع مبلغ شارژ معرف: </span>
              <p>{{
                  (item.ordersPayment.totalPaymentWithIdentifierCode * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} ریال</p>
            </div>
            <div class="item item-3">
              <span>تعداد سفارشات دارای کد تخفیف: </span>
              <button @click="getOrderPeymentList(item.ordersPayment.discountedOrders)">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    :id="'iconEye' + i"
                >
                  <path
                      d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                      fill="#393939"
                  />
                </svg>
              </button>
              <p>{{
                  item.ordersPayment.discountedOrdersCount
                }} سفارش</p>
            </div>
            <div class="item" v-if="userState == 1 || userState == 2">
              <span>مجموع سهم خاتون: </span>
              <p>{{
                  (item.ordersPayment.totalSellerShare * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} ریال</p>
            </div>
            <div class="item">
              <span>مجموع تخفیفات غذا: </span>
              <p>{{
                  (item.ordersPayment.totalFoodDiscounts * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} ریال</p>
            </div>
          </div>
        </div>
        <div class="distributionOrders">
          <h6>توزیع سفارشات</h6>
          <div class="item-report">
            <!--            <div class="item">-->
            <!--              <span>مجموع مسافت طی شده توسط برندگان(کیلومتر): </span>-->
            <!--              <p>{{ item.distributionOrders.totalDistance }} کیلومتر</p>-->
            <!--            </div>-->
            <div class="item">
              <span>مجموع پرداختی میزبان به پیک آن: </span>
              <p> {{
                  (item.distributionOrders.paykOnTotalPayment * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} ریال</p>
            </div>
            <div class="item">
              <span>مجموع دریافتی هزینه توزیع از مشتریان: </span>
              <p>{{
                  (item.distributionOrders.totalDistributionPrice * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }} ریال</p>
            </div>
          </div>
        </div>
        <div class="customers">
          <h6>مشتریان</h6>
          <div class="item-report">
            <div class="item">
              <span>تعداد مشتریان: </span>
              <p>{{ item.customers.customerTotalCount }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان سفارش اول: </span>
              <p>{{ item.customers.customerQuery1 }} سفارش</p>
            </div>
            <div class="item">
              <span>مشتریان دارای کدمعرف: </span>
              <p>{{ item.customers.customertWithIdentifierCode }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای 2 تا 4 سفارش: </span>
              <p>{{ item.customers.customerQuery2 }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای 5 تا 10 سفارش:</span>
              <p>{{ item.customers.customerQuery3 }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای 11 تا 20 سفارش: </span>
              <p>{{ item.customers.customerQuery4 }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای 21 تا 30 سفارش:</span>
              <p>{{ item.customers.customerQuery5 }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای 31 تا 50 سفارش:</span>
              <p>{{ item.customers.customerQuery6 }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای 51 تا 100 سفارش: </span>
              <p>{{ item.customers.customerQuery7 }} نفر</p>
            </div>
            <div class="item">
              <span>مشتریان دارای بیش از 100 سفارش: </span>
              <p>{{ item.customers.customerQuery8 }} نفر</p>
            </div>
          </div>
        </div>
        <div class="timeOrder">
          <h6>زمان ثبت سفارش</h6>
          <div class="item-report">
            <div class="item">
              <span>روز قبل سفارش: </span>
              <p>{{ item.orderRegistrationTime.timeRange1 }} عدد</p>
            </div>
            <div class="item">
              <span>از 00:00 تا 07:59: </span>
              <p>{{ item.orderRegistrationTime.timeRange2 }} عدد</p>
            </div>
            <div class="item">
              <span>از 08:00 تا 10:59: </span>
              <p>{{ item.orderRegistrationTime.timeRange3 }} عدد</p>
            </div>
            <div class="item">
              <span>از 11:00 تا 13:59: </span>
              <p>{{ item.orderRegistrationTime.timeRange4 }} عدد</p>
            </div>
            <div class="item">
              <span>از 14:00 تا 15:00: </span>
              <p>{{ item.orderRegistrationTime.timeRange5 }} عدد</p>
            </div>
            <div class="item">
              <span>بعد از 15:00: </span>
              <p>{{ item.orderRegistrationTime.timeRange6 }} عدد</p>
            </div>
          </div>
        </div>
        <div class="feedbacks">
          <h6>بازخوردها</h6>
          <div class="item-report">
            <div class="item">
              <span>پسندیدم: </span>
              <p>{{ item.feedbacks.likeCount }} عدد</p>
            </div>
            <div class="item">
              <span>نپسندیدم: </span>
              <p>{{ item.feedbacks.disLikeCount }} عدد</p>
            </div>
            <div class="item">
              <span>افزودن به علاقه مندی ها: </span>
              <p>{{ item.feedbacks.favoriteCount }} عدد</p>
            </div>
            <div class="item">
              <span>اشتراک تجربه: </span>
              <p>{{ item.feedbacks.shareCount }} عدد</p>
            </div>
            <div class="item">
              <span>موجود شد خبرم کن: </span>
              <p>{{ item.feedbacks.notifyAvailable }} عدد</p>
            </div>
          </div>
        </div>
        <div class="processSales">
          <h6>روند فروش محصول</h6>
          <div class="item-report">
            <div class="item">
              <span>تعداد کل غذاهای باز شده: </span>
              <p>{{ item.salesProcess.totalCount }} عدد</p>
            </div>
            <div class="item">
              <span>باقیمانده: </span>
              <p>{{ item.salesProcess.remainingCount }} عدد</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-result">
      لطفا بازه تاریخ را انتخاب نمایید
    </div>
  </div>
  <Dialog v-model:visible="sellerModal" class="sellerModal">
    <template #header>
      <div class="header">
        <span>میزبان های آنلاین </span>
        <button @click="sellerModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <table-lite
          v-if="windowWith > 768"
          :is-slot-mode="true"
          :columns="columns"
          :rows="sellerList"
          :total="totalRecordCount"
          :sortable="false"
          @do-search="doSearch"
          @is-finished="isLoading = false"
          :is-hide-paging="true"
          :messages="message"
      >
      </table-lite>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="sellerList.length">
          <div class="info-item" v-for="(item, i) in sellerList" :key="i">
            <div class="item">
              <span class="item-head">نام مستعار</span>
              <p class="item-data">{{ item.brand }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام اصلی </span>
              <p class="item-data">{{ item.sellerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">تعداد محصولات</span>
              <p class="item-data">{{ item.count }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
      </div>
    </div>

  </Dialog>
  <Dialog v-model:visible="orderModal" class="orderModal">
    <template #header>
      <div class="header">
        <span>سفارشات با کد تخفیف </span>
        <button @click="orderModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <table-lite
          v-if="windowWith > 768"
          :is-slot-mode="true"
          :columns="columnsOrder"
          :rows="orderList"
          :total="totalRecordCount"
          :sortable="false"
          @do-search="doSearch"
          @is-finished="isLoading = false"
          :is-hide-paging="true"
          :messages="message"
      >
      </table-lite>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="orderList.length">
          <div class="info-item" v-for="(item, i) in orderList" :key="i">
            <div class="item">
              <span class="item-head">نام مشتری</span>
              <p class="item-data">{{ item.customerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ </span>
              <p class="item-data">{{ item.date }}</p>
            </div>
            <div class="item">
              <span class="item-head">کد تخفیف</span>
              <p class="item-data">{{ item.discountCode }}</p>
            </div>
            <div class="item">
              <span class="item-head">مبلغ تخفیف</span>
              <p class="item-data">{{
                  (item.discountPrice * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}</p>
            </div>
            <div class="item">
              <span class="item-head">نوع تخفیف</span>
              <p class="item-data">{{ item.discountType }}</p>
            </div>
            <div class="item">
              <span class="item-head">کد سفارش</span>
              <p class="item-data">{{ item.orderId }}</p>
            </div>
            <div class="item">
              <span class="item-head">شماره تلفن</span>
              <p class="item-data">{{ item.phoneNumber }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">در حال حاضر سفارش موجود نمی‌باشد</div>
      </div>
    </div>

  </Dialog>
  <Dialog v-model:visible="orderPeymentModal" class="orderPeymentModal">
    <template #header>
      <div class="header">
        <span>تعداد سفارشات دارای کد تخفیف </span>
        <button @click="orderPeymentModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <table-lite
          v-if="windowWith > 768"
          :is-slot-mode="true"
          :columns="columnsOrderPeyment"
          :rows="orderPeymentList"
          :total="totalRecordCount"
          :sortable="false"
          @do-search="doSearch"
          @is-finished="isLoading = false"
          :is-hide-paging="true"
          :messages="message"
      >
        <template v-slot:averageDiscountPrice="item">
          {{
            (item.value.averageDiscountPrice * 10).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </template>
        <template v-slot:averageTotalPayment="item">
          {{
            (item.value.averageTotalPayment * 10).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </template>
        <template v-slot:totalDiscountPrice="item">
          {{
            (item.value.totalDiscountPrice * 10).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </template>
        <template v-slot:totalPayment="item">
          {{
            (item.value.totalPayment * 10).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }}
        </template>
      </table-lite>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="orderPeymentList.length">
          <div class="info-item" v-for="(item, i) in orderPeymentList" :key="i">
            <div class="item">
              <span class="item-head">کد تخفیف</span>
              <p class="item-data">{{ item.discountCode }}</p>
            </div>
            <div class="item">
              <span class="item-head">میانگین قیمت تخفیف </span>
              <p class="item-data">{{ (item.averageDiscountPrice * 10) }}</p>
            </div>
            <div class="item">
              <span class="item-head">میانگین کل پرداختی</span>
              <p class="item-data">{{ (item.averageTotalPayment * 10) }}</p>
            </div>
            <div class="item">
              <span class="item-head">تعداد سفارشات</span>
              <p class="item-data">{{ item.orderCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">مجموع کد تخفیف</span>
              <p class="item-data">{{ (item.totalDiscountPrice * 10) }}</p>
            </div>
            <div class="item">
              <span class="item-head">مجموع پرداختی</span>
              <p class="item-data">{{ (item.totalPayment * 10) }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
      </div>
    </div>

  </Dialog>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
  <table class="d-none">
    <tbody v-for="i in reportList" :key="i">
    <tr>
      <th>تعداد سفارشات</th>
      <td>{{i.orders.orderCount}}</td>
    </tr>
    <tr>
      <th>تعداد خاتون های آنلاین</th>
      <td>{{i.orders.sellersCount}}</td>
    </tr>
    <tr>
      <th>تعداد پرس غذا</th>
      <td>{{i.orders.foodsCount}}</td>
    </tr>
    <tr>
      <th>تعداد سفارشات (باکد تخفیف)</th>
      <td>{{i.orders.discountCodeCount}}</td>
    </tr>
    <tr>
      <th>مجموع کل فروش</th>
      <!--order payment-->
      <td>{{(i.ordersPayment.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
    </tr>
    <tr>
      <th>مجموع سهم شرکت</th>
      <td>{{(i.ordersPayment.totalCompanyShare * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
    </tr>
    <tr>
      <th>مجموع مبلغ شارژ معرف</th>
      <td>{{(i.ordersPayment.totalPaymentWithIdentifierCode * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
    </tr>
    <tr>
      <th>مجموع سهم خاتون</th>
      <td>{{(i.ordersPayment.totalSellerShare * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
    </tr>
    <tr>
      <th>مجموع تخفیفات غذا</th>
      <td>{{(i.ordersPayment.totalFoodDiscounts * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</td>
    </tr>
    <tr>
      <th>تعداد سفارشات دارای کد تخفیف</th>
      <td>{{ i.ordersPayment.discountedOrdersCount }}</td>
    </tr>

    <tr>
      <th>مجموع پرداختی میزبان به پیک آن</th>
      <td>{{ i.distributionOrders.paykOnTotalPayment }}</td>
    </tr>
    <tr>
      <th>مجموع دریافتی هزینه توزیع از مشتریان</th>
      <td>{{ i.distributionOrders.totalDistributionPrice }}</td>
    </tr>
    <tr>
      <th>تعداد مشتریان</th>
      <!-- customers -->
      <td>{{ i.customers.customerTotalCount }}</td>
    </tr>
    <tr>
      <th>مشتریان سفارش اول</th>
      <td>{{ i.customers.customerQuery1 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای کدمعرف</th>
      <td>{{ i.customers.customertWithIdentifierCode }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای 2 تا 4 سفارش</th>
      <td>{{ i.customers.customerQuery2 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای 5 تا 10 سفارش</th>
      <td>{{ i.customers.customerQuery3 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای 11 تا 20 سفارش</th>
      <td>{{ i.customers.customerQuery4 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای 21 تا 30 سفارش</th>
      <td>{{ i.customers.customerQuery5 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای 31 تا 50 سفارش</th>
      <td>{{ i.customers.customerQuery6 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای 51 تا 100 سفارش</th>
      <td>{{ i.customers.customerQuery7 }}</td>
    </tr>
    <tr>
      <th>مشتریان دارای بیش از 100 سفارش</th>
      <td>{{ i.customers.customerQuery8 }}</td>
    </tr>
    <tr>
      <th>روز قبل سفارش</th>
      <td>{{i.orderRegistrationTime.timeRange1}}</td>
    </tr>
    <tr>
      <th>از 00:00 تا 07:59</th>
      <td>{{i.orderRegistrationTime.timeRange2}}</td>
    </tr>

    <tr>
      <th>از 08:00 تا 10:59</th>
      <td>{{i.orderRegistrationTime.timeRange3}}</td>
    </tr>
    <tr>
      <th>از 11:00 تا 13:59</th>
      <td>{{i.orderRegistrationTime.timeRange4}}</td>
    </tr>

    <tr>
      <th>از 14:00 تا 15:00</th>
      <td>{{i.orderRegistrationTime.timeRange5}}</td>
    </tr>
    <tr>
      <th>بعد از 15:00</th>
      <td>{{i.orderRegistrationTime.timeRange6}}</td>
    </tr>
    <tr>
      <th>پسندیدم</th>
      <td>{{i.feedbacks.likeCount}}</td>
    </tr>
    <tr>
      <th>نپسندیدم</th>
      <td>{{i.feedbacks.disLikeCount}}</td>
    </tr>
    <tr>
      <th>افزودن به علاقه مندی ها</th>
      <td>{{i.feedbacks.favoriteCount}}</td>
    </tr>
    <tr>
      <th>اشتراک تجربه</th>
      <td>{{i.feedbacks.shareCount}}</td>
    </tr>
    <tr>
      <th>موجود شد خبرم کن</th>
      <td>{{i.feedbacks.notifyAvailable}}</td>
    </tr>
    <tr>
      <th>تعداد کل غذاهای باز شده</th>
      <td>{{i.salesProcess.totalCount}}</td>
    </tr>
    <tr>
      <th>باقیمانده</th>
      <td>{{i.salesProcess.remainingCount}}</td>
    </tr>
    </tbody>
  </table>

</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import tableLite from "../components/khoonegiTable";
import Dialog from "primevue/dialog";
import {useToast} from "vue-toastification";

export default {
  name: "reportComprehensive",
  components: {
    pageToTop,
    tableLite,
    Dialog,
    LoadingFull
  },
  data() {
    return {
      toast: useToast(),
      totalRecordCount: 0,
      fromDate: "",
      toDate: "",
      reportList: [],
      sellerList: [],
      windowWith: window.innerWidth,
      sellerModal: false,
      columns: [
        {
          label: "نام مستعار",
          field: "brand",
          width: "1%",
          sortable: false,
        },

        {
          label: "نام اصلی",
          field: "sellerName",
          width: "2%",
          sortable: false,
        },
        {
          label: "تعداد محصول",
          field: "count",
          width: "1%",
          sortable: false,
        },
      ],
      message: {
        noDataAvailable: "در حال حاضر میزبان موجود نمی‌باشد",
      },
      orderList: [],
      orderModal: false,
      columnsOrder: [
        {
          label: "نام مشتری",
          field: "customerName",
          width: "1%",
          sortable: false,
        },

        {
          label: "تاریخ",
          field: "date",
          width: "2%",
          sortable: false,
        },
        {
          label: "کد تخفیف",
          field: "discountCode",
          width: "1%",
          sortable: false,
        },
        {
          label: "مبلغ تخفیف",
          field: "discountPrice",
          width: "1%",
          sortable: false,
        },
        {
          label: "نوع تخفیف",
          field: "discountType",
          width: "1%",
          sortable: false,
        },
        {
          label: "کد سفارش",
          field: "orderId",
          width: "1%",
          sortable: false,
        },
        {
          label: "شماره تلفن",
          field: "phoneNumber",
          width: "1%",
          sortable: false,
        },
      ],
      orderPeymentList: [],
      orderPeymentModal: false,
      columnsOrderPeyment: [
        {
          label: "کد تخفیف",
          field: "discountCode",
          width: "1%",
          sortable: false,
        },

        {
          label: "میانگین قیمت تخفیف",
          field: "averageDiscountPrice",
          width: "2%",
          sortable: false,
        },
        {
          label: "میانگین کل پرداختی",
          field: "averageTotalPayment",
          width: "1%",
          sortable: false,
        },
        {
          label: "تعداد سفارشات",
          field: "orderCount",
          width: "1%",
          sortable: false,
        },
        {
          label: "مجموع کد تخفیف",
          field: "totalDiscountPrice",
          width: "1%",
          sortable: false,
        },
        {
          label: "مجموع پرداختی",
          field: "totalPayment",
          width: "1%",
          sortable: false,
        },
      ],
      isLoading: false,
      userState: this.$store.state.typeUser,
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
  },
  methods: {

    getSellerList(sellers) {
      this.sellerList = sellers;
      this.sellerModal = true;
    },
    getOrderList(orders) {
      this.orderList = orders;
      this.orderModal = true;
    },
    getOrderPeymentList(orders) {
      console.log(orders)
      // orders.forEach((item) =>{
      //   item.averageDiscountPrice = (item.averageDiscountPrice * 10).toString()
      //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //   item.averageTotalPayment = (item.averageTotalPayment * 10).toString()
      //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //   item.averageDiscountPrice = (item.averageDiscountPrice * 10).toString()
      //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      //   item.averageDiscountPrice = (item.averageDiscountPrice * 10).toString()
      //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // })
      this.orderPeymentList = orders;
      this.orderPeymentModal = true;
    },

    getReportList() {
      this.isLoading = true;
      const data = {
        FromDate: this.fromDate,
        ToDate: this.toDate
      };
      this.$store
          .dispatch("reportSales", data)
          .then((respons) => {
            console.log(respons)
            this.isLoading = false;
            this.isSearchLoading = false;
            if (respons.data.succeed) {
              this.reportList = respons.data.comprehensive;
              this.reportList.forEach((item) => {
                item.orders.discountedOrders.forEach((order) => {
                  order.discountPrice = (order.discountPrice * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                })
              })
            } else {
              this.toast.error(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            }

          })
          .catch((error) => {
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            this.isSearchLoading = false;
            console.log(error);
          });
    }
  },
  watch: {
    toDate: function () {
      this.getReportList()
    },
  }
}
</script>

<style lang="scss">
.sellerModal {
  .content {
    margin: 5% 6% !important;
  }
}

.orderPeymentModal, .orderModal {
  width: 70rem !important;

  .content {
    margin: 4% 4% !important;
  }
}

.ComprehensiveReport {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header-report {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 15px;
    display: flex;
    column-gap: 1%;

    .selectedDate {
      width: 15%;
      display: block;
    }
  }

  .content-report {
    .item {
      > div {
        padding: 2rem 0;
        border-bottom: 1px solid #E9E9E9;

        &:last-child {
          border: none;
        }
      }
    }

    h6 {
      font-weight: 700;
      font-size: 14px;
      color: #664ECA;
      margin-bottom: 1.5rem;
    }

    .item-report {
      display: grid;
      grid-template-columns: 1fr 1fr;
      row-gap: 1.5rem;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .item-3 {
        column-gap: 1rem !important;
        grid-template-columns: auto auto 1fr !important;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }
      }

      .item {
        align-items: center;
        column-gap: 3rem;
        display: grid;
        grid-template-columns: auto 1fr;
        justify-items: right;

        span {
          font-weight: 400;
          font-size: 15px;
          color: #393939;
        }

        p {
          font-weight: 700;
          font-size: 14px;
          color: #393939;
          line-height: 1.625rem !important;

        }
      }
    }
  }

  .no-result {
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media print{
  .customers{
    display: block !important;
    page-break-after: always;
  }
}
</style>
