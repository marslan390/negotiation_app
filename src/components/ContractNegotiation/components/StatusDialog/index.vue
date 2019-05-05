<template>
    <b-modal id="statusDialog">
        <template slot="modal-title">
            {{model.title}}
        </template>
        <div class="d-block">
            <div class="max-offer">Maximum offer was: <b>{{model.maximumOffer}}</b></div>
            <div class="min-expected">Minimum expected salary was: <b>{{model.minimumExpectedSalary}}</b></div>
        </div>
        <div slot="modal-footer" class="w-100">
            <div class="float-left" v-if="model.temperature">
                Current temperature in London is <span class="temperature">{{model.temperature}}<sup>°</sup>C</span>
            </div>
            <div class="float-left text-danger" v-else>
                London Temperature not found.
            </div>
            <b-button
                    variant="primary"
                    class="float-right"
                    @click="hide"
            >
                OK
            </b-button>
        </div>
    </b-modal>
</template>

<script>
  import { StatusModel } from './models'

  export default {
    props: {
      model: StatusModel
    },
    methods: {
      /** Shows the dialog */
      show: function () {
        this.$bvModal.show('statusDialog')
      },

       /** Hids the dialog */
      hide: function () {
        this.$bvModal.hide('statusDialog')
      }
    }
  }
</script>

<style scoped>
    .temperature {
        font-size: 20px;
        font-weight: bold;
    }
</style>
