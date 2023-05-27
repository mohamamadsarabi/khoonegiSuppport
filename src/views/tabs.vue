<template>
  <div
    class="nav-wrapper InfoChef position-relative end-0 py-3 px-4 mx-4"
    style="direction: rtl"
  >
    <ul class="nav" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active px-0 mx-4"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          متقاضیان

          <span class="bage-tab">جدید</span>
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link px-0 mx-4"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          میزبانان
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        ...
      </div>
      <div
        class="tab-pane fade"
        id="profile"
        role="tabpanel"
        aria-labelledby="profile-tab"
      >
        ...
      </div>
      <div
        class="tab-pane fade"
        id="contact"
        role="tabpanel"
        aria-labelledby="contact-tab"
      >
        ...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {},
};
</script>
<style lang="scss" scoped>
.InfoChef {
  background: #ffffff;
  box-shadow: 0px 0px 50px rgba(216, 216, 216, 0.2);
  border-radius: 20px;
  margin: 16px auto;
}

.bage-tab {
  background: #ffa460;
  border-radius: 3px;
  color: #fff;
  font-size: 11px;
  padding: 2px;
}

.nav {
  border-bottom: 0.5px solid #bfbfbf;
}

.nav-link {
  font-weight: bold;
  color: #b9b9b9;
  &:hover {
    color: #664eca;
  }
}

.nav-link.active {
  color: #664eca;
  border-bottom: 1px solid #664eca;
}
</style>
