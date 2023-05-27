<template>
  <div
      class="nav-wrapper transactions transactionList position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"

  >
    <div class="header">
      <h6>تراکنش های گروه {{ groupName }}</h6>
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
          <tbody v-if="transactionList.length">
          <tr v-for="(row , index) in transactionList" :key="index">
            <td>{{ row.row }}</td>
            <td>{{ row.typeDescription }}</td>
            <td>{{ row.amountPerPerson }}</td>
            <td>{{ row.createDate }}</td>
            <td>{{ row.description }}</td>
            <td>
              <button @click="$router.push(`/group/usersFromTransactions/${$route.params.id}/${row.index}`)">
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
            </td>
          </tr>
          </tbody>
          <span class="mt-4 d-block" v-else>
              تراکنش موجود نیست
          </span>
        </table>

      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="transactionList.length">
          <div class="info-item" v-for="(item, i) in transactionList" :key="i">
            <div class="item">
              <span class="item-head">ردیف</span>
              <p class="item-data">{{ item.row }}</p>
            </div>
            <div class="item">
              <span class="item-head">نوع</span>
              <p class="item-data">{{ item.typeDescription }}</p>
            </div>
            <div class="item">
              <span class="item-head">مبلغ</span>
              <p class="item-data">{{ item.amountPerPerson }}</p>
            </div>
            <div class="item">
              <span class="item-head">تاریخ تراکنش</span>
              <p class="item-data">{{ item.createDate }}</p>
            </div>
            <div class="item">
              <span class="item-head">توضیحات</span>
              <p class="item-data">{{ item.description }}</p>
            </div>
            <div class="item">
              <span class="item-head">نمایش اعضا</span>
              <p class="item-data">
                <button @click="$router.push(`/group/usersFromTransactions/${$route.params.id}/${item.index}`)">
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
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر تراکنش موجود نمی‌باشد
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useToast} from "vue-toastification";

export default {
  name: "transactionsGroup",
  components: {
  },
  data() {
    return {
      toast: useToast(),
      customerList: [],
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نوع",
          field: "name",
          width: "1.5%",
          sortable: false,
        },
        {
          label: "مبلغ",
          field: "phoneNumber",
          width: ".6%",
          sortable: false,
        },
        {
          label: "تاریخ تراکنش",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "توضیحات",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
        {
          label: "نمایش اعضا",
          field: "delete",
          width: ".5%",
          sortable: false,
        },
      ],
      totalRecordCount: 0,
      message: {
        noDataAvailable: "در حال حاضر گروه موجود نمی‌باشد",
      },
      windowWith: window.innerWidth,
      isloading: false,
      customerId: [],
      groupName: '',
      transactionList: '',
      groupId: this.$route.params.id,
      selectedCustomer: []
    }
  },
  mounted() {
    this.getTransactions()
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
  },
  methods: {
    getTransactions() {
      const data = {
        GroupId: this.$route.params.id,
      };
      this.$store
          .dispatch("getGroupTransaction", data)
          .then((respons) => {
            this.isloading = false;
            console.log(respons)
            this.transactionList = respons.data.transaction;
            this.groupName = respons.data.groupInfo.groupName;
            this.transactionList.forEach((item , index)=> {
              item.amountPerPerson = (item.amountPerPerson * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              item.row = index;
              item.row++;
            })
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
    },  }
}
</script>

<style lang="scss">
.transactions {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;

  .header {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-bottom: 0.5px solid #e4e4e4;
    padding-bottom: 1rem;

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
      padding: 0 18%;
    }

    .khoonegi-table {
      width: 100%;
      text-align: center;

      tr {
        display: grid;
        grid-template-columns: 6% 20% 18% 18% 28% auto;
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
