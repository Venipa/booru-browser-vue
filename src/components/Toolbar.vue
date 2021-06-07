<template>
  <div class="toolbar flex items-center h-toolbar bg-white bg-opacity-50 flex-1 backdrop-filter backdrop-blur-lg">
    <div class="toolbar-drag leading-12 h-toolbar flex-1 px-4 font-semibold text-gray-900 text-opacity-90">Booru Browser</div>
    <t-button to="/servers" class="btn-sm gap-1" active-class="active" v-if="activeServer">
      <ServerIcon></ServerIcon>
      <span>{{ activeServer.name }}</span>
    </t-button>
    <div class="flex flex-row items-center controls mx-4 gap-3">
      <t-button class="button-control button-control-danger" @click="close">
        <XIcon></XIcon>
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
import TButton from "@/components/TButton.vue";
import { XIcon, ServerIcon } from "@heroicons/vue/solid";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  components: { TButton, XIcon, ServerIcon },
  methods: {
    close() {
      window.ipcRenderer.send("app.quit");
    },
  },
  subscriptions() {
    return {
      activeServer: this.$akita.queries.serversQuery.selectActive(),
    };
  },
  mounted() {},
});
</script>

<style lang="scss">
.toolbar {
  user-select: none;
  &-drag {
    -webkit-app-region: drag;
  }
}
</style>