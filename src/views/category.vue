<template>
	<div class="box position-relative end-0 py-3 px-4 mx-4">
		<div class="create-category">
			<khoonegiButton
				class="form-button mt-0 slate create-category"
				text="+  دسته بندی جدید"
				@click="showModalCreate = true"
			/>
		</div>
		<div class="category-list">
			<table-lite
				v-if="windowWith > 768"
				:is-slot-mode="true"
				:columns="columns"
				:rows="categoryList"
				:total="totalRecordCount"
				:sortable="false"
				@do-search="doSearch"
				@is-finished="isLoading = false"
				:is-hide-paging="true"
				:messages="message"
			>
				<template v-slot:isActive="item">
					<input
						class="check-box isActive"
						type="checkbox"
						v-model="item.value.isActive"
					/>
				</template>
				<template v-slot:media="item">
					<img
						v-if="item.value.media"
						class="icon-category"
						:src="item.value.media"
						alt="ندارد"
					/>

					<span v-else>ندارد</span>
				</template>
				<template v-slot:edit="item">
					<button @click="showEditCategory(item)">
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
			<div v-else-if="windowWith <= 768" class="table-info-mobile">
				<div v-if="categoryList.length">
					<div class="info-item" v-for="(item, i) in categoryList" :key="i">
						<div class="item">
							<span class="item-head">ردیف</span>
							<p class="item-data">{{ item.row }}</p>
						</div>
						<div class="item">
							<span class="item-head">نام دسته بندی</span>
							<p class="item-data">{{ item.name }}</p>
						</div>
						<div class="item">
							<span class="item-head">تاریخ ایجاد</span>
							<p class="item-data">{{ item.date }}</p>
						</div>

						<div class="item">
							<span class="item-head">فعال </span>
							<p class="item-data">
								<input
									class="check-box isActive"
									type="checkbox"
									v-model="item.isActive"
								/>
							</p>
						</div>
						<div class="item">
							<span class="item-head">اولویت نمایش</span>
							<p class="item-data">{{ item.priorityDisplay }}</p>
						</div>
						<div class="item">
							<span class="item-head">آیکن</span>
							<p class="item-data">
								<img
									v-if="item.media"
									class="icon-category"
									:src="item.media"
									alt="ندارد"
								/>
								<span v-else>ندارد</span>
							</p>
						</div>
						<div class="item mb-4">
							<span class="item-head">ویرایش</span>
							<p class="item-data">
								<button @click="showEditCategory(item)">
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
				<div v-else class="text-center">در حال حاضر منو موجود نمی‌باشد</div>
			</div>
		</div>
	</div>
	<Dialog v-model:visible="showModalCreate">
		<template #header>
			<div class="header">
				<h3>دسته بندی جدید</h3>
				<button @click="showModalCreate = false">✘</button>
			</div>
		</template>
		<form class="content" @submit.prevent="createCategorys">
			<input
				class="global-input"
				type="text"
				v-model="categoryName"
				placeholder="نام دسته بندی"
			/>
			<div
				class="image-input"
				:style="{ 'background-image': `url(${categoryMedia})` }"
				@click="chooseImage"
			>
				<div
					v-if="!categoryMedia"
					style="position: absolute; top: 2rem; font-size: 13px"
				>
					لطفا آیکن را با پسوند svg آپلود کنید
				</div>
				<button v-if="!categoryMedia" class="placeholder-add">
					افزودن آیکن
				</button>
				<input
					class="file-input"
					accept="image/png"
					ref="fileInput"
					type="file"
					@change="onSelectFile"
				/>
			</div>
			<input
				class="global-input testNumber"
				type="number"
				v-model="categoryPeriority"
				placeholder="اولویت نمایش"
			/>
