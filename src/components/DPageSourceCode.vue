<script setup>
import { ref, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex'
import Prism from 'prismjs'
// @ Load Prism languages
import 'prismjs/components/prism-markup-templating' // dependency for prism-php extension
// PHP
import 'prismjs/components/prism-php'
// Bash
import 'prismjs/components/prism-bash'

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    default: 'html'
  },
  text: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    default: ''
  }
})

const $q = useQuasar()
const store = useStore()

const copyBtnDisabled = ref(false)
const copyBtnColor = ref(null)
const copyBtnIcon = ref('content_copy')
const codeRef = ref(null)

const href = computed(() => `${store.state.page.absolute}#${anchor.value}`)
const coloring = computed(() => $q.dark.isActive ? 'dark' : 'white')
const anchor = computed(() => printToLetter(props.index + 1))
const lines = computed(() => {
  const splited = props.text.split(/\r\n|\n/)
  return splited.length - 1
})
const highlighted = computed(() => {
  if (!props.text) {
    return ''
  }

  const text = props.text.replace(/&#123;/g, '{').replace(/&#125;/g, '}').replace(/&amp;/g, '&')

  return Prism.highlight(
    text,
    Prism.languages[props.language],
    props.language
  )
})

function copyCode() {
  const code = codeRef.value

  if (code) {
    // Creates a Range object
    const range = document.createRange()

    // Select the text of the element
    range.selectNodeContents(code)

    // Create a selection
    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)

    try {
      document.execCommand('copy')

      copyBtnDisabled.value = true
      copyBtnColor.value = 'positive'
      copyBtnIcon.value = 'done'

      setInterval(() => {
        copyBtnDisabled.value = false
        copyBtnColor.value = null
        copyBtnIcon.value = 'content_copy'
      }, 3000)
    } catch (err) {
      console.error('Error copying text: ', err)
    } finally {
      selection.removeAllRanges()
    }
  }
}

// TODO move to library/utils
function printToLetter(number) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''

  while (number > 0) {
    const charIndex = (number - 1) % 26
    result = alphabet.charAt(charIndex) + result
    number = Math.floor((number - 1) / 26)
  }

  return result
}
</script>

<template lang="pug">
.source-code
  .info(v-if="lines && lines > 1")
    .filename {{ filename }}
    .language {{ language }}
    .copy
      q-btn(
        flat square dense size="xs"
        :disable="copyBtnDisabled"
        :color="copyBtnColor"
        :icon="copyBtnIcon"
        @click="copyCode"
        aria-label="Copy code"
      )

  .code(:class="coloring")
    .lines(v-if="lines && lines > 1")
      template(v-for="(line, index) in lines" :key="index")
        a.line(:href="href+line")
          i.fa.fa-link(aria-hidden="true" data-hidden="true")
          span(:id="`${anchor}${line}`") {{ line }}
    pre
      code(:class="`language-${language}`" v-html="highlighted" ref="code")
</template>

<style lang="sass">
.source-code
  box-shadow: 0 1px 1px rgb(0 0 0 / 13%)
  max-width: calc(100vw - 40px)
  margin: 14px 0 16px

  .info
    display: flex
    flex-direction: row-reverse
    height: 22px

    .copy
      border-color: #ddd
      border-style: solid
      border-width: 1px 0 0 1px
      color: gray
      padding: 0
      user-select: none

      button
        padding: 4px 4px 3px
        position: relative
        top: -1px
    .language
      font-size: 13px
      border-color: #ddd
      border-style: solid
      border-width: 1px 1px 0 1px
      color: gray
      padding: 0 5px 0
      user-select: none

  .code
    font-family: "Fira Code Nerd Font", "Consolas" !important
    position: relative
    border: 1px solid #ddd
    border-bottom: 1px solid #ccc
    border-radius: 3px
    margin: 0
    padding: 0

    .lines
      padding: 11px 5px 8px 5px
      text-align: right
      float: left
      -webkit-user-select: none
      user-select: none

      a
        display: block
        font-size: 90% !important
        min-height: 19px
        white-space: nowrap
        padding: 0 3px

        &:hover
          i
            visibility: visible

        i
          font-size: 10px
          float: left
          margin-top: 4px
          margin-right: 4px
          visibility: hidden

    pre
      font-family: "Fira Code Nerd Font", "Consolas" !important
      display: flex
      margin: 0
      border: 0
      padding: 10px
      white-space: pre
      line-height: 19px
      word-wrap: normal
      overflow: auto
      overflow-y: hidden

      > code
        font-family: "Fira Code Nerd Font", "Consolas" !important
        display: block
        padding: 0

    &.white
      .language
        background-color: white
      .lines
        background-color: #fafafa
        a
          border-color: #f0f0f0
          color: #565555 !important
        a:hover
          border-color: #f0f0f0
          color: #565555 !important

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata
        color: #4e5a65

      .token.punctuation
        color: #999

      .token.namespace
        opacity: .7

      .token.property,
      .token.tag,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.class-name,
      .token.symbol,
      .token.deleted
        color: #905

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted
        color: #416200

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string
        color: #9a6e3a

      .token.atrule,
      .token.attr-value,
      .token.keyword
        color: #07a

      .token.function
        color: #9a3449

      .token.regex,
      .token.important,
      .token.variable
        color: #7b4f00

      .token.important,
      .token.bold
        font-weight: bold
      .token.italic
        font-style: italic

      .token.entity
        cursor: help

    &.dark
      .language
        background-color: #000
      .lines
        background-color: #000
        a
          border-color: #f0f0f0
          color: #969696 !important
        a:hover
          border-color: #f0f0f0
          background-color: transparent !important

      // TODO Andromeda Colorized
      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata
        color: #A0A1A7cc

      .token.punctuation
        color: #D5CED9

      .token.namespace
        opacity: .7

      .token.property
        color: #7CB7FF // Blue
      .token.constant.boolean
        color: #f39c12 // Orange
      .token.number
        color: #f39c12 // Orange

      .token.class-name
        color: #ff68bc
      .token.constant
        color: #ff68bc
      .token.tag,
      .token.symbol,
      .token.deleted
        color: #FF66BA

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted
        color: #96E072

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string
        color: #9a6e3a

      .token.atrule,
      .token.attr-value,
      .token.keyword
        color: #c74ded // Purple

      .token.function
        color: #FFE66D

      .token.regex,
      .token.important,
      .token.variable
        color: #7CB7FF // Blue

      .token.important,
      .token.bold
        font-weight: bold
      .token.italic
        font-style: italic

      .token.entity
        cursor: help
</style>
