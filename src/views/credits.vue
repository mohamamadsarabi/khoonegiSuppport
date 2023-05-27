<template>
  <div
      class="nav-wrapper credits customerId position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <ul class="nav" id="myTab" role="tablist">
      <li
          class="nav-item px-0"
          role="presentation"
          v-for="(tab, i) in tabLinks"
          :key="i"
      >
        <button
            class="nav-link"
            :class="tab.active"
            :id="tab.id"
            data-bs-toggle="tab"
            :data-bs-target="tab.target"
            type="button"
            role="tab"
            :aria-controls="tab.controls"
            aria-selected="true"
        >
          {{ tab.name }}
        </button>
      </li>
    </ul>

    <div class="tab-content" id="myTabContent">
      <!-- credits -->
      <div
          class="tab-pane fade show active"
          id="credits"
          role="tabpanel"
          aria-labelledby="transactions"
      >
          <khoonegiButton
              class="form-button mt-0 slate New-transaction"
              text="+  تراکنش جدید"
              @click="this.$router.push('/credits/newTransaction')"
          />
        <div class="content">
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-slot-mode="true"
                :columns="columnsCredits"
                :rows="creditsList"
                :total="totalRecordCount"
                :sortable="false"
                @do-search="doSearch"
                @is-finished="isLoading = false"
                :is-hide-paging="true"
                :messages="message"
            >
            </table-lite>
          </div>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div v-if="creditsList.length">
              <div class="info-item" v-for="(item, i) in creditsList" :key="i">
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">نوع</span>
                  <p class="item-data">{{ item.typeDescription }}</p>
                </div>
                <div class="item">
                  <span class="item-head">از حساب</span>
                  <p class="item-data">{{ item.from }}</p>
                </div>
                <div class="item">
                  <span class="item-head">به حساب</span>
                  <p class="item-data">{{ item.to }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ</span>
                  <p class="item-data">{{ item.createDate }}</p>
                </div>
                <div class="item">
                  <span class="item-head">مبلغ</span>
                  <p class="item-data">{{ item.amountPerPerson }}</p>
                </div>
                <div class="item">
                  <span class="item-head">توضیحات</span>
                  <p class="item-data">
                      {{item.description}}
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              در حال حاضر نکته موجود نمی‌باشد
            </div>
          </div>
        </div>
      </div>
      <!-- credit groups -->
      <div
          class="tab-pane fade"
          id="groups"
          role="tabpanel"
          aria-labelledby="groups-credit"
      >
        <khoonegiButton
            class="form-button mt-0 slate New-transaction"
            text="+  گروه جدید"
            @click="this.$router.push('/credits/newGroup')"
        />
        <div class="content">
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-slot-mode="true"
                :columns="columnsGroup"
                :rows="groupList"
                :total="totalRecordCount"
                :sortable="false"
                @do-search="doSearch"
                @is-finished="isLoading = false"
                :is-hide-paging="true"
                :messages="message"
            >
              <template v-slot:users="item">
                <button @click="$router.push(`/group/users/${item.value.groupId}/0`)">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                  >
                    <path
                        d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                        fill="#393939"
                    />
                  </svg>
                </button>
              </template>
              <template v-slot:transactions="item">
                <button @click="$router.push(`/group/transactionsGroup/${item.value.groupId}`)">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 19 20"
                      fill="none"
                  >
                    <path
                        d="M10.4744 5.5814C10.0708 5.5814 9.74359 5.89376 9.74359 6.27907C9.74359 6.66439 10.0708 6.97674 10.4744 6.97674H13.3974C13.801 6.97674 14.1282 6.66439 14.1282 6.27907C14.1282 5.89376 13.801 5.5814 13.3974 5.5814H10.4744Z"
                        fill="#FFAC30"
                    />
                    <path
                        d="M5.60256 9.30233C5.19897 9.30233 4.87179 9.61469 4.87179 10C4.87179 10.3853 5.19897 10.6977 5.60256 10.6977H13.3974C13.801 10.6977 14.1282 10.3853 14.1282 10C14.1282 9.61469 13.801 9.30233 13.3974 9.30233H5.60256Z"
                        fill="#FFAC30"
                    />
                    <path
                        d="M10.4744 13.0233C10.0708 13.0233 9.74359 13.3356 9.74359 13.7209C9.74359 14.1062 10.0708 14.4186 10.4744 14.4186H13.3974C13.801 14.4186 14.1282 14.1062 14.1282 13.7209C14.1282 13.3356 13.801 13.0233 13.3974 13.0233H10.4744Z"
                        fill="#FFAC30"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.8491 0.115096C12.7362 -1.3515e-05 11.3335 -7.47302e-06 9.54409 1.23104e-07H9.45591C7.66647 -7.47302e-06 6.26378 -1.3515e-05 5.15093 0.115096C4.01527 0.232564 3.09511 0.476581 2.30946 1.02154C1.83383 1.35145 1.41556 1.75078 1.06999 2.20487C0.499188 2.95494 0.243596 3.83343 0.120556 4.91765C-1.41561e-05 5.9801 -7.82751e-06 7.31927 1.28945e-07 9.02767V10.9405C1.28945e-07 12.0196 1.28857e-07 12.9474 0.0286156 13.7448C0.0911564 15.4876 0.288699 16.7685 1.06999 17.7951C1.41556 18.2492 1.83383 18.6486 2.30946 18.9785C3.38482 19.7244 4.72649 19.913 6.5519 19.9727C7.38713 20 8.35894 20 9.48927 20H9.54411C11.3335 20 12.7362 20 13.8491 19.8849C14.9847 19.7674 15.9049 19.5234 16.6905 18.9785C17.1662 18.6486 17.5844 18.2492 17.93 17.7951C18.5008 17.0451 18.7564 16.1666 18.8794 15.0823C19 14.0199 19 12.6808 19 10.9724V9.02765C19 7.31929 19 5.98009 18.8794 4.91765C18.7564 3.83343 18.5008 2.95494 17.93 2.20487C17.5844 1.75078 17.1662 1.35145 16.6905 1.02154C15.9049 0.476581 14.9847 0.232564 13.8491 0.115096ZM3.16853 2.1504C3.66351 1.80706 4.29705 1.60693 5.30835 1.50233C6.33333 1.39631 7.65693 1.39535 9.5 1.39535C11.3431 1.39535 12.6667 1.39631 13.6916 1.50233C14.7029 1.60693 15.3365 1.80706 15.8315 2.1504C16.183 2.39425 16.4922 2.68941 16.7476 3.02504C17.1072 3.4976 17.3168 4.10245 17.4264 5.06795C17.5375 6.04651 17.5385 7.31017 17.5385 9.06977V10.9302C17.5385 12.6898 17.5375 13.9535 17.4264 14.9321C17.3168 15.8976 17.1072 16.5024 16.7476 16.975C16.4922 17.3106 16.183 17.6058 15.8315 17.8496C15.3365 18.1929 14.7029 18.3931 13.6916 18.4977C12.6667 18.6037 11.3431 18.6047 9.5 18.6047C8.6734 18.6047 7.94903 18.6046 7.30591 18.5946C7.30166 18.1531 7.28727 17.828 7.23872 17.5353C6.85902 15.2466 4.97886 13.4516 2.58156 13.0891C2.27502 13.0428 1.93456 13.029 1.47208 13.025C1.46159 12.411 1.46154 11.7194 1.46154 10.9302V9.06977C1.46154 7.31017 1.46254 6.04651 1.57359 5.06795C1.68316 4.10245 1.89278 3.4976 2.2524 3.02504C2.50782 2.68941 2.81698 2.39425 3.16853 2.1504ZM5.79517 17.7536C5.82681 17.9444 5.83888 18.1652 5.84344 18.5419C4.51798 18.4547 3.75261 18.2547 3.16853 17.8496C2.81698 17.6058 2.50782 17.3106 2.2524 16.975C1.82804 16.4173 1.61862 15.6866 1.52725 14.4212C1.92181 14.4255 2.15315 14.4371 2.35293 14.4673C4.12484 14.7352 5.51453 16.062 5.79517 17.7536Z"
                        fill="#FFAC30"
                    />
                  </svg>
                </button>
              </template>
            </table-lite>
          </div>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div v-if="groupList.length">
              <div class="info-item" v-for="(item, i) in groupList" :key="i" ref="members">
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">نام گروه</span>
                  <p class="item-data">{{ item.groupName }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ ایجاد</span>
                  <p class="item-data">{{ item.createDate }}</p>
                </div>
                <div class="item">
                  <span class="item-head">اعضا(نفر)</span>
                  <p class="item-data">{{ item.membersCount }}</p>
                </div>
                <div class="item">
                  <span class="item-head">نمایش اعضا</span>
                  <p class="item-data">
                    <button @click="$router.push(`/group/users/${item.value.groupId}/0`)">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="18"
                          viewBox="0 0 22 18"
                          fill="none"
                      >
                        <path
                            d="M19.4424 10.8746L20.0517 11.312L19.4424 10.8746ZM19.4424 7.1254L18.8332 7.56278L19.4424 7.1254ZM20.3262 9H19.5762H20.3262ZM1.88376 10.8746L2.49302 10.4372L1.88376 10.8746ZM1.88376 7.1254L1.2745 6.68801L1.88376 7.1254ZM1 9H0.25H1ZM1.2745 11.312C2.14271 12.5214 3.43472 14.1105 5.01482 15.4043C6.58634 16.691 8.52214 17.75 10.6631 17.75V16.25C9.01732 16.25 7.41219 15.4285 5.96509 14.2437C4.52657 13.0659 3.32229 11.5923 2.49302 10.4372L1.2745 11.312ZM10.6631 17.75C12.804 17.75 14.7398 16.691 16.3114 15.4043C17.8915 14.1105 19.1835 12.5214 20.0517 11.312L18.8332 10.4372C18.0039 11.5923 16.7996 13.0659 15.3611 14.2437C13.914 15.4285 12.3089 16.25 10.6631 16.25V17.75ZM20.0517 6.68801C19.1835 5.47865 17.8915 3.88946 16.3114 2.59571C14.7398 1.30899 12.804 0.25 10.6631 0.25V1.75C12.3089 1.75 13.914 2.57146 15.3611 3.75631C16.7996 4.93414 18.0039 6.40765 18.8332 7.56278L20.0517 6.68801ZM10.6631 0.25C8.52214 0.25 6.58634 1.30899 5.01482 2.59572C3.43472 3.88946 2.1427 5.47865 1.2745 6.68801L2.49302 7.56278C3.32228 6.40765 4.52657 4.93414 5.96509 3.75631C7.41219 2.57146 9.01732 1.75 10.6631 1.75V0.25ZM20.0517 11.312C20.6061 10.5398 21.0762 9.92861 21.0762 9H19.5762C19.5762 9.35852 19.4571 9.56806 18.8332 10.4372L20.0517 11.312ZM18.8332 7.56278C19.4571 8.43194 19.5762 8.64148 19.5762 9H21.0762C21.0762 8.07139 20.6061 7.46024 20.0517 6.68801L18.8332 7.56278ZM2.49302 10.4372C1.86905 9.56806 1.75 9.35852 1.75 9H0.25C0.25 9.92861 0.72012 10.5398 1.2745 11.312L2.49302 10.4372ZM1.2745 6.68801C0.72012 7.46024 0.25 8.07139 0.25 9H1.75C1.75 8.64148 1.86905 8.43194 2.49302 7.56278L1.2745 6.68801ZM6.91309 9C6.91309 11.0711 8.59202 12.75 10.6631 12.75V11.25C9.42045 11.25 8.41309 10.2426 8.41309 9H6.91309ZM10.6631 12.75C12.7342 12.75 14.4131 11.0711 14.4131 9H12.9131C12.9131 10.2426 11.9057 11.25 10.6631 11.25V12.75ZM14.4131 9C14.4131 6.92893 12.7342 5.25 10.6631 5.25V6.75C11.9057 6.75 12.9131 7.75736 12.9131 9H14.4131ZM10.6631 5.25C8.59202 5.25 6.91309 6.92893 6.91309 9H8.41309C8.41309 7.75736 9.42045 6.75 10.6631 6.75V5.25Z"
                            fill="#393939"
                        />
                      </svg>
                    </button>
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">تراکنش ها</span>
                  <p class="item-data">
                    <button @click="$router.push(`/group/transactionsGroup/${item.value.groupId}`)">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 19 20"
                          fill="none"
                      >
                        <path
                            d="M10.4744 5.5814C10.0708 5.5814 9.74359 5.89376 9.74359 6.27907C9.74359 6.66439 10.0708 6.97674 10.4744 6.97674H13.3974C13.801 6.97674 14.1282 6.66439 14.1282 6.27907C14.1282 5.89376 13.801 5.5814 13.3974 5.5814H10.4744Z"
                            fill="#FFAC30"
                        />
                        <path
                            d="M5.60256 9.30233C5.19897 9.30233 4.87179 9.61469 4.87179 10C4.87179 10.3853 5.19897 10.6977 5.60256 10.6977H13.3974C13.801 10.6977 14.1282 10.3853 14.1282 10C14.1282 9.61469 13.801 9.30233 13.3974 9.30233H5.60256Z"
                            fill="#FFAC30"
                        />
                        <path
                            d="M10.4744 13.0233C10.0708 13.0233 9.74359 13.3356 9.74359 13.7209C9.74359 14.1062 10.0708 14.4186 10.4744 14.4186H13.3974C13.801 14.4186 14.1282 14.1062 14.1282 13.7209C14.1282 13.3356 13.801 13.0233 13.3974 13.0233H10.4744Z"
                            fill="#FFAC30"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.8491 0.115096C12.7362 -1.3515e-05 11.3335 -7.47302e-06 9.54409 1.23104e-07H9.45591C7.66647 -7.47302e-06 6.26378 -1.3515e-05 5.15093 0.115096C4.01527 0.232564 3.09511 0.476581 2.30946 1.02154C1.83383 1.35145 1.41556 1.75078 1.06999 2.20487C0.499188 2.95494 0.243596 3.83343 0.120556 4.91765C-1.41561e-05 5.9801 -7.82751e-06 7.31927 1.28945e-07 9.02767V10.9405C1.28945e-07 12.0196 1.28857e-07 12.9474 0.0286156 13.7448C0.0911564 15.4876 0.288699 16.7685 1.06999 17.7951C1.41556 18.2492 1.83383 18.6486 2.30946 18.9785C3.38482 19.7244 4.72649 19.913 6.5519 19.9727C7.38713 20 8.35894 20 9.48927 20H9.54411C11.3335 20 12.7362 20 13.8491 19.8849C14.9847 19.7674 15.9049 19.5234 16.6905 18.9785C17.1662 18.6486 17.5844 18.2492 17.93 17.7951C18.5008 17.0451 18.7564 16.1666 18.8794 15.0823C19 14.0199 19 12.6808 19 10.9724V9.02765C19 7.31929 19 5.98009 18.8794 4.91765C18.7564 3.83343 18.5008 2.95494 17.93 2.20487C17.5844 1.75078 17.1662 1.35145 16.6905 1.02154C15.9049 0.476581 14.9847 0.232564 13.8491 0.115096ZM3.16853 2.1504C3.66351 1.80706 4.29705 1.60693 5.30835 1.50233C6.33333 1.39631 7.65693 1.39535 9.5 1.39535C11.3431 1.39535 12.6667 1.39631 13.6916 1.50233C14.7029 1.60693 15.3365 1.80706 15.8315 2.1504C16.183 2.39425 16.4922 2.68941 16.7476 3.02504C17.1072 3.4976 17.3168 4.10245 17.4264 5.06795C17.5375 6.04651 17.5385 7.31017 17.5385 9.06977V10.9302C17.5385 12.6898 17.5375 13.9535 17.4264 14.9321C17.3168 15.8976 17.1072 16.5024 16.7476 16.975C16.4922 17.3106 16.183 17.6058 15.8315 17.8496C15.3365 18.1929 14.7029 18.3931 13.6916 18.4977C12.6667 18.6037 11.3431 18.6047 9.5 18.6047C8.6734 18.6047 7.94903 18.6046 7.30591 18.5946C7.30166 18.1531 7.28727 17.828 7.23872 17.5353C6.85902 15.2466 4.97886 13.4516 2.58156 13.0891C2.27502 13.0428 1.93456 13.029 1.47208 13.025C1.46159 12.411 1.46154 11.7194 1.46154 10.9302V9.06977C1.46154 7.31017 1.46254 6.04651 1.57359 5.06795C1.68316 4.10245 1.89278 3.4976 2.2524 3.02504C2.50782 2.68941 2.81698 2.39425 3.16853 2.1504ZM5.79517 17.7536C5.82681 17.9444 5.83888 18.1652 5.84344 18.5419C4.51798 18.4547 3.75261 18.2547 3.16853 17.8496C2.81698 17.6058 2.50782 17.3106 2.2524 16.975C1.82804 16.4173 1.61862 15.6866 1.52725 14.4212C1.92181 14.4255 2.15315 14.4371 2.35293 14.4673C4.12484 14.7352 5.51453 16.062 5.79517 17.7536Z"
                            fill="#FFAC30"
                        />
                      </svg>
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              در حال حاضر نکته موجود نمی‌باشد
            </div>
          </div>
<!--          <paginate-->
<!--              v-if="pageCount > 1"-->
<!--              :page-count="pageCount"-->
<!--              :page-range="10"-->
<!--              :click-handler="changePage"-->
<!--              :prev-text="'<'"-->
<!--              :next-text="'>'"-->
<!--              :container-class="'pagination'"-->
<!--              :page-class="'page-item'"-->
<!--              :page-link-class="'link'"-->
<!--          >-->
<!--          </paginate>-->
        </div>
      </div>
    </div>
  </div>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import khoonegiButton from "../components/khoonegiButton";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
// import Paginate from "vuejs-paginate-next";

export default {
  name: "credits",
  components: {
    pageToTop,
    khoonegiButton,
    tableLite,
    LoadingFull,
    // Paginate
  },
  data() {
    return {
      toast: useToast(),
      pageCount: 1,
      pageIndex: 1,
      tabLinks: [
        {
          id: "transactions",
          name: "تراکنش ها",
          target: "#credits",
          controls: "credits",
          isNew: false,
          active: "active",
        },
        {
          id: "groups-credit",
          name: "گروه ها",
          target: "#groups",
          controls: "groups",
          isNewProfile: false,
        },
      ],
      windowWith: window.innerWidth,
      columnsCredits: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نوع",
          field: "typeDescription",
          width: "0.5%",
          sortable: false,
        },

        {
          label: "از حساب",
          field: "from",
          width: "1%",
          sortable: false,
        },
        {
          label: "به حساب",
          field: "to",
          width: "1%",
          sortable: false,
        },

        {
          label: "تاریخ",
          field: "createDate",
          width: ".3%",
          sortable: false,
        },
        {
          label: "مبلغ",
          field: "amountPerPerson",
          width: ".5%",
          sortable: false,
        },
        {
          label: "توضیحات",
          field: "description",
          width: "1%",
          sortable: false,
        },
      ],
      columnsGroup: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام گروه",
          field: "groupName",
          width: "1%",
          sortable: false,
        },

        {
          label: "تاریخ ایجاد",
          field: "createDate",
          width: ".3%",
          sortable: false,
        },

        {
          label: "اعضا(نفر)",
          field: "membersCount",
          width: ".3%",
          sortable: false,
        },
        {
          label: "نمایش اعضا",
          field: "users",
          width: ".2%",
          sortable: false,
        },
        {
          label: "تراکنش ها",
          field: "transactions",
          width: ".2%",
          sortable: false,
        },
      ],
      hostingTipsList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر نکته موجود نمی‌باشد",
      },
      showModalTips: false,
      editModalTips: false,
      tipsText: "",
      editTipsText: "",
      showModalMessage: false,
      editModalMessage: false,
      titleMessage: "",
      editTitleMessage: "",
      creditsList: [],
      showEditModalMessage: false,
      groupList: [],
      textMessage: "",
      editTextMessage: "",
      messageId: "",
      isLoading: false,
      isDisabledEdit: false,
      searchQuery: "",
      searchIndex: 0,
      searchQueryTips: "",
      searchIndexTips: 0,
      isActiveMessage: false,
      isSearchLoading: false,
      isActiveTips: false,
      messageIdTips: "",
    }
  },

  mounted() {
    this.isLoading = true;
    this.getTransactionList()
    this.getGroupList()
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
  },
  methods: {
    getGroupList() {
      this.$store
          .dispatch("groupIndex")
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            this.isSearchLoading = false;
            if (respons.data.succeed) {
              this.groupList = respons.data.groups;
              this.groupList.forEach((item , index)=> {
                  item.row = index;
                  item.row++;
              })
            } else {
              this.isSearchLoading = false;
              this.toast.error(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            }
          })
          .catch((error) => {
            this.isSearchLoading = false;
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    getTransactionList() {
      let data = {
        PageNumber: 1
      };
      this.$store
          .dispatch("transactionHistoryList", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.creditsList = respons.data.transactionHistory;
              this.pageCount = respons.data.totalCount;
              this.creditsList.forEach((item)=> {
                this.editTitleMessage = item.title;
                this.editTextMessage = item.message;
                this.messageId = item.messageId;
                this.isActiveMessage = item.isActive;
                item.amountPerPerson = (item.amountPerPerson * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              })
            } else {
              this.isSearchLoading = false;
              this.toast.error(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            }
          })
          .catch((error) => {
            this.isSearchLoading = false;
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
  },

}
</script>

<style lang="scss">
.credits {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;

  .tab-content {
    position: unset !important;
  }

  .New-transaction{
    position: absolute;
    left: 2%;
    top: 11px;
    width: 15%;
    font-size: 12px;
    @media (max-width: 768px) {
      position: unset;
      width: 100%;
      margin-bottom: 1rem;
    }
  }
}

.tipsModal.promotionModal {
  height: 30rem !important;
}
.tipsModalEdit {
  height: 27rem !important;
}
.tipsModal {
  height: 25rem !important;
}
.tipsModal,.tipsModalEdit {
  .check-box {
    @media (max-width: 768px) {
      margin-left: 10px !important;
    }
  }

  .content {
    margin: 5% 8% !important;

    .create-Tips {
      width: 35%;
      float: left;
      @media (max-width: 768px) {
        width: 50%;
      }
    }

    .footer-modal {
      margin-top: 2rem !important;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .message {
      font-weight: 500;
      font-size: 13px;
      line-height: 17px;
      color: #FFAC30;
      margin-bottom: 10px;
      display: block;
    }
  }

  .detail {
    label {
      font-weight: 600;
      font-size: 13px;
      line-height: 19px;
      color: #979797;
    }

    .message-input {
      height: auto !important;
      margin-bottom: 10px;
    }

    .global-input {
      height: 120px;
    }
  }
}

.isActive-brand {
  &:checked:after {
    content: "✔";
    position: absolute;
    top: -4px;
    right: 5px;
    @media (max-width: 768px) {
      top: 11px;
    }
  }

}
</style>
