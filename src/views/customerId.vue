<template>
	<div
		class="nav-wrapper customerId position-relative end-0 py-3 px-4 mx-4"
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
					{{ tab.name }}
				</button>
			</li>
		</ul>
		<div class="tab-content" id="myTabContent">
			<!-- profile -->
			<div
				class="tab-pane fade show active"
				id="profile"
				role="tabpanel"
				aria-labelledby="profile-tab"
			>
				<div class="profile-item">
					<div class="item">
						<label class="mb-2">نام و نام خانوادگی:</label>
						<input class="global-input" type="text" v-model="name" disabled />
					</div>
					<div class="item">
						<label class="mb-2">شماره همراه:</label>
						<input
							class="global-input"
							type="number"
							v-model="phoneNumber"
							disabled
						/>
					</div>
					<div class="item">
						<label class="mb-2">شماره ملی:</label>
						<input
							class="global-input"
							type="number"
							v-model="nationalCode"
							disabled
						/>
					</div>
					<div class="item">
						<label class="mb-2">تاریخ ثبت نام:</label>
						<input
							style="text-align: left"
							class="global-input"
							type="text"
							v-model="createDate"
							disabled
						/>
					</div>
					<div class="item">
						<label class="mb-2">مبلغ سفارشات(ریال):</label>
						<input
							style="text-align: left"
							class="global-input"
							type="text"
							v-model="orderPrice"
							disabled
						/>
					</div>

					<div class="item">
						<label class="mb-2">اعتبار(ریال):</label>
						<input
							style="text-align: left"
							class="global-input"
							type="text"
							v-model="credit"
							disabled
						/>
					</div>
				</div>
				<div class="profile-item-2">
					<div class="item-2 box-right">
						<div class="item IdentifierCode">
							<label class="mb-2">کد رابط معرف:</label>
							<input
								class="global-input"
								type="number"
								v-model="refrenceCode"
								disabled
							/>
						</div>
						<div class="item orderCount">
							<label class="mb-2">تعداد سفارشات:</label>
							<input
								class="global-input"
								type="number"
								v-model="orderCount"
								disabled
							/>
						</div>
						<div class="item addressLine">
							<label class="mb-2">آدرس:</label>
							<textarea
								class="global-input textarea-global"
								v-model="address"
								disabled
							/>
						</div>
					</div>
					<div class="item-2">
						<div class="item">
							<label class="mb-2">نقشه:</label>
