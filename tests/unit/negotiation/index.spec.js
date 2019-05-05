import store from './store'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import ContractNegotiation from '@/components/ContractNegotiation'
import { ContractNegotiationModel } from '../../../src/components/ContractNegotiation/models'
import { StatusModel } from '../../../src/components/ContractNegotiation/components/StatusDialog/models'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuelidate)

describe('ContractNegotiation Component', () => {

  let model, status;

  beforeEach(() => {
    model = new ContractNegotiationModel()
    status = new StatusModel()
  })

  it('Testing submit button exists', () => {
    const wrapper = shallowMount(ContractNegotiation, {
      store, localVue,
      propsData: {
        model: model
      }
    })
    expect(wrapper.find('#submit').text()).toMatch('Submit')
  })

  it('Testing Form validation', () => {
    const wrapper = mount(ContractNegotiation, {
      store, localVue,
      propsData: {
        model: model,
        status: status
      }
    })
    expect(wrapper.vm.validate()).toBeFalsy()
  })


  it('Testing store temperature', () => {
    const wrapper = shallowMount(ContractNegotiation, {
      store, localVue,
      propsData: {
        model: model
      }
    })
    expect(wrapper.vm.temperature).toMatch('10')
  })

  it('Testing salary in range (FAILURE)', () => {
    model.employer.salary = 100000
    model.employee.salary = 1000000
    const wrapper = shallowMount(ContractNegotiation, {
      store, localVue,
      propsData: {
        model: model
      }
    })
    expect(wrapper.vm.salaryInRange).toBeFalsy()

  })

  it('Testing salary in range (SUCCESS)', () => {
    model.employer.salary = 100000
    model.employee.salary = 10000
    const wrapper = shallowMount(ContractNegotiation, {
      store, localVue,
      propsData: {
        model: model
      }
    })
    expect(wrapper.vm.salaryInRange).toBeTruthy()
  })

  it('Testing salary in range (SUCCESS), After manual entry', () => {
    const wrapper = mount(ContractNegotiation, {
      store, localVue,
      propsData: {
        model: model,
        status: status
      }
    })
    const button = wrapper.find('#submit')
    button.trigger('click')
    wrapper.find('#employer').setValue(100000)
    button.trigger('click')
    wrapper.find('#employee').setValue(10000)
    expect(wrapper.vm.salaryInRange).toBeTruthy()
  })
})
