<template>
	<div class="khoonegi khoonegi-card">
		<div class="khoonegi-card-title" v-if="title">{{ title }}</div>
		<div class="khoonegi-card-body">
			<div class="khoonegi-row">
				<div class="col-sm-12">
					<div v-if="isLoading" class="khoonegi-loading-mask">
						<div class="khoonegi-loading-content">
							<span style="color: white">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									xmlns:xlink="http://www.w3.org/1999/xlink"
									style="
										margin: auto;
										background: none;
										display: block;
										shape-rendering: auto;
									"
									width="200px"
									height="200px"
									viewBox="0 0 100 100"
									preserveAspectRatio="xMidYMid"
								>
									<g transform="translate(80,50)">
										<g transform="rotate(0)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="1"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-1.0542168674698795s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-1.0542168674698795s"
												/>
											</circle>
										</g>
									</g>
									<g transform="translate(71.21320343559643,71.21320343559643)">
										<g transform="rotate(45)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.875"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-0.9036144578313252s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-0.9036144578313252s"
												/>
											</circle>
										</g>
									</g>
									<g transform="translate(50,80)">
										<g transform="rotate(90)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.75"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-0.753012048192771s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-0.753012048192771s"
												/>
											</circle>
										</g>
									</g>
									<g
										transform="translate(28.786796564403577,71.21320343559643)"
									>
										<g transform="rotate(135)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.625"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-0.6024096385542168s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-0.6024096385542168s"
												/>
											</circle>
										</g>
									</g>
									<g transform="translate(20,50.00000000000001)">
										<g transform="rotate(180)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.5"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-0.4518072289156626s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-0.4518072289156626s"
												/>
											</circle>
										</g>
									</g>
									<g
										transform="translate(28.78679656440357,28.786796564403577)"
									>
										<g transform="rotate(225)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.375"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-0.3012048192771084s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-0.3012048192771084s"
												/>
											</circle>
										</g>
									</g>
									<g transform="translate(49.99999999999999,20)">
										<g transform="rotate(270)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.25"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="-0.1506024096385542s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="-0.1506024096385542s"
												/>
											</circle>
										</g>
									</g>
									<g transform="translate(71.21320343559643,28.78679656440357)">
										<g transform="rotate(315)">
											<circle
												cx="0"
												cy="0"
												r="4"
												fill="#664eca"
												fill-opacity="0.125"
											>
												<animateTransform
													attributeName="transform"
													type="scale"
													begin="0s"
													values="1.5 1.5;1 1"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
												/>
												<animate
													attributeName="fill-opacity"
													keyTimes="0;1"
													dur="1.2048192771084336s"
													repeatCount="indefinite"
													values="1;0"
													begin="0s"
												/>
											</circle>
										</g>
									</g>
									<!-- [ldio] generated by https://loading.io/ -->
								</svg>
							</span>
						</div>
					</div>
					<table
						class="
							khoonegi-table
							khoonegi-table-hover
							khoonegi-table-bordered
							khoonegi-table-responsive
							khoonegi-table-responsive-sm
						"
            :class="classMain"
						ref="localTable"
					>
						<thead class="khoonegi-thead">
							<tr class="khoonegi-thead-tr">
								<th
									v-if="hasCheckbox"
									class="khoonegi-thead-th khoonegi-checkbox-th"
								>
									<div>
										<input
											type="checkbox"
											class="khoonegi-thead-checkbox"
											v-model="setting.isCheckAll"
										/>
									</div>
								</th>
								<th
									v-for="(col, index) in columns"
									class="khoonegi-thead-th"
									:class="col.headerClasses"
									:key="index"
									:style="
										Object.assign(
											{ width: col.width ? col.width : 'auto' },
											col.headerStyles
										)
									"
								>
									<div
										class="khoonegi-thead-column"
										:class="{
											'khoonegi-sortable': col.sortable,
											'khoonegi-both': col.sortable,
											'khoonegi-asc':
												setting.order === col.field && setting.sort === 'asc',
											'khoonegi-desc':
												setting.order === col.field && setting.sort === 'desc',
										}"
										@click="col.sortable ? doSort(col.field) : false"
									>
										{{ col.label }}
									</div>
								</th>
							</tr>
						</thead>
						<tbody v-if="rows.length > 0" class="khoonegi-tbody">
							<template v-if="isStaticMode">
								<tr
									v-for="(row, i) in localRows"
									:key="i"
									class="khoonegi-tbody-tr"
									:class="
										typeof rowClasses === 'function'
											? rowClasses(row)
											: rowClasses
									"
								>
									<td v-if="hasCheckbox" class="khoonegi-tbody-td">
										<div>
											<input
												type="checkbox"
												class="khoonegi-tbody-checkbox"
												:ref="
													(el) => {
														rowCheckbox[i] = el;
													}
												"
												:value="row[setting.keyColumn]"
												@click="checked"
											/>
										</div>
									</td>
									<td
										v-for="(col, j) in columns"
										:key="j"
										class="khoonegi-tbody-td"
										:class="col.columnClasses"
										:style="col.columnStyles"
									>
										<div v-if="col.display" v-html="col.display(row)"></div>
										<template v-else>
											<div v-if="setting.isSlotMode && slots[col.field]">
												<slot :name="col.field" :value="row"></slot>
											</div>
											<span v-else>{{ row[col.field] }}</span>
										</template>
									</td>
								</tr>
							</template>
							<template v-else>
								<tr
									v-for="(row, i) in rows"
									:key="i"
									class="khoonegi-tbody-tr"
									:class="
										typeof rowClasses === 'function'
											? rowClasses(row)
											: rowClasses
									"
								>
									<td v-if="hasCheckbox" class="khoonegi-tbody-td">
										<div>
											<input
												type="checkbox"
												class="khoonegi-tbody-checkbox"
												:ref="
													(el) => {
														rowCheckbox[i] = el;
													}
												"
												:value="row[setting.keyColumn]"
												@click="checked"
											/>
										</div>
									</td>
									<td
										v-for="(col, j) in columns"
										:key="j"
										class="khoonegi-tbody-td"
										:class="col.columnClasses"
										:style="col.columnStyles"
									>
										<div v-if="col.display" v-html="col.display(row)"></div>
										<div v-else>
											<div v-if="setting.isSlotMode && slots[col.field]">
												<slot :name="col.field" :value="row"></slot>
											</div>
											<span v-else>{{ row[col.field] }}</span>
										</div>
									</td>
								</tr>
							</template>
						</tbody>
					</table>
				</div>
			</div>
			<div class="khoonegi-paging khoonegi-row" v-if="rows.length > 0">
				<template v-if="!setting.isHidePaging">
					<!-- <div class="khoonegi-paging-info col-sm-12 col-md-4">
						<div role="status" aria-live="polite">
							{{
								stringFormat(
									messages.pagingInfo,
									setting.offset,
									setting.limit,
									total
								)
							}}
						</div>
					</div> -->
					<!-- <div class="khoonegi-paging-change-div col-sm-12 col-md-4">
						<span class="khoonegi-paging-count-label">{{
							messages.pageSizeChangeLabel
						}}</span>
						<select
							class="khoonegi-paging-count-dropdown"
							v-model="setting.pageSize"
						>
							<option
								v-for="pageOption in pageOptions"
								:value="pageOption.value"
								:key="pageOption.value"
							>
								{{ pageOption.text }}
							</option>
						</select>
						<span class="khoonegi-paging-page-label">{{
							messages.gotoPageLabel
						}}</span>
						<select class="khoonegi-paging-page-dropdown" v-model="setting.page">
							<option
								v-for="n in setting.maxPage"
								:key="n"
								:value="parseInt(n)"
							>
								{{ n }}
							</option>
						</select>
					</div> -->
					<div
						v-if="pageSize > 9"
						class="khoonegi-paging-pagination-div col-sm-12 col-md-4"
					>
						<div class="dataTables_paginate">
							<ul class="khoonegi-paging-pagination-ul khoonegi-pagination">
								<li
									class="
										khoonegi-paging-pagination-page-li
										khoonegi-paging-pagination-page-li-first
										page-item
									"
									:class="{ disabled: setting.page <= 1 }"
								>
									<a
										class="
											khoonegi-paging-pagination-page-link
											khoonegi-paging-pagination-page-link-first
											page-link
										"
										href="javascript:void(0)"
										aria-label="Previous"
										@click="setting.page = 1"
									>
										<span aria-hidden="true">&laquo;</span>
										<span class="sr-only">First</span>
									</a>
								</li>
								<li
									class="
										khoonegi-paging-pagination-page-li
										khoonegi-paging-pagination-page-li-prev
										page-item
									"
									:class="{ disabled: setting.page <= 1 }"
								>
									<a
										class="
											khoonegi-paging-pagination-page-link
											khoonegi-paging-pagination-page-link-prev
											page-link
										"
										href="javascript:void(0)"
										aria-label="Previous"
										@click="prevPage"
									>
										<span aria-hidden="true">&lt;</span>
										<span class="sr-only">Prev</span>
									</a>
								</li>
								<li
									class="
										khoonegi-paging-pagination-page-li
										khoonegi-paging-pagination-page-li-number
										page-item
									"
									v-for="n in setting.paging"
									:key="n"
									:class="{ disabled: setting.page === n }"
								>
									<a
										class="
											khoonegi-paging-pagination-page-link
											khoonegi-paging-pagination-page-link-number
											page-link
										"
										href="javascript:void(0)"
										@click="movePage(n)"
										>{{ n }}</a
									>
								</li>
								<li
									class="
										khoonegi-paging-pagination-page-li
										khoonegi-paging-pagination-page-li-next
										page-item
									"
									:class="{ disabled: setting.page >= setting.maxPage }"
								>
									<a
										class="
											khoonegi-paging-pagination-page-link
											khoonegi-paging-pagination-page-link-next
											page-link
										"
										href="javascript:void(0)"
										aria-label="Next"
										@click="nextPage"
									>
										<span aria-hidden="true">&gt;</span>
										<span class="sr-only">Next</span>
									</a>
								</li>
								<li
									class="
										khoonegi-paging-pagination-page-li
										khoonegi-paging-pagination-page-li-last
										page-item
									"
									:class="{ disabled: setting.page >= setting.maxPage }"
								>
									<a
										class="
											khoonegi-paging-pagination-page-link
											khoonegi-paging-pagination-page-link-last
											page-link
										"
										href="javascript:void(0)"
										aria-label="Next"
										@click="setting.page = setting.maxPage"
									>
										<span aria-hidden="true">&raquo;</span>
										<span class="sr-only">Last</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</template>
			</div>
			<div class="khoonegi-row" v-else>
				<div class="khoonegi-empty-msg col-sm-12 text-center mt-3">
					{{ messages.noDataAvailable }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		defineComponent,
		ref,
		reactive,
		computed,
		watch,
		onBeforeUpdate,
		nextTick,
		onMounted,
	} from "vue";
	export default defineComponent({
		name: "table-lite",
		emits: ["return-checked-rows", "do-search", "is-finished", "get-now-page"],
		props: {
			isDetails: {
				type: Boolean,
				default: false,
			},

			//  (is data loading)
			isLoading: {
				type: Boolean,
				require: true,
			},
			//  (Whether to perform a re-query)
			isReSearch: {
				type: Boolean,
				require: true,
			},
			// Checkbox (Presence of Checkbox)
			hasCheckbox: {
				type: Boolean,
				default: false,
			},
			// Checkbox (Returns data type for checked of Checkbox)
			checkedReturnType: {
				type: String,
				default: "key",
			},
			//  (title)
			title: {
				type: String,
				default: "",
			},
			//  (Field)
			columns: {
				type: Array,
				default: () => {
					return [];
				},
			},
			//  (data)
			rows: {
				type: Array,
				default: () => {
					return [];
				},
			},
			//  (data row classes)
			rowClasses: {
				type: [Array, Function],
				default: () => {
					return [];
				},
			},
      classMain: String,
			//  (Display the number of items on one page)
			pageSize: {
				type: Number,
				default: 10,
			},
			//  (Total number of transactions)
			total: {
				type: Number,
				default: 100,
			},
			//  (Current page number)
			page: {
				type: Number,
				default: 1,
			},
			//  (Sort condition)
			sortable: {
				type: Object,
				default: () => {
					return {
						order: "id",
						sort: "asc",
					};
				},
			},
			//  (Display text)
			messages: {
				type: Object,
				default: () => {
					return {
						pagingInfo: "Showing {0}-{1} of {2}",
						pageSizeChangeLabel: "Row count:",
						gotoPageLabel: "Go to page:",
						noDataAvailable: "اطلاعات در دسترس نیست",
					};
				},
			},
			//  (Static mode(no refresh server data))
			isStaticMode: {
				type: Boolean,
				default: false,
			},
			//  (V-slot mode)
			isSlotMode: {
				type: Boolean,
				default: false,
			},
			//  (Hide paging)
			isHidePaging: {
				type: Boolean,
				default: false,
			},
			//  (Dropdown of Display the number of items on one page)
			pageOptions: {
				type: Array,
				default: () => [
					{
						value: 10,
						text: 10,
					},
					{
						value: 25,
						text: 25,
					},
					{
						value: 50,
						text: 50,
					},
				],
			},
		},
		setup(props, { emit, slots }) {
			let localTable = ref(null);
			//  (Validate dropdown's values have page-size value or not)
			let defaultPageSize =
				props.pageOptions.length > 0
					? ref(props.pageOptions[0].value)
					: ref(props.pageSize);
			if (props.pageOptions.length > 0) {
				props.pageOptions.forEach((v) => {
					if (
						Object.prototype.hasOwnProperty.call(v, "value") &&
						Object.prototype.hasOwnProperty.call(v, "text") &&
						props.pageSize == v.value
					) {
						defaultPageSize.value = v.value;
					}
				});
			}
			//  (Internal set value for components)
			const setting = reactive({
				//  (Enable slot mode)
				isSlotMode: props.isSlotMode,
				// 是否全選 (Whether to select all)
				isCheckAll: false,
				//  (Hide paging)
				isHidePaging: props.isHidePaging,
				//  (KEY field name)
				keyColumn: computed(() => {
					let key = "";
					Object.assign(props.columns).forEach((col) => {
						if (col.isKey) {
							key = col.field;
						}
					});
					return key;
				}),
				//  (current page number)
				page: props.page,
				//  (Display count per page)
				pageSize: defaultPageSize.value,
				//  (Maximum number of pages)
				maxPage: computed(() => {
					if (props.total <= 0) {
						return 0;
					}
					let maxPage = Math.floor(props.total / setting.pageSize);
					let mod = props.total % setting.pageSize;
					if (mod > 0) {
						maxPage++;
					}
					return maxPage;
				}),
				//  (The starting value of the page number)
				offset: computed(() => {
					return (setting.page - 1) * setting.pageSize + 1;
				}),
				//  (Maximum number of pages0
				limit: computed(() => {
					let limit = setting.page * setting.pageSize;
					return props.total >= limit ? limit : props.total;
				}),
				//  (Paging array)
				paging: computed(() => {
					let startPage = setting.page - 2 <= 0 ? 1 : setting.page - 2;
					if (setting.maxPage - setting.page <= 2) {
						startPage = setting.maxPage - 4;
					}
					startPage = startPage <= 0 ? 1 : startPage;
					let pages = [];
					for (let i = startPage; i <= setting.maxPage; i++) {
						if (pages.length < 5) {
							pages.push(i);
						}
					}
					return pages;
				}),
				//  (Sortable for local)
				order: props.sortable.order,
				sort: props.sortable.sort,
				pageOptions: props.pageOptions,
			});
			//  (Data rows for local)
			const localRows = computed(() => {
				// sort rows
				let property = setting.order;
				let sort_order = 1;
				if (setting.sort === "desc") {
					sort_order = -1;
				}
				let rows = props.rows;
				rows.sort((a, b) => {
					if (a[property] < b[property]) {
						return -1 * sort_order;
					} else if (a[property] > b[property]) {
						return sort_order;
					} else {
						return 0;
					}
				});
				// return sorted and offset rows
				let result = [];
				for (let index = setting.offset - 1; index < setting.limit; index++) {
					if (rows[index]) {
						result.push(rows[index]);
					}
				}
				nextTick(function () {
					//
					callIsFinished();
				});
				return result;
			});
			////////////////////////////
			//
			//  Checkbox
			//  (Checkbox related operations)
			//
			// Checkbox(Define Checkbox reference)
			const rowCheckbox = ref([]);
			if (props.hasCheckbox) {
				/**
				 *  (Execute before re-rendering)
				 */
				onBeforeUpdate(() => {
					//  (Clear all values before each update)
					rowCheckbox.value = [];
				});
				/**
				 * Checkbox (Check all checkboxes for monitoring)
				 */
				watch(
					() => setting.isCheckAll,
					(state) => {
						let isChecked = [];
						rowCheckbox.value.forEach((val, i) => {
							if (val) {
								val.checked = state;
								if (val.checked) {
									if (props.checkedReturnType == "row") {
										isChecked.push(localRows.value[i]);
									} else {
										isChecked.push(val.value);
									}
								}
							}
						});
						//  (Return the selected data on the screen)
						emit("return-checked-rows", isChecked);
					}
				);
			}
			/**
			 * Checkbox (Checkbox click event)
			 */
			const checked = () => {
				let isChecked = [];
				rowCheckbox.value.forEach((val, i) => {
					if (val && val.checked) {
						if (props.checkedReturnType == "row") {
							isChecked.push(localRows.value[i]);
						} else {
							isChecked.push(val.value);
						}
					}
				});
				//  (Return the selected data on the screen)
				emit("return-checked-rows", isChecked);
			};
			/**
			 *  (Clear all selected data on the screen)
			 */
			const clearChecked = () => {
				rowCheckbox.value.forEach((val) => {
					if (val && val.checked) {
						val.checked = false;
					}
				});
				//  (Return the selected data on the screen)
				emit("return-checked-rows", []);
			};
			////////////////////////////
			//
			//
			//  (Sorting, page change, etc. related operations)
			//
			/**
			 *(Call execution sequencing)
			 */
			const doSort = (order) => {
				let sort = "asc";
				if (order == setting.order) {
					//  (When sorting items)
					if (setting.sort == "asc") {
						sort = "desc";
					}
				}
				let offset = (setting.page - 1) * setting.pageSize;
				let limit = setting.pageSize;
				setting.order = order;
				setting.sort = sort;
				emit("do-search", offset, limit, order, sort);
				//  (Clear the selected data on the screen)
				if (setting.isCheckAll) {
					//  (It will be cleared when you cancel all selections)
					setting.isCheckAll = false;
				} else {
					if (props.hasCheckbox) {
						clearChecked();
					}
				}
			};
			/**
			 *  (Switch page number)
			 *
			 * @param page      number      (New page number)
			 * @param prevPage  number    (Current page number)
			 */
			const changePage = (page, prevPage) => {
				setting.isCheckAll = false;
				let order = setting.order;
				let sort = setting.sort;
				let offset = (page - 1) * setting.pageSize;
				let limit = setting.pageSize;
				if (!props.isReSearch || page > 1 || page == prevPage) {
					//  (Call query will only be executed if the page number is changed without re-query)
					emit("do-search", offset, limit, order, sort);
				}
			};
			//  (Monitor page switching)
			watch(() => setting.page, changePage);
			//  (Monitor manual page switching)
			watch(
				() => props.page,
				(val) => {
					if (val <= 1) {
						setting.page = 1;
						emit("get-now-page", setting.page);
					} else if (val >= setting.maxPage) {
						setting.page = setting.maxPage;
						emit("get-now-page", setting.page);
					} else {
						setting.page = val;
					}
				}
			);
			/**
			 *  (Switch display number)
			 */
			const changePageSize = () => {
				if (setting.page === 1) {
					//  changePage()
					changePage(setting.page, setting.page);
				} else {
					//  changePage()
					setting.page = 1;
					setting.isCheckAll = false;
				}
			};
			//  (Monitor display number switch)
			watch(() => setting.pageSize, changePageSize);
			/**
			 *  (Previous page)
			 */
			const prevPage = () => {
				if (setting.page == 1) {
					//  (If it is the first page, it will not be executed)
					return false;
				}
				setting.page--;
			};
			/**
			 *  (Move to the specified number of pages)
			 */
			const movePage = (page) => {
				setting.page = page;
			};
			/**
			 *  (Next page)
			 */
			const nextPage = () => {
				if (setting.page >= setting.maxPage) {
					//  (If it is equal to or greater than the maximum number of pages, no execution)
					return false;
				}
				setting.page++;
			};
			//  (Monitoring data changes)
			watch(
				() => props.rows,
				() => {
					if (props.isReSearch || props.isStaticMode) {
						setting.page = 1;
					}
					nextTick(function () {
						//  (Return the private components after the data is rendered)
						if (!props.isStaticMode) {
							callIsFinished();
						}
					});
				}
			);
			const stringFormat = (template, ...args) => {
				return template.replace(/{(\d+)}/g, function (match, number) {
					return typeof args[number] != "undefined" ? args[number] : match;
				});
			};
			// Call 「is-finished」 Method
			const callIsFinished = () => {
				if (localTable.value) {
					let localElement =
						localTable.value.getElementsByClassName("is-rows-el");
					emit("is-finished", localElement);
				}
				emit("get-now-page", setting.page);
			};
			/**
			 *  (Mounted Event)
			 */
			onMounted(() => {
				nextTick(() => {
					if (props.rows.length > 0) {
						callIsFinished();
					}
				});
			});
			if (props.hasCheckbox) {
				//  Checkbox  (When Checkbox is needed)
				return {
					slots,
					localTable,
					localRows,
					setting,
					rowCheckbox,
					checked,
					doSort,
					prevPage,
					movePage,
					nextPage,
					stringFormat,
				};
			} else {
				return {
					slots,
					localTable,
					localRows,
					setting,
					doSort,
					prevPage,
					movePage,
					nextPage,
					stringFormat,
				};
			}
		},
	});
