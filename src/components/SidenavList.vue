<template>
  <div
      class="w-auto collapse navbar-collapse khoonegi-navbar"
      id="sidenav-collapse-main"
  >
    <!--    v-if="isAdmin"-->
    <!--    <ul class="navbar-nav">-->
    <!--      &lt;!&ndash;  get access list from server  &ndash;&gt;-->
    <!--      <li class="nav-item counter-menu" v-for="accessAdmin in adminAccessList" :key="accessAdmin">-->
    <!--        <span class="count" v-if="accessAdmin.name == 'محصولات' && productCount > 0">-->
    <!--          {{ productCount }}-->
    <!--        </span>-->
    <!--        <span class="count" v-if="accessAdmin.name == 'تیکت ها' && ticketCount > 0">-->
    <!--            {{ ticketCount }}-->
    <!--        </span>-->
    <!--       <sidenav-collapse-->
    <!--            :navText="accessAdmin.name"-->
    <!--            :to="{ name: accessAdmin.name }">-->
    <!--          <template v-slot:icon>-->
    <!--            <icon :name="accessAdmin.route"/>-->
    <!--          </template>-->
    <!--        </sidenav-collapse>-->
    <!--      </li>-->
    <!--    </ul>-->
    <ul class="navbar-nav">
      <!--        get access list from server-->
      <li class="nav-item counter-menu"  v-for="access in accessList" :key="access">
        <span class="count" v-if="access.indexName == 'محصولات' && productCount > 0">
          {{ productCount }}
        </span>
        <span class="count" v-if="access.indexName == 'تیکت ها' && ticketCount > 0">
            {{ ticketCount }}
        </span>
        <span class="count" v-if="access.indexName == 'لغو سفارشات' && ProcessTicketCount > 0">
            {{ ProcessTicketCount }}
        </span>
        <sidenav-collapse
            v-if="access.isAccess"
            :navText="access.indexName"
            :to="{ name: access.indexName }"
        >
          <template v-slot:icon>
            <icon :name="access.routeName"/>
          </template>
        </sidenav-collapse>
      </li>


      <!--      &lt;!&ndash; old menu list &ndash;&gt;-->
      <!--      <div>-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;					navText="اطلاعات میزبان"&ndash;&gt;-->
      <!--  &lt;!&ndash;					:to="{ name: 'اطلاعات میزبان' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;				>&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="InfoChef" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item counter-menu">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <span class="count" v-if="productCount > 0">&ndash;&gt;-->
      <!--  &lt;!&ndash;          {{productCount}}&ndash;&gt;-->
      <!--  &lt;!&ndash;        </span>&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="لیست محصولات" :to="{ name: 'لیست محصولات' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="ProductList" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="ارتقاء برند" :to="{ name: 'ارتقاء برند' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="brandPromotion" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item counter-menu">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <span class="count" v-if="ticketCount > 0">&ndash;&gt;-->
      <!--  &lt;!&ndash;          {{ticketCount}}&ndash;&gt;-->
      <!--  &lt;!&ndash;        </span>&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="تیکت ها"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'تیکت ها' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="support" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="منو" :to="{ name: 'منو' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="menuHost" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="گزارش مالی پشتیبان" :to="{ name: 'گزارش مالی پشتیبان' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="financial" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="اطلاع از موجودی " :to="{ name: 'اطلاع از موجودی ' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="inventoryInfoSeller" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="گزارش جامع تولید"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'گزارش جامع تولید' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="ComprehensiveProductionReport" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="دسته بندی" :to="{ name: 'دسته بندی' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="category" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="گزارش جامع محصول" :to="{ name: 'گزارش جامع محصول' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="ComprehensiveProductReport" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="mt-3 nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<h6&ndash;&gt;-->
      <!--  &lt;!&ndash;					class="&ndash;&gt;-->
      <!--  &lt;!&ndash;						nav-link&ndash;&gt;-->
      <!--  &lt;!&ndash;						text-xs&ndash;&gt;-->
      <!--  &lt;!&ndash;						ps-4&ndash;&gt;-->
      <!--  &lt;!&ndash;						ms-2&ndash;&gt;-->
      <!--  &lt;!&ndash;						text-uppercase&ndash;&gt;-->
      <!--  &lt;!&ndash;						font-weight-bolder&ndash;&gt;-->
      <!--  &lt;!&ndash;						opacity-6&ndash;&gt;-->
      <!--  &lt;!&ndash;						ms-2&ndash;&gt;-->
      <!--  &lt;!&ndash;					"&ndash;&gt;-->
      <!--  &lt;!&ndash;				>&ndash;&gt;-->
      <!--  &lt;!&ndash;					بخش مشتریان&ndash;&gt;-->
      <!--  &lt;!&ndash;				</h6>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;					navText="اطلاعات مشتریان"&ndash;&gt;-->
      <!--  &lt;!&ndash;					:to="{ name: 'اطلاعات مشتریان' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;				>&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="customerInfo" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;					navText="گزارش جامع مشتری"&ndash;&gt;-->
      <!--  &lt;!&ndash;					:to="{ name: 'گزارش جامع مشتری' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;				>&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="reportCustomer" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse navText="گزارش مالی" :to="{ name: 'گزارش مالی' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="financial" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse navText="پرداخت آنلاین مشتریان" :to="{ name: 'پرداخت آنلاین مشتریان' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="financial" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse navText="اعتبار مشتریان" :to="{ name: 'اعتبار مشتریان' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="financial" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse navText="لغو سفارشات" :to="{ name: 'لغو سفارشات' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="financial" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="گزارش جامع فروش"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'گزارش جامع فروش' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="ComprehensiveSalesReport" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="لیست سفارشات"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'لیست سفارشات' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="orders" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse navText="بازخورد" :to="{ name: 'بازخورد' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="feedback" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="گزارش RFM"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'گزارش RFM' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="rfmReport" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="اطلاع از موجودی"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'اطلاع از موجودی' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="inventoryInfo" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="تخفیفات" :to="{ name: 'تخفیفات' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="discount" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="نوتیفای" :to="{ name: 'نوتیفای' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="notify" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse navText="بارگذاری بنر" :to="{ name: 'بارگذاری بنر' }">&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="uploadBanner" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;			<li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;				<sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;					navText="بارگذاری بنر میزبان"&ndash;&gt;-->
      <!--  &lt;!&ndash;					:to="{ name: 'بارگذاری بنر میزبان' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;				>&ndash;&gt;-->
      <!--  &lt;!&ndash;					<template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;						<icon name="uploadBanner" />&ndash;&gt;-->
      <!--  &lt;!&ndash;					</template>&ndash;&gt;-->
      <!--  &lt;!&ndash;				</sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;			</li>&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;      <li class="nav-item">&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;				<sidenav-collapse&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					navText="رمزیاب"&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					:to="{ name: 'رمزیاب' }"&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;				>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					<template v-slot:icon>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;						<icon name="passwordFinder" />&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					</template>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;				</sidenav-collapse>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;			</li>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;      <li class="nav-item">&ndash;&gt;-->
      <!--  &lt;!&ndash;        <sidenav-collapse&ndash;&gt;-->
      <!--  &lt;!&ndash;            navText="دسترسی ها"&ndash;&gt;-->
      <!--  &lt;!&ndash;            :to="{ name: 'دسترسی ها' }"&ndash;&gt;-->
      <!--  &lt;!&ndash;        >&ndash;&gt;-->
      <!--  &lt;!&ndash;          <template v-slot:icon>&ndash;&gt;-->
      <!--  &lt;!&ndash;            <icon name="accessUsers" />&ndash;&gt;-->
      <!--  &lt;!&ndash;          </template>&ndash;&gt;-->
      <!--  &lt;!&ndash;        </sidenav-collapse>&ndash;&gt;-->
      <!--  &lt;!&ndash;      </li>&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;      <li class="nav-item">&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;				<sidenav-collapse&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					navText="سفارش جدید"&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					:to="{ name: 'سفارش جدید' }"&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;				>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					<template v-slot:icon>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;						<icon name="newFactor" />&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;					</template>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;				</sidenav-collapse>&ndash;&gt;&ndash;&gt;-->
      <!--  &lt;!&ndash;&lt;!&ndash;			</li>&ndash;&gt;&ndash;&gt;-->

      <!--</div>-->
    </ul>
    <button class="nav-link logout mx-3" @click="logOut">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="20"
          viewBox="0 0 25 20"
          fill="none"
      >
        <path
            d="M8.03543 3.18182L8.03543 9.09091H16.1271C16.3639 9.09091 16.591 9.18669 16.7584 9.35717C16.9259 9.52766 17.02 9.75889 17.02 10C17.02 10.2411 16.9259 10.4723 16.7584 10.6428C16.591 10.8133 16.3639 10.9091 16.1271 10.9091H8.03543V16.8182C8.03632 17.6618 8.36585 18.4706 8.95172 19.0671C9.53759 19.6636 10.3319 19.9991 11.1605 20H21.8749C22.7035 19.9991 23.4978 19.6636 24.0837 19.0671C24.6696 18.4706 24.9991 17.6618 25 16.8182L25 3.18182C24.9991 2.33822 24.6696 1.52944 24.0837 0.932929C23.4978 0.336418 22.7035 0.000901805 21.8749 -5.96046e-07H11.1605C10.3319 0.000901805 9.53759 0.336418 8.95172 0.932929C8.36585 1.52944 8.03632 2.33822 8.03543 3.18182V3.18182ZM3.04819 9.09091L5.98797 6.09716C6.14834 5.92528 6.23643 5.69642 6.23345 5.45936C6.23047 5.22231 6.13666 4.99582 5.97201 4.82818C5.80736 4.66054 5.58491 4.56502 5.35209 4.56199C5.11926 4.55895 4.89448 4.64864 4.72567 4.81193L0.26131 9.35739C0.0939902 9.52786 1.77146e-07 9.759 1.77146e-07 10C1.77146e-07 10.241 0.0939902 10.4721 0.26131 10.6426L4.72567 15.1881C4.89448 15.3514 5.11926 15.441 5.35209 15.438C5.58491 15.435 5.80736 15.3395 5.97201 15.1718C6.13666 15.0042 6.23047 14.7777 6.23345 14.5406C6.23643 14.3036 6.14834 14.0747 5.98797 13.9028L3.04819 10.9091L8.03543 10.9091V9.09091L3.04819 9.09091Z"
            fill="#2F2A43"
        />
      </svg>
      <span>خروج</span>
    </button>
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SidenavCollapse from "./SidenavCollapse.vue";
import {mapMutations} from "vuex";

export default {
  name: "SidenavList",
  props: {
    cardBg: String,
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active",
      ticketCount: 0,
      productCount: 0,
      ProcessTicketCount: 0,
      supportId: "",
      accessList: [],
      adminAccessList: [
        {
          name: "میزبانان",
          route: "InfoChef"
        },
        {
          name: "محصولات",
          route: "ProductList"
        },
        {
          name: "ارتقاء برند",
          route: "brandPromotion"
        },
        {
          name: "تیکت ها",
          route: "support"
        },
        {
          name: "منو",
          route: "menuHost"
        },
        {
          name: "اطلاعات مشتریان",
          route: "customerInfo"
        },
        {
          name: "سفارشات",
          route: "orders"
        },
        // {
        //   name: "سفارش جدید",
        //   route: "newFactor"
        // },
        {
          name: "بازخورد",
          route: "feedback"
        },
        {
          name: "نوتیفای",
          route: "notify"
        },
        {
          name: "گزارش مالی پشتیبان",
          route: "financial"
        },
        {
          name: "اطلاع از موجودی ",
          route: "inventoryInfoSeller"
        },
        {
          name: "گزارش جامع تولید",
          route: "ComprehensiveProductionReport"
        },
        {
          name: "دسته بندی",
          route: "category"
        },
        {
          name: "گزارش جامع محصول",
          route: "ComprehensiveProductReport"
        },

        {
          name: "گزارش جامع مشتری",
          route: "reportCustomer"
        },
        {
          name: "گزارش مالی",
          route: "financial"
        },
        {
          name: "سفارشات مرجوعی",
          route: "returnOrders"
        },
        {
          name: "پرداخت آنلاین مشتریان",
          route: "financial"
        },
        {
          name: "اعتبار مشتریان",
          route: "financial"
        },
        {
          name: "لغو سفارشات",
          route: "financial"
        },
        {
          name: "گزارش جامع فروش",
          route: "ComprehensiveSalesReport"
        },
        {
          name: "گزارش RFM",
          route: "rfmReport"
        },
        {
          name: "اطلاع از موجودی",
          route: "inventoryInfo"
        },
        {
          name: "تخفیفات",
          route: "discount"
        },
        {
          name: "بارگذاری بنر",
          route: "uploadBanner"
        },
        {
          name: "بارگذاری بنر میزبان",
          route: "uploadBanner"
        },
        {
          name: "اعتبارات",
          route: "creadits"
        },
        {
          name: "دسترسی ها",
          route: "accessUsers"
        },
        {
          name: "بهداشت و سلامت",
          route: "health"
        },
        // {
        //   name: "اطلاعات میزبان",
        //   route: "InfoChef"
        // },
        // {
        //   name: "اطلاعات میزبان",
        //   route: "InfoChef"
        // },
      ],
      isAdmin: false,
    };
  },
  components: {
    Icon,
    SidenavCollapse,
  },
  mounted() {
    this.getTicketCount();
    this.getProductCount();
    this.getAccessList();
    this.getProcessTicket();
  },

  methods: {
    getAccessList() {
      var token = localStorage.getItem("token");
      if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var idUser = JSON.parse(jsonPayload);
        this.supportId = idUser.entityId;
        localStorage.setItem("supportId", idUser.entityId);
        // input data
        let data = {
          SupportId: this.supportId,
        };
        this.$store
            .dispatch("routeAccessV1", data)
            .then((respons) => {
              console.log(respons);
              // if (respons.data.succeed) {
              //   this.isAdmin = respons.data.fullAuthorization;
              this.accessList = respons.data;
              // this.accessList.forEach((subAccess) => {
              //   subAccess.access.forEach((access)=>{
              //     console.log(access)
              //   })
              // })
              // } else {
              //   this.toast.error(respons.data.message, {
              //     position: "bottom-center",
              //     timeout: 3000,
              //     icon: true,
              //     rtl: true,
              //   });
              // }
            })
            .catch((error) => {
              this.$store.dispatch("handleError", error);
              this.toast.error("خطا در اتصال!", {
                position: "bottom-center",
                timeout: 3000,
                icon: true,
                rtl: true,
              });
              console.log(error);
            });
      }

    },
    getTicketCount() {
      this.$store.dispatch("unreadTicksCount").then((respons) => {
        this.ticketCount = respons.data.unreadTicksCount;
      });
    },
    getProductCount() {
      this.$store.dispatch("unreadProductCount").then((respons) => {
        this.productCount = respons.data.changedProductsCount;
      });
    },
    getProcessTicket() {
      this.$store.dispatch("unreadProcessTicketCountApi").then((respons) => {
        console.log(respons)
        this.ProcessTicketCount = respons.data;
      });
    },
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    logOut() {
      this.loggedOut();
      this.$router.push({name: "Login"});
    },
    ...mapMutations(["loggedOut"]),
  },
};
</script>

<style lang="scss">
.counter-menu {
  position: relative;

  .count {
    position: absolute;
    background: #ffa460;
    left: 30px;
    top: 18px;
    color: #fff;
    border-radius: 50px;
    width: 23px;
    height: 23px;
    text-align: center;
  }
}

.logout {
  margin-top: 2rem;

  span {
    margin-right: 20px;
  }
}

.navbar-nav {
  padding: 0;
}

.khoonegi-navbar::-webkit-scrollbar {
  width: 3px;
}

/* Track */
.khoonegi-navbar::-webkit-scrollbar-track {
  background: unset;
}

/* Handle */
.khoonegi-navbar::-webkit-scrollbar-thumb {
  background: #bebebe;
  border-radius: 10px;
}

/* Handle on hover */
.khoonegi-navbar::-webkit-scrollbar-thumb:hover {
  background: rgb(131, 131, 131);
}

</style>
