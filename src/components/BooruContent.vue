<template>
  <div class="d-post" v-if="post">
    <div class="d-post-content">
      <div class="h-screen flex flex-col justify-center items-center">
        <img :src="post.source" class="h-full" alt="Image">
      </div>
    </div>
  </div>
  <div class="d-post" v-else>
    No Content
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      default: () => null
    }
  }
}
</script>

<style lang="scss" scoped>
.d-post {
  @apply flex flex-col bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-full pt-toolbar -mt-toolbar overflow-hidden;
  &-content {
    @apply overflow-y-auto;
  }
}
</style>