<!--			<div class="last-item">-->
<!--				<span class="check">-->
<!--					<input-->
<!--						class="check-box"-->
<!--						type="checkbox"-->
<!--						id="checkTest"-->
<!--						v-model="haveTrial"-->
<!--						@click="setTrial()"-->
<!--					/>-->
<!--					<label for="checkTest">شامل تست طعم جدید</label>-->
<!--				</span>-->
<!--				<input-->
<!--					class="global-input testNumber"-->
<!--					type="number"-->
<!--					v-model="categoryCountTest"-->
<!--					placeholder="تعداد نمایش تست طعم جدید"-->
<!--				/>-->
<!--			</div>-->
			<khoonegiButton
				class="form-button mt-0 slate create-category-modal"
				text="ایجاد دسته بندی"
				:loading="isloading"
				@click="createCategory"
				:disabled="setDisable()"
			/>
		</form>
	</Dialog>
	<Dialog v-model:visible="showEditModal">
		<template #header>
			<div class="header">
				<h3>ویرایش دسته بندی</h3>
				<button @click="showEditModal = false">✘</button>
			</div>
		</template>
		<div class="content">
			<input
				:style="
					editCategoryName
						? 'color: #1c1c1c !important;border-color: #d144b1 !important;'
						: ''
				"
				class="global-input"
				type="text"
				v-model="editCategoryName"
				placeholder="نام دسته بندی"
			/>
			<div
				class="image-input"
				:style="
					editCategoryName
						? `background-image: url(${editCategoryMedia});color: #1c1c1c !important;border-color: #d144b1 !important;`
						: `background-image: url(${editCategoryMedia});`
				"
				@click="chooseImage"
			>
				<div
					v-if="!editCategoryMedia"
					style="position: absolute; top: 2rem; font-size: 13px"
				>
					لطفا آیکن را با پسوند svg آپلود کنید
				</div>
				<button v-if="!editCategoryMedia" class="placeholder-add">
					افزودن آیکن
				</button>
				<input
					class="file-input"
					accept="image/png"
					ref="fileInput"
					type="file"
					@input="onSelectFileEdit"
				/>
			</div>
			<input
				:style="
					editCategoryPeriority
						? 'color: #1c1c1c!important;border-color: #d144b1 !important;'
						: ''
				"
				class="global-input"
				type="text"
				v-model="editCategoryPeriority"
				placeholder="اولویت نمایش"
			/>
<!--			<div class="last-item">-->
<!--				<span class="check">-->
<!--					<input-->
<!--						class="check-box"-->
<!--						type="checkbox"-->
<!--						id="checkEdit"-->
<!--						v-model="editHaveTrial"-->
<!--						@click="setTrialEdit()"-->
<!--					/>-->
<!--					<label for="checkEdit">شامل تست طعم جدید</label>-->
<!--				</span>-->
<!--				<input-->
<!--					:style="-->
<!--						editCategoryCountTest > 0-->
<!--							? 'color: #1c1c1c!important;border-color: #d144b1 !important;'-->
<!--							: ''-->
<!--					"-->
<!--					class="global-input testNumber"-->
<!--					type="number"-->
<!--					v-model="editCategoryCountTest"-->
<!--					placeholder="تعداد نمایش تست طعم جدید"-->
<!--				/>-->
<!--				<span class="check" style="margin-top: 0.8rem">-->
<!--					<input-->
<!--						class="check-box"-->
<!--						type="checkbox"-->
<!--						id="checkActive"-->
<!--						v-model="editIsActive"-->
<!--						@click="setIsActiveEdit()"-->
<!--					/>-->
<!--					<label for="checkActive">فعال</label>-->
<!--				</span>-->
<!--			</div>-->
			<khoonegiButton
				class="form-button mt-0 slate create-category-modal"
				text="ویرایش دسته بندی"
				:loading="isloading"
				@click="editCategory"
				:disabled="setDisableEdit()"
			/>
		</div>
	</Dialog>
	<page-to-top />
  <LoadingFull :enable-loading-full="isLoading"/>
