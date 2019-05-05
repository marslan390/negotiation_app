<template>
    <b-form @submit="submit">
        <div role="group">
            <label for="employee">Minimum Expected Salary</label>
            <b-form-input
                    id="employee"
                    type="number"
                    v-model.trim="$v.model.salary.$model"
                    :state="$v.model.salary.$dirty ? !$v.model.salary.$error : null"
                    placeholder="Enter minimum expected salary"
                    trim
                    @blur="validate"
                    ref="salary"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.model.salary.required">
                This field is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.model.salary.minValue">
                Please enter valid salary
            </b-form-invalid-feedback>
        </div>
    </b-form>
</template>

<script>
  import { required, minValue } from 'vuelidate/lib/validators'
  import { EmployeeModel } from './models'

  export default {
    props: {
      model: EmployeeModel
    },
    validations: {
      model: {
        salary: {
          required,
          minValue: minValue(1)
        }
      }
    },
    methods: {
      /** Sets the focus to salary input */
      setFocus: function () {
        setTimeout(() => this.$refs.salary.focus())
      },

      /** Validates the form */
      validate: function () {
        const { $v, setFocus } = this
        $v.$touch()
        const hasValidated = !$v.$invalid
        if (!hasValidated) setFocus()
        return hasValidated
      },

      /** Triggers when user submit the form */
      submit: function (e) {
        e.preventDefault()
        const { validate } = this
        if (validate()) {
          // do something
          this.$emit('submit')
        }
      }
    }
  }
</script>
