<template>
  <sidenav
      :custom_class="this.$store.state.mcolor"
      class="fixed-end"
      v-if="this.$store.state.showSidenav"
  />
  <main
      class="
			main-content
			position-relative
			max-height-vh-100
			h-100
			border-radius-lg
		"
      :style="this.$store.state.isRTL ? 'overflow-x: hidden' : ''"
  >
    <!-- nav -->
    <navbar
        :class="[navClasses]"
        :textWhite="this.$store.state.isAbsolute ? 'text-white opacity-8' : ''"
        :minNav="navbarMinimize"
        v-if="this.$store.state.showNavbar"
    />
    <router-view/>
  </main>
</template>
<script>
import Sidenav from "./components/index";
import Navbar from "./components/Navbar.vue";
import {mapMutations} from "vuex";

export default {
  name: "App",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Default Title",
    // all titles will be injected into this template
    titleTemplate: "%s | My Awesome Webapp",
  },
  components: {
    Sidenav,
    Navbar,
  },
  methods: {
    ...mapMutations(["toggleConfigurator", "navbarMinimize"]),
  },
  computed: {
    navClasses() {
      return {
        "position-sticky blur shadow-blur mt-4 left-auto top-1 z-index-sticky":
        this.$store.state.isNavFixed,
        "position-absolute px-4 mx-0 w-100 z-index-2":
        this.$store.state.isAbsolute,
        "px-0 mx-4 mt-4": !this.$store.state.isAbsolute,
      };
    },
  },
  beforeMount() {
    console.log(this.$router);
    this.$store.state.isTransparent = "bg-transparent";
  },
};
</script>

<style lang="scss">
@import url(assets/fonts/Yekan-bakh/fontiran.css);
//@import url(assets/fonts/FAwebfonts/khoonegi-fonts.css);
@import "./assets/scss/variables.scss";
@import "./assets/scss/global-style.scss";

* {
  font-family: Yekan Bakh FaNum, Arial, sans-serif;
  margin: 0;
  direction: rtl;
  font-weight: 600;
}

button {
  background: unset;
  border: none;
  outline: 0;
  border-radius: $radius-8;
  padding: 0;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }
}
input[type="radio"] {
  visibility: hidden;
}

input[type="radio"]::before {
  border: 2px solid gray;
  height: 1.2em;
  width: 1.2em;
  border-radius: 50%;
  display: block;
  content: " ";
  cursor: pointer;
  visibility: visible;
}

input[type="radio"]:checked ~ label {
  color: #664eca;
}

input[type="radio"]:checked::before {
  background: radial-gradient(#664eca 50%, transparent 60%);
  border: 2px solid #664eca;
}
/* width */
.p-dialog-content ::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.p-dialog-content ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.p-dialog-content ::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.p-dialog-content ::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#app {
  .main-content {
    position: fixed !important;
    display: grid;
    grid-template-rows: auto 1fr;
    width: 100%;
    overflow-y: scroll;
    @media (max-width: 768px){
      display: block;
    }
    /* width */
    &::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: unset;

    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #888;

    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    table {
      tbody {
        tr:nth-child(even) {
          background-color: #e9e9e9;
        }
      }
      //overflow-y: scroll;
      ///* width */
      //&::-webkit-scrollbar {
      //  width: 10px;
      //}
      //
      ///* Track */
      //&::-webkit-scrollbar-track {
      //  background: unset;
      //
      //}
      //
      ///* Handle */
      //&::-webkit-scrollbar-thumb {
      //  background: #888;
      //
      //}
      //
      ///* Handle on hover */
      //&::-webkit-scrollbar-thumb:hover {
      //  background: #555;
      //}
      //@media (max-width: 1440px) {
      //  max-height: 35.5rem !important;
      //}
      //@media (min-width: 1440px) {
      //  max-height: 47rem !important;
      //}
      //@media (min-width: 1880px) {
      //  max-height: 54rem;
      //}
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

  input {
    border-radius: $radius-8;
    margin: 0;
  }

  input:focus {
    outline: none;
  }

  p {
    margin-bottom: 0;
    line-height: 0;
  }

  img {
    width: 100%;
  }

  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  i {
    font-style: normal;
  }

  nav,
  .header-infoChef,
  .nav,
  .selected-status,
  .menu-filter,
  .product-filter,
  .menuMain-filter {
    @media only print {
      display: none;
    }
  }
}

.p-dialog-mask {
  z-index: 99999999999 !important;
}
</style>
