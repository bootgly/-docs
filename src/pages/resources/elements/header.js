export default {
  computed: {
    heading () {
      const base = this.$store.state.i18n.base
      const absolute = this.$store.state.i18n.absolute

      let h = ''
      if (base && absolute) {
        if (this.id === '0') {
          h = this.$t(`_.${base}._`)
        } else {
          h = this.$t(`_.${absolute}.headers[${this.id - 1}]`)
        }
      } else {
        // TODO exception?
      }

      return h
    }
  },

  methods: {
    registerAnchor (id) {
      // console.log('registerAnchor: ', id, value)

      const Anchor = document.getElementById(id)

      if (Anchor !== null && typeof Anchor === 'object') {
        const anchors = this.$store.state.page.anchors

        if (!anchors[Anchor.id]) {
          this.$store.commit('page/setAnchors', Anchor.offsetTop - Anchor.scrollHeight + 33)
        }
      }
    }
  }
}
