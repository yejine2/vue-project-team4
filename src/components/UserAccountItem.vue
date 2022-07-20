<template>
  <div class="my_item">
    <div class="info_box">
      <div class="account_info">
        <div class="name_box">
          <span class="account_name">{{ bankRename }}</span>
        </div>
        <div class="number_box">
          <span class="account_num">{{ changeShape }}</span>
        </div>
        <span class="account_balance">{{ `${insertComma}원` }}</span>
      </div>
    </div>
    <button
      class="btn_delete"
      @click="deleteAccount">
      해지
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '../store/user'
export default {
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStores(useUserStore),
    bankRename() {
      return this.account.bankName.slice(0, this.account.bankName.length - 2)
    },
    insertComma() {
      return this.account.balance.toLocaleString()
    },
    changeShape() {
      const length = this.account.accountNumber.length
      for (let i = 0; i < length; i += 1) {
        if (this.account.accountNumber[i] == 'X') {
          let res = this.account.accountNumber.replace('X', '●')
          this.$emit('change-shape', res)
        }
      }
      return this.account.accountNumber
    }    
  },
  methods: {
    deleteAccount() {
      console.log(' this.account.id:',  this.account.id)
      this.userStore.deleteAccount({
        accountId: this.account.id,
        signature: true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/scss/MyCommon.scss";

.my_item {
  display: flex;
  padding: 22px 0 29px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebebeb;
  .info_box {
    flex-grow: 1;
    margin-right: 24px;
    .account_info {
      display: flex;
      justify-content: space-between;
      padding: 13px 0 1px;
      height: 52px;
      box-sizing: border-box;
      .name_box {
        flex-shrink: 0;
        width: 100px;
        .account_name {
          display: inline-block;
          padding: 9px;
          min-width: 52px;
          font-size: 15px;
          line-height: 18px;
          border: 1px solid #ebebeb;
          border-radius: 8px;
          background-color: #fff;
          text-align: center;
          box-sizing: border-box;
        }
      }
      .number_box {
        flex-grow: 1;
        .account_num {
          display: inline-block;
          margin-left: 17px;
          padding: 9px;
          font-size: 15px;
          align-items: center;
          vertical-align: middle;
        }
      }
      
      .account_balance {
        flex-shrink: 0;
        margin-left: 17px;
        padding: 9px;
        font-size: 15px;
      }
    }
  }
  .btn_delete {
    flex-shrink: 0;
    padding: 0 12px;
    height: 34px;
    line-height: 32px;
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    color: rgba(34, 34, 34, .8);
    background-color: #fff;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
