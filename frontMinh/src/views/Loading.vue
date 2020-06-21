<template>
  <ul>
    <li>L</li>
    <li>O</li>
    <li>A</li>
    <li>D</li>
    <li>I</li>
    <li>N</li>
    <li>G</li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
body {
  padding: 0;
  margin: 0;
  background: #292929;
}
ul {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
ul li {
  list-style: none;
  float: left;
  font-size: 5em;
  font-weight: bold;
  font-family: Arial;
  transform: rotateY(90deg);
  transform-origin: left;
  color: #fff;
  animation: load 3s infinite;
}
@keyframes load {
  0% {
    opacity: 0;
    transform: rotateY(90deg) translateX(-30px);
  }
  50% {
    opacity: 1;
    transform: rotateY(0deg) translateX(30px) scale(0.4);
  }
  100% {
    opacity: 0;
    transform: rotateY(0deg);
  }
}
ul li:nth-child(1) {
  animation-delay: 0s;
}
ul li:nth-child(2) {
  animation-delay: 0.2s;
}
ul li:nth-child(3) {
  animation-delay: 0.4s;
}
ul li:nth-child(4) {
  animation-delay: 0.6s;
}
ul li:nth-child(5) {
  animation-delay: 0.8s;
}
ul li:nth-child(6) {
  animation-delay: 1s;
}
ul li:nth-child(7) {
  animation-delay: 1.2s;
}
</style>