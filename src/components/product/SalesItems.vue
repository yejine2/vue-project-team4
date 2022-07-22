<template>
  <tr>
    <td>
      <img
        :src="product.product.thumbnail"
        :alt="product.product.title" />
    </td>

    <td>
      {{ product.product.title }}
    </td>

    <td>
      {{ product.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' 원' }}
    </td>

    <td>
      {{ product.user.displayName }}
    </td>

    <td>
      {{ product.user.email }}
    </td>

    <td>
      {{ product.account.bankName }}
    </td>
    
    <td>
      {{ new Date(product.timePaid).toLocaleString() }}
    </td>

    <td>
      <div class="form-check form-switch">
        <input
          id="flexSwitchCheckDefault"
          v-model="isCanceled"
          class="form-check-input"
          type="checkbox"
          role="switch" />
      </div>
    </td>

    <td>
      <div class="form-check form-switch">
        <input
          id="flexSwitchCheckDefault"
          v-model="done"
          class="form-check-input"
          type="checkbox"
          role="switch" />
      </div>
    </td>

    <td class="edit box">
      <button
        class="btn btn-outline-secondary"
        @click="purchaseState">
        <i class="fa-regular fa-floppy-disk"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import { mapStores } from 'pinia'
import { useIndexStore } from '~/store/admin.js'
export default {
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      detailId: this.product.detailId,
      isCanceled: this.product.isCanceled,
      done: this.product.done
    }
  },
  computed: {
    ...mapStores(useIndexStore)
  },
  methods: {
    purchaseState() {
      this.indexStore.transactionsCanceled({
        detailId: this.detailId,
        isCanceled: this.isCanceled,
        done: this.done
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";

  img {
    min-width: 100px;
    height: 100px;
  }

  td {
    border: 0.5px solid $gray-700;
    white-space: nowrap;
    vertical-align: middle;
    text-align: center;

    &:nth-child(2),
    &:nth-child(7) {
      white-space: normal;
    }

    .form-check {
      display: flex;
      justify-content: center;
    }
  }

  #flexSwitchCheckDefault {
    cursor: pointer;
  }
  
</style>
