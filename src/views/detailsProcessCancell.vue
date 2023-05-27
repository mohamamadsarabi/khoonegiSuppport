<template>
  <div
      class="nav-wrapper cancellFactorِDetails position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
<!--    <div class="row" v-if="userState == 0">-->
<!--      <div class="col-lg-6">-->
<!--        <div class="header">-->
<!--          <h6>شماره سفارش</h6>-->
<!--          <input class="global-input" type="number" v-model="orderId">-->
<!--          <khoonegiButton-->
<!--              class="form-button mt-0 slate-blur"-->
<!--              text="جستجو"-->
<!--              :icon="true"-->
<!--              @click="getOrder"-->
<!--          />-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="col-lg-6"></div>-->
<!--    </div>-->
    <div v-if="windowWidth > 768">
      <div class="content-factor">
        <h5>فرآیند برگشت سفارش (شماره: {{ orderList.orderNo }} - {{ orderList.orderStatusDescription }})</h5>
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
            <li>{{ orderList.customerPhoneNumber }}</li>
            <li>{{ orderList.sellerName }}</li>
            <li>{{ orderList.createDate }}</li>
            <li>{{ orderList.createDateTime }}</li>
            <li>{{ orderList.orderDate }}</li>
            <li>{{ orderList.deliveryTime }}</li>
            <li>{{(orderList.distributionPrice * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
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
              <li>{{item.price}}
              </li>
              <li>{{item.orderCount}}
              </li>
              <li>
                <input type="number" min="0" class="order-counter" v-model="item.returningOrderCount"
                       @input="changeOrderCount(orderList , i)">
              </li>
              <li>{{

                  item.totalPrice
                }}
              </li>
            </ul>
            <div class="table-footer">
              <div>
                <div class="table-text">
                  <p>ایجاد کننده: {{ textSupprtArray.supportName }} ({{ textSupprtArray.createDate }})</p>
                  <span>شرح لغو:</span>
                  <span v-if="textSupprtArray.description" style="margin-right: 0.5rem; color: #b7b7b7;">{{textSupprtArray.description}}</span>
<!--                  <input v-if="userState == 0" type="text" class="global-input" :disabled="userState == 1 || userState == 2 ? true : false" v-model="descriptionCancell">-->
                </div>
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
                  <span>{{orderList.totalPayment}}</span>
                </div>
              </div>
              <div class="grid-cancell mt-2">
                <div class="text-area">
                  <span style="margin-bottom: 10px;display: inline-block;">شرح لغو(مدیریت):</span>
                  <span v-if="textManagerArray" style="margin-right: 0.5rem; color: #b7b7b7;">{{textManagerArray.description}}</span>
                  <div v-if="cancellStatus == 0">
                    <textarea v-if="userState == 1" maxlength="150" class="global-input" v-model="textManager" :disabled="userState == 1 ? false : true"></textarea>
                  </div>
                </div>
                <div class="text-area">
                  <span style="margin-bottom: 10px; display: inline-block;">شرح لغو(واحد مالی):</span>
                  <span v-if="finanialTextArray" style="margin-right: 0.5rem; color: #b7b7b7;">{{finanialTextArray.description}}</span>
                  <div v-if="cancellStatus == 1">
                    <textarea v-if="userState == 2" maxlength="150" class="global-input" v-model="finanialText" :disabled="userState == 2 ? false : true"></textarea>
                  </div>
                </div>
              </div>
            </div>
           <div v-if="(userState == 1 && cancellStatus == 0) || (userState == 2 && cancellStatus == 1)">
             <khoonegiButton
                 class="form-button mt-0 slate referall"
                 :text="userState == 0 ? 'ارجاع به مدیریت' : userState == 1 ? 'ارجاع به مالی' : 'تایید'"
                 :loading="isLoadingButton"
                 :disabled="CancelCountLocal == false ? true : userState == 0 ? isDisable : false"
                 @click="referralTo()"
             />
             <khoonegiButton
                 v-if="userState == 1 || userState == 2"
                 class="form-button failed referall"
                 text="رد کردن"
                 :disabled="userState == 0 ? isDisable : false"
                 :loading="isLoadingReject"
                 @click="rejectcancell()"
             />
           </div>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="windowWidth <= 768" class="table-info-mobile">
      <div v-if="orderAllow">
        <h5>فرآیند برگشت سفارش (شماره: {{ orderList.orderNo }} - {{ orderList.orderStatusDescription }})</h5>
        <div class="info-item">
          <div class="item">
            <span class="item-head">نام مشتری</span>
            <p class="item-data">{{ orderList.customerName }}</p>
          </div>
          <div class="item">
            <span class="item-head">شماره تماس </span>
            <p class="item-data">{{ orderList.customerPhoneNumber }}</p>
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
              {{ (orderList.distributionPrice * 10).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
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
                  {{ item.price }}
                </p>
              </div>
              <div class="item">
                <span class="item-head">تعداد</span>
                <p class="item-data">
                  <input type="number" min="0" class="order-counter" v-model="item.returningOrderCount"
                         @input="changeOrderCount(orderList)">
                </p>
              </div>
              <div class="item">
                <span class="item-head">تعداد برگشتی</span>
                <p class="item-data">
                  <input type="number" min="0" class="order-counter" v-model="item.returningOrderCount">
                </p>
              </div>
              <div class="item">
                <span class="item-head">مبلغ سفارش</span>
                <p class="item-data">
                  {{ item.totalPrice }}
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
              {{ orderList.totalPayment }}
            </p>
          </div>
        </div>

      </div>
      <p class="message-not-result" v-else>
        جهت مشاهده سفارش لطفا شماره سفارش را وارد نمایید
      </p>
      <div class="table-footer">
        <div>
          <div class="table-text">
            <p>ایجاد کننده: {{ textSupprtArray.supportName }} ({{ textSupprtArray.createDate }})</p>
            <span>شرح لغو:</span>
            <span v-if="textSupprtArray.description" style="margin-right: 0.5rem; color: #b7b7b7;">{{textSupprtArray.description}}</span>
            <!--                  <input v-if="userState == 0" type="text" class="global-input" :disabled="userState == 1 || userState == 2 ? true : false" v-model="descriptionCancell">-->
          </div>
        </div>
        <div class="grid-cancell mt-2">
          <div class="text-area">
            <span style="margin-bottom: 10px;display: inline-block;">شرح لغو(مدیریت):</span>
            <span v-if="textManagerArray" style="margin-right: 0.5rem; color: #b7b7b7;">{{textManagerArray.description}}</span>
            <div v-if="cancellStatus == 0">
              <textarea v-if="userState == 1" maxlength="150" class="global-input" v-model="textManager" :disabled="userState == 1 ? false : true"></textarea>
            </div>
          </div>
          <div class="text-area">
            <span style="margin-bottom: 10px; display: inline-block;">شرح لغو(واحد مالی):</span>
            <span v-if="finanialTextArray" style="margin-right: 0.5rem; color: #b7b7b7;">{{finanialTextArray.description}}</span>
            <div v-if="cancellStatus == 1">
              <textarea v-if="userState == 2" maxlength="150" class="global-input" v-model="finanialText" :disabled="userState == 2 ? false : true"></textarea>
            </div>
          </div>
        </div>
      </div>
      <div class="box-btn-response" v-if="(userState == 1 && cancellStatus == 0) || (userState == 2 && cancellStatus == 1)">
        <khoonegiButton
            class="form-button mt-0 slate referall"
            :text="userState == 0 ? 'ارجاع به مدیریت' : userState == 1 ? 'ارجاع به مالی' : 'تایید'"
            :loading="isLoadingButton"
            :disabled="userState == 0 ? isDisable : false"
            @click="referralTo()"
        />
        <khoonegiButton
            v-if="userState == 1 || userState == 2"
            class="form-button failed referall"
            text="رد کردن"
            :loading="isLoadingButton"
            @click="rejectcancell()"
        />
      </div>
      <div style="clear: both"></div>
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
      userState: Number(this.$store.state.typeUser),
      orderStatus: Number,
      textManager: "",
      description: [],
      finanialText: "",
      textManagerArray: {},
      textSupprtArray: {},
      finanialTextArray: {},
      cancellStatus: Number(this.$route.params.status),
      CancelCountLocal: true,
      isLoadingReject: false
    }
  },
  mounted() {
    this.getOrder();
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  computed:{},
  methods: {
    changeOrderCount(value , index) {
      if (value.items[index].returningOrderCount > 0) {
        this.CancelCountLocal = true;
      } else {
        this.CancelCountLocal = false;
      }
      value.items.forEach((item)=>{
        console.log(item)
        if(item.returningOrderCount > item.orderCount){
          item.returningOrderCount = item.orderCount;
        }
      });
      this.$store.state.numberReturnList = value.items;
    },
    getOrder() {
      this.isLoading = true;
      const data = {
        ProcessId: this.$route.params.id,
      };
      this.$store
          .dispatch("CancelOrderDetails", data)
          .then((respons) => {
            this.isLoading = false;
            if (respons.data.succeed) {
              this.isLoading = false;
              this.orderAllow = true;
              this.orderList = respons.data.processDetail;
              this.textSupprtArray = respons.data.processDetail.description[0];
              this.textManagerArray = respons.data.processDetail.description[1];
              this.finanialTextArray = respons.data.processDetail.description[2];
              console.log(this.description)
              this.orderList.totalPayment = (this.orderList.totalPayment * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderStatus = this.orderList.status;
              this.orderList.khooneghiDiscountPrice = (this.orderList.khooneghiDiscountPrice * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderList.totalSellerDiscount = (this.orderList.totalSellerDiscount * 10).toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              this.orderList.items.forEach((item, i) => {
                console.log(item)
                item.row = i;
                item.row++;
                item.totalPrice = (item.totalPrice * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                item.price = (item.price * 10).toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              })
              this.$store.state.numberReturnList = this.orderList.items;

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
    referralTo() {
      console.log(this.$store.state.numberReturnList)
      if (this.descriptionCancell || this.finanialText || this.textManager) {
        this.isLoadingButton = true;
        const data = {
          ProcessId: this.$route.params.id,
          IsReject: false,
          Status: this.userState == 0 || this.userState == 1 ? this.userState : this.userState == 2 ? 4 : 1 ,
          Role: this.$store.state.typeUser,
          Description: this.userState == 0 ? this.descriptionCancell : this.userState == 1 ? this.textManager : this.userState == 2 ? this.finanialText : this.descriptionCancell,
          CancelOrder: {
            orderId: this.orderList.orderId,
            SellerId: this.orderList.sellerId ? this.orderList.sellerId : "0",
            Description: this.descriptionCancell,
            CancelItems: this.$store.state.numberReturnList
          }
        };
        console.log(data)
        this.$store
            .dispatch("referallCancell", data)
            .then((respons) => {
              this.isLoadingButton = false;
              this.isLoading = false;
              if (respons.data.succeed) {
                this.isDisable = true;
                this.$router.push("/cancellOrderList")
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
      if (this.descriptionCancell || this.finanialText || this.textManager) {
        this.isLoadingReject = true;
        this.isDisable = false;
        const data = {
          ProcessId: this.$route.params.id,
          IsReject: true,
          Status: this.userState == 1 ? 2 : this.userState == 2 ? 3 : 1 ,
          Role: this.$store.state.typeUser,
          Description: this.userState == 0 ? this.descriptionCancell : this.userState == 1 ? this.textManager : this.userState == 2 ? this.finanialText : this.descriptionCancell,
          CancelOrder: {
            orderId: this.orderList.orderId,
            SellerId: this.orderList.sellerId ? this.orderList.sellerId : "0",
            Description: this.descriptionCancell,
            CancelItems: this.$store.state.numberReturnList
          }
        };
        console.log(data)
        this.$store
            .dispatch("referallCancell", data)
            .then((respons) => {
              this.isLoadingReject = false;
              this.isLoading = false;
              if (respons.data.succeed) {
                this.isDisable = true;
                this.$router.push("/cancellOrderList")
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
.box-btn-response {
  @media (max-width: 768px){
    margin-top: 3rem;
  }
}
.cancellFactorِDetails {
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
        margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(169, 153, 141, 0.4);
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
    @media (max-width: 768px){
      .table-footer {
        margin-top: 2rem;
        border-top: 1px solid #ddd;
        padding-top: 2rem;
        p {
          line-height: normal !important;
          margin-bottom: 0.5rem !important;
        }
        .table-text , .grid-cancell {
          border: 1px solid #CDCDCD;
          border-radius: 10px;
          padding: 10px 15px;
        }
        .text-area {
          margin-bottom: 10px;
        }
      }
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
    @media (max-width: 768px){
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
        .slate-not , .failed {
          margin-left: 1rem;
        }
        .referall {
          width: 13rem;
          float: left;
          margin-top: 4rem !important;
          @media (max-width: 768px){
            margin-top: 3rem;
          }
        }

        .grid-table-order {
          text-align: center;
          padding: 15px 0 !important;
          display: grid;
          grid-template-columns: 1fr 30% 1fr 1fr 1fr 1fr;
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
            border: 0.5px solid #CDCDCD;
            border-radius: 10px;
            padding: 20px 25px;
            @media (max-width: 768px){
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
