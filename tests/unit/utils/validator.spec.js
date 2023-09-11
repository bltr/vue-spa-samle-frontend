import Vue from 'vue'
import validator from "../../../../src/js/utils/validator";

describe('mixin validator.js', () => {
  let vm;
  const msg = 'required'
  const required = v => !!v || msg

  beforeEach(() => {
    vm = new Vue({
      data: {
        form: {p: null, m: null},
        rules: {p: [required]}
      },
      mixins: [validator]
    })
  })

  it('clone form to v.msg', () => {
    expect(vm.v.msg).deep.equal(vm.form)
  })

  it('clone form to v.class', () => {
    expect(vm.v.class).deep.equal(vm.form)
  })

  context('valid(), when validation failed', () => {
    let result;

    beforeEach(() => {
      vm.form.p = null
      result = vm.valid()
    })

    it('return false', () => {
      expect(result).to.false
    })

    it('set msg', () => {
      expect(vm.v.msg.p).to.equal(msg)
    })

    it('set class to "is-invalid"', () => {
      expect(vm.v.class.p).to.deep.equal({'is-invalid': true})
    })
  })

  context('valid(), when validation passed', () => {
    let result

    beforeEach(() => {
      vm.form.p = 'something'
      result = vm.valid()
    })

    it('return true', () => {
      expect(result).to.true
    })

    it('don\'t set msg', () => {
      expect(vm.v.msg.p).to.equal(null)
    })

    it('set class to "is-valid"', () => {
      expect(vm.v.class.p).to.deep.equal({'is-valid': true})
    })
  })

  context('validate(), when validation failed', () => {
    beforeEach(() => {
      vm.form.p = null
      vm.validate('p')
    })

    it('set msg', () => {
      expect(vm.v.msg.p).to.equal(msg)
    })

    it('set class to "is-invalid"', () => {
      expect(vm.v.class.p).to.deep.equal({'is-invalid': true})
    })
  })

  context('validate(), when validation passed', () => {
    beforeEach(() => {
      vm.form.p = 'some'
      vm.validate('p')
    })

    it('don\'t set msg', () => {
      expect(vm.v.msg.p).to.equal(null)
    })

    it('set class to "is-valid"', () => {
      expect(vm.v.class.p).to.deep.equal({'is-valid': true})
    })
  })
})