</template>
<script>
import LoadingFull from "../components/LoadingCircle";
	import Dialog from "primevue/dialog";
	import pageToTop from "../components/pageToTop";
	import { useToast } from "vue-toastification";
	import tableLite from "../components/khoonegiTable";
	import khoonegiButton from "@/components/khoonegiButton.vue";
	export default {
		components: {
			pageToTop,
			tableLite,
			Dialog,
			khoonegiButton,
      LoadingFull
		},
		data() {
			return {
				windowWith: window.innerWidth,
				toast: useToast(),
				columns: [
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "نام دسته بندی",
						field: "name",
						width: "1.5%",
						sortable: false,
					},

					{
						label: "تاریخ ایجاد",
						field: "date",
						width: ".6%",
						sortable: false,
					},
					{
						label: "فعال",
						field: "isActive",
						width: ".6%",
						sortable: false,
					},

					{
						label: "اولویت نمایش",
						field: "priorityDisplay",
						width: "1%",
						sortable: false,
					},

					{
						label: "آیکن",
						field: "media",
						width: "1%",
						sortable: false,
					},
					{
						label: "ویرایش",
						field: "edit",
						width: "1%",
						sortable: false,
					},
				],
				categoryList: [],
        totalRecordCount: 0,
				// edit category
				showEditModal: false,
				editCategoryName: "",
				editCategoryPeriority: "",
				editCategoryMedia: null,
				selectedEditCategoryMedia: null,
				editIsActive: false,
				editCategoryCountTest: "",
				editHaveTrial: false,
				categoryId: "",
        isLoading: false,
				isDisabledEdit: false,
				selectedCategoryMediaEdit: null,
				// create category
				isDisabled: false,
				showModalCreate: false,
				categoryName: "",
				categoryPeriority: Number,
				categoryMedia: null,
				selectedCategoryMedia: null,
				isActive: false,
				haveTrial: false,
				categoryCountTest: 10,
			};
		},
		created() {
			this.getCategoryList();
			window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
		},
		methods: {
			getCategoryList() {
        this.isLoading = true;
				this.$store
					.dispatch("getCategoryList")
					.then((respons) => {
						console.log(respons);
						if (respons.data.succeed) {
							this.categoryList = respons.data.category;
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
						this.isSearchLoading = false;
						console.log(error);
					});
			},
			showEditCategory(item) {
				this.showEditModal = true;
				this.editCategoryName = item.value.name;
				this.editCategoryPeriority = item.value.priorityDisplay;
				this.editCategoryMedia = item.value.media;
				this.editIsActive = item.value.isActive;
				this.editHaveTrial = item.value.haveTrial;
				this.categoryId = item.value.id;
				this.editCategoryCountTest = item.value.trialCount;
			},
			chooseImage() {
				this.$refs.fileInput.click();
			},
			onSelectFileEdit(event) {
				this.selectedCategoryMediaEdit = event.target.files[0];
				const input = this.$refs.fileInput;
				const files = input.files;
				if (files && files[0]) {
					const reader = new FileReader();
					reader.onload = (e) => {
						this.editCategoryMedia = e.target.result;
					};
					reader.readAsDataURL(files[0]);
					this.$emit("input", files[0]);
				}
			},
			onSelectFile(event) {
				this.selectedCategoryMedia = event.target.files[0];
        console.log(this.selectedCategoryMedia)
				const input = event.target;
				const files = input.files;
				if (files && files[0]) {
					const reader = new FileReader();
					reader.onload = (e) => {
						this.categoryMedia = e.target.result;
					};
					reader.readAsDataURL(files[0]);
					this.$emit("input", files[0]);
				}
			},
			setTrialEdit() {
				this.editHaveTrial = !this.editHaveTrial;
			},
			setTrial() {
				this.haveTrial = !this.haveTrial;
			},
			setIsActiveEdit() {
				this.editIsActive = !this.editIsActive;
			},
			setIsActive() {
				this.isActive = !this.isActive;
			},
			setDisableEdit() {
				if (
					this.isDisabledEdit ||
					this.editCategoryName <= 0 ||
					this.editCategoryMedia <= 0 ||
					this.editCategoryPeriority < 0 ||
					(this.editHaveTrial && this.editCategoryCountTest <= 0)
				) {
					return true;
				} else {
					return false;
				}
			},
			setDisable() {
				if (
					this.isDisabled ||
					this.categoryName <= 0 ||
					this.categoryMedia <= 0 ||
					this.categoryPeriority < 0 ||
					(this.haveTrial && this.categoryCountTest <= 0)
				) {
					return true;
				} else {
					return false;
				}
			},
			editCategory() {
				this.isloading = true;
				this.isDisabledEdit = true;
				var headers = new Headers();
				headers.append("Authorization", `Bearer ${this.$store.state.token}`);
				var formdata = new FormData();
				formdata.append("Name", this.editCategoryName);
				if (this.selectedCategoryMediaEdit) {
					formdata.append(
						"Media",
						this.selectedCategoryMediaEdit,
						this.selectedCategoryMediaEdit.name
					);
				} else {
					formdata.append("Media", this.editCategoryMedia);
				}
				formdata.append("Priority", this.editCategoryPeriority);
				formdata.append("HaveTrial", this.editHaveTrial);
				formdata.append("TrialCount", this.editCategoryCountTest);
				formdata.append("isActive", this.editIsActive);
				formdata.append("CategoryId", this.categoryId);
				var requestOptions = {
					method: "post",
					headers: headers,
					body: formdata,
					redirect: "follow",
				};
				console.log(formdata);
				const baseUrl = this.$store.state.baseUrl;
				fetch(`${baseUrl}Product/EditCategory`, requestOptions).then((result) => {
					return result
						.json()
						.then((respone) => {
							if (respone.succeed) {
								this.isloading = false;
								this.isDisabledEdit = false;
								this.showEditModal = false;
								this.editCategoryName = "";
								this.selectedCategoryMediaEdit = "";
								this.editCategoryPeriority = "";
								this.editHaveTrial = false;
								this.editCategoryCountTest = "";
								this.getCategoryList();
								this.toast.success(respone.message, {
									position: "bottom-center",
									timeout: 3000,
									icon: true,
									rtl: true,
								});
							} else {
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
			createCategory() {
				this.isloading = true;
				this.isDisabled = true;
				var headers = new Headers();
				headers.append("Authorization", `Bearer ${this.$store.state.token}`);
				var formdata = new FormData();
				formdata.append("Name", this.categoryName);
				formdata.append(
					"Media",
					this.selectedCategoryMedia,
					this.selectedCategoryMedia.name
				);
				formdata.append("Priority", this.categoryPeriority);
				formdata.append("HaveTrial", this.haveTrial);
				formdata.append("TrialCount", this.categoryCountTest);
				console.log(formdata);
				var requestOptions = {
					method: "PUT",
					headers: headers,
					body: formdata,
					redirect: "follow",
				};
        console.log(requestOptions)
				const baseUrl = this.$store.state.baseUrl;
				fetch(`${baseUrl}Product/AddCategory`, requestOptions).then((result) => {
					return result
						.json()
						.then((data) => {
							if (data.succeed) {
								this.isloading = false;
								this.isDisabled = false;
								this.showModalCreate = false;
								this.categoryName = "";
								this.selectedCategoryMedia = "";
								this.categoryPeriority = "";
								this.isActive = false;
								this.categoryCountTest = "";
								this.getCategoryList();
								this.toast.success(data.message, {
									position: "bottom-center",
									timeout: 3000,
									icon: true,
									rtl: true,
								});
							} else {
								this.toast.error(data.message, {
									position: "bottom-center",
									timeout: 3000,
									icon: true,
									rtl: true,
								});
							}
							return data;
						})
						.catch((error) => {
							this.isloading = false;
							this.isDisabled = false;
							this.showModalCreate = false;
							this.$store.dispatch("handleError", error);
							console.log(error);
						});
				});
			},
		},
	};
</script>
<style lang="scss">
	.testNumber::-webkit-outer-spin-button,
	.testNumber::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	.testNumber {
		text-align: right !important;
	}
	.create-category {
		button {
			padding: 4px 0 !important;
			width: 13%;
			font-size: 13px !important;
			@media (max-width: 768px) {
				width: 100%;
			}
		}
		margin-bottom: 17px;
		border-bottom: 0.5px solid #e9e9e9;
	}

	.category-list {
		.item-data {
			position: relative;
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
		.icon-category {
			width: 2rem !important;
			height: 2rem !important;
		}
	}

	.p-dialog-mask {
		background-color: rgba(0, 0, 0, 0.501);
		z-index: 99999999999999999999999 !important;
		.p-dialog {
			background: #ffffff;
			box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
			border-radius: 20px;
			width: 40rem;
			height: 30rem;
			@media (max-width: 768px) {
				height: 28rem;
			}
			.p-dialog-header {
				background: #f8f7f7;
				border-radius: 20px 20px 0px 0px;
				padding: 15px 50px;
				.header {
					width: 100%;
					display: flex;
					justify-content: space-between;
					h3 {
						color: #2f2a43;
						font-size: 16px;
						margin: 0;
					}
				}
			}
			.content {
				margin: 5% 18%;
				@media (max-width: 768px) {
					margin: 5% 8%;
				}
				.check {
					background-color: unset;
				}
				.last-item {
					display: grid;
					grid-template-columns: 1fr 1fr;
					align-items: baseline;
					@media (max-width: 768px) {
						grid-template-columns: 1fr;
						gap: 10px;
					}
				}
				.create-category-modal {
					width: 50%;
					font-size: 14px;
					float: left;
					@media (max-width: 768px) {
						float: unset;
						width: 100%;
					}
				}
			}
			.content > * {
				margin-bottom: 1.5rem;
			}
		}
	}
	.file-input {
		display: none;
	}
	.image-input {
		position: relative;
		background: #fdfeff;
		border: 1px solid rgba(170, 126, 234, 0.3);
		border-radius: 12px;
		display: flex;
		width: 100%;
		height: 150px;
		background-size: 20%;
		background-position: center center;
		background-repeat: no-repeat;
		cursor: pointer;
		text-align: center;
		align-items: center;
		justify-content: center;
		.placeholder-add {
			border: 1px solid #664eca;
			filter: drop-shadow(0px 0px 20px rgba(134, 134, 134, 0.2));
			border-radius: 7px;
			color: #664eca;
			padding: 5px 12%;
			margin-top: 2rem;
			&:hover {
				color: #fff;
				background: #664eca;
			}
		}
	}
</style>
