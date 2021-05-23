<template>
  <div class="sidebar flex flex-col gap-8 py-4">
    <div class="sidebar-content">
      <t-button class="button-nav gap-1" exact-active-class="active" to="/" :exact="true">
        <HomeIcon></HomeIcon>
        <span>Home</span>
      </t-button>
      <t-button class="button-nav gap-1" active-class="active" to="/hot">
        <FireIcon></FireIcon>
        <span>Hot</span>
      </t-button>
      <t-button class="button-nav gap-1" active-class="active" to="/top">
        <ThumbUpIcon></ThumbUpIcon>
        <span>Top</span>
      </t-button>
      <div class="bg-black bg-opacity-5 w-full h-px"></div>

      <t-button class="button-nav gap-1" active-class="active" to="/downloads">
        <DownloadIcon></DownloadIcon>
        <span>Downloads</span>
      </t-button>
      <t-button class="button-nav gap-1" active-class="active" to="/servers">
        <ServerIcon></ServerIcon>
        <span>Servers</span>
      </t-button>
    </div>
  </div>
</template>

<script>
import TButton from "./TButton";
import { FireIcon, HomeIcon, ThumbUpIcon, ServerIcon, DownloadIcon } from "@heroicons/vue/solid";
export default {
  components: { TButton, FireIcon, HomeIcon, ThumbUpIcon, ServerIcon, DownloadIcon },
};
</script>

<style lang="scss" scoped>
.sidebar {
  @apply bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm;
  &-content {
    @apply mx-4 gap-2 flex flex-col;
  }
}
</style>