export default {
  data() {
    return {
      v: {
        msg: {},
        class: {}
      }
    }
  },

  created() {
    this.v.msg = Object.assign({}, this.form)
    this.v.class = Object.assign({}, this.form)
  },

  methods: {
    validate(input) {
      for (let rule of this.rules[input] || []) {
        let message = rule(this.form[input], this.form)
        if (message !== true) {
          this.v.msg[input] = message
          this.v.class[input] = {'is-invalid': true}
          break
        }
        this.v.msg[input] = null
        this.v.class[input] = {'is-valid': true}
      }
    },

    valid() {
      for (let input of Object.keys(this.form)) {
        this.validate(input)
      }

      for (let msg of Object.values(this.v.msg)) {
        if (msg !== null) {
          return false
        }
      }
      return true
    }
  }
}
