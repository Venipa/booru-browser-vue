<template>
  <template v-if="$attrs.href || $attrs.to">
    <router-link v-bind="$attrs" :class="['button', $attrs.class]">
      <slot></slot>
    </router-link>
  </template>
  <template v-else>
    <button v-bind="$attrs" :class="['button', $attrs.class]">
      <slot></slot>
    </button>
  </template>
</template>

<script>
export default {};
</script>