<!--							<iframe-->
<!--								height="250rem"-->
<!--								width="100%"-->
<!--								id="gmap_canvas"-->
<!--								:src="`https://maps.google.com/maps?q=${latitude},${Longitude}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
<!--								frameborder="0"-->
<!--								scrolling="no"-->
<!--								marginheight="0"-->
<!--								marginwidth="0"-->
<!--								style="-->
<!--									border-radius: 7px;-->
<!--									border: 1px solid rgba(159, 159, 181, 0.5);-->
<!--								"-->
<!--							></iframe>-->
              <iframe
                  ref="iframeContent"
                  type="text/html"
                  style="
								border-radius: 7px;
								border: 1px solid rgba(159, 159, 181, 0.5);
							"
                  :class="NewLatLong ? 'NewChanged' : ''"
                  frameborder="0"
                  height="250rem"
                  width="100%"

                  :src="`https://map.ir/lat/${latitude}/lng/${Longitude}/z/17/p/من اینجام`"
              ></iframe>
						</div>
					</div>
				</div>
			</div>
			<!-- address -->
			<div
				class="tab-pane fade"
				id="address"
				role="tabpanel"
				aria-labelledby="address-tab"
			>
				<table-lite
					class="table-address"
					v-if="windowWith > 768"
					:is-slot-mode="true"
					:columns="columnsAddress"
					:rows="addressList"
					:total="totalRecordCount"
					:sortable="false"
					@do-search="doSearch"
					@is-finished="isLoading = false"
					:is-hide-paging="true"
					:messages="message"
				>
					<template v-slot:showMap="item">
						<button
							class="showMap"
							@click="
								showMap(
									item.value.latitude,
									item.value.longitude,
									item.value.address
								)
							"
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
						</button>
					</template>
					<template v-slot:isDefault="item">
						<input
							class="check-box isDefault"
							type="checkbox"
							v-model="item.value.isDefault"
						/>
					</template>
				</table-lite>
				<div v-else-if="windowWith <= 768" class="table-info-mobile">
					<div v-if="addressList">
						<div class="info-item" v-for="(item, i) in addressList" :key="i">
							<div>
								<div class="item">
									<span class="item-head">ردیف</span>
									<p class="item-data">{{ item.row }}</p>
								</div>
								<div class="item">
									<span class="item-head">آدرس </span>
									<p class="item-data">{{ item.address }}</p>
								</div>
								<div class="item">
									<span class="item-head">آدرس پیشفرض</span>
									<p class="item-data">
										<input
											class="check-box isDefault"
											type="checkbox"
											v-model="item.isDefault"
										/>
									</p>
								</div>
								<div class="item" style="margin-bottom: 25px">
									<span class="item-head">نمایش نقشه</span>
									<p class="item-data">
										<button
											class="showMap"
											@click="
												showMap(item.latitude, item.longitude, item.address)
											"
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
										</button>
									</p>
								</div>
							</div>
						</div>
					</div>
					<div v-else class="text-center">در حال حاضر محصول موجود نمی‌باشد</div>
				</div>
			</div>
			<!-- orders list -->
			<div
				class="tab-pane fade order-table"
				id="orders"
				role="tabpanel"
				aria-labelledby="orders-tab"
			>
				<div class="order-filter">
					<Multiselect
						class="status-select"
						v-model="orderStatus"
						:options="this.$store.state.orderStatus"
						placeholder="وضعیت"
						label="title"
						track-by="value"
					/>
					<date-picker
						color="#664ECA"
						class="datePicker fromDate"
						placeholder="از تاریخ"
						v-model="fromDateOrder"
            auto-submit
					></date-picker>
					<date-picker
						color="#664ECA"
						class="datePicker toDate"
						placeholder="تا تاریخ"
						v-model="toDateOrder"
            auto-submit
					></date-picker>
				</div>
				<div class="table-custom" v-if="windowWith > 768">
					<div class="table-head">
						<ul>
							<li v-for="(item, i) in columnsOrder" :key="i">
								{{ item.label }}
							</li>
						</ul>
					</div>
					<div v-if="orderList.length" class="table-body">
						<div
							v-for="(item, i) in orderList"
							:key="i"
							:id="'styleList' + i"
							class="order-box"
						>
							<ul :id="'styleRow' + i" class="styleRow">
								<li>{{ item.row }}</li>
								<li>{{ item.sellerName }}</li>
								<li>{{ item.date }}</li>
								<li>{{ item.deliveryTime }}</li>
								<li>
									{{
										(item.productPrice * 10)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</li>
								<li>{{ item.orderStatusDescription }}</li>
								<li>
									<button
										@click="showDetails(i, item.id)"
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
												<span>نام مشتری:</span>
												<i>{{ item.orderId }}</i>
											</li>
											<li>
												<span>نام میزبان:</span>
												<i>{{ item.sellerName }}</i>
											</li>
											<li>
												<span>شماره تماس:</span>
												<i>{{ item.phoneNumber }}</i>
											</li>
											<li>
												<span>تاریخ و زمان دریافت:</span>
												<i>{{ item.deliveryTime }}</i>
											</li>
											<li>
												<span>وضعیت:</span>
												<i>{{ item.orderStatusDescription }}</i>
											</li>
											<li>
												<span>شماره سفارش:</span>
												<i>{{ item.orderId }}</i>
											</li>
											<li>
												<span>تاریخ و زمان ثبت سفارش:</span>
												<i>{{ item.date }}</i>
											</li>
											<li>
												<span>هزینه توزیع:</span>
												<i>{{ (item.distribution * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</i>
											</li>
											<li>
												<span>نوع توزیع:</span>
												<i>{{ item.distributionType }}</i>
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
													<li>{{ (col.price * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</li>
													<li>{{ col.orderCount }}</li>
													<li>{{ (col.totalPrice * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</li>
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
														<span class="title">تخفیف کل </span>
														<span class="content">{{
                                item.discountPrice
														}}</span>
													</div>
													<div class="price" style="border-bottom: none">
														<span class="title">مبلغ کل </span>
														<span style="text-align: left"
															>{{ item.productPrice }}
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
											<button
												class="show-map"
												@click="
													getMapDetail(
														item.latitude,
														item.longitude,
														item.addressLine
													)
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
					<div v-else class="text-center mt-4">
						در حال حاضر سفارشی ثبت نشده است
					</div>
				</div>
				<div v-else-if="windowWith <= 768" class="table-info-mobile">
					<div v-if="orderList.length">
						<div class="info-item" v-for="(item, i) in orderList" :key="i">
							<div class="item">
								<span class="item-head">ردیف</span>
								<p class="item-data">{{ item.row }}</p>
							</div>
							<div class="item">
								<span class="item-head">نام میزبان </span>
								<p class="item-data">{{ item.sellerName }}</p>
							</div>
							<div class="item">
								<span class="item-head">تاریخ سفارش</span>
								<p class="item-data">{{ item.date }}</p>
							</div>
							<div class="item">
								<span class="item-head">زمان دریافت</span>
								<p class="item-data">{{ item.deliveryTime }}</p>
							</div>
							<div class="item">
								<span class="item-head">مبلغ سفارش (ریال)</span>
								<p class="item-data">
									{{
										(item.productPrice * 10)
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</p>
							</div>
							<div class="item">
								<span class="item-head">وضعیت</span>
								<p class="item-data">
									{{ item.orderStatusDescription }}
								</p>
							</div>
							<div class="item">
								<span class="item-head">نمایش سفارش</span>
								<p class="item-data">
									<button
										@click="showDetailsMobile(i, item.id)"
										:id="'eye' + i"
										class="eye"
										data-bs-toggle="collapse"
										:data-bs-target="`#col${i}`"
									>
										<svg
											style="display: block"
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="18"
											viewBox="0 0 22 18"
											fill="none"
											:id="'iconEyeM' + i"
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
											<span class="item-head">نام مشتری:</span>
											<p class="item-data">{{ item.name }}</p>
										</div>
										<div class="item">
											<span class="item-head">نام میزبان:</span>
											<p class="item-data">{{ item.sellerName }}</p>
										</div>
										<div class="item">
											<span class="item-head">شماره تماس:</span>
											<p class="item-data">
												{{ item.phoneNumber }}
											</p>
										</div>
										<div class="item">
											<span class="item-head">تاریخ و زمان دریافت:</span>
											<p class="item-data">
												{{ item.deliveryTime }}
											</p>
										</div>
										<div class="item">
											<span class="item-head">وضعیت:</span>
											<p class="item-data">
												{{ item.orderStatusDescription }}
											</p>
										</div>
										<div class="item">
											<span class="item-head">شماره سفارش:</span>
											<p class="item-data">{{ item.orderId }}</p>
										</div>
										<div class="item">
											<span class="item-head">تاریخ و زمان ثبت سفارش:</span>
											<p class="item-data">{{ item.date }}</p>
										</div>
										<div class="item">
											<span class="item-head">هزینه توزیع:</span>
											<p class="item-data">
												{{ (item.distribution * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
											</p>
										</div>
										<div class="item">
											<span class="item-head">نوع توزیع:</span>
											<p class="item-data">
												{{ item.distributionType }}
											</p>
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
										class="card-body p-0 pt-4 pb-4"
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
											<span class="item-head">مبلغ واحد (ریال)</span>
											<p class="item-data">{{ (col.price * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</p>
										</div>
										<div class="item">
											<span class="item-head">تعداد</span>
											<p class="item-data">{{ col.orderCount }}</p>
										</div>
										<div class="item">
											<span class="item-head">مبلغ سفارش (ریال)</span>
											<p class="item-data">
												{{ (col.productPrice * 10)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
											</p>
										</div>
										<div class="item mt-5 mb-3 pb-3 border-bottom">
											<span class="item-head">تخفیف کل</span>
											<p class="item-data text-danger">
												{{ item.discountPrice }}
											</p>
										</div>

										<div class="item mb-4">
											<span class="item-head">مبلغ کل</span>
											<p class="item-data">
												{{ item.productPrice }}
											</p>
										</div>
									</div>
									<div class="card-body card-footer pt-0">
										<div class="item" style="margin-top: 1rem">
											<span class="item-head">توضیحات:</span>
											<p class="item-data">
												{{ item.description }}
											</p>
										</div>
										<div class="item">
											<span class="item-head">آدرس:</span>
											<p class="item-data">
												{{ item.addressLine }}
											</p>
										</div>

										<div style="text-align: left">
											<button
												class="show-map"
												@click="
													getMapDetail(
														item.latitude,
														item.longitude,
														item.addressLine
													)
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
			</div>
			<!-- credit list -->
			<div
				class="tab-pane credit-list fade"
				id="credit"
				role="tabpanel"
				aria-labelledby="credit-tab"
			>
				<div v-if="creditValue" class="credit-value">
					<span>اعتبار: </span>
					{{ creditValue ? creditValue : "0" }}
				</div>
				<div class="credit-filter">
					<div class="selected">
						<Multiselect
							v-model="accountType"
							:options="this.$store.state.customerAccountType"
							placeholder="انتخاب نوع "
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
				</div>
				<table-lite
					class="table-credit"
					v-if="windowWith > 768"
					:is-slot-mode="true"
					:columns="columnsCredit"
					:rows="creditsList"
					:total="totalRecordCount"
					:sortable="false"
					@do-search="doSearch"
					@is-finished="isLoading = false"
					:is-hide-paging="true"
					:messages="messageMenu"
          classMain="table-csv"
				>
					<template v-slot:value="item">
						<span style="font-weight: 600">
							{{
								(item.value.value * 10)
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
							}}
						</span>
					</template>
				</table-lite>
				<div v-else-if="windowWith <= 768" class="table-info-mobile">
					<div v-if="creditsList.length">
						<div class="info-item" v-for="(item, i) in creditsList" :key="i">
							<div class="item">
								<span class="item-head">ردیف</span>
								<p class="item-data">{{ item.row }}</p>
							</div>
							<div class="item">
								<span class="item-head">تاریخ </span>
								<p class="item-data">{{ item.date }}</p>
							</div>
							<div class="item">
								<span class="item-head">نوع</span>
								<p class="item-data">{{ item.customerAccountType }}</p>
							</div>
							<div class="item">
								<span class="item-head">شماره مرجع</span>
								<p class="item-data">{{ item.referenceNo }}</p>
							</div>
							<div class="item">
								<span class="item-head">مبلغ(ریال)</span>
								<p class="item-data">
									{{
										(item.value * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
									}}
								</p>
							</div>
							<div class="item" style="margin-bottom: 25px">
								<span class="item-head">توضیحات</span>
								<p class="item-data">
									{{ item.description }}
								</p>
							</div>
						</div>
					</div>
					<div v-else class="text-center">در حال حاضر اعتبار موجود نمی‌باشد</div>
				</div>
			</div>
			<!-- feedback list-->
			<div
				class="tab-pane feedback-tab fade"
				id="feedback"
				role="tabpanel"
				aria-labelledby="feedback-tab"
			>
				<div class="feedbacks customer-feedback">
					<div class="header-feedback pb-3">
						<div class="" style="display: grid; align-items: center">
							<div class="row-grid">
								<Multiselect
									class="selected-name"
									v-model="productNameFeedback"
									:options="productListFeedback"
									placeholder="نام محصول "
									label="title"
									track-by="title"
									:searchable="true"
								/>
								<Multiselect
									class="selected-name"
									v-model="sellerNameFeedback"
									:options="sellerListFeedback"
									placeholder="نام میزبان "
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
                    >{{ item.value.statusDescription }}</khoonegi-badge
                    >
                  </span>
                </div>
							</template>
							<template v-slot:details="item">
								<button
									@click="
										$router.push(
											`/feedback/${item.value.id}/${this.$route.params.name}`
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
						<Loading :enable-loading="isLoading" />
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
												>{{ item.statusDescription }}</khoonegi-badge
											>
										</p>
									</div>
									<div class="item">
										<span class="item-head">جزئیات</span>
										<button
											@click="
												$router.push(
													`/feedback/${item.id}/${this.$route.params.name}`
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
		<Dialog v-model:visible="showMapModal" class="map-order">
			<template #header>
				<div class="header">
					<div class="address-modal">
						<span>آدرس: </span>
						<p>{{ addressModal }}</p>
					</div>
          <button @click="showMapModal = false">✘</button>
				</div>
			</template>
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

          :src="`https://map.ir/lat/${latitude}/lng/${Longitude}/z/17/p/من اینجام`"
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

          :src="`https://map.ir/lat/${latitude}/lng/${Longitude}/z/17/p/من اینجام`"
      ></iframe>
<!--			<iframe-->
<!--				v-if="windowWith > 768"-->

<!--				:src="`https://maps.google.com/maps?q=${latitudeModal},${longitudeModal}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
<!--				frameborder="0"-->
<!--				scrolling="no"-->
<!--				marginheight="0"-->
<!--				marginwidth="0"-->
<!--				style="-->
<!--					height: 21rem;-->
<!--					width: 47rem;-->
<!--					border-radius: 7px;-->
<!--					border: 1px solid rgba(159, 159, 181, 0.5);-->
<!--					margin: 4rem 3rem 0 3rem;-->
<!--				"-->
<!--			></iframe>-->
<!--			<iframe-->
<!--				v-else-if="windowWith <= 768"-->

<!--				:src="`https://maps.google.com/maps?q=${latitudeModal},${longitudeModal}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
<!--				frameborder="0"-->
<!--				scrolling="no"-->
<!--				marginheight="0"-->
<!--				marginwidth="0"-->
<!--				style="-->
<!--					height: 21rem;-->
<!--					width: 21rem;-->
<!--					border-radius: 7px;-->
<!--					border: 1px solid rgba(159, 159, 181, 0.5);-->
<!--					margin: 3rem 3rem 0 3rem;-->
<!--				"-->
<!--			></iframe>-->
			<khoonegiButton
				style="margin: 1rem 3rem; width: auto; float: left; font-size: 13px"
				class="form-button slate-not"
				text="بستن نقشه"
				@click.prevent="showMapModal = false"
			/>
		</Dialog>
		<Dialog v-model:visible="showMapModalDetail" class="map-order">
			<template #header>
				<div class="header">
					<div class="address-modal">
						<span>آدرس: </span>
						<p>{{ addressModalDetails }}</p>
					</div>
				</div>
			</template>
<!--			<iframe-->
<!--				v-if="windowWith > 768"-->

<!--				:src="`https://maps.google.com/maps?q=${latitudeModalDetails},${longitudeModalDetails}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
<!--				frameborder="0"-->
<!--				scrolling="no"-->
<!--				marginheight="0"-->
<!--				marginwidth="0"-->
<!--				style="-->
<!--					height: 21rem;-->
<!--					width: 47rem;-->
<!--					border-radius: 7px;-->
<!--					border: 1px solid rgba(159, 159, 181, 0.5);-->
<!--					margin: 4rem 3rem 0 3rem;-->
<!--				"-->
<!--			></iframe>-->
<!--			<iframe-->
<!--				v-else-if="windowWith <= 768"-->

<!--				:src="`https://maps.google.com/maps?q=${latitudeModalDetails},${longitudeModalDetails}&t=&z=16&ie=UTF8&iwloc=&output=embed`"-->
<!--				frameborder="0"-->
<!--				scrolling="no"-->
<!--				marginheight="0"-->
<!--				marginwidth="0"-->
<!--				style="-->
<!--					height: 21rem;-->
<!--					width: 21rem;-->
<!--					border-radius: 7px;-->
<!--					border: 1px solid rgba(159, 159, 181, 0.5);-->
<!--					margin: 3rem 3rem 0 3rem;-->
<!--				"-->
<!--			></iframe>-->
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

          :src="`https://map.ir/lat/${latitude}/lng/${Longitude}/z/17/p/من اینجام`"
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

          :src="`https://map.ir/lat/${latitude}/lng/${Longitude}/z/17/p/من اینجام`"
      ></iframe>
			<khoonegiButton
				style="margin: 1rem 3rem; width: auto; float: left; font-size: 13px"
				class="form-button slate-not"
				text="بستن نقشه"
				@click.prevent="showMapModalDetail = false"
			/>
		</Dialog>
		<Loading
			:class="isLoading ? 'full-page-load' : ''"
			:enable-loading="isLoading"
		/>
		<page-to-top />
		<!-- table for only export csv file  -->
    <LoadingFull :enable-loading-full="isLoading"/>
		<table-lite
			class="d-none"
			:is-slot-mode="true"
			:columns="columnsCsv"
			:rows="orderList"
			:total="totalRecordCount"
			:sortable="false"
			@do-search="doSearch"
			@is-finished="isLoading = false"
			:is-hide-paging="true"
			:messages="message"
		>
		</table-lite>
	</div>
</template>

<script>
import LoadingFull from "../components/LoadingCircle";
import pageToTop from "../components/pageToTop";
	import { useToast } from "vue-toastification";
	import khoonegiButton from "@/components/khoonegiButton.vue";
	import tableLite from "../components/khoonegiTable";
	import Multiselect from "@vueform/multiselect";
	import "@vueform/multiselect/themes/default.css";
	import defaultImage from "@/assets/img/default.svg";
	import userImage from "@/assets/img/user.svg";
	import Dialog from "primevue/dialog";
	import khoonegiBadge from "@/components/khoonegiBadge.vue";

	export default {
		components: {
      LoadingFull,
			pageToTop,
			khoonegiButton,
			tableLite,
			Multiselect,
			Dialog,
			khoonegiBadge,
		},
		data() {
			return {
				defaultImage,
				userImage,
				isLoading: false,
				toast: useToast(),
				tabLinks: [
					{
						id: "profile-tab",
						name: "پروفایل",
						target: "#profile",
						controls: "profile",
						isNew: false,
						active: "active",
					},
					{
						id: "address-tab",
						name: "آدرس ها",
						target: "#address",
						controls: "address",
						isNewProfile: false,
					},
					{
						id: "orders-tab",
						name: "سفارشات",
						target: "#orders",
						controls: "orders",
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
						id: "credit-tab",
						name: "اعتبار",
						target: "#credit",
						controls: "credit",
						isNew: false,
					},
				],
				message: {
					noDataAvailable: "در حال حاضر محصول موجود نمی‌باشد",
				},
				windowWith: window.innerWidth,
				// profile data{
				isNewcontract: false,
				name: "",
				createDate: "",
				address: "",
				phoneNumber: "",
				orderPrice: "",
				credit: "",
				refrenceCode: "",
				orderCount: "",
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

				// address data {
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
				// Address list data {
				columnsAddress: [
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "آدرس",
						field: "address",
						width: "1.5%",
						sortable: false,
					},

					{
						label: "آدرس پیشفرض",
						field: "isDefault",
						width: ".6%",
						sortable: false,
					},
					{
						label: "نمایش نقشه",
						field: "showMap",
						width: "1%",
						sortable: false,
					},
				],
				addressList: [],
				condition: 0,
				prodactSellerStatus: this.$store.state.productStatus,
				latitudeModal: "",
				longitudeModal: "",
				showMapModal: false,
				addressModal: "",
				// }end
				// credit list {
				creditValue: "",
				fromDate: "",
				toDate: "",
				remain: false,
				NotRemain: false,
				prodactSellerMenu: this.$store.state.prodactSellerMenuStore,
				accountType: -1,
				creditsList: [],

				columnsCredit: [
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "تاریخ",
						field: "date",
						width: "1.5%",
						sortable: false,
					},

					{
						label: "نوع",
						field: "customerAccountType",
						width: ".6%",
						sortable: false,
					},
					{
						label: "شماره مرجع",
						field: "referenceNo",
						width: ".6%",
						sortable: false,
					},
					{
						label: "مبلغ(ریال)",
						field: "value",
						width: "1%",
						sortable: false,
					},
					{
						label: "توضیحات",
						field: "description",
						width: "1%",
						sortable: false,
					},
				],
				messageMenu: {
					noDataAvailable: "در حال حاضر اعتبار موجود نمی‌باشد",
				},
				// } end
				// order list {
				columnsOrder: [
					{
						label: " ردیف",
					},
					{
						label: "نام میزبان",
					},

					{
						label: "تاریخ سفارش",
					},
					{
						label: "زمان دریافت",
					},
					{
						label: "مبلغ سفارش (ریال)",
					},
					{
						label: "وضعیت",
					},
					{
						label: "نمایش سفارش",
					},
				],
				orderList: [],
				fromDateOrder: "",
				toDateOrder: "",
				orderDetailsList: {},
				columnsDetail: [
					{
						label: " ردیف",
					},
					{
						label: "نام محصول ",
					},

					{
						label: "مبلغ واحد (ریال)",
					},

					{
						label: "تعداد",
					},
					{
						label: "مبلغ سفارش (ریال)",
					},
				],
				showMapModalDetail: false,
				addressModalDetails: "",
				latitudeModalDetails: "",
				longitudeModalDetails: "",
				messageDelivery: {
					noDataAvailable: "در حال حاضر محدوده موجود نمی‌باشد",
				},
				expand: false,
				orderStatus: -1,
				columnsCsv: [
					{
						label: " ردیف",
						field: "row",
						width: ".2%",
						sortable: false,
					},
					{
						label: "نام مشتری ",
						field: "name",
						width: ".5%",
						sortable: false,
					},

					{
						label: "نام میزبان",
						field: "sellerName",
						width: "1%",
						sortable: false,
					},

					{
						label: "شماره تماس",
						field: "phoneNumber",
						width: "1%",
						sortable: false,
					},

					{
						label: "تاریخ و زمان دریافت",
						field: "deliveryTime",
						width: "1%",
						sortable: false,
					},
					{
						label: "وضعیت",
						field: "orderStatusDescription",
						width: "0.5%",
						sortable: false,
					},
					{
						label: "شماره سفارش",
						field: "orderId",
						width: "1.5%",
						sortable: false,
					},
					{
						label: "تاریخ و زمان ثبت سفارش",
						field: "date",
						width: "1.5%",
						sortable: false,
					},
					{
						label: "هزینه توزیع",
						field: "distribution",
						width: "1.5%",
						sortable: false,
					},
					{
						label: "نوع توزیع",
						field: "distributionType",
						width: "1.5%",
						sortable: false,
					},
					{
						label: "کد تخفیف",
						field: "discountType",
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
						label: "تخفیف کل",
						field: "discountPrice",
						width: "1.5%",
						sortable: false,
					},
					{
						label: "مبلغ کل",
						field: "productPrice",
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
        totalRecordCount: 0,
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
				productNameFeedback: "",
				productListFeedback: [],
				sellerNameFeedback: "",
				messageFeedback: {
					noDataAvailable: "در حال حاضر بازخورد موجود نمی‌باشد",
				},

				// } end
			};
		},
		mounted() {
			const data = {
				QueryString: "",
			};
			this.$store.dispatch("getSellerActive", data).then((respons) => {
				this.sellerListFeedback = respons.data;
				this.sellerListFeedback.forEach((item) => {
					item.title = item.brand;
					item.value = item.sellerId;
				});
			});
			const dataProduct = {
				SellerId: "",
				QueryString: "",
				Status: 5,
				IsTrial: false,
			};
			this.$store.dispatch("getProductList", dataProduct).then((respons) => {
				this.productListFeedback = respons.data.products;
				this.productListFeedback.forEach((item) => {
					item.title = item.productName;
					item.value = item.productId;
				});
			});
			window.addEventListener("resize", () => {
				this.windowWith = window.innerWidth;
			});
			this.$store.dispatch("getOrderStatus").then((respons) => {
        console.log(respons)
				this.$store.state.orderStatus = respons.data;
			});
			this.isLoading = true;
			try {
				this.getProfileList();
				this.getCreditsList();
				this.getAddressList();
				this.getOrderList();
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
			showDetails(value) {
				// this.getOrderDetailsList(orderId);
				this.collapseId = value;
				this.orderList.at(value).expand = !this.orderList.at(value).expand;
				this.expand = this.orderList.at(value).expand;
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
				// this.getOrderDetailsList(orderId);
				this.collapseId = value;
				this.orderList.at(value).expand = !this.orderList.at(value).expand;
				this.expand = this.orderList.at(value).expand;
				let divID = document.querySelector(`#eye${value}`);
				divID.setAttribute("aria-expanded", this.expand);
				divID.setAttribute("aria-controls", this.collapseId);
				let iconEye = document.getElementById(`iconEyeM${value}`);
				let iconEyeClose = document.getElementById(`iconEyeClose${value}`);
				// style
				let styleList = document.getElementById(`styleList${value}`);
				if (this.expand == true) {
					iconEye.style = "display:none";
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
			// get order list function
      getOrderDetailsList(orderId) {
        const data = {
          Id: orderId,
        };
        this.$store
            .dispatch("orderDetailsList", data)
            .then((respons) => {
              console.log(respons);
              if (respons.data.succeed) {
                this.isSearchLoading = false;
                this.orderDetailsList = respons.data.purchaseInvoice;
                this.orderDetailsList.discountPrice =
                    (this.orderDetailsList.discountPrice * 10)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                this.orderDetailsList.productPrice =
                    (this.orderDetailsList.productPrice * 10)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

      getOrderList() {
				const data = {
					FromDate: this.fromDateOrder,
					ToDate: this.toDateOrder,
					CustomerId: this.$route.params.id,
					OrderStatus: this.orderStatus,
				};
				this.$store
					.dispatch("orderList", data)
					.then((respons) => {
						if (respons.data.succeed) {
							this.isSearchLoading = false;
							this.orderList = respons.data.customer.orders;
							this.orderList.forEach((item) => {
								item.expand = false;
                item.items.forEach((text, index) => {
                  text.row = index;
                  text.row++;
                });
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
							timeout: 3000,
							icon: true,
							rtl: true,
						});
						this.isLoading = false;
						console.log(error);
					});
			},
			// get profile list function
			getProfileList() {
				const data = {
					CustomerId: this.$route.params.id,
				};
				this.$store
					.dispatch("profileList", data)
					.then((respons) => {
						this.isLoading = false;
						if (respons.data.succeed) {
							const info = respons.data.customer;
							this.name = info.name;
							this.phoneNumber = info.phoneNumber;
							this.nationalCode = info.nationalCode;
							this.createDate = info.createDate + " - " + info.createDateTime;
							this.orderPrice = (info.totalPayment * 10)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							this.credit = (info.credit * 10)
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							this.refrenceCode = info.parentCustomer;
							this.orderCount = info.orderCount;
							this.address = info.address;
							this.latitude = info.latitude;
							this.Longitude = info.longitude;
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

			// get credit list filter
			getCreditsList() {
				const data = {
					CustomerId: this.$route.params.id,
					AccountType: this.accountType,
					FromDate: this.fromDate,
					ToDate: this.toDate,
				};
				console.log(data);
				this.$store
					.dispatch("creditList", data)
					.then((respons) => {
						if (respons.data.succeed) {
							this.creditsList = respons.data.customer.credits;
              this.creditValue =
                  (respons.data.customer.totalCredit * 10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                  " ریال";
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
			// get delivery list
			getAddressList() {
				const data = {
					CustomerId: this.$route.params.id,
				};
				this.$store
					.dispatch("addressesList", data)
					.then((respons) => {
						if (respons.data.succeed) {
							this.addressList = respons.data.customer.addresses;
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
			showMap(lat, lng, address) {
				this.showMapModal = true;
				this.addressModal = address;
				this.latitudeModal = lat;
				this.longitudeModal = lng;
			},
			getMapDetail(lat, lng, address) {
				this.showMapModalDetail = true;
				this.addressModalDetails = address;
				this.latitudeModalDetails = lat;
				this.longitudeModalDetails = lng;
			},
			// get feedback list
			getFeedbackList() {
				const data = {
					CustomerId: this.$route.params.id,
					SellerId: this.sellerNameFeedback,
					ProductId: this.productNameFeedback,
					FromDate: this.FromDateFeedback ? this.FromDateFeedback : "1400/12/01",
					ToDate: this.toDateFeedback,
				};
				this.$store
					.dispatch("customerFeedbackList", data)
					.then((respons) => {
						console.log(respons);
						this.isLoading = false;
						if (respons.data.succeed) {
							this.isSearchLoading = false;
							this.feedbackList = respons.data.customer.comments;
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
		},
		watch: {
			condition: function () {
				this.getProductList();
			},
			accountType: function () {
				this.getCreditsList();
			},
			fromDate: function () {
				this.getCreditsList();
			},
			toDate: function () {
				this.getCreditsList();
			},
			orderStatus: function () {
				this.getOrderList();
			},
			fromDateOrder: function () {
				this.getOrderList();
			},
			toDateOrder: function () {
				this.getOrderList();
			},
			sellerNameFeedback: function () {
				this.getFeedbackList();
			},
			productNameFeedback: function () {
				this.getFeedbackList();
			},
			FromDateFeedback: function () {
				this.getFeedbackList();
			},
			toDateFeedback: function () {
				this.getFeedbackList();
			},
		},
	};
</script>
<style lang="scss">
	label {
		font-weight: 600 !important;
	}
	.customerId {
		background: #ffffff;
		box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
		border-radius: 20px;
		margin: 16px auto;

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
			position: relative;
			@media (max-width: 768px) {
				padding: 30px 0;
			}
			.credit-value {
				color: #2f2a43;
				font-size: 15px;
				position: absolute;
				left: 0;
				top: -35px;
				font-weight: 800;

				span {
					color: #979797;
          font-size: 15px;
          font-weight: 400;
				}
				@media (max-width: 768px) {
					top: 10px;
					right: 0;
				}
			}
			.table-custom {
				padding: 0;
				ul {
					display: grid;
					grid-template-columns: 7% 20% 14% 14% 15% 13% 12% 5%;
					width: 100%;
					align-items: baseline;
					li {
						text-align: center;
					}
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
							padding-top: 20px;
							margin-top: 0;
							ol {
								border-bottom: 0.5px solid #d8d6d6;
								padding-bottom: 15px !important;
								display: grid;
								grid-template-columns: 18% 15% 15% 25% 15% 12%;
								padding: 0 7% 1% 1% !important;
								row-gap: 25px;

								i {
									color: #393939;
									margin-right: 8px;
									font-weight: 700;
									font-size: 12px;
								}
								span {
									font-weight: 700;
									font-size: 12px;
									color: #664eca;
								}
							}
							.table-custom {
								padding: 10px 15% 25px 15%;

								ul {
									font-size: 12px;
									display: grid;
									grid-template-columns: 10% 25% 20% 12% 33%;
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
								display: flex;
								align-items: center;
								justify-content: space-between;
								padding: 1%;
								border-top: 1px solid #d8d6d6;
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
			.order-table {
				.order-filter {
					display: grid;
					gap: 13px;
					grid-template-columns: 12% 12% 12% 1fr;
					margin-bottom: 2rem;
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
			}
		}
		.profile-item {
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
			.textarea-global {
				height: 130px;
			}
		}
		.profile-item-2 {
			display: grid;
			grid-template-columns: 64% 28%;
			column-gap: 8%;
			row-gap: 2rem;
			margin-top: 30px;
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
			.textarea-global {
				height: 135px;
			}
			.box-right {
				display: grid;
				grid-template-columns: 44% 44%;
				grid-template-areas: "IdentifierCode orderCount" "addressLine addressLine";
				column-gap: 12%;
				.IdentifierCode {
					grid-area: IdentifierCode;
				}
				.orderCount {
					grid-area: orderCount;
				}
				.addressLine {
					grid-area: addressLine;
					margin-top: 2rem;
				}
			}
		}
		.address-item {
			display: grid;
			grid-template-columns: 31% 20% 29.3%;
			column-gap: 10%;
			row-gap: 2rem;
			@media (max-width: 768px) {
				grid-template-columns: 1fr;
			}
			img {
				max-width: 100%;
				max-height: 14.4rem !important;
				height: 100%;
				border-radius: 7px;
				border: 1px solid rgba(159, 159, 181, 0.5);
				object-fit: contain;
				@media (max-width: 768px) {
					width: 100% !important;
					max-width: 100%;
				}
			}
			.biography {
				max-height: 19.4rem;
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
					height: 150px;
					width: 188px !important;
				}
			}
			.coverImage {
				height: 230px;
				img {
					object-fit: fill;
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
		//.table-credit,
		//.table-address {
		//	margin: 0 15%;
		//}
		.credit-list {
			.credit-filter {
				display: grid;
				grid-template-columns: 1fr 1fr;
				margin-bottom: 42px;
				@media (max-width: 768px) {
					grid-template-columns: 1fr;
					margin-top: 1rem;
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
		.customer-feedback {
			.row-grid {
				grid-template-columns: 20% 16% 13% 13%;
				grid-gap: 10px;
				@media (max-width: 768px) {
					grid-template-columns: 1fr 1fr;
				}
			}
		}
	}

	.isDefault {
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
</style>
