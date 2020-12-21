<template>
  <div>
    <v-expansion-panels focusable hover>
      <v-expansion-panel v-for="(item, i) in faq.faqs" :key="i">
        <v-expansion-panel-header class="expansionHeader text-subtitle-1 font-weight-medium">{{ item.question }}</v-expansion-panel-header>
        <v-expansion-panel-content class="expansionContent subheading font-weight-regular">{{ item.answer }}</v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import faq from '@/../mocks/faq.json'
import '@/styles/pages/login/dobFaq.scss'
export default {
  name: 'dobFAQ',
  data () {
    return {
      faq
    }
  }
}
</script>
