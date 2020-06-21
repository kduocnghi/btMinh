<template>
  <div class="card-item">
    <div class="clash-card">
      <div class="clash-card__image clash-card__image--archer">
        <img class="country-symbol" :src="countryImg" />
      </div>
      <div class="clash-card__level clash-card__level--archer"></div>
      <div class="clash-card__unit-name">{{ countryData ? countryData.dev_id : "Empty" }}</div>
      <div class="clash-card__unit-description">
        <dd>{{ countryData ? countryData.latitude + ' ' + countryData.longitude : "Empty" }}</dd>Tọa độ
      </div>

      <div class="clash-card__unit-stats clash-card__unit-stats--archer clearfix">
        <div class="one-third">
          <div class="stat">
            <img class="img-size" :src="getStatusTemperature(countryData ? countryData.temperature_1 : null)">
          </div>
        </div>

        <div class="one-third">
          <div class="stat">{{ countryData ? countryData.temperature_1 : "Empty"  }}</div>
          <div class="stat-value">Nhiệt độ</div>
        </div>

        <div class="one-third">
          <div class="stat">{{ countryData ? countryData.relative_humidity_2 : "Empty" }}</div>
          <div class="stat-value">Độ ẩm</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCountryImg } from "../functions.js";

export default {
  props: {
    countryData: {
      type: Object,
      required: false
    }
  },
  data: function() {
    return {
      countryImg: null,
      images: {
        green: require('../assets/green_light.png'),
        yellow: require('../assets/yellow_light.png'),
        red: require('../assets/red_light.png'),
        null_light: require('../assets/null_light.png'),
      }
    };
  },
  created: function() {
    this.countryImg = getCountryImg();
  },
  methods: {
    getStatusTemperature: function(temperature) {
      if (temperature <= 20 && temperature) {
        return this.images.green;
      } else if (temperature > 20 && temperature <= 30 && temperature) {
        return this.images.yellow;
      } else if (temperature > 30 && temperature) {
        return this.images.red;
      } else {
        return this.images.null_light;
      }
    }
  },
  sockets: {
      connect: function () {
          console.log('socket connected')
      },
      customEmit: function (data) {
          console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)' + data)
      }

  }
};
</script>
