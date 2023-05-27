<template>
  <div
      class="nav-wrapper selectTimeOrder orderList position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"

  >
    <div class="header">
      <div class="item">
        <h6>نام مشتری: </h6>
        <p>{{customerName}}</p>
      </div>
      <div class="item" style="justify-content: left;">
        <h6>تاریخ سفارش: </h6>
        <p>{{orderDate}}</p>
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
            <td>{{ row.sellerBrand }}</td>
            <td>{{ row.orderCount }}</td>
            <td>{{ row.delivery }}</td>
            <td style="padding: 13px;">
              <Multiselect
                class="select-time"
                v-model="row.date"
                :options="row.deliveryTimes"
                placeholder="انتخاب کنید"
                label="title"
                track-by="title"
                :searchable="true"
            />
            </td>
          </tr>
          </tbody>
          <span class="mt-4 d-block" v-else>
              عضو موجود نیست
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
              <p class="item-data">{{ item.sellerBrand }}</p>
            </div>
            <div class="item">
              <span class="item-head">تعداد سفارش</span>
              <p class="item-data">{{ item.orderCount }}</p>
            </div>
            <div class="item">
              <span class="item-head">بازه زمانی</span>
              <p class="item-data">{{ item.delivery }}</p>
            </div>
            <div class="item">
              <span class="item-head">ساعت دریافت</span>
              <p class="item-data">
                <Multiselect
                    class="select-time"
                    v-model="row.date"
                    :options="row.deliveryTimes"
                    placeholder="انتخاب کنید"
                    label="title"
                    track-by="title"
                    :searchable="true"
                />
              </p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر عضو موجود نمی‌باشد
        </div>
      </div>
    </div>
    <khoonegiButton
        @click="setOrder()"
        class="form-button dark-slate set-order"
        text="ثبت سفارش"
    />
  </div>
</template>

<script>
import {useToast} from "vue-toastification";
import khoonegiButton from "@/components/khoonegiButton";
import Multiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
export default {
  components: {
    khoonegiButton,
    Multiselect
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
          label: "تعداد سفارش",
          field: "phoneNumber",
          width: ".6%",
          sortable: false,
        },
        {
          label: "بازه زمانی",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "ساعت دریافت",
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
      timeDeliverySelect: ""
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
    this.orderDate = JSON.parse(this.$store.state.customerMenuDelivery).time;
    this.orderList = JSON.parse(this.$store.state.customerMenuDelivery).menuDelivery;
    this.orderList.map((item)=>{
      item.date = "";
    })
  },
  methods: {
    checkTimeDelivery() {
      const order = this.orderList.filter((item) => {
        console.log(item)
        return item.date != "";
      });
      console.log(order)
      return order;
    },
    setOrder() {
      localStorage.removeItem("finalOrders")
      this.isloading = true;
      const data = {
        CustomerId: this.$route.params.id,
        Items: this.checkTimeDelivery()
      };
      this.$store
          .dispatch("registerOrder", data)
          .then((respons) => {
            this.isloading = false;
            console.log(respons)
            localStorage.setItem("finalOrders" , JSON.stringify(respons.data.orders))
            this.$router.push(`/finalOrder/${this.$route.params.id}`)
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
  }
}
</script>

<style lang="scss">
.selectTimeOrder {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;
.set-order {
  width: 15%;
  margin-top: 8rem;
  float: left;
  @media (max-width: 768px){
    width: 100%;
  }
}
  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-bottom: 0.5px solid #e4e4e4;
    padding-bottom: 0.5rem;
    .item {
      display: flex;
      align-items: center;
      column-gap: 10px;
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
    .table-info {
      padding: 0 10%;
    }
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
        grid-template-columns: 8% 35% 14% 10% 13% auto;
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
