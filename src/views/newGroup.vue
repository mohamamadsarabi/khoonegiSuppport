<template>
  <div
      class="nav-wrapper newGroup selectedCustomer position-relative end-0 py-3 px-4 mx-4"
      style="direction: rtl"

  >
    <div class="header">
      <h6>گروه جدید</h6>
    </div>
    <div class="info-group">
      <div class="info">
        <label>نام گروه:</label>
        <input class="global-input" v-model="groupName" type="text">
      </div>
      <div class="info">
        <label>اعضا:</label>
        <div class="search-customer">
          <div class="search-box">
            <vsud-input
                :value="dataInput"
                class="search-host"
                @input="setSearch"
                placeholder="شماره همراه یا نام و نام خانوادگی را وارد نمایید"
            />
            <Transition>
              <div v-if="searchQuery.length >= 1" class="search-result">
                <ul v-if="customerList.length">
                  <li v-for="(item, i) in customerList" :key="i">
                    <button @click.prevent="getCustomer(item.phoneNumber, item.name, item.id)">
                      {{ item.name }}
                    </button>
                  </li>
                </ul>
                <span v-else>مشتری یافت نشد</span>
              </div>
            </Transition>
            <button
                class="close"
                @click="closeList()"
                v-if="searchQuery.length >= 1"
            >
              ✗
            </button>
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
      </div>
    </div>
    <div class="group-list mt-4">
      <div class="table-info pt-3" v-if="windowWith > 768">
          <table class="khoonegi-table">
            <thead>
                <tr>
                  <th v-for="col in columns" :key="col">
                    {{col.label}}
                  </th>
                </tr>
            </thead>
            <tbody v-if="selectedCustomer.length">
              <tr v-for="(row , index) in selectedCustomer" :key="index">
                <td>{{row.row}}</td>
                <td>{{row.name}}</td>
                <td>{{row.phone}}</td>
                <td><button @click="removeCustomerSelect(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_3075_3137" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_3075_3137)">
                      <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6C4.71667 6 4.479 5.90433 4.287 5.713C4.09567 5.521 4 5.28333 4 5C4 4.71667 4.09567 4.479 4.287 4.287C4.479 4.09567 4.71667 4 5 4H9C9 3.71667 9.096 3.479 9.288 3.287C9.47933 3.09567 9.71667 3 10 3H14C14.2833 3 14.521 3.09567 14.713 3.287C14.9043 3.479 15 3.71667 15 4H19C19.2833 4 19.5207 4.09567 19.712 4.287C19.904 4.479 20 4.71667 20 5C20 5.28333 19.904 5.521 19.712 5.713C19.5207 5.90433 19.2833 6 19 6V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.096 16.5207 9.288 16.712C9.47933 16.904 9.71667 17 10 17C10.2833 17 10.521 16.904 10.713 16.712C10.9043 16.5207 11 16.2833 11 16V9C11 8.71667 10.9043 8.479 10.713 8.287C10.521 8.09567 10.2833 8 10 8C9.71667 8 9.47933 8.09567 9.288 8.287C9.096 8.479 9 8.71667 9 9V16ZM13 16C13 16.2833 13.096 16.5207 13.288 16.712C13.4793 16.904 13.7167 17 14 17C14.2833 17 14.521 16.904 14.713 16.712C14.9043 16.5207 15 16.2833 15 16V9C15 8.71667 14.9043 8.479 14.713 8.287C14.521 8.09567 14.2833 8 14 8C13.7167 8 13.4793 8.09567 13.288 8.287C13.096 8.479 13 8.71667 13 9V16Z" fill="#FF4141"/>
                    </g>
                  </svg>
                </button></td>
              </tr>
            </tbody>
            <span class="mt-4 d-block" v-else>
              مشتری موجود نیست
            </span>
          </table>

      </div>
      <div v-else-if="windowWith <= 768" class="table-info-mobile">
        <div v-if="selectedCustomer.length">
          <div class="info-item" v-for="(item, i) in selectedCustomer" :key="i">
              <div class="item">
                <span class="item-head">ردیف</span>
                <p class="item-data">{{ item.row }}</p>
              </div>
              <div class="item">
                <span class="item-head">نام</span>
                 <p class="item-data">{{ item.name }}</p>
              </div>
              <div class="item">
                <span class="item-head">شماره همراه</span>
                 <p class="item-data">{{ item.phone }}</p>
              </div>
            <div class="item">
              <span class="item-head">حذف</span>
              <p class="item-data"><button @click="removeCustomerSelect(i)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <mask id="mask0_3075_3137" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                  </mask>
                  <g mask="url(#mask0_3075_3137)">
                    <path d="M7 21C6.45 21 5.97933 20.8043 5.588 20.413C5.196 20.021 5 19.55 5 19V6C4.71667 6 4.479 5.90433 4.287 5.713C4.09567 5.521 4 5.28333 4 5C4 4.71667 4.09567 4.479 4.287 4.287C4.479 4.09567 4.71667 4 5 4H9C9 3.71667 9.096 3.479 9.288 3.287C9.47933 3.09567 9.71667 3 10 3H14C14.2833 3 14.521 3.09567 14.713 3.287C14.9043 3.479 15 3.71667 15 4H19C19.2833 4 19.5207 4.09567 19.712 4.287C19.904 4.479 20 4.71667 20 5C20 5.28333 19.904 5.521 19.712 5.713C19.5207 5.90433 19.2833 6 19 6V19C19 19.55 18.8043 20.021 18.413 20.413C18.021 20.8043 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.096 16.5207 9.288 16.712C9.47933 16.904 9.71667 17 10 17C10.2833 17 10.521 16.904 10.713 16.712C10.9043 16.5207 11 16.2833 11 16V9C11 8.71667 10.9043 8.479 10.713 8.287C10.521 8.09567 10.2833 8 10 8C9.71667 8 9.47933 8.09567 9.288 8.287C9.096 8.479 9 8.71667 9 9V16ZM13 16C13 16.2833 13.096 16.5207 13.288 16.712C13.4793 16.904 13.7167 17 14 17C14.2833 17 14.521 16.904 14.713 16.712C14.9043 16.5207 15 16.2833 15 16V9C15 8.71667 14.9043 8.479 14.713 8.287C14.521 8.09567 14.2833 8 14 8C13.7167 8 13.4793 8.09567 13.288 8.287C13.096 8.479 13 8.71667 13 9V16Z" fill="#FF4141"/>
                  </g>
                </svg>
              </button></p>
            </div>
          </div>
        </div>
        <div v-else class="text-center">
          در حال حاضر مشتری موجود نمی‌باشد
        </div>
      </div>
    </div>
    <div class="create-group" v-if="selectedCustomer.length">
      <khoonegiButton
          class="form-button slate"
          text="ایجاد گروه"
          :loading="isloading"
          @click="createGroup()"
      />
    </div>
  </div>