</script>

<style lang="scss" scoped>
	.khoonegi-checkbox-th {
		width: 1%;
	}
	.khoonegi-both {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAQAAADYWf5HAAAAkElEQVQoz7X QMQ5AQBCF4dWQSJxC5wwax1Cq1e7BAdxD5SL+Tq/QCM1oNiJidwox0355mXnG/DrEtIQ6azioNZQxI0ykPhTQIwhCR+BmBYtlK7kLJYwWCcJA9M4qdrZrd8pPjZWPtOqdRQy320YSV17OatFC4euts6z39GYMKRPCTKY9UnPQ6P+GtMRfGtPnBCiqhAeJPmkqAAAAAElFTkSuQmCC");
	}
	.khoonegi-sortable {
		cursor: pointer;
		background-position: right;
		background-repeat: no-repeat;
		padding-right: 30px !important;
	}
	.khoonegi-asc {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZ0lEQVQ4y2NgGLKgquEuFxBPAGI2ahhWCsS/gDibUoO0gPgxEP8H4ttArEyuQYxAPBdqEAxPBImTY5gjEL9DM+wTENuQahAvEO9DMwiGdwAxOymGJQLxTyD+jgWDxCMZRsEoGAVoAADeemwtPcZI2wAAAABJRU5ErkJggg==);
	}
	.khoonegi-desc {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAZUlEQVQ4y2NgGAWjYBSggaqGu5FA/BOIv2PBIPFEUgxjB+IdQPwfC94HxLykus4GiD+hGfQOiB3J8SojEE9EM2wuSJzcsFMG4ttQgx4DsRalkZENxL+AuJQaMcsGxBOAmGvopk8AVz1sLZgg0bsAAAAASUVORK5CYII=);
	}
	// .khoonegi-loading-mask {
	// 	position: absolute;
	// 	z-index: 9998;
	// 	top: 0;
	// 	left: 0;
	// 	width: 100%;
	// 	height: 100%;
	// 	background-color: rgba(0, 0, 0, 0.5);
	// 	display: flex;
	// 	flex-flow: column;
	// 	transition: opacity 0.3s ease;
	// }
	.khoonegi-loading-content {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.khoonegi-card {
		position: relative;
		display: -ms-flexbox;
		display: flex;
		-ms-flex-direction: column;
		flex-direction: column;
		min-width: 0;
		word-wrap: break-word;
		background-color: #fff;
		background-clip: border-box;
	}
	select {
		width: auto;
		border: 1px solid #cccccc;
		background-color: #ffffff;
		height: auto;
		padding: 0;
		margin-bottom: 0;
	}
	.khoonegi-table {
		width: 100%;
		margin-bottom: 1rem;
		color: #212529;
		border-collapse: collapse;
	}
	th {
		text-align: inherit;
	}
	tr {
		display: table-row;
		vertical-align: inherit;
		border-color: inherit;
	}
	.khoonegi-table-bordered thead td,
	.khoonegi-table-bordered thead th {
		border-bottom-width: 2px;
	}
	.khoonegi-table thead th {
		vertical-align: bottom;
		color: #fff;
		background-color: #343a40;
		border-color: #454d55;
		border-bottom: 2px solid #dee2e6;
	}
	.khoonegi-table-bordered td,
	.khoonegi-table-bordered th {
		border: 1px solid #dee2e6;
	}
	.khoonegi-table td,
	.khoonegi-table th {
		padding: 0.75rem 0;
		vertical-align: top;
		border-top: 1px solid #dee2e6;
		vertical-align: middle;
	}
	.khoonegi-table-hover tbody tr:hover {
		color: #212529;
		//background-color: rgba(0, 0, 0, 0.075);
	}
	.khoonegi-table-responsive {
		display: block;
		width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}
	.khoonegi-table-responsive > .khoonegi-table-bordered {
		border: 0;
	}
	.khoonegi-row {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap;
	}
	.khoonegi-pagination {
		margin: 2px 0;
		white-space: nowrap;
		justify-content: flex-end;
		display: -ms-flexbox;
		display: flex;
		padding-left: 0;
		list-style: none;
		border-radius: 0.25rem;
	}
	.page-item.disabled .page-link {
		color: #6c757d;
		pointer-events: none;
		cursor: auto;
		background-color: #fff;
		border-color: #dee2e6;
	}
	.page-item:first-child .page-link {
		margin-left: 0;
		border-top-left-radius: 0.25rem;
		border-bottom-left-radius: 0.25rem;
	}
	.page-link {
		position: relative;
		display: block;
		padding: 0.5rem 0.75rem;
		margin-left: -1px;
		line-height: 1.25;
		color: #007bff;
		background-color: #fff;
		border: 1px solid #dee2e6;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	*,
	::after,
	::before {
		box-sizing: border-box;
	}
	.col-sm-12 {
		-ms-flex: 0 0 100%;
		flex: 0 0 100%;
		max-width: 100%;
	}
	.text-center {
		text-align: center;
	}
	.khoonegi-table {
		thead {
			th {
				color: #664eca;
				background-color: unset;
				border: 1px solid #e4e4e4 !important;
        //font-size: 11px;

      }
		}
		tbody {
			font-size: 13px;

			td {
				border: 1px solid #e4e4e4;
				line-height: 2rem;
			}
			tr {
				border-bottom: 0.5px solid #e9e9e9;
				&:last-child {
					border: none;
				}
			}
		}
	}
	.khoonegi-thead-th,
	.khoonegi-tbody-td {
    border: 1px solid #e4e4e4;
		text-align: center;
	}
	@media (min-width: 576px) {
		.khoonegi-table-responsive-sm {
			display: block;
			width: 100%;
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
		}
		.khoonegi-table-responsive-sm > .table-bordered {
			border: 0;
		}
		.col-md-4 {
			-ms-flex: 0 0 33.333333%;
			flex: 0 0 33.333333%;
			max-width: 33.333333%;
		}
	}
</style>
