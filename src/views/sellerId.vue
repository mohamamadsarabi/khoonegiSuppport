<template>
  <div
      class="nav-wrapper sellerId position-relative end-0 py-3 px-4 mx-4"
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
          <khoonegi-badge
              v-if="tab.isNew || tab.isNew > 0"
              :status="tab.isNew"
              :bgColor="tab.isNew"
          >
          </khoonegi-badge>
          {{ tab.name }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <!-- contract -->
      <div
          class="tab-pane fade show active"
          id="contract"
          role="tabpanel"
          aria-labelledby="contract-tab"
      >
        <khoonegiButton
            :class="sellerState ? 'failed' : 'slate'"
            class="form-button disable-seller"
            :text="sellerState ? 'غیر فعال کردن میزبان' : 'فعال کردن میزبان'"
            @click="checkStateSeller"
        />
        <div class="contract-item">
          <div class="item">
            <label class="mb-2" :class="NewName ? 'NewChanged' : ''"
            >نام و نام خانوادگی:</label
            >
            <input
                class="global-input"
                :class="NewName ? 'NewChanged' : ''"
                type="text"
                v-model="name"
                disabled
            />
          </div>
          <div class="item">
            <label class="mb-2" :class="NewBrand ? 'NewChanged' : ''"
            >نام برند:</label
            >
            <input
                class="global-input"
                :class="NewBrand ? 'NewChanged' : ''"
                type="text"
                v-model="brandName"
                disabled
            />
          </div>
          <div class="item">
            <label class="mb-2" :class="NewAccountNumber ? 'NewChanged' : ''"
            >شماره حساب بانک ملت:</label
            >
            <input
                class="global-input"
                style="text-align: left"
                :class="NewAccountNumber ? 'NewChanged' : ''"
                type="text"
                v-model="accountNumber"
                disabled
            />
          </div>

          <div class="item">
            <label class="mb-2" :class="NewPhoneNumber ? 'NewChanged' : ''"
            >شماره همراه:</label
            >
            <input
                class="global-input"
                style="text-align: left"
                :class="NewPhoneNumber ? 'NewChanged' : ''"
                type="text"
                v-model="phoneNumber"
                disabled
            />
          </div>
          <div class="item">
            <label class="mb-2" :class="NewNationalCode ? 'NewChanged' : ''"
            >شماره ملی:</label
            >
            <input
                style="text-align: left"
                class="global-input"
                :class="NewNationalCode ? 'NewChanged' : ''"
                type="text"
                v-model="nationalCode"
                disabled
            />
          </div>

          <div class="item">
            <label class="mb-2" :class="NewLatLong ? 'NewChanged' : ''"
            >طول و عرض جغرافیایی:</label
            >
            <input
                style="text-align: center"
                class="global-input"
                :class="NewLatLong ? 'NewChanged' : ''"
                type="text"
                v-model="latLong"
                disabled
            />
          </div>
          <div class="item">
            <label class="mb-2" :class="NewnAtionalImage ? 'NewChanged' : ''"
            >تصویر کارت ملی:</label
            >
            <div
                v-if="nationalImage"
                class="nationalImage"
                :class="NewnAtionalImage ? 'NewChanged' : ''"
            >
              <img :src="nationalImage" alt="nationalImage"/>
            </div>
            <div v-else class="defaultImage">
              <img :src="userImage" alt="image"/>
            </div>
          </div>
          <div class="item">
            <label class="mb-2" :class="NewAddress ? 'NewChanged' : ''"
            >آدرس:</label
            >
            <textarea
                class="global-input textarea-global"
                :class="NewAddress ? 'NewChanged' : ''"
                v-model="address"
                disabled
            />
          </div>
          <div class="item">
            <label class="mb-2" :class="NewLatLong ? 'NewChanged' : ''"
            >نقشه:</label
            >
            <iframe
                id="forecast_embed"
                ref="iframeContent"
                type="text/html"
                style="
								border-radius: 7px;
								border: 1px solid rgba(159, 159, 181, 0.5);
							"
                :class="NewLatLong ? 'NewChanged' : ''"
                frameborder="0"
                height="91%"
                width="100%"
                :src="`https://map.ir/lat/${latitude}/lng/${Longitude}/z/17/p/من اینجام`"
            ></iframe>

            <!--						<iframe-->
            <!--							height="91%"-->
            <!--							width="100%"-->
            <!--							id="gmap_canvas"-->
            <!--							:src="`https://maps.google.com/maps?q=${latitude},${Longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
            <!--							frameborder="0"-->
            <!--							scrolling="no"-->
            <!--							marginheight="0"-->
            <!--							marginwidth="0"-->
            <!--							style="-->
            <!--								border-radius: 7px;-->
            <!--								border: 1px solid rgba(159, 159, 181, 0.5);-->
            <!--							"-->
            <!--							:class="NewLatLong ? 'NewChanged' : ''"-->
            <!--						></iframe>-->
          </div>
        </div>
        <div class="confirmation-info">
          <khoonegiButton
              style="margin-left: 18px"
              class="form-button mt-5 failed"
              text="رد اطلاعات"
              :disabled="!isNewcontract ? true : false"
              @click.prevent="submitInfo(2)"
          />
          <khoonegiButton
              class="form-button mt-5"
              text="تایید اطلاعات"
              :disabled="!isNewcontract ? true : false"
              @click.prevent="submitInfo(1)"
          />
        </div>
      </div>
      <!-- profile -->
      <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
      >
        <div class="profile-item">
          <div class="item">
            <label class="mb-2" :class="NewCoverImage ? 'NewChanged' : ''"
            >عکس کاور:</label
            >
            <div
                v-if="coverImage"
                class="nationalImage coverImage"
                :class="NewCoverImage ? 'NewChanged' : ''"
            >
              <img :src="coverImage" alt="coverImage"/>
            </div>
            <div v-else class="defaultImage">
              <img :src="defaultImage" alt="image" style="max-height: 14.4rem;"/>
            </div>
          </div>
          <div class="item">
            <label class="mb-2" :class="NewProfileImage ? 'NewChanged' : ''"
            >عکس پروفایل:</label
            >
            <div
                v-if="profileImage"
                class="nationalImage"
                :class="NewProfileImage ? 'NewChanged' : ''"
            >
              <img
                  :src="profileImage"
                  alt="nationalImage"
                  style="height: 226px"
              />
            </div>
            <div v-else class="defaultImage" style="height: 230px">
              <img :src="userImage" alt="image"/>
            </div>
          </div>

          <div class="item">
            <label class="mb-2" :class="NewBiography ? 'NewChanged' : ''"
            >بیوگرافی:</label
            >
            <textarea
                class="global-input textarea-global biography"
                :class="NewBiography ? 'NewChanged' : ''"
                v-model="biography"
                disabled
            />
          </div>

          <div class="item" v-if="otherImages.length">
            <label class="mb-2" :class="NewOtherImages ? 'NewChanged' : ''"
            >سایر تصاویر:</label
            >
            <div class="otherImage">
              <img
                  :src="media.fileName"
                  :class="NewOtherImages ? 'NewChanged' : ''"
                  v-for="(media, i) in otherImages"
                  :key="i"
                  alt="nationalImage"
              />
            </div>
          </div>
        </div>
        <div class="confirmation-info">
          <khoonegiButton
              style="margin-left: 18px"
              class="form-button mt-5 failed"
              text="رد اطلاعات"
              :disabled="!isNewProfile ? true : false"
              @click.prevent="submitProfileInfo(2)"
          />
          <khoonegiButton
              class="form-button mt-5"
              text="تایید اطلاعات"
              :disabled="!isNewProfile ? true : false"
              @click.prevent="submitProfileInfo(1)"
          />
        </div>
      </div>
      <!-- product list -->
      <div
          class="tab-pane fade"
          id="product"
          role="tabpanel"
          aria-labelledby="product-tab"
      >
        <div class="selected-status">
          <Multiselect
              v-model="condition"
              :options="prodactSellerStatus"
              placeholder="وضعیت.. "
              label="title"
              track-by="value"
          />
        </div>
        <table-lite
            v-if="windowWith > 768"
            :is-slot-mode="true"
            :columns="columns"
            :rows="productList"
            :total="totalRecordCount"
            :sortable="false"
            @do-search="doSearch"
            @is-finished="isLoading = false"
            :is-hide-paging="true"
            :messages="message"
        >
          <template v-slot:link="item">
            <button
                class="full-link"
                @click="
								$router.push(
									`/productList/${item.value.productId}/${item.value.productName}`
								)
							"
            ></button>
          </template>
          <template v-slot:status="item">
            <div style="padding: 0 5%;">
						<span class="statusClass">
							<khoonegi-badge
                  :status="
									item.value.status == 2
										? 6
										: item.value.status || item.value.status == 1
										? 8
										: item.value.status
								"
                  :bgColor="
									item.value.status == 2
										? 6
										: item.value.status || item.value.status == 1
										? 8
										: item.value.status
								"
              >{{ item.value.statusStr }}</khoonegi-badge
              >
						</span>

            </div>
          </template>
        </table-lite>
        <div v-else-if="windowWith <= 768" class="table-info-mobile">
          <div v-if="productList">
            <div class="info-item" v-for="(item, i) in productList" :key="i">
              <div
                  @click="
									$router.push(
										`/productList/${item.productId}/${item.productName}`
									)
								"
              >
                <div class="item">
                  <span class="item-head">ردیف</span>
                  <p class="item-data">{{ item.row }}</p>
                </div>
                <div class="item">
                  <span class="item-head">نام محصول </span>
                  <p class="item-data">{{ item.productName }}</p>
                </div>
                <div class="item">
                  <span class="item-head">دسته بندی</span>
                  <!-- <p class="item-data">{{ item.category }}</p> -->
                </div>
                <div class="item">
                  <span class="item-head">قیمت (ریال)</span>
                  <p class="item-data">{{ item.price }}</p>
                </div>
                <div class="item">
                  <span class="item-head">تاریخ ایجاد</span>
                  <p class="item-data">
                    {{ item.createDate }}
                  </p>
                </div>
                <div class="item">
                  <span class="item-head">وضعیت</span>
                  <p class="item-data">
                    <khoonegi-badge
                        :bgColor="
												item.status == 2
													? 6
													: item.status || item.status == 1
													? 8
													: item.status
											"
                    >{{ item.statusStr }}
                    </khoonegi-badge
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-center">در حال حاضر محصول موجود نمی‌باشد</div>
        </div>
      </div>
      <!-- menu list -->
      <div
          class="tab-pane menu-list fade"
          id="menu"
          role="tabpanel"
          aria-labelledby="menu-tab"
      >
        <div class="menu-filter">
          <div class="selected">
            <Multiselect
                v-model="productNameMenu"
                :options="this.$store.state.prodactSellerMenuStore"
                placeholder="نام محصول "
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
          </div>
          <div class="check-filter">
						<span class="remain">
							<input
                  class="check-box"
                  type="checkbox"
                  id="remain"
                  v-model="remain"
                  @click="submitRemain"
              />
							<label for="remain">محصولات در حال فروش</label>
						</span>
            <span class="NotRemain">
							<input
                  class="check-box"
                  type="checkbox"
                  id="NotRemain"
                  v-model="NotRemain"
                  @click="submuitNotRemain"
              />
							<label for="NotRemain">محصولات تمام شده</label>
						</span>
          </div>
        </div>
        <table-lite
            v-if="windowWith > 768"
            :is-slot-mode="true"
            :columns="columnsMenu"
            :rows="productMenuList"
            :total="totalRecordCount"
            :sortable="false"
            @do-search="doSearch"
            @is-finished="isLoading = false"
            :is-hide-paging="true"
            :messages="messageMenu"
        >
          <!-- <template v-slot:total="item">
            <span class="statusClass"> </span>
          </template> -->
        </table-lite>
        <div v-else-if="windowWith <= 768" class="table-info-mobile">
          <div v-if="productMenuList.length">
            <div
                class="info-item"
                v-for="(item, i) in productMenuList"
                :key="i"
            >
              <div class="item">
                <span class="item-head">ردیف</span>
                <p class="item-data">{{ item.row }}</p>
              </div>
              <div class="item">
                <span class="item-head">نام محصول </span>
                <p class="item-data">{{ item.name }}</p>
              </div>
              <div class="item">
                <span class="item-head">تاریخ فروش</span>
                <p class="item-data">{{ item.date }}</p>
              </div>
              <div class="item">
                <span class="item-head">بازه زمانی</span>
                <p class="item-data">{{ item.time }}</p>
              </div>
              <div class="item">
                <span class="item-head">تعداد کل</span>
                <p class="item-data">
                  {{ item.count }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">فروش رفته</span>
                <p class="item-data">
                  {{ item.remain }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">باقیمانده</span>
                <p class="item-data">
                  {{ item.sellCount }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
        </div>
      </div>
      <!-- Range -->
      <div
          class="tab-pane range fade"
          id="range"
          role="tabpanel"
          aria-labelledby="range-tab"
      >
        <table-lite
            v-if="windowWith > 768"
            :is-slot-mode="true"
            :columns="columnsDelivery"
            :rows="deliveryList"
            :total="totalRecordCount"
            :sortable="false"
            @do-search="doSearch"
            @is-finished="isLoading = false"
            :is-hide-paging="true"
            :messages="messageDelivery"
        >
        </table-lite>
        <div v-else-if="windowWith <= 768" class="table-info-mobile">
          <div v-if="deliveryList.length">
            <div class="info-item" v-for="(item, i) in deliveryList" :key="i">
              <div class="item">
                <span class="item-head">ردیف</span>
                <p class="item-data">{{ item.row }}</p>
              </div>
              <div class="item">
                <span class="item-head">بازه زمانی </span>
                <p class="item-data">{{ item.time }}</p>
              </div>
              <div class="item">
                <span class="item-head">تاریخ بروزرسانی</span>
                <p class="item-data">{{ item.date }}</p>
              </div>
              <div class="item">
                <span class="item-head">شعاع نمایش محصولات</span>
                <p class="item-data">{{ item.distance }}</p>
              </div>
              <div class="item">
                <span class="item-head">هزینه به ازای هر کیلومتر</span>
                <p class="item-data">
                  {{ item.price }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">کف دریافتی هزینه ارسال</span>
                <p class="item-data">
                  {{ item.minPrice }}
                </p>
              </div>
            </div>
          </div>
          <div v-else class="text-center">
            در حال حاضر محدوده موجود نمی‌باشد
          </div>
        </div>
      </div>
      <!-- feedback -->
      <div
          class="tab-pane feedback-tab fade"
          id="feedback"
          role="tabpanel"
          aria-labelledby="feedback-tab"
      >
        <div class="feedbacks">
          <div class="header-feedback pb-3">
            <div class="" style="display: grid; align-items: center">
              <div class="row-grid">
                <Multiselect
                    class="selected-name"
                    v-model="productNameFeedback"
                    :options="productList"
                    placeholder="نام محصول "
                    label="title"
                    track-by="title"
                    :searchable="true"

                />
                <date-picker
                    color="#664ECA"
                    class="datePicker fromDate"
                    placeholder="از تاریخ"
                    v-model="FromDateFeedback"
                    auto-submit
                ></date-picker>
                <date-picker
                    color="#664ECA"
                    class="datePicker toDate"
                    placeholder="تا تاریخ"
                    v-model="toDateFeedback"
                    auto-submit
                ></date-picker>
                <Multiselect
                    v-model="conditionFeedback"
                    :options="this.$store.state.feedbackStatus"
                    placeholder="وضعیت.. "
                    label="title"
                    track-by="value"
                />
              </div>
            </div>
          </div>
          <div class="table-info pt-3" v-if="windowWith > 768">
            <table-lite
                :is-slot-mode="true"
                :columns="columnsFeedback"
                :rows="feedbackList"
                :total="totalRecordCount"
                :sortable="false"
                @do-search="doSearch"
                @is-finished="isLoading = false"
                :is-hide-paging="true"
                :messages="messageFeedback"
            >
              <template v-slot:status="item">
                <div style="padding: 0 5%;">
                  <span class="statusClass">
                    <khoonegi-badge
                        :status="
                        item.value.status === 1
                          ? 6
                          : item.value.status || item.value.status === 2
                          ? 1
                          : item.value.status || item.value.status === 0
                          ? 5
                          : item.value.status
                      "
                        :bgColor="
                        item.value.status === 1
                          ? 6
                          : item.value.status || item.value.status === 2
                          ? 1
                          : item.value.status || item.value.status === 0
                          ? 5
                          : item.value.status
                      "
                    >{{ item.value.statusStr }}</khoonegi-badge
                    >
                  </span>

                </div>
              </template>
              <template v-slot:details="item">
                <button
                    @click="
										$router.push(
											`/feedback/${item.value.id}/${item.value.customerName}`
										)
									"
                >
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
            <Loading :enable-loading="isLoading"/>
          </div>
          <div v-else-if="windowWith <= 768" class="table-info-mobile">
            <div v-if="feedbackList.length">
              <div class="info-item" v-for="(item, i) in feedbackList" :key="i">
                <div>
                  <div class="item">
                    <span class="item-head">ردیف</span>
                    <p class="item-data">{{ item.row }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نام مشتری</span>
                    <p class="item-data">{{ item.customerName }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">تاریخ سفارش</span>
                    <p class="item-data">{{ item.orderDate }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نام میزبان</span>
                    <button class="btn-link">
                      {{ item.sellerName }}
                    </button>
                  </div>
                  <div class="item">
                    <span class="item-head">محصولات خریداری شده</span>
                    <p class="item-data">{{ item.products }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">پسندیده</span>
                    <p class="item-data">{{ item.like }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">نپسندیده</span>
                    <p class="item-data">{{ item.disLike }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">علاقه‌مندی</span>
                    <p class="item-data">{{ item.favorite }}</p>
                  </div>
                  <div class="item">
                    <span class="item-head">اشتراک</span>
                    <p class="item-data">{{ item.share }}</p>
                  </div>

                  <div class="item">
                    <span class="item-head">وضعیت</span>
                    <p class="item-data">
                      <khoonegi-badge
                          :status="
													item.status === 1
														? 6
														: item.status || item.status === 2
														? 1
														: item.status || item.status === 0
														? 5
														: item.status
												"
                          :bgColor="
													item.status === 1
														? 6
														: item.status || item.status === 2
														? 1
														: item.status || item.status === 0
														? 5
														: item.status
												"
                      >{{ item.statusStr }}
                      </khoonegi-badge
                      >
                    </p>
                  </div>
                  <div class="item">
                    <span class="item-head">جزئیات</span>
                    <button
                        @click="
												$router.push(
													`/feedback/${item.id}/${item.customerName}`
												)
											"
                    >
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
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              در حال حاضر بازخورد موجود نمی‌باشد
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--		<Loading-->
    <!--			:class="isLoading ? 'full-page-load' : ''"-->
    <!--			:enable-loading="isLoading"-->
    <!--		/>-->
    <LoadingFull :enable-loading-full="isLoading"/>
    <page-to-top/>
  </div>
  <Dialog v-model:visible="disableSellerModal" class="disable-seller-modal">
    <template #header>
      <div class="header">
        <h3>غیرفعال کردن میزبان</h3>
      </div>
    </template>
    <div class="content">
      <div class="description">
        <h5>پشتیبان عزیز!</h5>
        <p>
          با توجه به غیرفعال شدن میزبان لطفا از موارد پایین اطمینان حاصل فرمایید و سپس
          دکمه غیر فعال کردن را انتخاب کنید
        </p>
      </div>
      <div class="select-item">
        <div class="check">
          <input
              class="check-box"
              type="checkbox"
              id="checkRow1"
              v-model="checkRow1"
              @click="checkRow1 = !checkRow1"
          />
          <label for="checkRow1">میزبان سفارش فعالی ندارد یا تمامی سفارشات برگشت خورده است.</label>
        </div>
        <div class="check">
          <input
              class="check-box"
              type="checkbox"
              id="checkRow2"
              v-model="checkRow2"
              @click="checkRow2 = !checkRow2"
          />
          <label for="checkRow2">میزبان منوی فعالی ندارد یا تمامی محصولات منوی میزبان صفر شده اند.</label>
        </div>
      </div>
      <div class="modal-btn">
        <khoonegiButton
            class="form-button slate create-Tips"
            text="انصراف"
            @click="disableSellerModal = false"
        />
        <khoonegiButton
            class="form-button failed create-Tips"
            text="غیر فعال شدن"
            :loading="isLoading"
            :disabled="!checkRow1 || !checkRow2 ? true : false"
            @click="changeStateSeller"
        />
      </div>
    </div>
  </Dialog>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
import {useToast} from "vue-toastification";
import khoonegiBadge from "@/components/khoonegiBadge.vue";
import khoonegiButton from "@/components/khoonegiButton.vue";
import tableLite from "../components/khoonegiTable";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
import defaultImage from "@/assets/img/default.svg";
import userImage from "@/assets/img/user.svg";
import Dialog from "primevue/dialog";

export default {
  components: {
    LoadingFull,
    pageToTop,
    khoonegiBadge,
    khoonegiButton,
    tableLite,
    Multiselect,
    Dialog
  },
  data() {
    return {
      defaultImage,
      userImage,
      isLoading: false,
      toast: useToast(),
      tabLinks: [
        {
          id: "contract-tab",
          name: "قرارداد",
          target: "#contract",
          controls: "contract",
          isNew: false,
          active: "active",
        },
        {
          id: "profile-tab",
          name: "پروفایل",
          target: "#profile",
          controls: "profile",
          isNewProfile: false,
        },
        {
          id: "product-tab",
          name: "لیست محصولات",
          target: "#product",
          controls: "product",
          isNew: false,
        },
        {
          id: "menu-tab",
          name: "منو",
          target: "#menu",
          controls: "menu",
          isNew: false,
        },
        {
          id: "feedback-tab",
          name: "بازخورد",
          target: "#feedback",
          controls: "feedback",
          isNew: false,
        },
        {
          id: "range-tab",
          name: "محدوده",
          target: "#range",
          controls: "range",
          isNew: false,
        },
      ],
      message: {
        noDataAvailable: "در حال حاضر محصول موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
      // contract data{
      isNewcontract: false,
      name: "",
      brandName: "",
      address: "",
      phoneNumber: "",
      accountNumber: "",
      latitude: "",
      Longitude: "",
      latLong: "",
      nationalCode: "",
      nationalImage: "",
      NewName: false,
      NewBrand: false,
      NewAccountNumber: false,
      NewPhoneNumber: false,
      NewNationalCode: false,
      NewLatLong: false,
      NewAddress: false,
      NewnAtionalImage: false,
      // }end

      // profile data {
      isNewProfile: false,
      coverImage: "",
      NewCoverImage: false,
      profileImage: "",
      NewProfileImage: false,
      biography: "",
      NewBiography: false,
      otherImages: [],
      NewOtherImages: false,
      // } end
      // product list data {
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".2%",
          sortable: false,
        },
        {
          label: "",
          field: "link",
          width: "0%",
          sortable: false,
        },
        {
          label: "نام محصول",
          field: "productName",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "دسته بندی",
          field: "category",
          width: ".6%",
          sortable: false,
        },
        {
          label: "قیمت (ریال)",
          field: "price",
          width: "1%",
          sortable: false,
        },
        {
          label: "تاریخ ایجاد",
          field: "createDate",
          width: "1%",
          sortable: false,
        },

        {
          label: "وضعیت",
          field: "status",
          width: "1%",
          sortable: false,
        },
      ],
      totalRecordCount: 0,
      productList: [],
      condition: 0,
      prodactSellerStatus: this.$store.state.productStatus,
      // }end
      // menu list {
      fromDate: "",
      toDate: "",
      remain: false,
      NotRemain: false,
      prodactSellerMenu: this.$store.state.prodactSellerMenuStore,
      productNameMenu: "",
      productMenuList: [],
      columnsMenu: [
        {
          label: " ردیف",
          field: "row",
          width: ".2%",
          sortable: false,
        },
        {
          label: "نام محصول",
          field: "name",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "تاریخ فروش",
          field: "date",
          width: ".6%",
          sortable: false,
        },
        {
          label: "بازه زمانی",
          field: "time",
          width: "1%",
          sortable: false,
        },
        {
          label: "تعداد کل",
          field: "count",
          width: "1%",
          sortable: false,
        },

        {
          label: "فروش رفته",
          field: "sellCount",
          width: "1%",
          sortable: false,
        },
        {
          label: "باقیمانده",
          field: "remain",
          width: "1%",
          sortable: false,
        },
      ],
      messageMenu: {
        noDataAvailable: "در حال حاضر منو موجود نمی‌باشد",
      },
      // } end
      // delivery list {
      deliveryList: [],
      columnsDelivery: [
        {
          label: " ردیف",
          field: "row",
          width: ".2%",
          sortable: false,
        },
        {
          label: "بازه زمانی",
          field: "time",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "تاریخ بروزرسانی",
          field: "date",
          width: ".6%",
          sortable: false,
        },
        {
          label: "شعاع نمایش محصولات",
          field: "distance",
          width: "1%",
          sortable: false,
        },
        {
          label: "هزینه به ازای هر کیلومتر",
          field: "price",
          width: "1%",
          sortable: false,
        },

        {
          label: "کف دریافتی هزینه ارسال",
          field: "minPrice",
          width: "1%",
          sortable: false,
        },
      ],
      messageDelivery: {
        noDataAvailable: "در حال حاضر محدوده موجود نمی‌باشد",
      },
      // } end
      //  feedback list {
      feedbackList: [],
      columnsFeedback: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام مشتری",
          field: "customerName",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "تاریخ سفارش",
          field: "orderDate",
          width: ".6%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "sellerName",
          width: ".5%",
          sortable: false,
        },
        {
          label: "محصولات خریداری شده",
          field: "products",
          width: "2%",
          sortable: false,
        },
        {
          label: `پسندیده`,
          field: "like",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "نپسندیده",
          field: "disLike",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "علاقه‌مندی",
          field: "favorite",
          width: "0.1%",
          sortable: false,
        },
        {
          label: "اشتراک",
          field: "share",
          width: "0.7%",
          sortable: false,
        },
        {
          label: "وضعیت",
          field: "status",
          width: "0.5%",
          sortable: false,
        },
        {
          label: "جزئیات",
          field: "details",
          width: "0.1%",
          sortable: false,
        },
      ],
      FromDateFeedback: "",
      toDateFeedback: "",
      conditionFeedback: -1,
      productNameFeedback: "",
      sellerNameFeedback: "",
      messageFeedback: {
        noDataAvailable: "در حال حاضر بازخورد موجود نمی‌باشد",
      },

      // } end
      changeStatus: "",
      sellerState: Boolean,
      disableSellerModal: false,
      checkRow2: false,
      checkRow1: false
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    this.isLoading = true;
    try {
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
      this.getSellerContract();
      this.getSellerProfile();
      this.getProductList();
      this.getMenuList();
      this.getDeliveryList();
      this.getFeedbackList();
    } catch (error) {
      this.$store.dispatch("handleError", error);
      this.toast.error("خطا در اتصال!", {
        position: "bottom-center",
        timeout: 3000,
        icon: true,
        rtl: true,
      });
    }
  },
  methods: {
    submitInfo(value) {
      this.isLoading = true;
      const data = {
        SellerId: this.$route.params.id,
        AcceptStatus: value,
      };
      this.$store
          .dispatch("confirmInfoSeller", data)
          .then((respons) => {
            if (respons.data.succeed) {
              this.isLoading = false;
              location.reload();
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
            this.isLoading = false;
            console.log(error);
          });
    },
    // get seller contract function
    getSellerContract() {
      const data = {
        SellerId: this.$route.params.id,
      };
      this.$store
          .dispatch("getSellerContract", data)
          .then((respons) => {
            console.log(respons)
            this.isLoading = false;
              const seller = respons.data;
              this.tabLinks.forEach((item) => {
                if (item.id == "contract-tab") {
                  item.isNew = seller.newContract;
                }
              });
              this.isNewcontract = seller.newContract;
              this.name = seller.contract.name;
              this.brandName = seller.contract.brand;
              this.address = seller.contract.address;
              this.phoneNumber = seller.contract.phoneNumber;
              this.accountNumber = seller.contract.bankAccount;
              this.latitude = seller.contract.latitude;
              this.Longitude = seller.contract.longitude;
              this.latLong = this.latitude + "  |  " + this.Longitude;
              this.nationalCode = seller.contract.nationalCode;
              console.log(this.nationalCode)
              this.nationalImage = seller.contract.nationalMedia;
              // if new changed
              this.NewName = seller.contract.nameEdited;
              this.NewBrand = seller.contract.brandEdited;
              this.NewAccountNumber = seller.contract.bankAccountEdited;
              this.NewPhoneNumber = seller.contract.phoneNumberEdited;
              this.NewNationalCode = seller.contract.nationalCodeEdited;
              this.NewLatLong =
                  seller.contract.longitudeEdited && seller.contract.latitudeEdited;
              this.NewAddress = seller.contract.addressEdited;
              this.NewnAtionalImage = seller.contract.nationalMediaEdited;
              this.sellerState = seller.sellerStatus;


          })
          .catch((error) => {
            this.$store.dispatch("handleError", error);
            this.isLoading = false;
            console.log(error);
          });
    },
    // get seller profile function
    getSellerProfile() {
      const data = {
        SellerId: this.$route.params.id,
      };
      this.$store
          .dispatch("getSellerProfile", data)
          .then((respons) => {
            this.isLoading = false;
                  const sellerProfile = respons.data;
                  this.tabLinks.forEach((item) => {
                    if (item.id == "profile-tab") {
                      item.isNew = sellerProfile.newProfile;
                    }
                  });
                  this.isNewProfile = sellerProfile.newProfile;
                  this.coverImage = sellerProfile.profile.coverMedia;
                  this.profileImage = sellerProfile.profile.profileMedia;
                  this.biography = sellerProfile.profile.description;
                  this.otherImages = sellerProfile.profile.otherMedias;
                  // if new changed
                  this.NewCoverImage = sellerProfile.profile.coverMediaEdited;
                  this.NewProfileImage = sellerProfile.profile.nationalMediaEdited;
                  this.NewBiography = sellerProfile.profile.descriptionEdited;
                  this.otherImages.forEach((item) => {
                    this.NewOtherImages = item.fileEdited;
                  });
          })
          .catch((error) => {
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            console.log(error);
          });
    },
    // submit profile
    submitProfileInfo(value) {
      this.isLoading = true;
      const data = {
        SellerId: this.$route.params.id,
        AcceptStatus: value,
      };
      console.log(data)
      this.$store
          .dispatch("confirmProfileInfoSeller", data)
          .then((respons) => {
            if (respons.data.succeed) {
              this.isLoading = false;
              location.reload();
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
            console.log(error);
          });
    },
    // get product list function
    getProductList() {
      const data = {
        SellerId: this.$route.params.id,
        Status: this.condition | 0,
      };
      this.$store
          .dispatch("getSellerProductList", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.tabLinks.forEach((item) => {
                respons.data.products.forEach((status) => {
                  this.changeStatus = status.status;
                })
                if (item.id == "product-tab") {
                  if (respons.data.newProduct > 0 || this.changeStatus == 1) {
                    item.isNew = true;
                  } else {
                    item.isNew = false;
                  }
                  console.log(item.isNew);
                }
              });
              this.productList = respons.data.products;
              this.productList.forEach((item) => {
                item.price = (item.price * 10)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.title = item.productName;
                item.value = item.productId;
              });
              this.$store.state.prodactSellerMenuStore = respons.data.products;
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
            console.log(error);
          });
    },
    // get menu list filter
    getMenuList() {
      const data = {
        FromDate: this.fromDate,
        ToDate: this.toDate,
        ProductId: this.productNameMenu,
        SellerId: this.$route.params.id,
        Remain: this.remain,
        NotRemain: this.NotRemain,
      };
      console.log(data);
      this.$store
          .dispatch("getSellerMenuList", data)
          .then((respons) => {
            if (respons.data.succeed) {
              this.productMenuList = respons.data.menu;
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
            console.log(error);
          });
    },
    submitRemain() {
      this.remain = !this.remain;
      this.getMenuList();
    },
    submuitNotRemain() {
      this.NotRemain = !this.NotRemain;
      this.getMenuList();
    },
    // get delivery list
    getDeliveryList() {
      const data = {
        SellerId: this.$route.params.id,
      };
      this.$store
          .dispatch("getSellerDeliveryList", data)
          .then((respons) => {
            this.isLoading = false;
                  this.deliveryList = respons.data;
                  this.deliveryList.forEach((item) => {
                    item.price =
                        (item.price * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        " ریال ";
                    item.minPrice =
                        (item.minPrice * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        " ریال ";
                  });
          })
          .catch((error) => {
            this.isLoading = false;
            this.$store.dispatch("handleError", error);
            console.log(error);
          });
    },
    // get feedback list
    getFeedbackList() {
      const data = {
        SellerId: this.$route.params.id,
        ProductId: this.productNameFeedback,
        FromDate: this.FromDateFeedback ? this.FromDateFeedback : "1400/12/01",
        ToDate: this.toDateFeedback,
        AcceptStatus: this.conditionFeedback,
      };
      this.$store
          .dispatch("feedbackList", data)
          .then((respons) => {
            console.log(respons);
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isSearchLoading = false;
              this.feedbackList = respons.data.comments;
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
    changeStateSeller() {
      this.isLoading = true;
      const data = {
        SellerId: this.$route.params.id,
        Status: this.sellerState ? 2 : 1,
      };
      this.$store
          .dispatch("deactivateSeller", data)
          .then((respons) => {
            this.isLoading = false;
                if(respons.data.succeed){
                  this.getSellerContract()
                  this.disableSellerModal = false;
                  this.checkRow1 = false;
                  this.checkRow2 = false;
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
    checkStateSeller(){
      console.log(this.sellerState)
      if(this.sellerState == true){
        this.disableSellerModal = true;
      } else {
        this.changeStateSeller()
      }
    }
  },
  watch: {
    condition: function () {
      this.getProductList();
    },
    productNameMenu: function () {
      this.getMenuList();
    },
    fromDate: function () {
      this.getMenuList();
    },
    toDate: function () {
      this.getMenuList();
    },
    conditionFeedback: function () {
      this.getFeedbackList();
    },
    productList: function () {
      this.getFeedbackList();
    },
    toDateFeedback: function () {
      this.getFeedbackList();
    },
    fromDateFeedback: function () {
      this.getFeedbackList();
    },
  },
};
</script>
<style lang="scss">
label {
  font-weight: 600 !important;
}

.sellerId {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;

  .disable-seller {
    position: absolute;
    left: 23px;
    top: 15px;
    width: 12rem;
    margin: 0;
    font-size: 13px;
    padding: 5px 0;
    @media (max-width: 768px) {
      margin-top: 0 !important;
      position: unset;
      margin-bottom: 2rem;
      width: 100%;
    }
  }

  .global-input:disabled {
    opacity: 1;
  }

  .bage-tab {
    background: #ffa460;
    border-radius: 3px;
    color: #fff;
    font-size: 11px;
    padding: 2px;
  }

  .nav {
    border-bottom: 0.5px solid #bfbfbf;
    padding: 0;

    .nav-item {
      margin-left: 5rem;
    }

    @media (max-width: 768px) {
      flex-wrap: nowrap;
      overflow-x: scroll;
    }
  }

  .nav::-webkit-scrollbar {
    display: none;
  }

  .nav-link {
    color: #b9b9b9 !important;
    margin: 0;
    padding: 0.5rem 0 !important;
    align-items: center;
    gap: 5px;

    &:hover {
      color: #664eca !important;
    }

    display: flex;
    white-space: nowrap;
  }

  .nav-link.active {
    font-weight: bold;
    border-radius: 0 !important;
    color: #664eca !important;
    border-bottom: 1px solid #a192de;
    padding: 0.5rem 0;
  }

  .tab-content {
    padding: 20px 0;
    @media (max-width: 768px) {
      padding: 0;
    }
  }

  #contract {
    padding: 54px 0;
    @media (max-width: 768px) {
      padding: 30px 0;
    }
  }

  .contract-item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 8%;
    row-gap: 2rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .nationalImage {
      padding: 30px 22px;
      background: #ffffff;
      border: 1px solid rgba(159, 159, 181, 0.5);
      border-radius: 7px;

      img {
        height: 300px;
        max-width: 100%;
        max-height: 15rem;
        border-radius: 10px;
      }
    }
  }

  .profile-item {
    display: grid;
    grid-template-columns: 31% 20% 29.3%;
    column-gap: 10%;
    row-gap: 2rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    img {
      // height: 300px;
      max-width: 100%;
      //max-height: 14.4rem !important;
      height: 100%;
      border-radius: 7px;
      border: 1px solid rgba(159, 159, 181, 0.5);
      //object-fit: contain;
      @media (max-width: 768px) {
        width: 100% !important;
        max-width: 100%;
      }
    }

    .biography {
      max-height: 14.4rem;
    }

    .otherImage {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(9, 33.6%);
      gap: 15px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }

      img {
        // border: 1px solid transparent;
        height: 150px;
        width: 188px !important;
      }
    }

    .coverImage {
      height: 226px;

      img {
        // width: 71% !important;
        //object-fit: fill;

        @media (max-width: 768px) {
          width: 100% !important;
          max-width: 100%;
          object-fit: contain;
        }
      }
    }

    .nationalImage {
      border: 1px solid transparent;
      border-radius: 7px;
    }
  }

  .defaultImage {
    background: #f0f0f0;
    border-radius: 10px;

    img {
      padding: 4rem;
      max-height: 18.8rem;
    }
  }

  .confirmation-info {
    text-align: left;
    @media (max-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    button {
      width: auto;
      @media (max-width: 768px) {
        padding: 0.5rem 1rem;
      }
    }
  }

  .selected-status {
    position: absolute;
    left: 23px;
    top: 15px;
    width: 14rem;
    @media (max-width: 768px) {
      position: unset;
      width: 100%;
    }
  }

  .menu-list {
    .menu-filter {
      display: grid;
      grid-template-columns: 1fr 1fr;
      margin-bottom: 42px;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .selected {
        display: flex;
        gap: 12px;
        @media (max-width: 768px) {
          display: block;
        }

        .multiselect {
          width: 23%;
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

      .check-filter {
        text-align: left;

        label {
          font-weight: 600;
          font-size: 12px;
          color: #664eca;
          cursor: pointer;
          @media (max-width: 768px) {
            display: contents;
          }
        }

        .remain {
          margin-left: 28px;
        }

        @media (max-width: 768px) {
          margin-top: 15px;
          display: flex;
        }
      }

      .datePicker {
        @media (max-width: 768px) {
          margin-bottom: 15px;
          display: block;
        }
      }
    }
  }

  .feedback-tab {
    .header-feedback {
      border: none;

      .row-grid {
        display: grid;
        grid-template-columns: 20% 10% 10% 18%;
        grid-column-gap: 10px;
        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr;
        }

        .multiselect {
          grid-area: unset;
        }
      }
    }
  }
}

.disable-seller-modal {
  height: 23rem !important;
  @media (max-width: 768px){
    height: 26rem !important;
  }
  .description {
    text-align: center;
  }

  .content {
    margin: 3% 7% 0 7% !important;
    .select-item {
      margin-bottom: 2.3rem !important;
      .check-box {
        margin-left: 8px !important;
      }
    }
  }

  .modal-btn {
    display: flex;
    column-gap: 20px;
    width: 23rem;
    float: left;
    margin: 0;
    @media (max-width: 768px){
      width: 100%;
    }
    button {
      margin: 0;
    }
  }
}
</style>