</template>

<script>
import VsudInput from "@/components/VsudInput";
import SearchLoading from "@/components/searchLoading";
import {useToast} from "vue-toastification";
import lodash from "lodash";
import khoonegiButton from "@/components/khoonegiButton";

export default {
  name: "newGroup",
  components: {
    VsudInput,
    SearchLoading,
    khoonegiButton
  },
  data() {
    return {
      dataInput: "",
      searchQuery: "",
      searchIndex: 0,
      toast: useToast(),
      isSearchLoading: false,
      customerList: [],
      selectedCustomer: [],
      groupName: "",
      columns: [
        {
          label: " ردیف",
          field: "row",
          width: ".1%",
          sortable: false,
        },
        {
          label: "نام",
          field: "name",
          width: "1.5%",
          sortable: false,
        },

        {
          label: "شماره همراه",
          field: "phoneNumber",
          width: ".6%",
          sortable: false,
        },
        {
          label: "حذف",
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
      customerId: []
    }
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWith = window.innerWidth;
    });
  },
  methods: {
    closeList() {
      this.searchQuery = "";
      this.dataInput = "";
    },
    setSearch(val) {
      this.isSearchLoading = true;
      let query = this;
      this.searchIndex++;
      let curIndex = this.searchIndex;
      lodash.debounce(function () {
        if (query.searchIndex == curIndex || val.length == 0) {
          query.searchQuery = val.target.value;
          query.getCustomerList();
        }
      }, 600)();
    },
    getCustomer(phone, name, id , row) {
      console.log(phone, name, id , row)
      let isExist = false;
      for (let i = 0; i < this.selectedCustomer.length; i++) {
        if (this.selectedCustomer.at(i).id == id) {
          isExist = true;
        }
      }
      if (!isExist) {
        this.selectedCustomer.push({phone: phone, name: name, id: id , row: row});
        this.customerId.push(id)
      }
      this.selectedCustomer.forEach((item, index) => {
        item.row = index;
        item.row++;
      })
      console.log(this.selectedCustomer)
    },
    removeCustomerSelect(value) {
      this.selectedCustomer.splice(value, 1);
      this.customerId.splice(value, 1);
      console.log(this.selectedCustomer)
      console.log(this.customerId)
    },
    getCustomerList() {
      const data = {
        StringQuery: this.searchQuery
      };
      this.$store
          .dispatch("findCustomer", data)
          .then((respons) => {
            this.isSearchLoading = false;
            this.customerList = respons.data.customers;
            console.log(respons)
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
    createGroup() {
      this.isloading = true;
      const data = {
        Name: this.groupName,
        Description: "",
        UsersId: this.customerId
      };
      this.$store
          .dispatch("addNewGroup", data)
          .then((respons) => {
            this.isloading = false;
            if(respons.data.succeed) {
              console.log(respons)
                this.toast.success(respons.data.message, {
                  position: "bottom-center",
                  timeout: 3000,
                  icon: true,
                  rtl: true,
                });
              this.$router.push({name: "اعتبارات"});
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
            this.isloading = false;
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
.newGroup {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgb(216 216 216 / 20%);
  border-radius: 20px;
  margin: 16px auto;
  position: relative;

  .header {
    border-bottom: 0.5px solid #e4e4e4;
  }

  .info-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    margin-top: 2rem;
    grid-column-gap: 5rem;
    @media (max-width: 768px){
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
        grid-template-columns: 10% 40% 35% auto;
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
  .create-group {
    text-align: left;
   button {
     width: 10rem;
   }
  }
}
</style>
