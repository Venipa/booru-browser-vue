<template>
  <div class="d-post" v-if="source">
    <div class="d-post-content">
      <template v-if="source.isImage">
        <div class="flex flex-col justify-center items-center">
          <img :src="post.source" class="w-container max-w-full" alt="Image">
        </div>
      </template>
      <template v-else-if="source.isVideo">
        <div class="flex flex-col justify-center items-center">
          <video :src="source.url" class="w-container max-w-full" alt="Video"></video>
        </div>
      </template>
      <template v-else-if="source.isAudio">
        <div class="flex flex-col justify-center items-center">
          <audio :src="source.url" class="w-container max-w-full" alt="Audio"></audio>
        </div>
      </template>
      <template v-else>
        <div class="flex flex-col justify-center items-center">
          <iframe :src="source.url" class="w-container max-w-full" alt="Audio"></iframe>
        </div>
      </template>
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
      default: () => null,
    },
  },
  computed: {
    source() {
      const source = this.post?.source;
      if (!source) return null;
      return {
        isVideo: `${source}`.match(/.(webm|mp4)$/),
        isAudio: `${source}`.match(/.(mp3|m4a|ogg)$/),
        isImage: `${source}`.match(/.(jp(e)?g|png|gif)$/),
        url: source,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.d-post {
  @apply flex flex-col bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg h-full pt-toolbar -mt-toolbar overflow-hidden;
  &-content {
    @apply overflow-y-auto;
  }
}
</style>