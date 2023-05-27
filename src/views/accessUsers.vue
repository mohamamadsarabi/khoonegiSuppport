<template>
  <div
      class="nav-wrapper accessUser position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header-report">
      <div class="search">
        <div class="selected-type">
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
        <div class="buttons">
          <khoonegiButton
              class="form-button mt-0 slate"
              text="کاربر جدید"
              :icon="false"
              @click="this.$router.push('/accessUsers/addNewUser')"
          />
        </div>
      </div>
    </div>
    <div class="content-report">
      <div class="table-info pt-3" v-if="windowWith > 768">
        <table-lite
            :is-slot-mode="true"
            :columns="columns"
            :rows="userList"
            :total="totalRecordCount"
            :sortable="false"
            @do-search="doSearch"
            @is-finished="isLoading = false"
            :is-hide-paging="true"
            :messages="message"
        >
          <template v-slot:isActive="item">
            <input
                class="check-box isActive"
                type="checkbox"
                v-model="item.value.isActive"
            />
          </template>
          <template v-slot:access="item">
            <button @click="getAccessList(item)">
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
          <template v-slot:edit="item">
            <button @click="editUser(item)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.7276 1.25C16.0835 1.25 15.5514 1.5195 15.0478 1.90373C14.5707 2.26776 14.0409 2.79756 13.4056 3.4329L7.92473 8.91374C7.50384 9.33393 7.17105 9.66617 6.96696 10.0908C6.76286 10.5155 6.71131 10.9829 6.64612 11.574L6.62843 11.7338C6.50649 12.831 6.40597 13.7353 6.42898 14.4477C6.45304 15.1928 6.61405 15.8752 7.14744 16.4086C7.68084 16.942 8.36328 17.103 9.10833 17.1271C9.82071 17.1501 10.7251 17.0496 11.8222 16.9276L11.9821 16.9099C12.5732 16.8447 13.0406 16.7932 13.4652 16.5891C13.8899 16.385 14.2221 16.0522 14.6423 15.6313L20.1231 10.1504C20.7585 9.51512 21.2883 8.98536 21.6523 8.50824C22.0366 8.00463 22.3061 7.47256 22.3061 6.82843C22.3061 6.1843 22.0366 5.65222 21.6523 5.14862C21.2883 4.6715 20.7585 4.14174 20.1232 3.50644L20.0497 3.43293C19.4143 2.79757 18.8846 2.26777 18.4074 1.90373C17.9038 1.5195 17.3718 1.25 16.7276 1.25ZM19.5548 8.59491L14.9611 4.00128C15.3668 3.60162 15.6805 3.30772 15.9577 3.09627C16.3279 2.81383 16.5433 2.75 16.7276 2.75C16.9119 2.75 17.1274 2.81383 17.4976 3.09627C17.8851 3.3919 18.3441 3.84867 19.0257 4.53033C19.7074 5.21199 20.1642 5.67101 20.4598 6.05849C20.7422 6.42866 20.8061 6.64413 20.8061 6.82843C20.8061 7.01272 20.7422 7.22819 20.4598 7.59836C20.2483 7.87551 19.9544 8.18927 19.5548 8.59491ZM13.8992 5.06066L18.4954 9.65685L13.6539 14.4983C13.1265 15.0258 12.9807 15.1577 12.8155 15.2372C12.6502 15.3166 12.4561 15.348 11.7147 15.4303C10.5448 15.5603 9.74843 15.647 9.15674 15.6279C8.58517 15.6094 8.35441 15.4943 8.2081 15.348C8.06179 15.2016 7.94665 14.9709 7.9282 14.3993C7.90909 13.8076 7.99571 13.0113 8.12571 11.8413C8.20808 11.1 8.23947 10.9059 8.31891 10.7406C8.39835 10.5753 8.53029 10.4296 9.05773 9.90213L13.8992 5.06066Z"
                      fill="#2D264B"/>
                <path
                    d="M9.00899 3.92846C9.42317 3.9235 9.75491 3.58371 9.74995 3.16953C9.74498 2.75534 9.40519 2.42361 8.99101 2.42857C6.56449 2.45766 4.89894 2.59043 3.62024 3.51946C3.13209 3.87412 2.70281 4.3034 2.34815 4.79155C1.76232 5.59787 1.50001 6.54225 1.37373 7.70779C1.24999 8.84992 1.24999 10.2895 1.25 12.1261V12.2166C1.24999 14.0531 1.24999 15.4927 1.37373 16.6348C1.50001 17.8004 1.76232 18.7448 2.34815 19.5511C2.70281 20.0392 3.13209 20.4685 3.62024 20.8232C4.42656 21.409 5.37094 21.6713 6.53648 21.7976C7.67859 21.9213 9.11817 21.9213 10.9547 21.9213H11.0453C12.8818 21.9213 14.3214 21.9213 15.4635 21.7976C16.6291 21.6713 17.5734 21.409 18.3798 20.8232C18.8679 20.4685 19.2972 20.0392 19.6518 19.5511C20.5809 18.2724 20.7137 16.6068 20.7427 14.1803C20.7477 13.7661 20.416 13.4263 20.0018 13.4214C19.5876 13.4164 19.2478 13.7481 19.2428 14.1623C19.2129 16.6631 19.0445 17.835 18.4383 18.6694C18.1762 19.0302 17.8589 19.3475 17.4981 19.6096C16.9901 19.9787 16.3399 20.1939 15.302 20.3063C14.25 20.4203 12.8916 20.4213 11 20.4213C9.10843 20.4213 7.74999 20.4203 6.69804 20.3063C5.66013 20.1939 5.00992 19.9787 4.50191 19.6096C4.14111 19.3475 3.82382 19.0302 3.56168 18.6694C3.19259 18.1614 2.97745 17.5112 2.865 16.4733C2.75103 15.4213 2.75 14.0629 2.75 12.1713C2.75 10.2797 2.75103 8.9213 2.865 7.86936C2.97745 6.83144 3.19259 6.18123 3.56168 5.67322C3.82382 5.31242 4.14111 4.99513 4.50191 4.73299C5.33627 4.1268 6.50819 3.95844 9.00899 3.92846Z"
                    fill="#2D264B"/>
              </svg>
            </button>
          </template>
        </table-lite>
      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="userList.length">
          <div class="info-item" v-for="(item, i) in userList" :key="i">
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام </span>
              <p class="item-data">{{ item.firstName }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام خانوادگی</span>
              <p class="item-data">{{ item.lastName }}</p>
            </div>
            <div class="item">
              <span class="item-head"> تاریخ ثبت </span>
              <p class="item-data">{{ item.registrationDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">فعال</span>
              <p class="item-data">
                <input
                    class="check-box isActive"
                    type="checkbox"
                    v-model="item.isActive"
                />
              </p>
            </div>
            <div class="item">
              <span class="item-head">دسترسی</span>
              <p class="item-data">
                <button @click="getAccessList(item)">
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
            <div class="item">
              <span class="item-head">ویرایش</span>
              <p class="item-data">
                <button @click="editUser(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M16.7276 1.25C16.0835 1.25 15.5514 1.5195 15.0478 1.90373C14.5707 2.26776 14.0409 2.79756 13.4056 3.4329L7.92473 8.91374C7.50384 9.33393 7.17105 9.66617 6.96696 10.0908C6.76286 10.5155 6.71131 10.9829 6.64612 11.574L6.62843 11.7338C6.50649 12.831 6.40597 13.7353 6.42898 14.4477C6.45304 15.1928 6.61405 15.8752 7.14744 16.4086C7.68084 16.942 8.36328 17.103 9.10833 17.1271C9.82071 17.1501 10.7251 17.0496 11.8222 16.9276L11.9821 16.9099C12.5732 16.8447 13.0406 16.7932 13.4652 16.5891C13.8899 16.385 14.2221 16.0522 14.6423 15.6313L20.1231 10.1504C20.7585 9.51512 21.2883 8.98536 21.6523 8.50824C22.0366 8.00463 22.3061 7.47256 22.3061 6.82843C22.3061 6.1843 22.0366 5.65222 21.6523 5.14862C21.2883 4.6715 20.7585 4.14174 20.1232 3.50644L20.0497 3.43293C19.4143 2.79757 18.8846 2.26777 18.4074 1.90373C17.9038 1.5195 17.3718 1.25 16.7276 1.25ZM19.5548 8.59491L14.9611 4.00128C15.3668 3.60162 15.6805 3.30772 15.9577 3.09627C16.3279 2.81383 16.5433 2.75 16.7276 2.75C16.9119 2.75 17.1274 2.81383 17.4976 3.09627C17.8851 3.3919 18.3441 3.84867 19.0257 4.53033C19.7074 5.21199 20.1642 5.67101 20.4598 6.05849C20.7422 6.42866 20.8061 6.64413 20.8061 6.82843C20.8061 7.01272 20.7422 7.22819 20.4598 7.59836C20.2483 7.87551 19.9544 8.18927 19.5548 8.59491ZM13.8992 5.06066L18.4954 9.65685L13.6539 14.4983C13.1265 15.0258 12.9807 15.1577 12.8155 15.2372C12.6502 15.3166 12.4561 15.348 11.7147 15.4303C10.5448 15.5603 9.74843 15.647 9.15674 15.6279C8.58517 15.6094 8.35441 15.4943 8.2081 15.348C8.06179 15.2016 7.94665 14.9709 7.9282 14.3993C7.90909 13.8076 7.99571 13.0113 8.12571 11.8413C8.20808 11.1 8.23947 10.9059 8.31891 10.7406C8.39835 10.5753 8.53029 10.4296 9.05773 9.90213L13.8992 5.06066Z"
                          fill="#2D264B"/>
                    <path
                        d="M9.00899 3.92846C9.42317 3.9235 9.75491 3.58371 9.74995 3.16953C9.74498 2.75534 9.40519 2.42361 8.99101 2.42857C6.56449 2.45766 4.89894 2.59043 3.62024 3.51946C3.13209 3.87412 2.70281 4.3034 2.34815 4.79155C1.76232 5.59787 1.50001 6.54225 1.37373 7.70779C1.24999 8.84992 1.24999 10.2895 1.25 12.1261V12.2166C1.24999 14.0531 1.24999 15.4927 1.37373 16.6348C1.50001 17.8004 1.76232 18.7448 2.34815 19.5511C2.70281 20.0392 3.13209 20.4685 3.62024 20.8232C4.42656 21.409 5.37094 21.6713 6.53648 21.7976C7.67859 21.9213 9.11817 21.9213 10.9547 21.9213H11.0453C12.8818 21.9213 14.3214 21.9213 15.4635 21.7976C16.6291 21.6713 17.5734 21.409 18.3798 20.8232C18.8679 20.4685 19.2972 20.0392 19.6518 19.5511C20.5809 18.2724 20.7137 16.6068 20.7427 14.1803C20.7477 13.7661 20.416 13.4263 20.0018 13.4214C19.5876 13.4164 19.2478 13.7481 19.2428 14.1623C19.2129 16.6631 19.0445 17.835 18.4383 18.6694C18.1762 19.0302 17.8589 19.3475 17.4981 19.6096C16.9901 19.9787 16.3399 20.1939 15.302 20.3063C14.25 20.4203 12.8916 20.4213 11 20.4213C9.10843 20.4213 7.74999 20.4203 6.69804 20.3063C5.66013 20.1939 5.00992 19.9787 4.50191 19.6096C4.14111 19.3475 3.82382 19.0302 3.56168 18.6694C3.19259 18.1614 2.97745 17.5112 2.865 16.4733C2.75103 15.4213 2.75 14.0629 2.75 12.1713C2.75 10.2797 2.75103 8.9213 2.865 7.86936C2.97745 6.83144 3.19259 6.18123 3.56168 5.67322C3.82382 5.31242 4.14111 4.99513 4.50191 4.73299C5.33627 4.1268 6.50819 3.95844 9.00899 3.92846Z"
                        fill="#2D264B"/>
                  </svg>
                </button>
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر گزارش موجود نمی‌باشد
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="accessListModal" class="access-modal">
    <template #header>
      <div class="header">
        <h3>دسترسی های {{ userNameModal }}</h3>
        <button @click="accessListModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="access-list">
<!--        v-for="(item , iList) in accessList"-->
        <div class="access"  :key="item">
<!--          <h6>{{ "- " + item.indexName }}</h6>-->
          <div class="sub-access" v-for="(access , index) in accessList" :key="index">
            <span class="check">
            <input
                class="check-box"
                type="checkbox"
                :id="access.name"
                v-model="access.isAllow"
                @input="setAccess(access , iList)"
            />
              <!--                              @click="access.selected = !access.selected"-->

            <label :for="access.name">{{ access.name }}</label>
          </span>
          </div>
        </div>
      </div>
      <khoonegiButton
          class="form-button mt-0 slate"
          text="تایید دسترسی ها"
          :loading="isloading"
          @click="acceptAccess()"
      />
      <div class="clearfix"></div>
    </div>
  </Dialog>
  <Dialog v-model:visible="editModal" class="edit-user-modal">
    <template #header>
      <div class="header">
        <h3>ویرایش کاربر</h3>
        <button @click="editModal = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="edit-content">
        <div class="firstName">
          <label>نام:</label>
          <input type="text" v-model="editFirstName" class="global-input">
        </div>
        <div class="lastName">
          <label>نام خانوادگی:</label>
          <input type="text" v-model="editLastName" class="global-input">

        </div>
        <div class="userName">
          <label>نام کاربری:</label>
          <input type="text" :style="errorMessage ? borderStyle : ''" @keypress="checkUserName" v-model="editUserName"
                 class="global-input">
          <transition name="fade" mode="out-in">
            <span v-if="errorMessage" class="error-message">نام کاربری تنها با کاراکتر انگلیسی امکان پذیر است!</span>
          </transition>
        </div>
        <div class="password">
          <label>رمزعبور:</label>
          <input type="text" v-model="editPassword" class="global-input">
        </div>
        <div class="password">
          <label>نوع دسترسی:</label>
          <Multiselect
              v-model="editType"
              :options="this.$store.state.cancellStateUser"
              placeholder="انتخاب کنید "
              label="title"
              track-by="value"
          />
        </div>
      </div>
      <div class="btn-box">
        <span class="check">
					<input
              class="check-box"
              type="checkbox"
              id="checkEnable"
              v-model="editEnable"
              @click="setEditEnable()"
          />
					<label for="checkEnable">فعال</label>
				</span>
        <khoonegiButton
            class="form-button mt-0 slate"
            text="ویرایش اطلاعات"
            :loading="isloading"
            @click="editUserInfo()"
        />
      </div>
    </div>
  </Dialog>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import khoonegiButton from "../components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
import Dialog from "primevue/dialog";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

export default {
  name: "accessUser",
  props: {
    userData: Object,
  },
  components: {
    pageToTop,
    khoonegiButton,
    tableLite,
    Dialog,
    LoadingFull,
    Multiselect
  },
  data() {
    return {
      toast: useToast(),
      windowWith: window.innerWidth,
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام",
          field: "firstName",
          width: "0.5%",
          sortable: false,
        },

        {
          label: "نام خانوادگی",
          field: "lastName",
          width: ".5%",
          sortable: false,
        },
        {
          label: "تاریخ ثبت",
          field: "registrationDate",
          width: ".5%",
          sortable: false,
        },
        {
          label: "فعال",
          field: "isActive",
          width: ".2%",
          sortable: false,
        },
        {
          label: "دسترسی",
          field: "access",
          width: ".3%",
          sortable: false,
        },
        {
          label: "ویرایش",
          field: "edit",
          width: ".4%",
          sortable: false,
        },
      ],
      userList: [],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گزارش موجود نمی‌باشد",
      },
      isLoading: false,
      fromDate: "",
      toDate: "",
      editModal: false,
      editEnable: false,
      editFirstName: "",
      editLastName: "",
      editUserName: "",
      editPassword: "",
      editType: "",
      userId: "",
      errorMessage: false,
      borderStyle: "border-color: red !important;",
      accessListUser: [],
      accessList: [],
      accessListModal: false,
      userNameModal: "",
      accessSelect: [],
      userIdAccess: "",
      typeName: Number,
      defultAccess: []
    }
  },

  mounted() {
    this.getUser();
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });

  },
  methods: {
    checkUserName(e) {
      var regex = new RegExp("^[a-zA-Z0-9_]+$");
      var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
      if (regex.test(str)) {
        this.errorMessage = false;
        return true;
      }
      e.preventDefault();
      this.errorMessage = true;
      return false;
    },
    setEditEnable() {
      this.editEnable = !this.editEnable;
    },
    editUser(item) {
      console.log(item)
      this.editModal = true;
      this.editEnable = item.value.isActive;
      this.editFirstName = item.value.firstName;
      this.editLastName = item.value.lastName;
      this.editUserName = item.value.supportInformation.userName;
      this.editPassword = item.value.supportInformation.password;
      this.userId = item.value.id;
      this.editType = item.value.type;
    },
    getUser() {
      this.isLoading = true;
      let data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
        StringQuery: ""
      };
      this.$store
          .dispatch("userPanelList", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.userList = respons.data.panelUsers;
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
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    editUserInfo() {
      if (this.editFirstName && this.editLastName && this.editUserName && this.editPassword) {
        let data = {
          SupportId: this.userId,
          FirstName: this.editFirstName,
          LastName: this.editLastName,
          UserName: this.editUserName,
          Password: this.editPassword,
          IsActive: this.editEnable,
          Type: this.editType
        };

        this.$store
            .dispatch("editUser", data)
            .then((respons) => {
              console.log(respons);
              this.isLoading = false;
              if (respons.data.succeed) {
                this.getUser();
                this.editModal = false;
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
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
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              console.log(error);
            });
      } else {
        this.toast.error("اطلاعات کاربر ناقص است!", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }
    },
    getAccessList(item) {

      this.accessListModal = true;
      this.userNameModal = item.value ? item.value.firstName + " " + item.value.lastName : item.firstName + " " + item.value ? item.value.lastName : item.firstName + " " + item.lastName;
      let data = {
        SupportId: item.value ? item.value.id : item.id,
      };
      this.$store
          .dispatch("routeAccessV2", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            // if (respons.data) {
              this.accessList = respons.data.routesResults;
            console.log(this.accessList)
              // const defultAccess = this.accessList.filter(allow => allow.isAllow === true);
              // const accessListShow = this.accessList.filter((item) => {
              //   return item.access;
              // });
              // console.log(accessListShow)
              // defultAccess.map((item) => {
              //   item.access.map((temp) => {
              //     temp.route = temp.template;
              //   })
              //   this.defultAccess = item.access;
              //   console.log(this.defultAccess)
              // })
              this.userIdAccess = item.value ? item.value.id : item.id;
            // } else {
            //   this.toast.error(respons.data.message, {
            //     position: "bottom-center",
            //     timeout: 3000,
            //     icon: true,
            //     rtl: true,
            //   });
            // }
          })
          .catch((error) => {
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
    acceptAccess() {
      let data = {
        SupportId: this.userIdAccess,
        Authrizations: this.accessSelect
      };
      console.log(data);
      this.$store
          .dispatch("addAccessUser", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.getUser();
              this.accessListModal = false;
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
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
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          });
    },
    setAccess(access , index) {
      access.isAllow = !access.isAllow;
      // let arr = [];
      // this.accessSelect = this.accessList.filter((item)=>{
      //   return item.access.length >= 0;
      // })
      // console.log(indexList)
      console.log(index)
      console.log(this.accessList)
      this.accessSelect = this.accessList;
      // this.accessSelect.push(this.accessList[index].access);
      console.log(this.accessSelect)
    }
  },
  watch: {
    toDate: function () {
      this.getUser()
    },
    fromDate: function () {
      this.getUser()
    },
  }
}
</script>
<style lang="scss">
.accessUser {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .header-report {
    border-bottom: 1px solid #E9E9E9;
    padding-bottom: 15px;

    .search {
      display: flex;
      justify-content: space-between;
      @media (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr;
      }

      .single-btn {
        display: block !important;
      }

      .buttons, .single-btn {
        display: grid;
        grid-template-columns: 1fr;
        column-gap: 1rem;

        button {
          padding: 5px 20px;
          height: fit-content;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          margin-top: 15px;
          button {
            padding: 5px 0;
          }
        }

        img {
          margin-left: 10px;
        }
      }

      .selected-type {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        column-gap: 10px;
        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr;
          grid-row-gap: 1rem;
        }
      }
    }

    .filters {
      margin: 2rem 0;
      padding-bottom: 25px;
      border-bottom: 1px solid #E9E9E9;

      .customer-filter, .orders-filter, .seller-filter {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 3%;
        grid-row-gap: 1rem;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
        }

        > div {
          column-gap: 2%;
          display: grid;
          grid-template-columns: 28% 1fr auto 1fr;
          align-items: baseline;

          h6 {
            font-size: 13px;
            font-weight: 400;
            margin: 0 !important;
          }

          .global-input {
            height: 32px;
          }
        }
      }

      .identifier-filter {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap: 5%;
        align-items: baseline;
        @media (max-width: 768px) {
          grid-template-columns: 1fr;
          grid-row-gap: 1rem;
        }

        h6, label {
          font-size: 13px;
          font-weight: 400 !important;
          margin: 0 !important;
        }

        .date-select {
          column-gap: 2%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: baseline;
        }

        .identifire-code {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: baseline;
          column-gap: 5%;

          .global-input {
            height: 32px;
          }

        }

        .check-box {
          @media (max-width: 768px) {
            margin-left: 10px !important;
          }
        }
      }
    }
  }
}

.access-modal {
  height: auto !important;
  width: 30rem !important;

  .content {
    margin: 3% 7% !important;

    .access-list {
      .access {
        margin-top: 1.5rem;

        .sub-access {
          margin-bottom: 0.5rem;
          .check-box {
            margin-left: 5px !important;
          }
        }
      }
    }

    button {
      width: 30%;
      float: left;
      font-size: 14px;
      padding: 5px;
    }

    .global-input {
      height: 9rem;

    }
  }
}

.edit-user-modal {
  width: 45rem !important;
  height: 32rem !important;
  @media (max-width: 768px) {
    height: 42rem !important;
  }

  .content {
    margin: 5% 7% !important;
  }

  .edit-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
    grid-column-gap: 5%;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      margin: 2rem 0;
      row-gap: 20px;
    }

    label {
      color: #979797;
      font-weight: 300 !important;
    }

    .userName {
      position: relative;
    }
  }

  .btn-box {
    text-align: left;

    .form-button {
      margin-top: 3rem !important;
      width: 35%;
    }
  }

  .error-message {
    position: absolute;
    top: 5rem;
    font-size: 12px;
    color: red;
  }

}

.isActive {
  user-select: none;
  pointer-events: none;

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
