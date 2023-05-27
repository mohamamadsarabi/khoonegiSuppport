<template>
  <div
      class="nav-wrapper finalOrder orderList position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"
  >
    <div class="header">
      <div class="item">
        <h6>نام مشتری: </h6>
        <p>{{customerName}}</p>
      </div>
      <div class="item">
        <h6>هزینه ارسال: </h6>
        <p>{{distribution}}</p>
      </div>
      <div class="item">
        <h6>تاریخ دریافت: </h6>
        <p>{{orderDate}}</p>
      </div>
      <div class="item" style="justify-content: left;">
        <h6>آدرس دریافت: </h6>
        <p>{{addressLine}}</p>
      </div>
    </div>
    <div class="group-list mt-4">
      <div class="table-info pt-3" v-if="windowWith > 768">
        <table class="khoonegi-table">
          <thead>
          <tr>
            <th v-for="col in columns" :key="col">
              {{ col.label }}
            </th>
          </tr>
          </thead>
          <tbody v-if="orderList.length">
          <tr v-for="(row , index) in orderList" :key="index">
            <td>{{ row.row }}</td>
            <td>{{ row.productName }}</td>
            <td>{{ row.sellerName }}</td>
            <td>{{ row.category }}</td>
            <td>{{ row.deliveryTime }}</td>
            <td>{{ row.distribution }}</td>
            <td>{{ row.price }}</td>
            <td>{{ row.orderCount }}</td>
            <td>{{ row.totalPrice }}</td>
          </tr>
          </tbody>
          <span class="mt-4 d-block" v-else>
              سفارش موجود نیست
            </span>
        </table>
      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="orderList.length">
          <div class="info-item" v-for="(item, i) in orderList" :key="i">
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام محصول</span>
              <p class="item-data">{{ item.productName }}</p>
            </div>
            <div class="item">
              <span class="item-head">نام میزبان</span>
              <p class="item-data">{{ item.sellerName }}</p>
            </div>
            <div class="item">
              <span class="item-head">دسته بندی</span>
              <p class="item-data">{{ item.category }}</p>
            </div>
            <div class="item">
              <span class="item-head">بازه دریافت</span>
              <p class="item-data">
                {{item.deliveryTime}}
              </p>
            </div>
            <div class="item">
              <span class="item-head">هزینه ارسال(تومان)</span>
              <p class="item-data">{{ item.distribution }}</p>
            </div>
            <div class="item">
              <span class="item-head">مبلغ واحد(تومان)</span>
              <p class="item-data">{{ item.price }}</p>
            </div>
            <div class="item">
              <span class="item-head">تعداد</span>
              <p class="item-data">{{ item.orderCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">مبلغ سفارش(تومان)</span>
              <p class="item-data">{{ item.totalPrice }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر سفارش موجود نمی‌باشد
        </div>
      </div>
      <div class="detail-payment">
        <textarea class="global-input" v-model="description"></textarea>
         <div class="items">
           <div class="item">
             <h6>مجموع سفارش</h6>
             <span>{{productPrice}}</span>
           </div>
           <div class="item">
             <h6>تخفیف کل</h6>
             <span>{{discount}}</span>
           </div>
           <div class="item">
             <h6>هزینه ارسال</h6>
             <span>{{distribution}}</span>
           </div>
           <div class="item">
             <h6>قابل پرداخت</h6>
             <span>{{totalPayment}}</span>
           </div>
         </div>
      </div>
    </div>
   <div class="order-btn">
     <khoonegiButton
         @click="setOrder()"
         class="form-button dark-slate"
         text="ثبت سفارش"
     />
     <khoonegiButton
         @click="cancellOrder()"
         class="form-button failed"
         text="لغو سفارش"
     />
   </div>
  </div>
</template>

<script>
import {useToast} from "vue-toastification";
import khoonegiButton from "@/components/khoonegiButton";
export default {
  components: {
    khoonegiButton,
  },
  data() {
    return {
      toast: useToast(),
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام محصول",
          field: "name",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "نام میزبان",
          field: "name",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "دسته بندی",
          field: "phoneNumber",
          width: ".6%",
          sortable: false,
        },
        {
          label: "بازه دریافت",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "هزینه ارسال(تومان)",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "مبلغ واحد(تومان)",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "تعداد",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "مبلغ سفارش(تومان)",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
      ],
      message: {
        noDataAvailable: "در حال حاضر سفارش موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
      isloading: false,
      customerName: this.$store.state.customerNameDelivery,
      orderDate: "",
      orderList: [],
      discountPrice: "",
      distribution: "",
      addressLine: "",
      cartId: "",
      description: "",
      productPrice: "",
      discount: "",
      totalPayment: "",

    }
  },
  created() {
    if (localStorage.getItem('reloaded')) {
      localStorage.removeItem('reloaded');
    } else {
      localStorage.setItem('reloaded', '1');
      location.reload();
    }
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
    this.orderList = this.$store.state.customerOrderDelivery.items;
    this.orderList.map((item)=>{
      item.distribution = (item.distribution * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      item.totalPrice = (item.totalPrice * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      item.price = (item.price * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    })
    this.orderDate = this.$store.state.customerOrderDelivery.orderDate;
    this.cartId = this.$store.state.customerOrderDelivery.cartId;
    this.addressLine = this.$store.state.customerOrderDelivery.address.addressLine;
    this.distribution = (this.$store.state.customerOrderDelivery.distribution * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.productPrice = (this.$store.state.customerOrderDelivery.productPrice * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.discount= (this.$store.state.customerOrderDelivery.discount * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    this.totalPayment = (this.$store.state.customerOrderDelivery.totalPayment * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  methods: {
    setOrder() {
      this.isloading = true;
      const data = {
        CartId: this.cartId
      };
      this.$store
          .dispatch("supportOrder", data)
          .then((respons) => {
            this.isloading = false;
            console.log(respons)
            if(respons.data.succeed){
              this.toast.success(respons.data.message, {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              this.$router.push(`/newFactor`)
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
            this.isSearchLoading = false;
            this.$store.dispatch("handleError", error);
            this.toast.error("خطا در اتصال!", {
              position: "bottom-center",
              timeout: 3000,
              icon: true,
              rtl: true,
            });
            console.log(error);
          })
    },
    cancellOrder(){
      localStorage.removeItem("orderCustomer");
      localStorage.removeItem("customerName");
      localStorage.removeItem("finalOrders");
      this.$router.push(`/newFactor`);
    }
  }
}
</script>

<style lang="scss">
.finalOrder {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;
  .order-btn {
    margin-top: 8rem;
    display: flex;
    column-gap: 1rem;
    float: left;
    width: 30%;
    flex-direction: row-reverse;
    @media (max-width: 768px) {
        width: 100%;
        display: block;
        margin-top: 3rem;
        padding-bottom: 2rem;
    }
  }
  .header {
    display: grid;
    grid-template-columns: 20% 16% 18% auto;
    align-items: center;
    border-bottom: 0.5px solid #e4e4e4;
    padding-bottom: 0.5rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    .item {
      display: flex;
      align-items: center;
      column-gap: 10px;
      p {
        line-height: normal !important;
      }
    }
    h6 {
      color: #664ECA;
      margin: 0;
    }
  }

  .info-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-top: 2rem;
    grid-column-gap: 5rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-row-gap: 1rem;
    }

    .info {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      grid-column-gap: 1rem;

      label {
        color: #979797;
        font-size: 13px;
        margin-bottom: 0;
      }

      input {
        height: 35px;
      }

      .search-customer {
        position: relative;

        .close {
          position: absolute;
          left: 11%;
          top: 20%;
          @media (max-width: 768px) {
            left: 20%;
          }
        }

        .submit-search {
          top: 0.3rem !important;
        }

        .search-host {
          width: 100%;
          float: unset;
        }
      }
    }
  }

  .search-result {
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #888;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    li:hover {
      background-color: #6a44ff;

      button {
        color: #fff;
      }
    }
  }

  .group-list {
    .select-time {
      grid-area: unset;
      background-color: #fff;
      color: #664ECA;
      border-color: #664ECA;
      height: fit-content;
      width: 100%;
      border-radius: 5px;
      //margin: 0 20px;
      .multiselect-caret {
        background-color: #664ECA !important;
      }

      .multiselect-placeholder {
        color: #664ECA;
      }

      @media (max-width: 768px) {
        width: 100%;
        margin: 0;
      }
    }
    .khoonegi-table {
      width: 100%;
      text-align: center;

      tr {
        display: grid;
        grid-template-columns: 5% 20% 11% 9% 10% 14% 12% 5% 14%;
      }

      thead {

        th {
          padding: 0.75rem 0;
          color: #664eca;
          background-color: unset;
          border: 1px solid #e4e4e4 !important;
        }
      }

      tbody {
        td {
          border: 1px solid #e4e4e4;
          line-height: 2rem;
          padding: 0.75rem 0;
          font-size: 14px;
          font-weight: 500;

        }
      }

    }
    .detail-payment {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 3rem;
      margin-top: 1rem;
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        row-gap: 2rem;
      }
      h6 {
        color: #664ECA;
        margin: 0;
      }
      .items {
        .item {
          border-bottom: 0.5px solid #e4e4e4;
          padding-bottom: 0.5rem;
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
      }
    }
  }

  .create-user {
    text-align: left;

    button {
      padding: 4px;
      width: 10rem;
    }
  }
}


.search-customer {
  position: relative;

  .close {
    position: absolute;
    left: 11%;
    top: 20%;
    @media (max-width: 768px) {
      left: 20%;
    }
  }

  .submit-search {
    top: 0.3rem !important;
  }

  .search-host {
    width: 100%;
    float: unset;
  }
}

.user-modal {
  height: 25rem !important;

  .p-dialog-content {
    overflow: unset !important;
  }

  .content {
    margin: 5% 7% !important;

    .form-button {
      position: absolute;
      bottom: 1%;
      left: 6%;
      width: auto;
    }

    .search-customer {
      .search-result {
        max-height: 14rem;

        ul {
          padding: 0 3%;

          li {
            &:hover {
              background-color: #6a44ff;

              button {
                color: #fff;
                width: 100%;
                text-align: right;
              }
            }

            margin-bottom: 7px;
            list-style: none;
          }
        }
      }
    }

    .selected-user {
      ul {
        li {
          margin-bottom: 7px;
          list-style: none;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }

  .title-dialog {
    color: #979797;
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 10px !important;
  }
}

</style>
