<template>
  <div class="deboss-panel">
    <div class="deboss-border-tl"></div>
    <div class="deboss-border-tr"></div>
    <div class="deboss-border-bl"></div>
    <div class="deboss-border-br"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
$deboss-top-color: rgb(29, 71, 29);
$deboss-left-color: rgb(13, 102, 36);
$deboss-right-color: rgb(127, 209, 102);
$deboss-bottom-color: rgb(142, 231, 115);

$deboss-width: 5px;
$deboss-overlap: 2px;
$deboss-shadow-len: 4px;
$deboss-total-width: $deboss-width + $deboss-overlap;

.deboss-panel {
  background: rgb(111, 190, 87);
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  user-select: none;
  box-shadow:
    inset $deboss-width 0 0 0 $deboss-left-color,
    inset (-$deboss-width) 0 0 0 $deboss-right-color,
    inset 0 $deboss-width 0 0 $deboss-top-color,
    inset 0 (-$deboss-width) 0 0 $deboss-bottom-color,
    inset 0 $deboss-width $deboss-shadow-len 0 $deboss-top-color,
    inset $deboss-width 0 $deboss-shadow-len 0 $deboss-left-color;
  padding: 15px;
}

.deboss-border-tl {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  clip-path: polygon(0px 0px, $deboss-total-width 0px, $deboss-width $deboss-width);
  background: $deboss-top-color;
}

.deboss-border-tr {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: $deboss-total-width;
  height: $deboss-width;
  pointer-events: none;
  clip-path: polygon(0px 0px, $deboss-total-width 0px, $deboss-overlap $deboss-width);
  background: $deboss-top-color;
}

.deboss-border-bl {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: $deboss-total-width;
  height: $deboss-width;
  pointer-events: none;
  clip-path: polygon(0px $deboss-width, $deboss-width 0px, $deboss-total-width $deboss-width);
  background: $deboss-bottom-color;
}

.deboss-border-br {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: $deboss-total-width;
  height: $deboss-width;
  pointer-events: none;
  clip-path: polygon($deboss-overlap 0px, 0px $deboss-width, $deboss-total-width $deboss-width);
  background: $deboss-bottom-color;
}
</style>
