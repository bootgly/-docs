<script setup>
import { defineProps, computed, onMounted, onUpdated } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from "vue-i18n";

import useNavigator from 'src/composables/useNavigator'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const store = useStore()
const { register, navigate } = useNavigator()
const { t } = useI18n()

const heading = computed(() => {
  const base = store.state.i18n.base
  const absolute = store.state.i18n.absolute

  let h = ''
  if (base && absolute) {
    h = t(`_.${base}._`)
  } else {
    // TODO exception?
  }

  return h
})

onMounted(() => {
  register(props.id)
})

onUpdated(() => {
  register(props.id)
})
</script>

<template lang="pug">
h1(:id="id" @click="navigate(id)" v-html="heading")
</template>
