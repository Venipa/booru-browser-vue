<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="inline-block align-bottom bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
      <div class="sm:flex sm:items-start">
        <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-200 bg-opacity-50 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon class="h-6 w-6 text-blue-600 text-opacity-80" aria-hidden="true" />
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Page not found
          </h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Ugh seems something went wrong
            </p>
          </div>
        </div>
      </div>
      <div class="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
        <t-button to="/">Back to Home</t-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ExclamationIcon } from "@heroicons/vue/solid";
import TButton from "@/components/TButton";

export default {
  components: { ExclamationIcon, TButton },
};
</script>
