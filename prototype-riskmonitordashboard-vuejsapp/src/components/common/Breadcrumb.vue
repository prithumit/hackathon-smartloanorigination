<template>
  <div class="breadcrumb">
    <div v-for="(item, index) in breadcrumbList" :key="index">
      <div class="hidden-sm-and-down">
        <a v-if="item.icon" href="home">
          <v-icon medium class="mb-1">{{ item.icon }}</v-icon>
        </a>
        <span v-if="item.icon" class="px-2">/</span>
        <span v-if="item.title" class="font-weight-black">
          <a>{{ item.title }}</a>
        </span>
        <span v-if="item.title" class="px-2">/</span>
        <span v-if="item.subTitle">{{ item.subTitle }}</span>
        <span v-if="item.subTitle && item.breadcrumb" class="px-2">/</span>
        <span @click="routeTo(index)">{{ item.breadcrumb }}</span>
      </div>
      <div class="hidden-md-and-up">
        <span class="px-1">
          <a v-if="item.icon" href="home">
            <v-icon medium class="ml-1">{{ item.icon }}</v-icon>
          </a>
        </span>
        <span v-if="item.title && item.icon" class="px-1">/</span>
        <span v-if="item.subTitle" class="px-1" :color="primaryColor">{{ item.subTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data: () => ({
    breadcrumbList: [],
    link: ''
  }),
  mounted () {
    this.updateList()
  },
  watch: {
    $route () {
      this.updateList()
    }
  },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) {
        this.$router.push(this.breadcrumbList[pRouteTo].link)
      }
    },
    updateList () {
      this.breadcrumbList = []
      // eslint-disable-next-line no-prototype-builtins
      if (this.$route.meta.hasOwnProperty('breadcrumb')) {
        this.$route.meta.breadcrumb.link = this.$route.path
        this.breadcrumbList.push(this.$route.meta.breadcrumb)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb {

  width: 100%;
  padding:0 1%;
  & a {
    text-decoration: none;
    color: #414141;
  }
}
</style>
