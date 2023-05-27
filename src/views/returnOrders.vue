<template>
  <div
      class="nav-wrapper returningOrder position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="menu-list">
      <div class="select-filter">
<!--        <Multiselect-->
<!--            class="status-select"-->
<!--            v-model="orderStatus"-->
<!--            :options="this.$store.state.orderStatus"-->
<!--            placeholder="وضعیت"-->
<!--            label="title"-->
<!--            track-by="value"-->
<!--        />-->
        <Multiselect
            class="seller-name"
            v-model="sellerBrand"
            :options="sellerList"
            placeholder="نام میزبان "
            label="title"
            track-by="title"
            :searchable="true"
        />
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
        <div class="search-box">
          <vsud-input
              class="search-host"
              placeholder="جستجو براساس نام مشتری،شماره همراه"
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
      <div class="table-custom" v-if="windowWith > 768">
        <div class="table-head">
          <ul>
            <li v-for="(item, i) in columns" :key="i">{{ item.label }}</li>
          </ul>
        </div>
        <div v-if="returningOrder.length" class="table-body">
          <div
              v-for="(item, i) in returningOrder"
              :key="i"
              :id="'styleList' + i"
              class="order-box"
          >
            <ul :id="'styleRow' + i" class="styleRow">
              <li style="padding-right: 15%">{{ item.row }}</li>
              <li>{{ item.customerName }}</li>
              <li>{{ item.customerPhone }}</li>
              <li>{{ userState == 0 ? item.sellerBrand : userState == 2 ? item.sellerName : item.sellerName + `(${item.sellerBrand})` }}</li>
              <li>{{ item.orderNo }}</li>
              <li>{{ item.orderDate }}</li>
              <li>{{ item.deliveryTimeDescription }}</li>
