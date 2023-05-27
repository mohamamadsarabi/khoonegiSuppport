<template>
  <div
      class="nav-wrapper brandPromotion customerId position-relative end-0 py-3 px-4 mx-4"
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
      <!-- brandPromotion -->
      <div
          class="tab-pane fade show active"
          id="brandPromotion"
          role="tabpanel"
          aria-labelledby="brand-promotion"
      >
        <div class="search-box-header">
          <khoonegiButton
              class="form-button mt-0 slate"
              text="+  پیام جدید"
              @click="showModalMessage = true"
          />
          <div class="search-box">
            <vsud-input
                class="search-host"
                placeholder="جستجو براساس محتوای پیام"
                @input="setSearch"
            />
            <span class="submit-search" v-if="!isSearchLoading">
									<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                  >
										<path
                        d="M5.56977 3.13606C5.85161 3.09142 6.04389 2.82676 5.99926 2.54492C5.95462 2.26309 5.68996 2.0708 5.40812 2.11544C3.71319 2.38389 2.38387 3.71321 2.11542 5.40814C2.07078 5.68998 2.26307 5.95464 2.5449 5.99928C2.82674 6.04392 3.0914 5.85163 3.13604 5.56979C3.33446 4.31701 4.31699 3.33448 5.56977 3.13606Z"
                        fill="#979797"
                    />
										<path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.7167 0C3.00717 0 0 3.00717 0 6.7167C0 10.4262 3.00717 13.4334 6.7167 13.4334C10.4262 13.4334 13.4334 10.4262 13.4334 6.7167C13.4334 3.00717 10.4262 0 6.7167 0ZM1.03334 6.7167C1.03334 3.57786 3.57786 1.03334 6.7167 1.03334C9.85553 1.03334 12.4001 3.57786 12.4001 6.7167C12.4001 9.85553 9.85553 12.4001 6.7167 12.4001C3.57786 12.4001 1.03334 9.85553 1.03334 6.7167Z"
                        fill="#979797"
                    />
										<path
                        d="M12.5932 11.8626C12.3914 11.6608 12.0643 11.6608 11.8625 11.8626C11.6608 12.0643 11.6608 12.3915 11.8625 12.5932L14.618 15.3488C14.8198 15.5505 15.1469 15.5505 15.3487 15.3488C15.5505 15.147 15.5505 14.8199 15.3487 14.6181L12.5932 11.8626Z"
                        fill="#979797"
                    />
									</svg>
								</span>
            <SearchLoading class="loading-search" v-else/>
          </div>
        </div>
        <div class="content">
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-slot-mode="true"
                :columns="columnsPromotion"
                :rows="promotionList"
                :total="totalRecordCount"
                :sortable="false"
                @do-search="doSearch"
                @is-finished="isLoading = false"
                :is-hide-paging="true"
                :messages="message"
            >
              <template v-slot:isActive="item">
                <input
                    class="check-box isActive-brand"
                    type="checkbox"
                    id="check"
                    v-model="item.value.isActive"
                    @click="editStatusMessage(item.value.isActive , item.value.messageId)"
                />
              </template>
              <template v-slot:edit="item">
                <button @click="showEditMessage(item)">
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
            <div v-if="promotionList.length">
              <div class="info-item" v-for="(item, i) in promotionList" :key="i">
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">موضوع پیام</span>
                  <p class="item-data">{{ item.title }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ ثبت</span>
                  <p class="item-data">{{ item.createDate }}</p>
                </div>
                <div class="item">
                  <span class="item-head">دریافت کننده</span>
                  <p class="item-data">{{ item.receiver }}</p>
                </div>
                <div class="item">
                  <span class="item-head">فعال</span>
                  <p class="item-data">
                    <input
                        class="check-box isActive-brand"
                        type="checkbox"
                        v-model="item.isActive"
                        @click="editStatusMessage(item.isActive , item.messageId)"
                    />
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">ویرایش</span>
                  <p class="item-data">
                    <button @click="showEditMessage(item)">
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
        </div>
      </div>
      <!-- hostingTips -->
      <div
          class="tab-pane fade"
          id="hostingTips"
          role="tabpanel"
          aria-labelledby="hosting-tips"
      >
  <!--        search box-->
        <div class="search-box-header">
          <khoonegiButton
              class="form-button mt-0 slate"
              text="+  نکته جدید"
              @click="showModalTips = true"
          />
          <div class="search-box">
            <vsud-input
                class="search-host"
                placeholder="جستجو براساس متن نکته"
                @input="setSearchTips"
            />
            <span class="submit-search" v-if="!isSearchLoading">
									<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                  >
										<path
                        d="M5.56977 3.13606C5.85161 3.09142 6.04389 2.82676 5.99926 2.54492C5.95462 2.26309 5.68996 2.0708 5.40812 2.11544C3.71319 2.38389 2.38387 3.71321 2.11542 5.40814C2.07078 5.68998 2.26307 5.95464 2.5449 5.99928C2.82674 6.04392 3.0914 5.85163 3.13604 5.56979C3.33446 4.31701 4.31699 3.33448 5.56977 3.13606Z"
                        fill="#979797"
                    />
										<path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M6.7167 0C3.00717 0 0 3.00717 0 6.7167C0 10.4262 3.00717 13.4334 6.7167 13.4334C10.4262 13.4334 13.4334 10.4262 13.4334 6.7167C13.4334 3.00717 10.4262 0 6.7167 0ZM1.03334 6.7167C1.03334 3.57786 3.57786 1.03334 6.7167 1.03334C9.85553 1.03334 12.4001 3.57786 12.4001 6.7167C12.4001 9.85553 9.85553 12.4001 6.7167 12.4001C3.57786 12.4001 1.03334 9.85553 1.03334 6.7167Z"
                        fill="#979797"
                    />
										<path
                        d="M12.5932 11.8626C12.3914 11.6608 12.0643 11.6608 11.8625 11.8626C11.6608 12.0643 11.6608 12.3915 11.8625 12.5932L14.618 15.3488C14.8198 15.5505 15.1469 15.5505 15.3487 15.3488C15.5505 15.147 15.5505 14.8199 15.3487 14.6181L12.5932 11.8626Z"
                        fill="#979797"
                    />
									</svg>
								</span>
            <SearchLoading class="loading-search" v-else/>
          </div>
        </div>
        <div class="content">
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-slot-mode="true"
                :columns="columns"
                :rows="tipsList"
                :total="totalRecordCount"
                :sortable="false"
                @do-search="doSearch"
                @is-finished="isLoading = false"
                :is-hide-paging="true"
                :messages="message"
            >
              <template v-slot:isActive="item">
                <input
                    class="check-box isActive-brand"
                    type="checkbox"
                    v-model="item.value.isActive"
                    @click="activeEnable(item.value.isActive , item.value.message , item.value.messageId)"
                />
              </template>
              <template v-slot:edit="item">
                <button @click="showEditTips(item)">
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
            <div v-if="tipsList.length">
              <div class="info-item" v-for="(item, i) in tipsList" :key="i">
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">موضوع پیام</span>
                  <p class="item-data">{{ item.customerName }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ ثبت</span>
                  <p class="item-data">{{ item.phoneNumber }}</p>
                </div>
                <div class="item">
                  <span class="item-head">دریافت کننده</span>
                  <p class="item-data">{{ item.sellerName }}</p>
                </div>
                <div class="item">
                  <span class="item-head">فعال</span>
                  <p class="item-data">
                    <input
                        class="check-box isActive-brand"
                        type="checkbox"
                        v-model="item.isActive"
                        @click="activeEnable(item.isActive , item.message , item.messageId)"
                    />
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">ویرایش</span>
                  <p class="item-data">
                    <button @click="showEditTips(item)">
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
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="showModalTips" class="tipsModal">
    <template #header>
      <div class="header">
        <h3>نکته میزبانی جدید</h3>
        <button @click="showModalTips = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="detail">
        <label>متن نکته:</label>
        <textarea maxlength="60" v-model="tipsText" class="global-input"></textarea>
      </div>
      <span class="message">لطفا حداکثر 60 کاراکتر وارد نمایید</span>
      <khoonegiButton
          class="form-button mt-4 slate create-Tips"
          text="ارسال نکته"
          :loading="isloading"
          @click="createTips"
      />
    </div>
  </Dialog>
  <Dialog v-model:visible="showModalMessage" class="tipsModal promotionModal">
    <template #header>
      <div class="header">
        <h3>پیام جدید</h3>
        <button @click="showModalMessage = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="detail">
        <label>موضوع پیام:</label>
        <input type="text" v-model="titleMessage" class="global-input message-input">
        <label>متن پیام:</label>
        <textarea maxlength="60" v-model="textMessage" class="global-input"></textarea>
      </div>
      <span class="message">لطفا حداکثر 60 کاراکتر وارد نمایید</span>
      <khoonegiButton
          class="form-button mt-4 slate create-Tips"
          text="ارسال پیام"
          :loading="isloading"
          @click="createMessage"
      />
    </div>
  </Dialog>
  <!-- edit modals -->
  <Dialog v-model:visible="editModalTips" class="tipsModalEdit">
    <template #header>
      <div class="header">
        <h3>نکته میزبانی جدید</h3>
        <button @click="editModalTips = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="detail">
        <label>متن پیام:</label>
        <textarea maxlength="60" v-model="editTipsText" class="global-input"></textarea>
      </div>
      <span class="message">لطفا حداکثر 60 کاراکتر وارد نمایید</span>
      <div class="footer-modal">
        <span class="check">
<!--          <input-->
<!--              class="check-box"-->
<!--              type="checkbox"-->
<!--              id="checkTestTips"-->
<!--              v-model="isActiveTips"-->
<!--              @click="setActiveTips()"-->
<!--          />-->
<!--          <label for="checkTestTips">فعال</label>-->
        </span>
        <khoonegiButton
            class="form-button mt-4 slate create-Tips"
            text="ویرایش نکته"
            :loading="isloading"
            @click="editTips()"
        />
      </div>
    </div>
  </Dialog>
  <Dialog v-model:visible="showEditModalMessage" class="tipsModal promotionModal">
    <template #header>
      <div class="header">
        <h3>پیام جدید</h3>
        <button @click="showEditModalMessage = false">✘</button>
      </div>
    </template>
    <div class="content">
      <div class="detail">
        <label>موضوع پیام:</label>
        <input type="text" v-model="editTitleMessage" class="global-input message-input">
        <label>متن پیام:</label>
        <textarea maxlength="60" v-model="editTextMessage" class="global-input"></textarea>
      </div>
      <span class="message">لطفا حداکثر 60 کاراکتر وارد نمایید</span>
      <div class="footer-modal">
        <span class="check">
<!--          <input-->
<!--              class="check-box"-->
<!--              type="checkbox"-->
<!--              id="checkTest"-->
<!--              v-model="isActiveMessage"-->
<!--              @click="setActiveMessage()"-->
<!--          />-->
<!--          <label for="checkTest">فعال</label>-->
        </span>
        <khoonegiButton
            class="form-button mt-0 slate create-Tips"
            text="ویرایش پیام"
            :loading="isloading"
            @click="editMessage()"
        />
      </div>

    </div>
  </Dialog>
  <page-to-top/>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import VsudInput from "@/components/VsudInput.vue";
import pageToTop from "../components/pageToTop";
import khoonegiButton from "../components/khoonegiButton";
import tableLite from "../components/khoonegiTable";
import {useToast} from "vue-toastification";
import SearchLoading from "../components/searchLoading";
import Dialog from "primevue/dialog";
import lodash from "lodash";

export default {
  name: "brandPromotion",
  components: {
    pageToTop,
    khoonegiButton,
    tableLite,
    VsudInput,
    SearchLoading,
    Dialog,
    LoadingFull
  },
  data() {
    return {
      toast: useToast(),
      tabLinks: [
        {
          id: "brand-promotion",
          name: "ارتقاء برند",
          target: "#brandPromotion",
          controls: "brandPromotion",
          isNew: false,
          active: "active",
        },
        {
          id: "hosting-tips",
          name: "نکات میزبانی",
          target: "#hostingTips",
          controls: "hostingTips",
          isNewProfile: false,
        },
      ],
      windowWith: window.innerWidth,
      columnsPromotion: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "موضوع پیام",
          field: "title",
          width: "1%",
          sortable: false,
        },

        {
          label: "تاریخ ثبت",
          field: "createDate",
          width: ".3%",
          sortable: false,
        },

        {
          label: "دریافت کننده",
          field: "receiver",
          width: ".3%",
          sortable: false,
        },
        {
          label: "فعال",
          field: "isActive",
          width: ".2%",
          sortable: false,
        },
        {
          label: "ویرایش",
          field: "edit",
          width: ".2%",
          sortable: false,
        },
      ],
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "متن نکته",
          field: "message",
          width: "1%",
          sortable: false,
        },

        {
          label: "تاریخ ثبت",
          field: "createDate",
          width: ".3%",
          sortable: false,
        },

        {
          label: "دریافت کننده",
          field: "receiver",
          width: ".3%",
          sortable: false,
        },
        {
          label: "فعال",
          field: "isActive",
          width: ".2%",
          sortable: false,
        },
        {
          label: "ویرایش",
          field: "edit",
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
      promotionList: [],
      showEditModalMessage: false,
      tipsList: [],
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
    this.getPromotion()
    this.getTipsList()
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
  },
  methods: {
    // search realTime for get seller list filter
    setSearch(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getPromotion();
        }
      }, 600)();
    },
    setSearchTips(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndexTips++;
      let curIndex = this.searchIndexTips;
      lodash.debounce(function () {
        if (query.searchIndexTips == curIndex || val.length == 0) {
          query.searchQueryTips = val.target.value;
          query.getTipsList();
        }
      }, 600)();
    },
    createTips() {
      this.isLoading = true;
      let data = {
        Message: this.tipsText,
      };
      this.$store
          .dispatch("addHint", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.showModalTips = false;
              this.tipsText = "";
              this.getTipsList();
              this.toast.success("نکته با موفقیت ایجاد شد", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            } else {
              this.isLoading = false;
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
    activeEnable(active , message , id){
      active = !active;
      let data = {
        Message: message,
        IsActive: active,
        MessageId: id,
      };
      console.log(data)
      this.$store
          .dispatch("editHint", data)
          .then((respons) => {
            console.log(respons);
            if (respons.data.succeed) {
              this.getTipsList();
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
    editStatusMessage(active , id) {
      active = !active;
      let data = {
        IsActive: active,
        MessageId: id,
      };
      console.log(data)
      this.$store
          .dispatch("editMessageStatus", data)
          .then((respons) => {
            console.log(respons);
            if (respons.data.succeed) {
              this.getPromotion();
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            } else {
              this.isLoading = false;
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
    editTips() {
      this.isLoading = true;
      let data = {
        Message: this.editTipsText,
        // IsActive: "",
        MessageId: this.messageIdTips,
      };
      console.log(data)
      this.$store
          .dispatch("editHint", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isDisabledEdit = false;
              this.editModalTips = false;
              this.getTipsList();
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
            } else {
              this.isLoading = false;
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
    getTipsList() {
      let data = {
        FromDate: "",
        ToDate: "",
        StringQuery: this.searchQueryTips,
      };

      this.$store
          .dispatch("hintsList", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            this.isSearchLoading = false;
            if (respons.data.succeed) {
              this.tipsList = respons.data.hints;
              this.tipsList.forEach((item)=> {
                this.editTipsText = item.message;
                this.messageIdTips = item.messageId;
                this.isActiveTips = item.isActive;
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
    showEditMessage(item) {
      this.showEditModalMessage = true;
      this.editTitleMessage = item.value.title;
      this.editTextMessage = item.value.message;
      this.messageId = item.value.messageId;
    },
    showEditTips(item) {
      this.editModalTips = true;
      this.editTipsText = item.value.message;
      this.messageIdTips = item.value.messageId;
    },
    editMessage() {
      this.isloading = true;
      this.isDisabledEdit = true;
      var headers = new Headers();
      headers.append("Authorization", `Bearer ${this.$store.state.token}`);
      var formdata = new FormData();
      formdata.append("Title", this.editTitleMessage);
      formdata.append("Message", this.editTextMessage);
      formdata.append("MessageId", this.messageId);
      // formdata.append("isActive", this.isActiveMessage);
      formdata.append("SendToAll", true);
      formdata.append("SaveAndSend", true);
      var requestOptions = {
        method: "post",
        headers: headers,
        body: formdata,
        redirect: "follow",
      };
      const baseUrl = this.$store.state.baseUrl;
      fetch(`${baseUrl}Seller/EditMessage`, requestOptions).then((result) => {
        return result
            .json()
            .then((respone) => {
              console.log(respone)
              if (respone.succeed) {
                this.isloading = false;
                this.isDisabledEdit = false;
                this.showEditModalMessage = false;
                this.getPromotion();
                this.toast.success(respone.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              } else {
                this.isloading = false;
                this.isDisabledEdit = false;
                this.toast.error(respone.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              }
              return respone;
            })
            .catch((error) => {
              this.isloading = false;
              this.isDisabledEdit = false;
              this.showModalCreate = false;
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              this.$store.dispatch("handleError", error);
              console.log(error);
            });
      });
    },
    getPromotion() {
      let data = {
        FromDate: "",
        ToDate: "",
        StringQuery: this.searchQuery,
      };

      this.$store
          .dispatch("messageList", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.promotionList = respons.data.messages;
              this.promotionList.forEach((item)=> {
                this.editTitleMessage = item.title;
                this.editTextMessage = item.message;
                this.messageId = item.messageId;
                this.isActiveMessage = item.isActive;
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
    createMessage() {
      this.isloading = true;
      this.isDisabledEdit = true;
      var headers = new Headers();
      headers.append("Authorization", `Bearer ${this.$store.state.token}`);
      var formdata = new FormData();
      formdata.append("Title", this.titleMessage);
      formdata.append("Message", this.textMessage);
      formdata.append("SendToAll", true);
      formdata.append("SaveAndSend", true);
      var requestOptions = {
        method: "put",
        headers: headers,
        body: formdata,
        redirect: "follow",
      };
      const baseUrl = this.$store.state.baseUrl;
      fetch(`${baseUrl}Seller/AddMessage`, requestOptions).then((result) => {
        return result
            .json()
            .then((respone) => {
              console.log(respone)
              if (respone.succeed) {
                this.isloading = false;
                this.isDisabledEdit = false;
                this.showModalMessage = false;
                this.titleMessage = "";
                this.textMessage = "";
                this.getPromotion();
                this.toast.success(respone.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              } else {
                this.isloading = false;
                this.isDisabledEdit = false;
                this.toast.error(respone.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              }
              return respone;
            })
            .catch((error) => {
              this.isloading = false;
              this.isDisabledEdit = false;
              this.showModalCreate = false;
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              this.$store.dispatch("handleError", error);
              console.log(error);
            });
      });
    }
  },

}
</script>

<style lang="scss">
.brandPromotion {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;

  .tab-content {
    position: unset !important;
  }

  .search-box-header {
    position: absolute;
    left: 2%;
    top: 11px;
    display: grid;
    grid-template-columns: 30% 66%;
    column-gap: 4%;
    width: 40%;
    @media (max-width: 768px) {
      position: unset;
      width: 100%;
      grid-template-columns: 1fr;
      row-gap: 15px;
    }

    .form-button {
      font-size: 12px;
    }

    .search-box {
      .search-host {
        width: 100% !important;
        position: relative;
      }
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
