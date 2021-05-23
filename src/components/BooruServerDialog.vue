<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="setIsOpen">
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <DialogOverlay class="fixed inset-0 transition-opacity">
              <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </DialogOverlay>
          </TransitionChild>

          <TransitionChild enter="ease-out transform duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in transform duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <DialogTitle> {{form.name}} </DialogTitle>

                <DialogDescription>
                  <input type="text" v-model="form.name">
                  <input type="text" v-model="form.url">
                </DialogDescription>

                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="button" @click="setIsOpen(false)" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:shadow-outline-red sm:ml-3 sm:w-auto sm:text-sm">
                    Deactivate
                  </button>
                  <button type="button" @click="setIsOpen(false)" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:shadow-outline-indigo sm:mt-0 sm:w-auto sm:text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TransitionRoot, Dialog, DialogOverlay, DialogTitle, DialogDescription } from "@headlessui/vue";
export default defineComponent({
  components: { TransitionRoot, Dialog, DialogOverlay, DialogTitle, DialogDescription },
  emits: ["closed"],
  data() {
    return {
      form: {
        name: null,
        url: null,
      },
    };
  },
  setup() {
    let isOpen = ref(false);

    return {
      isOpen,
      setIsOpen(value: boolean) {
        isOpen.value = value;
      },
    };
  },
  methods: {
    open(data: any) {
      this.form = {
        name: data.name,
        url: data.url,
      };
      this.setIsOpen(true);
    },
    close() {
      const data = this.form?.name ? { ...this.form } : null;
      this.$emit("closed", data);

      this.setIsOpen(false);
    },
  },
});
</script>

<style>
</style>