<!--              <li>{{ item.status }}</li>-->
              <li>
                <button
                    @click="showDetails(i)"
                    :id="'eye' + i"
                    class="eye"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#col${i}`"
                >
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
                  <svg
                      style="display: none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                      :id="'iconEyeClose' + i"
                  >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2185 1.33568C21.542 1.07692 21.5944 0.604953 21.3357 0.281506C21.0769 -0.0419401 20.605 -0.0943811 20.2815 0.164376L16.9562 2.82464C15.279 1.31835 13.1397 2.76135e-05 10.75 2.76135e-05C8.60907 2.76135e-05 6.67327 1.05902 5.10175 2.34574C3.52166 3.63949 2.22964 5.22868 1.36144 6.43804L1.28984 6.53762C0.767181 7.26385 0.33695 7.86166 0.336944 8.75C0.336937 9.63833 0.76709 10.2361 1.28964 10.9622L1.36121 11.0617C1.90751 11.8227 2.61909 12.7305 3.46226 13.6198L0.281506 16.1644C-0.0419401 16.4231 -0.0943812 16.8951 0.164376 17.2185C0.423133 17.542 0.895102 17.5944 1.21855 17.3357L21.2185 1.33568ZM10.75 1.50003C12.5277 1.50003 14.2524 2.45932 15.7673 3.77574L13.1506 5.86909C12.5006 5.32707 11.6634 5.00003 10.75 5.00003C8.67896 5.00003 7.00003 6.67896 7.00003 8.75003C7.00003 9.36541 7.14871 9.94707 7.41192 10.46L4.63803 12.6792C3.81702 11.8246 3.11802 10.9368 2.57974 10.1869C1.95595 9.31801 1.83694 9.10854 1.83694 8.75001C1.83695 8.39149 1.956 8.18195 2.57995 7.31281C3.40922 6.15768 4.61351 4.68417 6.05203 3.50634C7.49913 2.32149 9.10426 1.50003 10.75 1.50003ZM10.75 6.50003C11.1862 6.50003 11.5933 6.62383 11.9384 6.8389L8.62436 9.4901C8.54377 9.25853 8.50003 9.00964 8.50003 8.75003C8.50003 7.50739 9.50739 6.50003 10.75 6.50003Z"
                        fill="#2D264B"
                    />
                    <path
                        d="M19.1454 5.14079C18.8832 4.82006 18.4108 4.77255 18.09 5.03467C17.7693 5.29679 17.7218 5.76928 17.9839 6.09001C18.3344 6.51888 18.6481 6.93396 18.92 7.31273C19.5441 8.18194 19.6631 8.3915 19.6631 8.75002C19.6631 9.10855 19.5441 9.31809 18.9201 10.1872C18.0908 11.3424 16.8865 12.8159 15.448 13.9937C14.0009 15.1786 12.3958 16 10.75 16C9.34522 16 7.96821 15.4021 6.68756 14.4822C6.35113 14.2406 5.88252 14.3174 5.64088 14.6538C5.39923 14.9903 5.47607 15.4589 5.8125 15.7005C7.23703 16.7237 8.91761 17.5 10.75 17.5C12.891 17.5 14.8268 16.441 16.3983 15.1543C17.9784 13.8606 19.2704 12.2714 20.1386 11.062L20.2102 10.9624C20.7329 10.2362 21.1631 9.63837 21.1631 8.75002C21.1631 7.86167 20.7329 7.26382 20.2102 6.53754L20.1386 6.43796C19.8509 6.03725 19.5182 5.59696 19.1454 5.14079Z"
                        fill="#2D264B"
                    />
                    <path
                        d="M14.5 8.75003C14.5 8.33581 14.1642 8.00003 13.75 8.00003C13.3358 8.00003 13 8.33581 13 8.75003C13 9.99267 11.9927 11 10.75 11C10.3358 11 10 11.3358 10 11.75C10 12.1642 10.3358 12.5 10.75 12.5C12.8211 12.5 14.5 10.8211 14.5 8.75003Z"
                        fill="#2D264B"
                    />
                  </svg>
                </button>
              </li>
            </ul>
            <div class="detail-order">
              <div class="collapse" :id="'col' + i">
                <div class="card-body">
                  <ol>
                    <li>
                      <span>شماره سفارش:</span>
                      <i>{{ item.orderNo }}</i>
                    </li>
                    <li>
                      <span>تاریخ ثبت سفارش:</span>
                      <i>{{ item.createDate }}</i>
                    </li>
                    <li>
                      <span>زمان ثبت سفارش:</span>
                      <i>{{ item.createDateTime }}</i>
                    </li>
                    <li>
                      <span>هزینه توزیع:</span>
                      <i>{{ item.distributionPrice }}</i>
                    </li>
                    <li>
                      <span>نوع توزیع:</span>
                      <i>{{ item.deliveryStatusDescription }}</i>
                    </li>
                    <li>
                      <span>کد تخفیف:</span>
                      <i v-if="item.discountCode">{{ item.discountCode }}</i>
                      <i v-else>ندارد</i>
                    </li>
                  </ol>
                  <div class="table-custom">
                    <div class="table-head">
                      <ul>
                        <li v-for="(item, i) in columnsDetail" :key="i">
                          {{ item.label }}
                        </li>
                      </ul>
                    </div>
                    <div class="table-body">
                      <ul v-for="(col, i) in item.items" :key="i">
                        <li>{{ col.row }}</li>
                        <li>{{ col.productName }}</li>
                        <li>{{ col.price }}</li>
                        <li>{{ col.returningOrderCount }}</li>
                        <li>{{ col.totalPrice }}</li>
                        <li>{{ col.sellerDiscount }}</li>
                        <li>{{ col.totalPriceWithDiscount }}</li>
                      </ul>
                    </div>
                    <div class="footer-table">
                      <div class="description-order">
                        <p>
                          <span>توضیحات: </span>
                          {{ item.description }}
                        </p>
                      </div>
                      <div class="price-order">
                        <div class="price">
                          <span class="title">جمع کل </span>
                          <span style="text-align: left">{{ item.productPrice }}</span>
                        </div>
                        <div class="price">
                          <span class="title">تخفیف خونگی </span>
                          <span class="content">{{ item.khooneghiDiscountPrice }}</span>
                        </div>
                        <div class="price" style="border-bottom: none">
                          <span class="title">قابل پرداخت </span>
                          <span style="text-align: left"
                          >{{ item.totalPayment }}
													</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="address">
                    <div class="text">
                      <span>آدرس: </span>
                      <p>{{ item.addressLine }}</p>
                    </div>
                    <div class="btn-factor">
                      <button
                          class="show-map"
                          @click="
												getMap(item.latitude, item.longitude, item.addressLine)
											"
                      >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="13"
                            viewBox="0 0 15 13"
                            fill="none"
                        >
                          <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5.19231 0C4.25887 0 3.32474 0.293173 2.53846 0.879412L0.846154 2.14118C0.313488 2.53833 0 3.16161 0 3.82353V10.4222C0 12.1145 1.94339 13.0804 3.30521 12.0651C3.8644 11.6482 4.52801 11.4398 5.19231 11.4398C5.85661 11.4398 6.52022 11.6482 7.0794 12.0651L7.15384 12.1206C7.94012 12.7068 8.87426 13 9.80769 13C10.7411 13 11.6753 12.7068 12.4615 12.1206L14.1538 10.8588C14.6865 10.4617 15 9.83839 15 9.17647V2.5778C15 0.885535 13.0566 -0.0804436 11.6948 0.934915C11.1356 1.35184 10.472 1.56025 9.80769 1.56025C9.14339 1.56025 8.47978 1.35184 7.9206 0.934915L7.84615 0.879412C7.05988 0.293173 6.12575 0 5.19231 0ZM3.23077 1.79706C3.64942 1.48491 4.1244 1.28521 4.61538 1.19791V10.3313C3.90578 10.4266 3.21477 10.6987 2.6129 11.1474C2.01174 11.5957 1.15385 11.1692 1.15385 10.4222V3.82353C1.15385 3.52266 1.29634 3.23935 1.53846 3.05882L3.23077 1.79706ZM7.77171 11.1474C7.16985 10.6987 6.47884 10.4266 5.76923 10.3313V1.19791C6.26022 1.28521 6.73519 1.48491 7.15385 1.79706L7.22829 1.85256C7.83015 2.30131 8.52116 2.57338 9.23077 2.66873V11.8021C8.73978 11.7148 8.26481 11.5151 7.84616 11.2029L7.77171 11.1474ZM11.7692 11.2029C11.3506 11.5151 10.8756 11.7148 10.3846 11.8021V2.66873C11.0942 2.57338 11.7852 2.30131 12.3871 1.85256C12.9883 1.40434 13.8462 1.83076 13.8462 2.5778V9.17647C13.8462 9.47734 13.7037 9.76065 13.4615 9.94118L11.7692 11.2029Z"
                              fill="#664ECA"
                          />
                        </svg>
                        مشاهده نقشه
                      </button>
                      <button
                          class="show-map print-factor"
                          @click="printFactor(item)">
                        چاپ سفارش
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center mt-4">در حال حاضر سفارشی موجود نیست</div>
      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="returningOrder.length">
          <div class="info-item" v-for="(item, i) in returningOrder" :key="i">
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام مشتری </span>
              <p class="item-data">{{ item.customerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">{{ userState == 0 ? item.sellerBrand : userState == 2 ? item.sellerName : item.sellerName + `(${item.sellerBrand})` }}</p>
            </div>
            <div class="item">
              <span class="item-head">شماره سفارش</span>
              <p class="item-data">{{ item.orderNo }}</p>
            </div>
            <div class="item">
              <span class="item-head">شماره تماس</span>
              <p class="item-data">{{ item.customerPhone }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ سفارش</span>
              <p class="item-data">
                {{ item.orderDate }}
              </p>
            </div>
            <div class="item">
              <span class="item-head">زمان دریافت</span>
              <p class="item-data">
                {{ item.deliveryTimeDescription }}
              </p>
            </div>

<!--            <div class="item">-->
<!--              <span class="item-head">وضعیت</span>-->
<!--              <p class="item-data">-->
<!--                {{ item.status }}-->
<!--              </p>-->
<!--            </div>-->
            <div class="item">
              <span class="item-head">جزئیات</span>
              <p class="item-data">
                <button
                    @click="showDetailsMobile(i)"
                    :id="'eye' + i"
                    class="eye"
                    data-bs-toggle="collapse"
                    :data-bs-target="`#col${i}`"
                >
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
                  <svg
                      style="display: none"
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="18"
                      viewBox="0 0 22 18"
                      fill="none"
                      :id="'iconEyeClose' + i"
                  >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2185 1.33568C21.542 1.07692 21.5944 0.604953 21.3357 0.281506C21.0769 -0.0419401 20.605 -0.0943811 20.2815 0.164376L16.9562 2.82464C15.279 1.31835 13.1397 2.76135e-05 10.75 2.76135e-05C8.60907 2.76135e-05 6.67327 1.05902 5.10175 2.34574C3.52166 3.63949 2.22964 5.22868 1.36144 6.43804L1.28984 6.53762C0.767181 7.26385 0.33695 7.86166 0.336944 8.75C0.336937 9.63833 0.76709 10.2361 1.28964 10.9622L1.36121 11.0617C1.90751 11.8227 2.61909 12.7305 3.46226 13.6198L0.281506 16.1644C-0.0419401 16.4231 -0.0943812 16.8951 0.164376 17.2185C0.423133 17.542 0.895102 17.5944 1.21855 17.3357L21.2185 1.33568ZM10.75 1.50003C12.5277 1.50003 14.2524 2.45932 15.7673 3.77574L13.1506 5.86909C12.5006 5.32707 11.6634 5.00003 10.75 5.00003C8.67896 5.00003 7.00003 6.67896 7.00003 8.75003C7.00003 9.36541 7.14871 9.94707 7.41192 10.46L4.63803 12.6792C3.81702 11.8246 3.11802 10.9368 2.57974 10.1869C1.95595 9.31801 1.83694 9.10854 1.83694 8.75001C1.83695 8.39149 1.956 8.18195 2.57995 7.31281C3.40922 6.15768 4.61351 4.68417 6.05203 3.50634C7.49913 2.32149 9.10426 1.50003 10.75 1.50003ZM10.75 6.50003C11.1862 6.50003 11.5933 6.62383 11.9384 6.8389L8.62436 9.4901C8.54377 9.25853 8.50003 9.00964 8.50003 8.75003C8.50003 7.50739 9.50739 6.50003 10.75 6.50003Z"
                        fill="#2D264B"
                    />
                    <path
                        d="M19.1454 5.14079C18.8832 4.82006 18.4108 4.77255 18.09 5.03467C17.7693 5.29679 17.7218 5.76928 17.9839 6.09001C18.3344 6.51888 18.6481 6.93396 18.92 7.31273C19.5441 8.18194 19.6631 8.3915 19.6631 8.75002C19.6631 9.10855 19.5441 9.31809 18.9201 10.1872C18.0908 11.3424 16.8865 12.8159 15.448 13.9937C14.0009 15.1786 12.3958 16 10.75 16C9.34522 16 7.96821 15.4021 6.68756 14.4822C6.35113 14.2406 5.88252 14.3174 5.64088 14.6538C5.39923 14.9903 5.47607 15.4589 5.8125 15.7005C7.23703 16.7237 8.91761 17.5 10.75 17.5C12.891 17.5 14.8268 16.441 16.3983 15.1543C17.9784 13.8606 19.2704 12.2714 20.1386 11.062L20.2102 10.9624C20.7329 10.2362 21.1631 9.63837 21.1631 8.75002C21.1631 7.86167 20.7329 7.26382 20.2102 6.53754L20.1386 6.43796C19.8509 6.03725 19.5182 5.59696 19.1454 5.14079Z"
                        fill="#2D264B"
                    />
                    <path
                        d="M14.5 8.75003C14.5 8.33581 14.1642 8.00003 13.75 8.00003C13.3358 8.00003 13 8.33581 13 8.75003C13 9.99267 11.9927 11 10.75 11C10.3358 11 10 11.3358 10 11.75C10 12.1642 10.3358 12.5 10.75 12.5C12.8211 12.5 14.5 10.8211 14.5 8.75003Z"
                        fill="#2D264B"
                    />
                  </svg>
                </button>
              </p>
            </div>
            <div class="detail-order px-3" :id="'styleList' + i">
              <div class="collapse" :id="'col' + i">
                <div class="card-body card-factor">
                  <div class="item">
                    <span class="item-head">شماره سفارش:</span>
                    <p class="item-data">{{ item.orderNo }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">تاریخ ثبت سفارش:</span>
                    <p class="item-data">{{ item.createDate }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">زمان ثبت سفارش:</span>
                    <p class="item-data">{{ item.createDateTime }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">هزینه توزیع:</span>
                    <p class="item-data">{{ item.distributionPrice }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نوع توزیع:</span>
                    <p class="item-data">{{ item.deliveryStatusDescription }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">کد تخفیف:</span>
                    <p v-if="item.discountCode" class="item-data">
                      {{ item.discountCode }}
                    </p>
                    <p v-else class="item-data">ندارد</p>
                  </div>
                </div>
                <div
                    class="card-body p-0 pt-4 pb-4 border-bottom mb-3"
                    v-for="(col, i) in item.items"
                    :key="i"
                >
                  <div class="item">
                    <span class="item-head">ردیف</span>
                    <p class="item-data">{{ col.row }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نام محصول </span>
                    <p class="item-data">{{ col.productName }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نرخ (ریال)</span>
                    <p class="item-data">{{ col.price }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">تعداد</span>
                    <p class="item-data">{{ col.returningOrderCount }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">مبلغ (ریال)</span>
                    <p class="item-data">
                      {{ col.totalPrice }}
                    </p>
                  </div>
                  <div class="item">
                    <span class="item-head">تخفیف میزبان</span>
                    <p class="item-data">
                      {{ col.sellerDiscount }}
                    </p>
                  </div>
                  <div class="item">
                    <span class="item-head">مبلغ پس از تخفیف(ریال)</span>
                    <p class="item-data">
                      {{ col.totalPriceWithDiscount }}
                    </p>
                  </div>
                  <!--                  <div class="item mt-5 mb-3 pb-3 border-bottom">-->
                  <!--                    <span class="item-head">تخفیف کل</span>-->
                  <!--                    <p class="item-data text-danger">-->
                  <!--                      {{ item.sellerDiscountCsv }}-->
                  <!--                    </p>-->
                  <!--                  </div>-->

                  <!--                  <div class="item mb-4">-->
                  <!--                    <span class="item-head">مبلغ کل</span>-->
                  <!--                    <p class="item-data">-->
                  <!--                      {{ item.totalPayment }}-->
                  <!--                    </p>-->
                  <!--                  </div>-->
                </div>
                <div class="card-body card-footer pt-0">
                  <div class="item">
                    <span class="item-head">جمع کل:</span>
                    <p class="item-data">{{ item.productPrice }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">تخفیف خونگی:</span>
                    <p class="item-data" style="color: red">{{ item.khooneghiDiscountPrice }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">قابل پرداخت:</span>
                    <p class="item-data">{{ item.totalPayment }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">توضیحات:</span>
                    <p class="item-data">{{ item.description }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">آدرس:</span>
                    <p class="item-data">{{ item.addressLine }}</p>
                  </div>

                  <div style="text-align: left">
                    <button
                        class="show-map"
                        @click="
												getMap(item.latitude, item.longitude, item.addressLine)
											"
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="13"
                          viewBox="0 0 15 13"
                          fill="none"
                      >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.19231 0C4.25887 0 3.32474 0.293173 2.53846 0.879412L0.846154 2.14118C0.313488 2.53833 0 3.16161 0 3.82353V10.4222C0 12.1145 1.94339 13.0804 3.30521 12.0651C3.8644 11.6482 4.52801 11.4398 5.19231 11.4398C5.85661 11.4398 6.52022 11.6482 7.0794 12.0651L7.15384 12.1206C7.94012 12.7068 8.87426 13 9.80769 13C10.7411 13 11.6753 12.7068 12.4615 12.1206L14.1538 10.8588C14.6865 10.4617 15 9.83839 15 9.17647V2.5778C15 0.885535 13.0566 -0.0804436 11.6948 0.934915C11.1356 1.35184 10.472 1.56025 9.80769 1.56025C9.14339 1.56025 8.47978 1.35184 7.9206 0.934915L7.84615 0.879412C7.05988 0.293173 6.12575 0 5.19231 0ZM3.23077 1.79706C3.64942 1.48491 4.1244 1.28521 4.61538 1.19791V10.3313C3.90578 10.4266 3.21477 10.6987 2.6129 11.1474C2.01174 11.5957 1.15385 11.1692 1.15385 10.4222V3.82353C1.15385 3.52266 1.29634 3.23935 1.53846 3.05882L3.23077 1.79706ZM7.77171 11.1474C7.16985 10.6987 6.47884 10.4266 5.76923 10.3313V1.19791C6.26022 1.28521 6.73519 1.48491 7.15385 1.79706L7.22829 1.85256C7.83015 2.30131 8.52116 2.57338 9.23077 2.66873V11.8021C8.73978 11.7148 8.26481 11.5151 7.84616 11.2029L7.77171 11.1474ZM11.7692 11.2029C11.3506 11.5151 10.8756 11.7148 10.3846 11.8021V2.66873C11.0942 2.57338 11.7852 2.30131 12.3871 1.85256C12.9883 1.40434 13.8462 1.83076 13.8462 2.5778V9.17647C13.8462 9.47734 13.7037 9.76065 13.4615 9.94118L11.7692 11.2029Z"
                            fill="#664ECA"
                        />
                      </svg>
                      مشاهده نقشه
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center">در حال حاضر سفارش موجود نمی‌باشد</div>
      </div>
      <Dialog v-model:visible="showMapModal" class="map-order">
        <template #header>
          <div class="header">
            <div class="address-modal">
              <span>آدرس: </span>
              <p>{{ addressModal }}</p>

            </div>
          </div>
        </template>
        <!--        <iframe-->
        <!--            v-if="windowWith > 768"-->
        <!--            :src="`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
        <!--            frameborder="0"-->
        <!--            scrolling="no"-->
        <!--            marginheight="0"-->
        <!--            marginwidth="0"-->
        <!--            style="-->
        <!--					height: 21rem;-->
        <!--					width: 47rem;-->
        <!--					border-radius: 7px;-->
        <!--					border: 1px solid rgba(159, 159, 181, 0.5);-->
        <!--					margin: 4rem 3rem 0 3rem;-->
        <!--				"-->
        <!--        ></iframe>-->
        <!--        <iframe-->
        <!--            v-else-if="windowWith <= 768"-->
        <!--            :src="`https://maps.google.com/maps?q=${latitude},${longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
        <!--            frameborder="0"-->
        <!--            scrolling="no"-->
        <!--            marginheight="0"-->
        <!--            marginwidth="0"-->
        <!--            style="-->
        <!--					height: 21rem;-->
        <!--					width: 21rem;-->
        <!--					border-radius: 7px;-->
        <!--					border: 1px solid rgba(159, 159, 181, 0.5);-->
        <!--					margin: 3rem 3rem 0 3rem;-->
        <!--				"-->
        <!--        ></iframe>-->
        <iframe
            v-if="windowWith > 768"
            ref="iframeContent"
            type="text/html"
            style="
            height: 21rem;
            width: 47rem;
            border-radius: 7px;
            border: 1px solid rgba(159, 159, 181, 0.5);
            margin: 4rem 3rem 0 3rem;
          "
            :class="NewLatLong ? 'NewChanged' : ''"
            frameborder="0"
            height="250rem"
            width="100%"

            :src="`https://map.ir/lat/${latitude}/lng/${longitude}/z/17/p/من اینجام`"
        ></iframe>
        <iframe
            v-if="windowWith <= 768"
            ref="iframeContent"
            type="text/html"
            style="
            height: 21rem;
            width: 21rem;
            border-radius: 7px;
            border: 1px solid rgba(159, 159, 181, 0.5);
            margin: 3rem 3rem 0 3rem;
          "
            :class="NewLatLong ? 'NewChanged' : ''"
            frameborder="0"
            height="250rem"
            width="100%"

            :src="`https://map.ir/lat/${latitude}/lng/${longitude}/z/17/p/من اینجام`"
        ></iframe>
        <khoonegiButton
            style="margin: 1rem 3rem; width: auto; float: left; font-size: 13px"
            class="form-button slate-not"
            text="بستن نقشه"
            @click.prevent="showMapModal = false"
        />
      </Dialog>
      <Dialog v-model:visible="showFactorModal" class="print-modal">
        <template #header>
          <div class="header">
            <span>رسید سفارش </span>
            <button @click="showFactorModal = false">✘</button>
          </div>
        </template>
        <div id="content-factor" class="content">
          <div class="header-content">
            <div class="item">
              <h6>فروشنده:</h6>
              <p>{{ sellerFactor }}</p>
            </div>
            <div class="item">
              <span>پلتفرم خونگی</span>
            </div>
            <div class="item">
              <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 2639 2639" fill="none">
                <path d="M772.238 1676.42C1496.97 1765.16 1409.23 1372.94 1409.23 1372.94" stroke="#FF5F33"
                      stroke-width="100" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M828.318 1071.76C828.318 1071.76 1078.03 1541.84 847.78 1656.3C672.617 1743.39 698.017 1521.38 412.016 1465.63"
                    stroke="#FF5F33" stroke-width="100" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round"/>
                <path
                    d="M2191.03 1299.38C2191.03 1299.38 2385 1026.24 2585.89 1277.94C2585.89 1277.94 2617.89 1333.02 2472.08 1469.59C2350.69 1583.73 2116.15 1674.12 1996.07 1658.61"
                    stroke="#FF5F33" stroke-width="100" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round"/>
                <path
                    d="M1939.34 1651.35C1682.03 1679.06 1629.25 1536.56 1627.93 1471.24C1623.32 1272.66 1980.9 1162.81 1999.37 1360.4C2017.85 1557.67 2023.13 1829.49 1661.91 1875.34"
                    stroke="#FF5F33" stroke-width="100" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round"/>
                <path
                    d="M2198.29 1021.95C2243.84 1021.95 2280.76 985.03 2280.76 939.484C2280.76 893.938 2243.84 857.015 2198.29 857.015C2152.74 857.015 2115.82 893.938 2115.82 939.484C2115.82 985.03 2152.74 1021.95 2198.29 1021.95Z"
                    fill="#FF5F33"/>
                <path
                    d="M1205.36 1236.7C1250.91 1236.7 1287.83 1199.78 1287.83 1154.23C1287.83 1108.69 1250.91 1071.76 1205.36 1071.76C1159.82 1071.76 1122.89 1108.69 1122.89 1154.23C1122.89 1199.78 1159.82 1236.7 1205.36 1236.7Z"
                    fill="#FF5F33"/>
                <path d="M810.172 941.793C810.172 941.793 1132.46 941.793 1331.37 778.505" stroke="#FF5F33"
                      stroke-width="100" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1299.71 595.754C1299.71 595.754 1224.5 723.746 1014.7 754.754" stroke="#FF5F33"
                      stroke-width="100" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M424.549 1468.27C424.549 1468.27 212.439 1418.79 89.7258 1596.6C-31.9981 1773.08 149.433 2059.74 1475.86 1908"
                    stroke="#FF5F33" stroke-width="100" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div class="table-modal">
            <table class="table table-bordered">
              <tbody>
              <tr>
                <th class="text-center bgGrey1"> شماره سفارش</th>
                <td class="text-center">{{ modalDataFactor.orderNo }}</td>
                <th class="text-center bgGrey1">تاریخ سفارش</th>
                <td class="text-center">{{ modalDataFactor.orderDate }}</td>
              </tr>
              <tr>
                <th class="text-center bgGrey1"> مشتری</th>
                <td class="text-center">{{ modalDataFactor.customerName }}</td>
                <th class="text-center bgGrey1">شماره همراه</th>
                <td class="text-center">{{ modalDataFactor.customerPhone }}</td>
              </tr>
              <tr>
                <th class="text-center bgGrey1">آدرس</th>
                <td colspan="3" class="text-left">
                  {{ modalDataFactor.addressLine }}
                </td>
              </tr>
              </tbody>
            </table>
            <table class="table table-bordered ">
              <thead>
              <tr>
                <th class="text-center bgGrey1">ردیف</th>
                <th class="text-center bgGrey1">نام کالا</th>
                <th class="text-center bgGrey1">تعداد</th>
                <th class="text-center bgGrey1 ltr">نرخ(ریال)</th>
                <th class="text-center bgGrey1 ltr">مبلغ کل(ریال)</th>
                <th class="text-center bgGrey1 ltr">تخفیف میزبان</th>
                <th class="text-center bgGrey1 ltr">مبلغ پس از تخفیف(ریال)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in modalDataFactor.items" :key="item">
                <td class="text-center">
                  {{ item.row }}
                </td>
                <td class="text-center">
                  {{ item.productName }}
                </td>
                <td class="text-center">
                  {{ item.returningOrderCount }}
                </td>
                <td class="text-center">
                  {{
                    item.price
                  }}
                </td>
                <td class="text-center">
                  {{
                    item.totalPrice
                  }}
                </td>
                <td class="text-center">
                  {{
                    item.sellerDiscount
                  }}
                </td>
                <td class="text-center">
                  {{
                    item.totalPriceWithDiscount
                  }}
                </td>
              </tr>
              <tr class="details-modal">
                <th style="text-align: left;" class="text-left border-0 bgGrey1" colspan="6">
                  <ul>
                    <li>جمع کل</li>
                    <li>توزیع</li>
                    <li>تخفیف خونگی</li>
                    <li>مبلغ قابل پرداخت</li>
                  </ul>
                </th>
                <td class="text-center border-right">
                  <ul>
                    <li>{{ modalDataFactor.productPrice }}</li>
                    <li> {{ modalDataFactor.distributionPrice }}</li>
                    <li> {{ modalDataFactor.khooneghiDiscountPrice }}</li>
                    <li> {{ modalDataFactor.totalPayment }}</li>
                  </ul>
                </td>
              </tr>
              </tbody>
            </table>
            <p>از خرید شما سپاس گذاریم</p>
            <div class="text-center print-btn">
              <khoonegiButton
                  class="form-button slate w-20 print-btn"
                  text="پرینت فاکتور"
                  @click="printModal()"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
    <LoadingFull :enable-loading-full="isLoading"/>
    <page-to-top/>
    <!-- table for only export csv file  -->
    <table class="d-none">
      <thead>
      <tr>
        <th v-for="col in columnsCsv" :key="col">
          {{ col.label }}
        </th>
      </tr>
      </thead>
      <tbody v-for="row in returningOrder" :key="row">
      <tr v-for="(sub, index) in row.items" :key="sub">
        <td>{{ row.row }}</td>
        <td>{{ row.customerName }}</td>
        <td>{{ row.customerPhone }}</td>
        <td>{{ row.name }}</td>
        <td>{{ row.orderDate }}</td>
        <td>{{ row.deliveryTimeDescription }}</td>
<!--        <td>{{ row.status }}</td>-->
        <td>{{ row.orderNo }}</td>
        <td>{{ row.createDate }}</td>
        <td>{{ row.createDateTime }}</td>
        <td>{{ row.deliveryStatusDescription }}</td>
        <td>{{ row.discountCode }}</td>
        <td>{{ sub.productName }}</td>
        <td>{{ sub.price }}</td>
        <td>{{ sub.returningOrderCount }}</td>
        <td>{{ sub.totalPrice }}</td>
        <td>{{ sub.sellerDiscount }}</td>
        <td>{{ sub.totalPriceWithDiscount }}</td>
        <td>{{ index > 0 ? "" : row.productPrice }}</td>
        <td>{{ index > 0 ? "" : row.distributionPrice }}</td>
        <td>{{ index > 0 ? "" : row.khooneghiDiscountPrice }}</td>
        <td>{{index > 0 ? "" : row.totalPayment }}</td>
        <td>{{index > 0 ? "" : row.description }}</td>
        <td>{{ index > 0 ? "" :row.addressLine }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Dialog from "primevue/dialog";
import khoonegiButton from "@/components/khoonegiButton.vue";
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import lodash from "lodash";
import VsudInput from "@/components/VsudInput.vue";
import SearchLoading from "../components/searchLoading";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name:"returnOrders",
  components: {
    LoadingFull,
    pageToTop,
    Multiselect,
    VsudInput,
    SearchLoading,
    Dialog,
    khoonegiButton,
  },
  data() {
    return {
      userState: this.$store.state.typeUser,
      totalRecordCount: 0,
      toast: useToast(),
      windowWith: window.innerWidth,
      fromDate: "",
      toDate: "",
      returningOrder: [],
      columns: [
        {
          label: " ردیف",
        },
        {
          label: "نام مشتری ",
        },
        {
          label: "شماره تماس",
        },
        {
          label: "نام میزبان",
        },
        {
          label: "شماره سفارش",
        },
        {
          label: "تاریخ سفارش",
        },
        {
          label: "زمان دریافت",
        },
        // {
        //   label: "وضعیت",
        // },
        {
          label: "جزئیات",
        },
      ],
      columnsDetail: [
        {
          label: " ردیف",
        },
        {
          label: "نام محصول ",
        },
        {
          label: "نرخ (ریال)",
        },
        {
          label: "تعداد",
        },
        {
          label: "مبلغ (ریال)",
        },
        {
          label: "تخفیف میزبان",
        },
        {
          label: "مبلغ پس از تخفیف(ریال)",
        },
      ],
      sellerBrand: "",
      sellerList: [],
      message: {
        noDataAvailable: "در حال حاضر سفارش موجود نمی‌باشد",
      },
      isSearchLoading: false,
      searchQuery: "",
      searchIndex: 0,
      orderStatus: -1,
      showDetail: false,
      collapseId: "",
      expand: false,
      latitude: "",
      longitude: "",
      showMapModal: false,
      addressModal: "",
      // data for export csv
      columnsCsv: [
        {
          label: " ردیف",
          field: "row",
          width: ".2%",
          sortable: false,
        },
        {
          label: "نام مشتری ",
          field: "customerName",
          width: ".5%",
          sortable: false,
        },


        {
          label: "شماره تماس",
          field: "customerPhone",
          width: "1%",
          sortable: false,
        },
        {
          label: "نام و نام خانوادگی میزبان",
          field: "name",
          width: "1.5%",
          sortable: false,
        },
        // {
        //   label: "نام میزبان",
        //   field: "sellerBrand",
        //   width: "1%",
        //   sortable: false,
        // },

        {
          label: "تاریخ سفارش",
          field: "orderDate",
          width: "1%",
          sortable: false,
        },
        {
          label: "زمان دریافت",
          field: "deliveryTimeDescription",
          width: "0.5%",
          sortable: false,
        },
        // {
        //   label: "وضعیت",
        //   field: "status",
        //   width: "1.5%",
        //   sortable: false,
        // },
        {
          label: "شماره سفارش",
          field: "orderNo",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "تاریخ ثبت سفارش",
          field: "createDate",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "زمان ثبت سفارش",
          field: "createDateTime",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "نوع توزیع",
          field: "deliveryStatusDescription",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "کد تخفیف",
          field: "discountCode",
          width: "1.5%",
          sortable: false,
        },
        //  array nested
        {
          label: "نام محصول",
          field: "productNameCsv",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "نرخ",
          field: "priceCsv",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "تعداد",
          field: "orderCountCsv",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "مبلغ (ریال)",
          field: "totalPriceRowCsv",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "تخفیف میزبان",
          field: "sellerDiscountCsv",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "مبلغ پس از تخفیف(ریال)",
          field: "totalPriceWithDiscountCsv",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "جمع کل",
          field: "productPrice",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "هزینه توزیع",
          field: "distributionPrice",
          width: "1.5%",
          sortable: false,
        },

        // end array nested
        {
          label: "تخفیف خونگی",
          field: "khooneghiDiscountPrice",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "قابل پرداخت",
          field: "totalPayment",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "توضیحات",
          field: "description",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "آدرس",
          field: "addressLine",
          width: "1.5%",
          sortable: false,
        },

      ],
      showFactorModal: false,
      sellerFactor: "",
      //  data modal factor
      modalDataFactor: [],
      isLoading: false,
      counterKey: 1,

    };
  },
  mounted() {
    console.log(this.userState)
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    this.getOrderList();
    const data = {
      QueryString: "",
    };
    this.$store.dispatch("getSellerActive", data).then((respons) => {
      this.sellerList = respons.data;
      this.sellerList.forEach((item) => {
        item.title = item.brand;
        item.value = item.sellerId;
      });
    });
    this.$store.dispatch("getOrderStatus").then((respons) => {
      this.$store.state.orderStatus = respons.data;
    });
    setTooltip();
  },
  methods: {
    printModal() {
      window.print()
    },
    printFactor(item) {
      console.log(item)
      this.showFactorModal = true;
      this.sellerFactor = this.userState == 0 ? item.sellerBrand : this.userState == 2 ? item.name : item.name + `(${item.sellerBrand})`;
      this.modalDataFactor = item;
      console.log(this.modalDataFactor)
      this.showFactorModal = true;
    },
    getMap(lat, lng, address) {
      this.showMapModal = true;
      this.addressModal = address;
      this.latitude = lat;
      this.longitude = lng;
    },
    showDetails(value) {
      this.collapseId = value;
      this.returningOrder.at(value).expand = !this.returningOrder.at(value).expand;
      this.expand = this.returningOrder.at(value).expand;
      let divID = document.querySelector(`#eye${value}`);
      let iconEye = document.getElementById(`iconEye${value}`);
      let iconEyeClose = document.getElementById(`iconEyeClose${value}`);
      // style
      let styleList = document.getElementById(`styleList${value}`);
      let styleRow = document.getElementById(`styleRow${value}`);
      divID.setAttribute("aria-expanded", this.expand);
      divID.setAttribute("aria-controls", this.collapseId);
      if (this.expand == true) {
        iconEye.style = "display:none;";
        iconEyeClose.style = "display:block;";
        styleList.style =
            "border-radius: 20px;border: 1px solid #ffa460 !important;margin-bottom: 1rem;";
        styleRow.style = "background: #F7F7F7;";
      } else if (this.expand == false) {
        iconEye.style = "display:block";
        iconEyeClose.style = "display:none";
        styleList.style =
            "border:1px solid transparent;border-radius: 0;margin-bottom: 0;border-top: 0.5px solid #e9e9e9 !important;";
        styleRow.style = "background: transparent";
      }
    },
    showDetailsMobile(value) {
      this.collapseId = value;
      this.returningOrder.at(value).expand = !this.returningOrder.at(value).expand;
      this.expand = this.returningOrder.at(value).expand;
      let divID = document.querySelector(`#eye${value}`);
      divID.setAttribute("aria-expanded", this.expand);
      divID.setAttribute("aria-controls", this.collapseId);
      let iconEye = document.getElementById(`iconEye${value}`);
      let iconEyeClose = document.getElementById(`iconEyeClose${value}`);
      // style
      let styleList = document.getElementById(`styleList${value}`);
      if (this.expand == true) {
        iconEye.style = "display:none;";
        iconEyeClose.style = "display:block;";
        styleList.style =
            "border-radius: 20px;border: 1px solid #ffa460 !important;margin-bottom: 1rem;";
      } else if (this.expand == false) {
        iconEye.style = "display:block";
        iconEyeClose.style = "display:none";
        styleList.style =
            "border:1px solid transparent;border-radius: 0;margin-bottom: 0;border-top: 0.5px solid #e9e9e9 !important;";
      }
    },
    setSearch(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getOrderList();
        }
      }, 600)();
    },
    getOrderList() {
      this.isLoading = true;
      const data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
        SellerId: this.sellerBrand,
        QueryString: this.searchQuery,
        // OrderStatus: this.orderStatus,
      };
      this.$store
          .dispatch("returningOrdersIndex", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.returningOrder = respons.data.returningOrders;
              this.returningOrder.forEach((item) => {
                item.productPrice = (item.productPrice * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                item.distributionPrice = (item.distributionPrice * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.totalPayment = (item.totalPayment * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.khooneghiDiscountPrice = (item.khooneghiDiscountPrice * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.expand = false;
                //
                item.items.forEach((text, index) => {
                  text.row = index;
                  text.row++;
                  text.price = (text.price * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  text.totalPrice = (text.totalPrice * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  text.sellerDiscount = (text.sellerDiscount * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  text.totalPriceWithDiscount = (text.totalPriceWithDiscount * 10).toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                });
              })
              this.returningOrder.map((item)=>{
                console.log(item)
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
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            this.isLoading = false;
            console.log(error);
          });
    },
  },
  watch: {
    sellerBrand: function () {
      this.getOrderList();
    },
    orderStatus: function () {
      this.getOrderList();
    },
    fromDate: function () {
      this.getOrderList();
    },
    toDate: function () {
      this.getOrderList();
    },
  },
};
</script>
<style lang="scss">
.bgGrey1 {
  background-color: #f8f8f8 !important;
}

@media only print {
  .print-modal {
    .header {
      display: none !important;
    }
  }
  .print-btn {
    display: none !important;
  }
  #content-factor {
    display: block !important;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 0px !important;
  }

}

.print-modal {
  width: 100% !important;
  height: 100% !important;
  max-height: unset !important;

  #content-factor {
    margin: 1% 18% !important;
  }

  .header-content {
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-items: center;
    align-items: center;

    .item {
      display: flex;
      column-gap: 10px;

      p, h6 {
        margin: 0;
      }
    }
  }

  .details-modal {
    border: 1px solid #e9ecef;

    ul {
      list-style: none;

      li {
        margin-bottom: 15px;
      }
    }
  }
}

.table-info-mobile {
  .card-factor {
    border-bottom: 1px dashed #d5d5d5;
    padding: 1rem 0;

    .item-head {
      color: #939393;
    }
  }

  .card-footer {
    padding: 1rem 0;

    .item {
      align-items: baseline;
    }

    .item-head {
      color: #939393;
    }

    .item-data {
      line-height: 21px !important;
      margin-right: 5px;
    }
  }

  .item {
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.returningOrder {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  .table-custom {
    padding: 25px 0;

    ul {
      display: grid;
      grid-template-columns: 3% 25% 20% 15% 11% 11% 10% 5%;
      width: 100%;
      align-items: baseline;
      justify-items: center;
    }

    .table-head {
      color: #664eca;
      font-weight: 700;
      font-size: 15px;
    }

    .table-body {
      padding-top: 0.75rem;
      color: #212529;
      font-size: 13px;

      ul {
        padding: 1rem 0 !important;
      }

      .detail-order {
        .card-body {
          padding: 0;
          font-size: 13px;
          margin-top: 20px;

          ol {
            border-bottom: 0.5px solid #d8d6d6;
            padding-bottom: 15px !important;
            display: grid;
            grid-template-columns: 13% 24% 20% 13% 20% 10%;
            padding: 0 3% 1% 3% !important;

            i {
              color: #393939;
              margin-right: 8px;
            }

            span {
              color: #939393;
            }
          }

          .table-custom {
            padding: 10px 15% 25px 15%;

            ul {
              font-size: 12px;
              display: grid;
              grid-template-columns: 8% 27% 15% 5% 15% 15% 15%;
              width: 100%;
              border-bottom: none;
            }

            .table-body {
              padding-top: 0;

              ul {
                font-size: 12px;
                border-bottom: 0.5px solid #e9e9e9;
              }
            }

            .footer-table {
              display: grid;
              grid-template-columns: 60% 1fr;
              margin-top: 15px;
              grid-column-gap: 3rem;

              .description-order {
                p {
                  line-height: inherit !important;
                  border: 0.5px solid #cdcdcd;
                  border-radius: 10px;
                  padding: 10px 15px;
                  height: 8rem;
                  font-size: 13px;
                  color: #2f2a43;

                  span {
                    color: #939393;
                  }
                }
              }

              .price-order {
                .title {
                  &:first-child {
                    color: #664eca;
                    font-weight: 700;
                  }
                }

                .price {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  border-bottom: 0.5px solid #e9e9e9;
                  margin-bottom: 0.7rem;
                  padding-bottom: 0.7rem;
                  font-size: 12px;

                  .content {
                    text-align: left;
                    color: #ff0303;
                  }
                }
              }
            }
          }

          .address {
            display: grid;
            align-items: center;
            padding: 1%;
            border-top: 1px solid #d8d6d6;
            grid-template-columns: 1fr 30%;

            .text {
              span {
                color: #939393;
              }

              p {
                display: inline-block;
                line-height: inherit !important;
                font-size: 13px;
                color: #393939;
              }
            }

            .btn-factor {
              display: grid;
              grid-template-columns: 1fr 1fr;
              align-items: baseline;
              column-gap: 6%;
            }
          }
        }
      }

      .collapsed {
        .svg-show {
          display: block;
        }
      }

      .order-box {
        border: 1px solid transparent;
        transition: 0.5s;
        border-top: 0.5px solid #e9e9e9;

        &:first-child {
          border-color: transparent;
        }

        .styleRow {
          transition: 0.5s;
          border-radius: 20px 20px 0 0;
        }
      }
    }
  }

  .select-filter {
    display: grid;
    gap: 13px;
    grid-template-columns: 16% 12% 12% 1fr;
    @media (max-width: 768px) {
      display: grid;
      gap: 0;
      grid-template-columns: 1fr;
    }

    .seller-name {
      grid-area: unset;
      background-color: #fff;
      color: #664eca;
      border-color: #664eca;
      height: fit-content;
      width: 100%;
      margin-bottom: 15px !important;

      .multiselect-caret {
        background-color: #664eca !important;
      }

      .multiselect-placeholder {
        color: #664eca;
      }

      @media (max-width: 768px) {
        width: 100%;
        margin: 0;
      }
    }

    .status-select {
      width: 100%;
      grid-area: unset;
      background-color: #fff;
      color: #664eca;
      border-color: #664eca;
      height: fit-content;

      .multiselect-caret {
        background-color: #664eca !important;
      }

      .multiselect-placeholder {
        color: #664eca;
      }

      @media (max-width: 768px) {
        width: 100%;
      }
    }
  }

  .search-box {
    position: relative;

    .search-host {
      width: 70%;
      float: left;
      position: relative;
      @media (max-width: 768px) {
        width: 100%;
        input {
          &::placeholder {
            font-size: 9px;
          }
        }
      }
    }

    .submit-search {
      position: absolute;
      left: 1rem;
      top: 0.5rem;
    }

    .loading-search {
      position: absolute;
      left: 11px;
      top: 5px;
    }
  }
}


.print-factor {
  color: #fff !important;
  background-color: #664ECA;

  &:hover {
    color: #664ECA !important;
    background-color: #fff !important;
  }
}

.show-map {
  color: #664eca;
  border: 1px solid #664eca;
  padding: 5px 15px;

  svg {
    margin-left: 5px;
  }

  &:hover {
    color: #ffffff;
    background-color: #664eca;

    path {
      fill: #fff;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
}

.map-order {
  width: 53rem !important;
  height: 35rem !important;
  @media (max-width: 768px) {
    width: 27rem !important;
    height: 38rem !important;
  }

  .address-modal {
    span {
      color: #1b1827;
    }

    p {
      display: inline-block;
      color: #2f2a43;
      font-size: 14px;
      margin: 0;
    }
  }

  .map-frame {
    width: 22rem !important;
  }
}
</style>
