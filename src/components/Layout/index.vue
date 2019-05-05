<template>
  <div class="container pt-3">
    <ContractNegotiation :model="contractNegotiation.model" :status="contractNegotiation.status" />
  </div>
</template>

<script>
  import ContractNegotiation from '../ContractNegotiation'
  import { ContractNegotiationModel } from '../ContractNegotiation/models'
  import { StatusModel } from '../ContractNegotiation/components/StatusDialog/models'
export default {
  components: {
    ContractNegotiation
  },
  data() {
    return {
      contractNegotiation: {
        model: new ContractNegotiationModel(),
        status: new StatusModel()
      }
    }
  }
}
</script>
