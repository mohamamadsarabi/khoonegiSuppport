<template>
  <div
      class="nav-wrapper cancellFactor position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="row" v-if="userState == 0">
      <div class="col-lg-6">
        <div class="header">
          <h6>شماره سفارش</h6>
          <input class="global-input" type="number" v-model="orderId">
          <khoonegiButton
              class="form-button mt-0 slate-blur"
              text="جستجو"
              :icon="true"
              @click="getOrder"
          />
        </div>
      </div>
      <div class="col-lg-6"></div>
    </div>
    <div v-if="windowWidth > 768">
      <div class="content-factor" v-if="orderAllow">
        <h5>فرآیند برگشت سفارش (شماره: {{ orderList.orderNo }} - {{ orderList.statusDescription }})</h5>
        <div class="table-frame">
          <ul class="t-head grid-table">
            <li>نام مشتری</li>
            <li>شماره تماس</li>
            <li>نام میزبان</li>
            <li>تاریخ ثبت</li>
            <li>زمان ثبت</li>
            <li>تاریخ دریافت</li>
            <li>زمان دریافت</li>
            <li>هزینه ارسال</li>
          </ul>
          <ul class="t-body grid-table">
            <li>{{ orderList.customerName }}</li>
            <li>{{ orderList.customerPhone }}</li>
            <li>{{ orderList.sellerName }}</li>
            <li>{{ orderList.createDate }}</li>
            <li>{{ orderList.createDateTime }}</li>
            <li>{{ orderList.orderDate }}</li>
            <li>{{ orderList.deliveryTime }}</li>
            <li>{{
                orderList.distributionPrice.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </li>
          </ul>
          <div class="order-list">
            <ul class="t-headOrder grid-table-order">
              <li>ردیف</li>
              <li>نام محصول</li>
              <li>مبلغ واحد</li>
              <li>تعداد</li>
              <li style="color: red">تعداد برگشتی</li>
              <li>مبلغ سفارش</li>
            </ul>
            <ul class="t-bodyOrder grid-table-order" v-for="(item , i) in orderList.items" :key="i">
              <li>{{ item.row }}</li>
              <li>{{ item.productName }}</li>
              <li>{{
                  item.price.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </li>
              <li>{{ item.orderCount }}</li>
              <li>
                <input type="number" min="0" :max="item.orderCount" :disabled="userState == 0 ? false : true"
                       class="order-counter" v-model="item.returningOrderCount"
                       @input="changeOrderCount(orderList , i)">
              </li>
              <li>{{
                  item.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </li>
            </ul>
            <div class="table-footer">
              <div class="table-text">
                <p>ایجاد کننده: {{ this.$store.state.userName }}</p>
                <span>شرح لغو:</span>
                <input v-if="userState == 0" type="text" class="global-input" maxlength="150"
                       :disabled="userState == 1 || userState == 2 ? true : false" v-model="descriptionCancell">
              </div>
              <div class="total-prices">
                <div class="item-price">
                  <h6>تخفیف خونگی</h6>
                  <span style="color: red">{{ orderList.khooneghiDiscountPrice }}</span>
                </div>
                <div class="item-price">
                  <h6>تخفیف میزبان</h6>
                  <span style="color: red">{{ orderList.totalSellerDiscount }}</span>
                </div>
                <div class="item-price">
                  <h6>مبلغ کل</h6>
                  <span>{{
                      orderList.totalPayment.toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}</span>
                </div>
              </div>
              <div :class="userState == 2 ? 'description-cancell grid-cancell mt-4' : 'description-cancell mt-4'">
                <textarea v-if="userState == 1 || userState == 2" class="global-input" v-model="textManager"
                          :disabled="userState == 1 ? false : true" placeholder="شرح لغو(مدیریت):"></textarea>
                <textarea v-if="userState == 2" class="global-input" :disabled="userState == 2 ? false : true"
                          placeholder="شرح لغو(واحد مالی):"></textarea>
              </div>
            </div>
            <khoonegiButton
                class="form-button mt-0 slate referall"
                :text="userState == 0 ? 'ارجاع به مدیریت' : userState == 1 ? 'ارجاع به مالی' : 'تایید'"
                :loading="isLoadingButton"
                :disabled="CancelCountLocal == false ? true : userState == 0 ? isDisable : false"
                @click="referralTo()"
            />
            <!--            <khoonegiButton-->
            <!--                v-if="userState == 1 || userState == 2"-->
            <!--                class="form-button failed referall"-->
            <!--                text="رد کردن"-->
            <!--                :loading="isLoadingButton"-->
            <!--                @click="rejectcancell()"-->
            <!--            />-->
            <!--            <khoonegiButton-->
            <!--                v-if="userState == 0"-->
            <!--                class="form-button slate-not referall"-->
            <!--                text="محاسبه مبلغ"-->
            <!--                :loading="isLoadingButton"-->
            <!--                :disabled="isDisable"-->
            <!--                @click="getCalculateOrderChanges()"-->
            <!--            />-->
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
      <p class="message-not-result" v-else>
        جهت مشاهده سفارش لطفا شماره سفارش را وارد نمایید
      </p>
    </div>
    <div v-else-if="windowWidth <= 768" class="table-info-mobile">
      <div v-if="orderAllow">
        <h5>فرآیند برگشت سفارش (شماره: {{ orderList.orderNo }} - {{ orderList.statusDescription }})</h5>
        <div class="info-item">
          <div class="item">
            <span class="item-head">نام مشتری</span>
            <p class="item-data">{{ orderList.customerName }}</p>
          </div>
          <div class="item">
            <span class="item-head">شماره تماس </span>
            <p class="item-data">{{ orderList.customerPhone }}</p>
          </div>
          <div class="item">
            <span class="item-head">نام میزبان</span>
            <p class="item-data">{{ orderList.sellerName }}</p>
          </div>

          <div class="item">
            <span class="item-head">تاریخ ثبت</span>
            <p class="item-data">
              {{ orderList.createDate }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">زمان ثبت</span>
            <p class="item-data">{{ orderList.createDateTime }}</p>
          </div>
          <div class="item">
            <span class="item-head">تاریخ دریافت</span>
            <p class="item-data">
              {{ orderList.orderDate }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">زمان دریافت</span>
            <p class="item-data">
              {{ orderList.deliveryTime }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">هزینه ارسال</span>
            <p class="item-data">
              {{
                orderList.distributionPrice.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </p>
          </div>
          <div class="list-order">
            <div v-for="item in orderList.items" :key="item" class="item-row">
              <div class="item">
                <span class="item-head">ردیف</span>
                <p class="item-data">
                  {{ item.row }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">نام محصول</span>
                <p class="item-data">
                  {{ item.productName }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">مبلغ واحد</span>
                <p class="item-data">
                  {{
                    item.price.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">تعداد</span>
                <p class="item-data">
                  {{ item.orderCount }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">تعداد برگشتی</span>
                <p class="item-data">
                  <input type="number" min="0" :max="item.orderCount" class="order-counter" v-model="item.returningOrderCount"
                         @input="changeOrderCount(orderList)">
                </p>
              </div>
              <div class="item">
                <span class="item-head">مبلغ سفارش</span>
                <p class="item-data">
                  {{
                    item.totalPrice.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </p>
              </div>

            </div>
          </div>
          <div class="item">
            <span class="item-head">تخفیف میزبان</span>
            <p class="item-data" style="color: red">
              {{ orderList.totaldiscount }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">تخفیف خونگی</span>
            <p class="item-data" style="color: red">
              {{ orderList.khooneghiDiscountPrice }}
            </p>
          </div>
          <div class="item">
            <span class="item-head">مبلغ کل</span>
            <p class="item-data">
              {{
                orderList.totalPayment.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </p>
          </div>
        </div>
      </div>
      <p class="message-not-result" v-else>
        جهت مشاهده سفارش لطفا شماره سفارش را وارد نمایید
      </p>
      <khoonegiButton
          class="form-button mt-0 slate slate-blur referall"
          text="ارجاع به مدیریت"
          :loading="isLoadingButton"
          :disabled="isDisable"
          @click="referralTo()"
      />
    </div>

  </div>
  <LoadingFull :enable-loading-full="isLoading"/>
</template>

<script>
import khoonegiButton from "../components/khoonegiButton.vue";
import LoadingFull from "@/components/LoadingCircle";
import {useToast} from "vue-toastification";

export default {
  name: "canellingFactor",
  components: {
    khoonegiButton,
    LoadingFull

  },
  data() {
    return {
      windowWidth: window.innerWidth,
      orderId: "",
      isLoading: false,
      toast: useToast(),
      orderList: [],
      orderAllow: false,
      currentDate: "",
      descriptionCancell: "",
      isLoadingButton: false,
      isDisable: false,
      userName: this.$store.state.userName,
      userState: this.$store.state.typeUser,
      orderStatus: Number,
      textManager: "",
      CancelCountLocal: false
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  methods: {
    checkOrderCount() {
      console.log(this.$store.state.numberReturnList)
      const order = this.$store.state.numberReturnList.filter((item) => {
        return item.returningOrderCount > 0;
      });
      return order;
    },
    preventType(e) {
      console.log(e)
      e.preventDefault()
    },
    getCalculateOrderChanges() {
      this.isLoading = true;
      const data = {
        orderId: this.orderList.orderId,
        SellerId: this.$store.state.numberReturnList[0].sellerId ? this.$store.state.numberReturnList[0].sellerId : "0",
        Description: this.descriptionCancell,
        CancelItems: this.$store.state.numberReturnList
      };
      this.$store
          .dispatch("calculateOrderChanges", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              console.log(this.$store.state.numberReturnList)
              this.orderAllow = true;
              this.orderList = respons.data.orderDetail;
              this.orderList.khooneghiDiscountPrice = (this.orderList.khooneghiDiscountPrice * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderList.totalSellerDiscount = (this.orderList.totalSellerDiscount * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderList.items.forEach((item, i) => {
                item.row = i;
                item.row++;
                item.returningOrderCount = 0;
              })
              console.log(this.orderList)
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();
              today = yyyy + '/' + mm + '/' + dd;
              this.currentDate = today;
            } else {
              this.orderAllow = false;
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
    getOrder() {
      this.isLoading = true;
      const data = {
        orderId: this.orderId,
      };
      this.$store
          .dispatch("orderDetailsById", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.orderAllow = true;
              this.orderList = respons.data.orderDetail;
              this.orderStatus = this.orderList.status;
              this.orderList.khooneghiDiscountPrice = (this.orderList.khooneghiDiscountPrice * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderList.totalSellerDiscount = (this.orderList.totalSellerDiscount * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderList.items.forEach((item, i) => {
                item.row = i;
                item.row++;
                item.returningOrderCount = 0;
              })
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
              var yyyy = today.getFullYear();
              today = yyyy + '/' + mm + '/' + dd;
              this.currentDate = today;
            } else {
              this.orderAllow = false;
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
    changeOrderCount(value) {
      const count = value.items.filter(item => item.returningOrderCount > 0);
      if (count.length) {
        this.CancelCountLocal = true;
      } else {
        this.CancelCountLocal = false;
      }
      value.items.map((item) => {
        if (item.returningOrderCount > item.orderCount) {
          item.returningOrderCount = item.orderCount;
        }
      });
      this.$store.state.numberReturnList = value.items;
    },
    referralTo() {
      if (this.descriptionCancell) {
        this.isLoadingButton = true;
        const data = {
          ProcessId: "",
          IsReject: false,
          Status: this.userState == 0 || this.userState == 1 ? this.userState : this.userState == 3 ? 4 : 1,
          Role: this.$store.state.typeUser,
          Description: this.descriptionCancell,
          CancelOrder: {
            orderId: this.orderList.orderId,
            SellerId: this.$store.state.numberReturnList[0].sellerId ? this.$store.state.numberReturnList[0].sellerId : "0",
            Description: this.descriptionCancell,
            CancelItems: this.checkOrderCount()
          }
        };
        console.log(data)
        this.$store
            .dispatch("referallCancell", data)
            .then((respons) => {
              this.isLoadingButton = false;
              this.isLoading = false;
              if (respons.data.succeed) {
                this.$router.push("/cancellOrderList")
                this.isDisable = true;
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
                console.log(respons)
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
              this.isLoadingButton = false;
              this.isLoading = false;
              this.$store.dispatch("handleError", error);
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              console.log(error);
            })
      } else {
        this.toast.error("لطفا شرح لغو را وارد نمایید", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }
    },
    rejectcancell() {
      if (this.descriptionCancell) {
        this.isLoadingButton = true;
        const data = {
          ProcessId: "",
          IsReject: true,
          Status: this.userState == 1 ? 2 : this.userState == 2 ? 3 : 3,
          Role: this.$store.state.typeUser,
          Description: this.descriptionCancell,
          CancelOrder: {
            orderId: this.orderList.orderId,
            SellerId: this.$store.state.numberReturnList[0].sellerId ? this.$store.state.numberReturnList[0].sellerId : "0",
            Description: this.descriptionCancell,
            CancelItems: this.$store.state.numberReturnList
          }
        };
        console.log(data)
        this.$store
            .dispatch("referallManagement", data)
            .then((respons) => {
              this.isLoadingButton = false;
              this.isLoading = false;
              if (respons.data.succeed) {
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
                console.log(respons)
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
              this.isLoadingButton = false;
              this.isLoading = false;
              this.$store.dispatch("handleError", error);
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              console.log(error);
            })
      } else {
        this.toast.error("لطفا شرح لغو را وارد نمایید", {
          position: "bottom-center",
          timeout: 3000,
          icon: true,
          rtl: true,
        });
      }
    }
  }
}
</script>

<style lang="scss">
.cancellFactor {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;

  .table-info-mobile {
    .list-order {
      padding: 25px;
      border-radius: 20px;
      margin-bottom: 1rem;
      border: 1px solid rgb(255, 164, 96) !important;

      .item-row {
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(169, 153, 141, 0.4);

        .order-counter {
          width: 100%;
        }
      }
    }

    h5 {
      font-size: 18px;
      text-align: center;
      margin: 2rem 0;
      padding-bottom: 1rem;
      border-bottom: 1px solid #dfdfdf;
    }
  }

  .message-not-result {
    line-height: 40px !important;
    text-align: center;
    margin-top: 5rem;
  }

  .row {
    padding-bottom: 23px;
    border-bottom: 1px solid #E9E9E9;
  }

  .header {
    display: grid;
    grid-template-columns: 7rem 15rem 10rem;
    align-items: center;
    column-gap: 1rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      row-gap: 1rem;
    }

    h6 {
      color: #664eca;
      margin: 0;
    }

    button, input {
      padding: 4px 20px;
    }
  }

  .content-factor {
    h5 {
      text-align: center;
      margin: 2rem 0;
    }

    .table-frame {
      margin: 2rem 0;
      width: 100%;
      border: 1px solid #E7E7E7;
      border-radius: 10px;

      .t-head {
        background-color: #F7F7F7;

        li {
          display: inline-block;
          color: #664ECA;
        }
      }

      .t-body {
        font-size: 14px;
        border-bottom: 1px solid #D8D6D6;
      }

      .grid-table {
        text-align: center;
        padding: 15px 0 !important;
        display: grid;
        grid-template-columns: 28% 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      }

      .order-list {
        margin: 2rem 8%;

        .slate-not, .failed {
          margin-left: 1rem;
        }

        .referall {
          width: 13rem;
          float: left;
          margin-top: 4rem !important;
          @media (max-width: 768px) {
            margin-top: 3rem;
          }
        }

        .grid-table-order {
          text-align: center;
          padding: 15px 0 !important;
          display: grid;
          grid-template-columns: 1fr 30% 1fr 1fr 23% 1fr;
        }

        .t-headOrder {
          li {
            color: #664ECA;
          }
        }

        .t-bodyOrder {
          border-bottom: 1px solid #E9E9E9;

          .order-counter {
            width: 28%;
          }
        }

        .table-footer {
          display: grid;
          grid-template-columns: 70% 1fr;
          align-items: center;
          margin-top: 1rem;
          column-gap: 2rem;

          .grid-cancell {
            display: grid;
            row-gap: 10px;
            grid-template-columns: 1fr 1fr;
            column-gap: 1rem;
            @media (max-width: 768px) {
              grid-template-columns: 1fr;
            }
          }

          .table-text {
            border: 1px solid #CDCDCD;
            border-radius: 10px;
            padding: 10px 15px;

            p {
              padding-bottom: 0.5rem;
              margin-bottom: 1rem !important;
              border-bottom: 1px solid #d8d6d6;
              line-height: 30px !important;
              font-size: 13px;
            }

            span {
              font-size: 13px;
              margin-bottom: 10px;
              display: inline-block;
            }
          }

          .total-prices {
            .item-price {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #d8d6d6;
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
  }
}
</style>
