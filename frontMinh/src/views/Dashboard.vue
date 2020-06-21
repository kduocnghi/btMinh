<template>
  <div class="data-weather-list">
    <Loading v-if="loading" />
    <DashboardCountryList v-else :country-data="countryBaseData" :dev1Data="dev1Data" :dev2Data="dev2Data" />
  </div>
</template>

<script>
import axios from "axios";

import DashboardCountryList from "./DashboardCountryList";
import Loading from "./Loading";

const API_ENDPOINT =
  "http://localhost:81/get_init_weather_data";

export default {
  components: {
    DashboardCountryList,
    Loading
  },
  data: function() {
    return {
      loading: true,
      countryBaseData: [],
      dev1Data: null,
      dev2Data: null,
    };
  },
  created: async function() {
    await this.fetchData();

    console.log(this.countryBaseData.map(c => c.Country_Region));
  },
  methods: {
    fetchData: async function() {
      const response = await axios.get(API_ENDPOINT);
      if (response.data) {
        this.countryBaseData = response.data;
      }
      this.$socket.$subscribe('save_data', payload => {
        if(payload.dev_id === "device01") {
          this.dev1Data = payload;
        } else if (payload.dev_id === "device02") {
          this.dev2Data = payload;
        }
      });
      this.loading = false;
    }
  }
};
</script>
