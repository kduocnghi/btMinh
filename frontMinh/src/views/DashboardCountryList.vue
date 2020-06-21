<template>
  <div class="card-list">
    <div style="display: flex;justify-content: space-around;align-self:stretch;width:100%;">
      
      <DashboardCountryStatus
        :country-data="dev1Data"
      />

      <DashboardCountryStatus
        :country-data="dev2Data"
      />
    </div>
    <DashboardCountryStatus
      v-for="countryDatum in countryData"
      :key="countryDatum.id"
      :country-data="countryDatum"
    />
  </div>
</template>

<script>
import DashboardCountryStatus from "./DashboardCountryStatus";

export default {
  components: {
    DashboardCountryStatus
  },
  props: {
    countryData: {
      type: Array,
      required: true
    },
    dev1Data: {
      type: Object,
      required: false
    },
    dev2Data: {
      type: Object,
      required: false
    }
  }
};
</script>
