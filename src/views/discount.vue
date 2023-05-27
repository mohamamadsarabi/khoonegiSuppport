<template>
	<div class="discount-list position-relative end-0 py-3 px-4 mx-4">
		<div class="discount-filter">
			<div class="right">
				<div class="create-discount">
					<khoonegiButton
						class="form-button mt-0 slate create-discount"
						text="+  افزودن کد تخفیف جدید"
						@click="this.showAddModal = true"
					/>
				</div>
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
		</div>
		<table-lite
			v-if="windowWith > 768"
			:is-slot-mode="true"
			:columns="columns"
			:rows="discountsList"
			:total="totalRecordCount"
			:sortable="false"
			@do-search="doSearch"
			@is-finished="isLoading = false"
			:is-hide-paging="true"
			:messages="message"
		>
			<template v-slot:firstOrderUse="item">
				<input
					class="check-box isActive"
					type="checkbox"
					v-model="item.value.firstOrderUse"
				/>
			</template>
			<template v-slot:edit="item">
				<button @click="showEditDiscount(item)">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 17 17"
						fill="none"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M12.4962 0C11.9761 0 11.5465 0.221635 11.1399 0.537628C10.7547 0.837003 10.327 1.2727 9.81409 1.7952L5.38896 6.30263C5.04916 6.64819 4.78047 6.92143 4.61569 7.27066C4.45091 7.61989 4.40929 8.00429 4.35666 8.49045L4.34237 8.62183C4.24392 9.52414 4.16277 10.2679 4.18134 10.8538C4.20077 11.4665 4.33076 12.0277 4.76141 12.4664C5.19206 12.905 5.74304 13.0375 6.34457 13.0572C6.91972 13.0762 7.64986 12.9935 8.53568 12.8932L8.66472 12.8787C9.14197 12.8251 9.51935 12.7827 9.8622 12.6148C10.205 12.447 10.4733 12.1733 10.8125 11.8272L15.2376 7.31967C15.7505 6.7972 16.1783 6.36153 16.4722 5.96914C16.7824 5.55498 17 5.11741 17 4.58768C17 4.05794 16.7824 3.62037 16.4722 3.20621C16.1783 2.81383 15.7506 2.37815 15.2376 1.85568L15.1782 1.79523C14.6653 1.27272 14.2376 0.837008 13.8524 0.537628C13.4458 0.221635 13.0162 0 12.4962 0ZM14.7787 6.04042L11.07 2.26264C11.3975 1.93396 11.6508 1.69226 11.8745 1.51836C12.1734 1.28609 12.3474 1.23359 12.4962 1.23359C12.6449 1.23359 12.8189 1.28609 13.1178 1.51836C13.4306 1.76149 13.8012 2.13714 14.3516 2.69773C14.9019 3.25832 15.2707 3.63582 15.5094 3.95448C15.7374 4.25891 15.7889 4.43611 15.7889 4.58768C15.7889 4.73924 15.7374 4.91644 15.5094 5.22087C15.3387 5.4488 15.1014 5.70682 14.7787 6.04042ZM10.2126 3.13387L13.9234 6.91376L10.0145 10.8954C9.5887 11.3291 9.47102 11.4376 9.33758 11.503C9.20414 11.5683 9.04745 11.5941 8.4489 11.6619C7.50429 11.7688 6.86137 11.84 6.38365 11.8243C5.92218 11.8091 5.73588 11.7144 5.61775 11.5941C5.49963 11.4738 5.40667 11.284 5.39177 10.8139C5.37634 10.3273 5.44628 9.67245 5.55123 8.71026C5.61774 8.10058 5.64308 7.94096 5.70722 7.80504C5.77135 7.66911 5.87788 7.54924 6.30372 7.11548L10.2126 3.13387Z"
							fill="#393939"
						/>
						<path
							d="M6.26436 2.20276C6.59876 2.19867 6.8666 1.91923 6.86259 1.57861C6.85858 1.23799 6.58425 0.965169 6.24985 0.969252C4.29076 0.993173 2.94604 1.10236 1.91365 1.8664C1.51954 2.15807 1.17295 2.5111 0.886614 2.91255C0.413634 3.57567 0.201847 4.35232 0.0998942 5.31086C-1.173e-05 6.25015 -6.48599e-06 7.43407 1.06845e-07 8.94443V9.01886C-6.48599e-06 10.5292 -1.173e-05 11.7131 0.0998943 12.6524C0.201847 13.611 0.413634 14.3876 0.886614 15.0507C1.17295 15.4522 1.51954 15.8052 1.91365 16.0969C2.56465 16.5787 3.32712 16.7944 4.26813 16.8982C5.19024 17 6.35251 17 7.83523 17H7.9084C9.39112 17 10.5534 17 11.4756 16.8982C12.4166 16.7944 13.179 16.5787 13.83 16.0969C14.2241 15.8052 14.5707 15.4522 14.8571 15.0507C15.6071 13.9991 15.7143 12.6294 15.7378 10.6338C15.7418 10.2932 15.474 10.0138 15.1396 10.0097C14.8052 10.0056 14.5309 10.2784 14.5269 10.619C14.5027 12.6757 14.3667 13.6395 13.8773 14.3256C13.6657 14.6224 13.4095 14.8833 13.1182 15.0989C12.708 15.4024 12.1831 15.5794 11.3451 15.6718C10.4958 15.7656 9.39904 15.7664 7.87184 15.7664C6.34465 15.7664 5.24789 15.7656 4.39858 15.6718C3.5606 15.5794 3.03564 15.4024 2.62549 15.0989C2.33419 14.8833 2.07802 14.6224 1.86638 14.3256C1.56839 13.9079 1.39469 13.3731 1.3039 12.5196C1.21188 11.6544 1.21105 10.5373 1.21105 8.98164C1.21105 7.42602 1.21188 6.30885 1.3039 5.44373C1.39469 4.59016 1.56839 4.05542 1.86638 3.63764C2.07802 3.34092 2.33419 3.07998 2.62549 2.8644C3.29912 2.36586 4.24529 2.22741 6.26436 2.20276Z"
							fill="#393939"
						/>
					</svg>
				</button>
			</template>
		</table-lite>
		<div v-else-if="windowWith <= 768" class="table-info-mobile">
			<div v-if="discountsList.length">
				<div class="info-item" v-for="(item, i) in discountsList" :key="i">
					<div class="item">
						<span class="item-head">ردیف</span>
						<p class="item-data">{{ item.row }}</p>
					</div>
					<div class="item">
						<span class="item-head">کد تخفیف </span>
						<p class="item-data">{{ item.code }}</p>
					</div>
					<div class="item">
						<span class="item-head">میزان تخفیف(ریال)</span>
						<p class="item-data">{{ item.discountCelling }}</p>
					</div>

					<div class="item">
						<span class="item-head">میزان تخفیف(درصد)</span>
						<p class="item-data">
							{{ item.value }}
						</p>
					</div>
					<div class="item">
						<span class="item-head">سقف استفاده</span>
						<p class="item-data">
							{{ item.maxUse }}
						</p>
					</div>
					<div class="item">
						<span class="item-head">سفارش اول</span>
						<p class="item-data">
							<input
								class="check-box isActive"
								type="checkbox"
								v-model="item.firstOrderUse"
							/>
						</p>
					</div>
					<div class="item mb-4">
						<span class="item-head">ویرایش</span>
						<p class="item-data">
							<button @click="showEditDiscount(item)">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 17 17"
									fill="none"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M12.4962 0C11.9761 0 11.5465 0.221635 11.1399 0.537628C10.7547 0.837003 10.327 1.2727 9.81409 1.7952L5.38896 6.30263C5.04916 6.64819 4.78047 6.92143 4.61569 7.27066C4.45091 7.61989 4.40929 8.00429 4.35666 8.49045L4.34237 8.62183C4.24392 9.52414 4.16277 10.2679 4.18134 10.8538C4.20077 11.4665 4.33076 12.0277 4.76141 12.4664C5.19206 12.905 5.74304 13.0375 6.34457 13.0572C6.91972 13.0762 7.64986 12.9935 8.53568 12.8932L8.66472 12.8787C9.14197 12.8251 9.51935 12.7827 9.8622 12.6148C10.205 12.447 10.4733 12.1733 10.8125 11.8272L15.2376 7.31967C15.7505 6.7972 16.1783 6.36153 16.4722 5.96914C16.7824 5.55498 17 5.11741 17 4.58768C17 4.05794 16.7824 3.62037 16.4722 3.20621C16.1783 2.81383 15.7506 2.37815 15.2376 1.85568L15.1782 1.79523C14.6653 1.27272 14.2376 0.837008 13.8524 0.537628C13.4458 0.221635 13.0162 0 12.4962 0ZM14.7787 6.04042L11.07 2.26264C11.3975 1.93396 11.6508 1.69226 11.8745 1.51836C12.1734 1.28609 12.3474 1.23359 12.4962 1.23359C12.6449 1.23359 12.8189 1.28609 13.1178 1.51836C13.4306 1.76149 13.8012 2.13714 14.3516 2.69773C14.9019 3.25832 15.2707 3.63582 15.5094 3.95448C15.7374 4.25891 15.7889 4.43611 15.7889 4.58768C15.7889 4.73924 15.7374 4.91644 15.5094 5.22087C15.3387 5.4488 15.1014 5.70682 14.7787 6.04042ZM10.2126 3.13387L13.9234 6.91376L10.0145 10.8954C9.5887 11.3291 9.47102 11.4376 9.33758 11.503C9.20414 11.5683 9.04745 11.5941 8.4489 11.6619C7.50429 11.7688 6.86137 11.84 6.38365 11.8243C5.92218 11.8091 5.73588 11.7144 5.61775 11.5941C5.49963 11.4738 5.40667 11.284 5.39177 10.8139C5.37634 10.3273 5.44628 9.67245 5.55123 8.71026C5.61774 8.10058 5.64308 7.94096 5.70722 7.80504C5.77135 7.66911 5.87788 7.54924 6.30372 7.11548L10.2126 3.13387Z"
										fill="#393939"
									/>
									<path
										d="M6.26436 2.20276C6.59876 2.19867 6.8666 1.91923 6.86259 1.57861C6.85858 1.23799 6.58425 0.965169 6.24985 0.969252C4.29076 0.993173 2.94604 1.10236 1.91365 1.8664C1.51954 2.15807 1.17295 2.5111 0.886614 2.91255C0.413634 3.57567 0.201847 4.35232 0.0998942 5.31086C-1.173e-05 6.25015 -6.48599e-06 7.43407 1.06845e-07 8.94443V9.01886C-6.48599e-06 10.5292 -1.173e-05 11.7131 0.0998943 12.6524C0.201847 13.611 0.413634 14.3876 0.886614 15.0507C1.17295 15.4522 1.51954 15.8052 1.91365 16.0969C2.56465 16.5787 3.32712 16.7944 4.26813 16.8982C5.19024 17 6.35251 17 7.83523 17H7.9084C9.39112 17 10.5534 17 11.4756 16.8982C12.4166 16.7944 13.179 16.5787 13.83 16.0969C14.2241 15.8052 14.5707 15.4522 14.8571 15.0507C15.6071 13.9991 15.7143 12.6294 15.7378 10.6338C15.7418 10.2932 15.474 10.0138 15.1396 10.0097C14.8052 10.0056 14.5309 10.2784 14.5269 10.619C14.5027 12.6757 14.3667 13.6395 13.8773 14.3256C13.6657 14.6224 13.4095 14.8833 13.1182 15.0989C12.708 15.4024 12.1831 15.5794 11.3451 15.6718C10.4958 15.7656 9.39904 15.7664 7.87184 15.7664C6.34465 15.7664 5.24789 15.7656 4.39858 15.6718C3.5606 15.5794 3.03564 15.4024 2.62549 15.0989C2.33419 14.8833 2.07802 14.6224 1.86638 14.3256C1.56839 13.9079 1.39469 13.3731 1.3039 12.5196C1.21188 11.6544 1.21105 10.5373 1.21105 8.98164C1.21105 7.42602 1.21188 6.30885 1.3039 5.44373C1.39469 4.59016 1.56839 4.05542 1.86638 3.63764C2.07802 3.34092 2.33419 3.07998 2.62549 2.8644C3.29912 2.36586 4.24529 2.22741 6.26436 2.20276Z"
										fill="#393939"
									/>
								</svg>
							</button>
						</p>
					</div>
				</div>
			</div>
			<div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
		</div>
	</div>
	<Dialog v-model:visible="showEditModal" class="discount-modal-edit">
		<template #header>
			<div class="header">
				<h3>ویرایش تخفیف</h3>
				<button @click="showEditModal = false">✘</button>
			</div>
		</template>
		<div class="content">
			<div class="input-list">
				<div class="field">
					<h6>میزان(درصد):</h6>
					<input
						class="global-input"
						type="number"
						v-model="editDiscountRate"
						placeholder="میزان تخفیف به درصد - بین 0 تا 100"
					/>
				</div>
				<div class="field">
					<h6>سقف تخفیف(ریال):</h6>
					<input
						style="text-align: left"
						class="global-input"
						type="text"
						v-model="editDiscountCeiling"
					/>
				</div>
				<div class="field">
					<h6>انتخاب تاریخ:</h6>
					<div class="flex-date">
						<date-picker
							color="#664ECA"
							class="datePicker fromDate"
							placeholder="تاریخ شروع"
							v-model="fromDateEdit"
              auto-submit
						></date-picker>
						<date-picker
							color="#664ECA"
							class="datePicker toDate"
							placeholder="تاریخ پایان"
							v-model="toDateEdit"
              auto-submit
						></date-picker>
					</div>
				</div>
				<div class="field">
					<h6>انتخاب ساعت:</h6>
					<div class="flex-date">
						<date-picker
							type="time"
							color="#664ECA"
							class="datePicker fromDate"
							placeholder="ساعت شروع"
							v-model="startTimeEdit"
						></date-picker>
						<date-picker
							color="#664ECA"
							type="time"
							class="datePicker toDate"
							placeholder="ساعت پایان"
							v-model="finishTimeedit"
						></date-picker>
					</div>
				</div>
				<div class="field" style="grid-template-columns: 70% 30%">
					<h6>تعداد دفعات قابل استفاده:</h6>
					<input class="global-input" type="number" v-model="editUseCount" />
				</div>
			</div>
			<div class="check" style="margin-top: 0.8rem">
				<input
					class="check-box"
					type="checkbox"
					id="checkFirstEdit"
					v-model="editFirstOrder"
					@click="setFirstOrderedit()"
				/>
				<label for="checkFirstEdit">سفارش اول</label>
			</div>
			<span v-if="showError" style="font-size: 13px; color: red">
				لطفا درصد تخفیف را کمتر از 100 وارد کنید
			</span>
			<khoonegiButton
				class="form-button mt-0 slate create-discount"
				text="ویرایش"
				:loading="isloading"
				@click="editDiscountCode"
			/>
		</div>
	</Dialog>
	<Dialog v-model:visible="showAddModal" class="discount-modal">
		<template #header>
			<div class="header">
				<h3>ثبت تخفیف جدید</h3>
				<button @click="showAddModal = false">✘</button>
			</div>
		</template>
		<div class="content">
			<div class="input-list">
				<div class="field">
					<h6>کد تخفیف:</h6>
					<input
						class="global-input"
						maxLength="10"
						type="text"
						v-model="codeName"
					/>
				</div>
				<div class="field">
					<h6>میزان(درصد):</h6>
					<input
						class="global-input"
						type="number"
						min="0"
						max="100"
						v-model="discountRate"
						placeholder="میزان تخفیف به درصد - بین 0 تا 100"
					/>
				</div>
				<div class="field">
					<h6>سقف تخفیف(ریال):</h6>
					<input class="global-input" type="number" v-model="discountCeiling" />
				</div>
				<div class="field">
					<h6>انتخاب تاریخ:</h6>
					<div class="flex-date">
						<date-picker
							color="#664ECA"
							class="datePicker fromDate"
							placeholder="تاریخ شروع"
							v-model="fromDateAdd"
              auto-submit
						></date-picker>
						<date-picker
							color="#664ECA"
							class="datePicker toDate"
							placeholder="تاریخ پایان"
							v-model="toDateAdd"
              auto-submit
						></date-picker>
					</div>
				</div>
				<div class="field">
					<h6>انتخاب ساعت:</h6>
					<div class="flex-date">
						<date-picker
							type="time"
							color="#664ECA"
							class="datePicker fromDate"
							placeholder="ساعت شروع"
							v-model="startTime"
              auto-submit
						></date-picker>
						<date-picker
							color="#664ECA"
							type="time"
							class="datePicker toDate"
							placeholder="ساعت پایان"
							v-model="finishTime"
              auto-submit
						></date-picker>
					</div>
				</div>
				<div class="field" style="grid-template-columns: 70% 30%">
					<h6>تعداد دفعات قابل استفاده:</h6>
					<input class="global-input" type="number" v-model="useCount" />
				</div>
			</div>
			<div class="check" style="margin-top: 0.8rem">
				<input
					class="check-box"
					type="checkbox"
					id="checkFirst"
					v-model="firstOrder"
					@click="setFirstOrder()"
				/>
				<label for="checkFirst">سفارش اول</label>
			</div>
			<span v-if="showError" style="font-size: 13px; color: red">
				لطفا درصد تخفیف را کمتر از 100 وارد کنید
			</span>
			<khoonegiButton
				class="form-button mt-0 slate create-discount"
				text="ثبت"
				:loading="isloading"
				@click="createDiscountCode"
			/>
		</div>
	</Dialog>
  <LoadingFull :enable-loading-full="isLoading"/>
	<page-to-top />
