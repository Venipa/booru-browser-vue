<template>
  <div class="flex w-full bg-black bg-opacity-20 backdrop-filter backdrop-blur-lg">
    <div class="server-list flex flex-col flex-1 gap-2 py-2">
      <div class="bg-gray-800 text-gray-50 bg-opacity-30 backdrop-filter backdrop-blur-lg px-4 py-3 rounded-lg shadow mx-2 flex items-center gap-3 cursor-pointer select-none" v-for="s in servers" :key="s.name" @click="() => select(s.name)">
        <CheckCircleIcon class="h-8 w-8 text-white bg-green-500 rounded-full p-1.5" v-if="activeServer && s.name === activeServer.name"></CheckCircleIcon>
        <div class="flex flex-col">
          <div>{{s.name}}</div>
          <div>{{s.url}}</div>
        </div>
        <div class="ml-auto flex flex-col justify-center">
          <t-button class="button-icon button-dark button-icon-circle" @click.stop="() => openServerDialog(s)">
            <PencilIcon></PencilIcon>
          </t-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { PencilIcon, CheckIcon as CheckCircleIcon } from "@heroicons/vue/solid";
import TButton from "@/components/TButton";
export default defineComponent({
  components: {
    PencilIcon,
    CheckCircleIcon,
    TButton,
  },
  subscriptions() {
    const servers = this.$akita.queries.serversQuery.selectAll(),
      activeServer = this.$akita.queries.serversQuery.selectActive();
    return {
      servers,
      activeServer,
    };
  },
  inject: ["openServerDialog"],
  methods: {
    select(name) {
      if (this.activeServer?.name !== name) {
        this.$akita.stores.servers.setActive(name);
      }
    },
  },
  setup() {
    const newServerModalOpen = ref(false),
      editServerModalOpen = ref(false);
    return {
      newServerModalOpen,
      toggleNewServerModalOpen: () => (newServerModalOpen.value = !newServerModalOpen.value),

      editServerModalOpen,
      toggleEditServerModalOpen: () => (editServerModalOpen.value = !editServerModalOpen.value),
    };
  },
});
</script>
