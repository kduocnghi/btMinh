<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.card-item {
  width: 300px;
  padding: 20px 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

@import url("https://fonts.googleapis.com/css?family=Lato:400,700,900");

$border-radius-size: 14px;

*,
*:before,
*:after {
  box-sizing: border-box;
}

$color: #71a32a;

.clash-card {
  background: white;
  width: 100%;
  display: inline-block;
  border-radius: $border-radius-size + 5;
  position: relative;
  text-align: center;
  box-shadow: -1px 15px 30px -12px black;
  z-index: 9999;
}

.clash-card__image {
  position: relative;
  height: 230px;
  margin-bottom: 35px;
  border-top-left-radius: $border-radius-size;
  border-top-right-radius: $border-radius-size;
}

.data-weather-list {
  background: linear-gradient(
      to bottom,
      rgba(140, 122, 122, 1) 0%,
      rgba(175, 135, 124, 1) 65%,
      rgba(175, 135, 124, 1) 100%
    )
    fixed;
  background-size: cover;
  font: 14px/20px "Lato", Arial, sans-serif;
  color: #9e9e9e;
  margin-top: 40px;
}

.img-size {
  width: 34px;
}

.clash-card__image--archer {
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/giant-bg.jpg");
  img {
    height: 300px;
    position: absolute;
    top: -34px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.clash-card__level {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
}

.clash-card__level--archer {
  color: $color;
}

.clash-card__unit-name {
  font-size: 26px;
  color: black;
  font-weight: 900;
  margin-bottom: 5px;
}

.clash-card__unit-description {
  padding: 20px 0;
  margin-bottom: 10px;
  font-weight: bold;

  dd {
    margin: 0;
    color: red;
    font-size: 20px;
  }
}

.clash-card__unit-stats--archer {
  background: $color;

  .one-third {
    border-right: 1px solid darken($color, 8%);
  }
}

.clash-card__unit-stats {
  color: white;
  font-weight: 700;
  border-bottom-left-radius: $border-radius-size;
  border-bottom-right-radius: $border-radius-size;
  display: flex;

  .one-third {
    width: 33.33%;
    padding: 20px 15px;

    &:last-child {
      border: none;
    }
  }

  sup {
    position: absolute;
    bottom: 4px;
    font-size: 45%;
    margin-left: 2px;
  }

  .stat {
    position: relative;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .stat-value {
    text-transform: uppercase;
    font-weight: 400;
    font-size: 12px;
  }

  .no-border {
    border-right: none;
  }
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.slick-prev {
  left: 100px;
  z-index: 999;
}

.slick-next {
  right: 100px;
  z-index: 999;
}

</style>
