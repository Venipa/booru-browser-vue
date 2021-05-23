<template>
  <div class="toolbar flex items-center h-12 bg-white bg-opacity-50 flex-1 backdrop-filter backdrop-blur-lg">
    <div class="toolbar-drag leading-12 h-12 flex-1 px-4 font-semibold text-gray-900 text-opacity-90">Booru Browser</div>
    <div class="flex flex-row items-center controls mx-4 gap-3">
      <t-button class="button-control button-control-danger">
        <XIcon></XIcon>
      </t-button>
    </div>
  </div>
</template>

<script>
import TButton from "@/components/TButton";
import { XIcon } from "@heroicons/vue/solid";
export default {
  components: { TButton, XIcon }
};
</script>

<style lang="scss">
.toolbar {
  user-select: none;
  &-drag {
    -webkit-app-region: drag;
  }
}
</style>