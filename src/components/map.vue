<template>
  <div id="map" class="map-view">
    <l-map
        v-model="zoom"
        :zoom="zoom"
        :center="latlng"
        @update:center="centerUpdated"
    >
      <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="<a href='https://khoonegi.app'>khoonegi</a> contributors"
      ></l-tile-layer>
      <l-marker :lat-lng="latlng">
        <l-icon :icon-url="iconUrl" :icon-size="[this.iconWidth, this.iconHeight]" />
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
import iconUrl from "../assets/img/icons/marker.svg"
import {useToast} from "vue-toastification";

export default {
  name: "leafletMap",
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
  },

  data() {
    return {
      iconUrl,
      zoom: 15,
      iconWidth: 70,
      iconHeight: 70,
      latlng:[36.328493,59.510677],
      toast: useToast(),
    };
  },
  methods: {
    centerUpdated (center) {
      this.latlng = center;
      this.$emit('setAddress' , this.latlng);
    },
  },
};
</script>
<style lang="scss">
.map-view {
  width: 100%;
  height: 22rem;


}
</style>
