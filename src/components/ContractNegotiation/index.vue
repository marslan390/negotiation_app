<template>
    <div class="contract">
        <StatusDialog ref="dialog" :model="status"/>
        <b-card no-body>
            <b-card-text>
                <b-tabs v-model="tabIndex" small card>
                    <b-tab title="Employer">
                        <Employer :model="model.employer" ref="employer" @submit="submit"/>
                    </b-tab>
                    <b-tab title="Employee">
                        <Employee :model="model.employee" ref="employee" @submit="submit"/>
                    </b-tab>
                </b-tabs>
            </b-card-text>
            <b-card-footer>
                <b-button id="submit" variant="primary" class="float-right" @click="submit">Submit</b-button>
            </b-card-footer>
        </b-card>
    </div>
</template>

<script>
  import Employee from './components/Employee'
  import Employer from './components/Employer'
  import StatusDialog from './components/StatusDialog'
  import { ContractNegotiationModel } from './models'
  import { StatusModel } from './components/StatusDialog/models'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      Employee,
      Employer,
      StatusDialog
    },
    props: {
      model: ContractNegotiationModel,
      status: StatusModel
    },
    data () {
      return {
        tabIndex: 0
      }
    },
    created () {
      this.fetchTemperature()
    },
    computed: {
      ...mapGetters(['temperature']),

      salaryInRange () {
        const { model: { employer, employee } } = this
        return employee.salary <= employer.salary
      }
    },
    methods: {
      ...mapActions(['fetchTemperature']),

      /** Validates the form */
      validate: function () {
        const { model: { employer, employee }, $refs } = this
        if (!employer.salary) {
          this.tabIndex = 0
          $refs.employer.validate()
          return false
        }
        if (!employee.salary) {
          this.tabIndex = 1
          $refs.employee.validate()
          return false
        }
        return true
      },

      /** Sets the status for the dialog */
      setStatus: function (title, maximumOffer, minimumExpected) {
        const { status, temperature } = this
        status.title = title
        status.maximumOffer = maximumOffer
        status.minimumExpectedSalary = minimumExpected
        status.temperature = temperature
      },

      /** Triggers when user submit the form */
      submit: function () {
        if (this.validate()) {
          const { model: { employer, employee }, salaryInRange, setStatus, $refs: { dialog } } = this
          const title = salaryInRange ? 'SUCCESS' : 'FAILURE'
          setStatus(title, employer.salary, employee.salary)
          dialog.show()
        }
      }
    }
  }
</script>