</template>

<script>
	import Dialog from "primevue/dialog";
  import LoadingFull from "../components/LoadingCircle";
	import pageToTop from "../components/pageToTop";
	import { useToast } from "vue-toastification";
	import tableLite from "../components/khoonegiTable";
	// import Multiselect from "@vueform/multiselect";
	import "@vueform/multiselect/themes/default.css";
	import khoonegiButton from "@/components/khoonegiButton.vue";

	export default {
		name: "tables",
		components: {
      LoadingFull,
			pageToTop,
			tableLite,
			// Multiselect,
			khoonegiButton,
			Dialog,
		},
		data() {
			return {
				toast: useToast(),
				windowWith: window.innerWidth,
				isSearchLoading: false,
				message: {
					noDataAvailable: "در حال حاضر کد تخفیف موجود نمی‌باشد",
				},
        isLoading: false,
				columns: [
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "کد تخفیف",
						field: "code",
						width: "1.5%",
						sortable: false,
					},

					{
						label: "میزان تخفیف(ریال)",
						field: "discountCelling",
						width: ".6%",
						sortable: false,
					},
					{
						label: "میزان تخفیف(درصد)",
						field: "value",
						width: "1%",
						sortable: false,
					},
					{
						label: "سقف استفاده",
						field: "maxUse",
						width: ".6%",
						sortable: false,
					},

					{
						label: "سفارش اول",
						field: "firstOrderUse",
						width: "1%",
						sortable: false,
					},

					{
						label: "ویرایش",
						field: "edit",
						width: ".3%",
						sortable: false,
					},
				],
				fromDate: "",
				toDate: "",
				codeName: "",
				discountRate: Number,
				discountCeiling: Number,
				startTime: "",
				finishTime: "",
				useCount: Number,
				firstOrder: false,
				fromDateAdd: "",
				toDateAdd: "",
				discountsList: [],
				showEditModal: false,
				showAddModal: false,
				// edit data
				editDiscountRate: Number,
				editDiscountCeiling: "",
				startTimeEdit: "",
				finishTimeedit: "",
				editUseCount: Number,
				editFirstOrder: false,
				fromDateEdit: "",
				toDateEdit: "",
				discountId: "",
				showError: false,
        totalRecordCount: 0,
			};
		},
		created() {
			this.getDiscountsList();
		},
		mounted() {
			window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
		},
		methods: {
			// get discount list function
			getDiscountsList() {
        this.isLoading = true;
				const data = {
					FromDate: this.fromDate,
					ToDate: this.toDate,
				};
				this.$store
					.dispatch("getDiscountsList", data)
					.then((respons) => {
						console.log(respons);
						this.isLoading = false;
						if (respons.data.succeed) {
							this.discountsList = respons.data.discountCodeList;
							this.discountsList.forEach((item) => {
								item.discountCelling = (item.discountCelling * 10)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
								item.value = item.value + "%";
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

			createDiscountCode() {
        console.log(this.discountRate)
				if (this.discountRate <= 100) {
					// this.isloading = true;
					const data = {
						Code: this.codeName,
						FromDate: this.fromDateAdd,
						ToDate: this.toDateAdd,
						FromTime: this.startTime,
						ToTime: this.finishTime,
						Value: this.discountRate,
						FirstOrder: this.firstOrder,
						MaxUse: this.useCount,
						Celling: this.discountCeiling / 10,
					};
					this.$store
						.dispatch("createDiscountCode", data)
						.then((respons) => {
							this.isLoading = false;
							if (respons.data.succeed) {
								this.getDiscountsList();
								this.showAddModal = false;
								this.codeName = "";
								this.fromDate = "";
								this.toDate = "";
								this.startTime = "";
								this.finishTime = "";
								this.discountRate = "";
								this.firstOrder = false;
								this.useCount = "";
								this.discountCeiling = "";
								this.codeName = "";
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
								timeout: 10000,
								icon: true,
								rtl: true,
							});
							this.isLoading = false;
							console.log(error);
						});
				} else {
					this.showError = true;
				}
			},

			showEditDiscount(item) {
				this.showEditModal = true;
				const data = {
					DiscountCodeId: item.value.id ? item.value.id : item.id,
				};
				this.$store
					.dispatch("getDiscountCode", data)
					.then((respons) => {
						this.isLoading = false;
						if (respons.data.succeed) {
							this.editDiscountRate = respons.data.discountCode.value;
							this.editDiscountCeiling =
								respons.data.discountCode.discountCelling;

							this.editDiscountCeiling = (this.editDiscountCeiling * 10)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

							this.fromDateEdit = respons.data.discountCode.fromDate;
							this.toDateEdit = respons.data.discountCode.toDate;
							this.startTimeEdit = respons.data.discountCode.fromDateTime;
							this.finishTimeedit = respons.data.discountCode.toDateTime;
							this.editFirstOrder = respons.data.discountCode.firstOrderUse;
							this.editUseCount = respons.data.discountCode.maxUse;
							this.discountId = respons.data.discountCode.id;
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
			editDiscountCode() {
				if (this.editDiscountRate <= 100) {
					this.editDiscountCeiling = this.editDiscountCeiling.replace(",", "");
					const data = {
						Id: this.discountId,
						FromDate: this.fromDateEdit,
						ToDate: this.toDateEdit,
						FromTime: this.startTimeEdit,
						ToTime: this.finishTimeedit,
						Value: this.editDiscountRate,
						FirstOrder: this.editFirstOrder,
						MaxUse: this.editUseCount,
						Celling: parseInt(this.editDiscountCeiling) / 10,
					};
					this.$store
						.dispatch("editDiscountCodeHandle", data)
						.then((respons) => {
							this.isLoading = false;
							if (respons.data.succeed) {
								this.showEditModal = false;
								this.getDiscountsList();
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
				} else {
					this.showError = true;
				}
			},
			setFirstOrder() {
				this.firstOrder = !this.firstOrder;
			},
			setFirstOrderedit() {
				this.editFirstOrder = !this.editFirstOrder;
			},
		},
		watch: {
			fromDate: function () {
				this.getDiscountsList();
			},
			toDate: function () {
				this.getDiscountsList();
			},
			codeName: function () {
				this.codeName = this.codeName.replace(/[^A-za-z0-9]/g, "");
			},
			discountRate: function () {
				if (this.discountRate <= 100) {
					this.showError = false;
				} else {
					this.showError = true;
				}
			},
			editDiscountRate: function () {
				if (this.editDiscountRate <= 100) {
					this.showError = false;
				} else {
					this.showError = true;
				}
			},
		},
	};
</script>
<style lang="scss">
	.check-box {
		@media (max-width: 768px) {
			margin-left: 0 !important;
		}
	}
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
	.discount-list {
		background: #ffffff;
		box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
		border-radius: 20px;
		margin: 16px auto;
		.discount-filter {
			border-bottom: 0.5px solid #e4e4e4;
			display: grid;
			grid-template-columns: 80% 20%;
			padding-bottom: 15px;
			margin-bottom: 15px;
			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
			.right {
				display: grid;
				grid-template-columns: 20% 14% 14%;
				gap: 20px;
				align-items: center;
				margin-left: 15px;
				@media (max-width: 768px) {
					grid-template-columns: 1fr;
					margin-left: 0px;
				}
				.selected {
					display: flex;
					gap: 12px;

					.discount-select {
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
				.seller-name {
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
						margin: 0;
					}
				}
				label {
					font-weight: 600;
					font-size: 12px;
					color: #664eca;
					cursor: pointer;
					@media (max-width: 768px) {
						display: contents;
					}
				}
				.check {
					margin-left: 28px;
					background-color: unset;
					@media (max-width: 768px) {
						margin-bottom: 0px;
						margin-left: 0;
					}
				}

				.status-select {
					.multiselect {
						margin: 0;
					}
				}
				.sell-report {
					padding: 5% 3%;
					font-size: 14px;
					@media (max-width: 768px) {
						padding: 0.4rem 0px;
						font-size: 12px;
						margin-bottom: 20px;
					}
				}
			}
			.searchQuery {
				position: relative;
				@media (max-width: 768px) {
					width: 100%;
					input {
						&::placeholder {
							font-size: 9px;
						}
					}
				}

				.submit-search {
					position: absolute;
					left: 0.8rem;
					top: 0.4rem;
				}
				.loading-search {
					position: absolute;
					left: 5px;
					top: 5px;
				}
				.search-result {
					position: absolute;
					top: 3rem;
					z-index: 9999999999999;
					background-color: #fff;
					width: 100%;
					border: 1px solid #d2d6da;
					border-radius: 7px;
					padding: 15px 12px;
					span {
						font-size: 13px;
					}
				}
			}

			.datePicker {
				@media (max-width: 768px) {
					margin-bottom: 0;
				}
			}
			.create-discount {
				button {
					padding: 5px 0;
					font-size: 80%;
					@media (max-width: 768px) {
						width: 100%;
					}
				}
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
	}

	.check {
		margin-left: 28px;
		background-color: unset;
		@media (max-width: 768px) {
			margin-bottom: 0px;
			margin-left: 0;
		}
		label {
			font-weight: 600;
			font-size: 80%;
			color: #664eca;
			cursor: pointer;
			@media (max-width: 768px) {
				display: contents;
			}
		}
	}
	.p-dialog.discount-modal-edit {
		width: 30rem;
		height: 30rem;
		@media (max-width: 768px) {
			width: 25rem;
			height: 31rem;
		}
		.content {
			margin: 5% 10%;
			.create-discount {
				width: 35%;
				display: block;
				float: left;
			}
		}
		.input-list {
			margin-bottom: 2rem;
			.field {
				display: grid;
				grid-template-columns: 35% 65%;
				align-items: baseline;
				margin-bottom: 1rem;
				.global-input {
					padding: 0.2rem 0.8rem;
					&::placeholder {
						font-size: 12px;
						text-align: center;
					}
				}
				h6 {
					font-size: 14px;
					color: #2f2a43;
					font-weight: 500;
				}
				.flex-date {
					display: flex;
					gap: 20px;
					.form-control {
						border-radius: 8px !important;
						border-color: #b5b5b5;
						color: #b5b5b5 !important;
						&::placeholder {
							color: #b5b5b5 !important;
						}
					}
				}
			}
		}
	}
	.p-dialog.discount-modal {
		width: 30rem;
		height: 33rem;
		@media (max-width: 768px) {
			width: 25rem;
			height: 34rem;
		}
		.content {
			margin: 5% 10%;
			.create-discount {
				width: 35%;
				display: block;
				float: left;
			}
		}
		.input-list {
			margin-bottom: 2rem;
			.field {
				display: grid;
				grid-template-columns: 35% 65%;
				align-items: baseline;
				margin-bottom: 1rem;
				.global-input {
					padding: 0.2rem 0.8rem;
					&::placeholder {
						font-size: 12px;
						text-align: center;
					}
				}
				h6 {
					font-size: 14px;
					color: #2f2a43;
					font-weight: 500;
				}
				.flex-date {
					display: flex;
					gap: 20px;
					.form-control {
						border-radius: 8px !important;
						border-color: #b5b5b5;
						color: #b5b5b5 !important;
						&::placeholder {
							color: #b5b5b5 !important;
						}
					}
				}
			}
		}
	}
</style>
