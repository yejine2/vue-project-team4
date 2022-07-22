<template>
  <div class="box">
    <div class="header">
      <div class="header__name">
        <strong>전체 계좌 조회</strong>
        <p>수수료(페널티, 착불배송비 등)가 정산되지 않을 경우, 별도 고지 없이 해당 금액을 결제 시도할 수 있습니다.</p>
      </div>
      <div class="header__btn">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary btn_add"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop">
          + 새 계좌 연결하기
        </button>

        <!-- Modal -->
        <div
          id="staticBackdrop"
          class="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div class="modal-dialog">
            <!-- Modal Content -->
            <div class="modal-content">
              <div class="modal-header">
                <strong
                  id="staticBackdropLabel"
                  class="modal-title">
                  결제 계좌 등록
                </strong>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <div class="bank-name">
                  <strong class="input_title">은행명</strong>
                  <div class="dropdown">
                    <button
                      id="dropdownMenuButton1"
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      @click.stop="">
                      <div
                        v-if="change === ''"
                        class="choose">
                        선택하세요
                      </div>
                      <div
                        v-else
                        class="chosen">
                        {{ change }}
                      </div>
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1">
                      <li
                        v-for="bank in banks"
                        :key="bank.code"
                        class="dropdown-item"
                        :class="{ 'disabled': bank.disabled}"
                        @click="change = bank.name; bankCode = bank.code; digits = bank.digits; changeBank()">
                        {{ bank.name }}
                      </li>
                    </ul>
                  </div>
                  <p class="desc">
                    은행 당 하나의 계좌만 허용됩니다.
                  </p>
                </div>

                <div
                  class="account-number"
                  :class="{ 'has_error': accountNumberHasError }">
                  <strong class="input_title">계좌번호</strong>
                  <div class="input_box">
                    <input
                      v-model="accountNumber"
                      type="text"
                      placeholder="- 없이 입력하세요"
                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    <p
                      v-show="accountNumberHasError"
                      class="input-error">
                      {{ `올바른 계좌번호를 입력해주세요. (${totalDigit}자)` }}
                    </p>
                  </div>
                </div>

                <div
                  class="phone-number"
                  :class="{ 'has_error': phoneNumberHasError }">
                  <strong class="input_title">휴대폰 번호</strong>
                  <div class="input_box">
                    <input
                      v-model="phoneNumber"
                      type="tel"
                      placeholder="- 없이 입력하세요"
                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" />
                    <p
                      v-show="phoneNumberHasError"
                      class="input-error">
                      올바른 전화번호를 입력해주세요. (11자)
                    </p>
                  </div>
                </div>

                <div class="agree">
                  <div class="agree_box">
                    <input
                      id="signature"
                      ref="signature"
                      type="checkbox"
                      @click="signature = !signature" />
                    <label
                      class="user-agree"
                      for="signature">
                      [필수] 계좌 정보 등록을 동의합니다.
                    </label>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn_cancle"
                  data-bs-dismiss="modal"
                  @click="closeModal">
                  취소
                </button>
                <button
                  :disabled="!btnEnable"
                  type="button"
                  :class="{ disabled: !btnEnable }"
                  class="btn btn-create"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="addAccount(); closeModal()">
                  등록
                </button>
              </div>
            </div>
          </div>
          <div class="modal-backdrop"></div>
        </div>
      </div>
    </div>

    <!-- Account List -->
    <div class="account">
      <MyAccountItem 
        v-for="account in userAccountList"
        :key="account.id"
        :account="account"
        @change-shape="account.accountNumber = $event" />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import MyAccountItem from '~/components/my/MyAccountItem.vue'

export default {
  components: {
    MyAccountItem
  },
  data() {
    return {
      change: '',
      bankCode: '',
      accountNumber: '',
      phoneNumber: '',
      signature: false,
      digits: [],
      totalDigit: 0,
      btnEnable: false,
      valid: {
        accountNumber: false,
        phoneNumber: false
      },
      accountNumberHasError: false,
      phoneNumberHasError: false
    }
  },
  computed: {
    ...mapStores(useUserStore, ['banks']),
    banks() {
      return this.userStore.banks
    },
    userAccountList() {
      return this.userStore.userAccountList
    }
  },
  watch: {
    'accountNumber': function() {
      this.checkAccount()
    },
    'phoneNumber': function() {
      this.checkPhone()
    },
    'signature' : function() {
      this.checkSign()
    }
  },
  created() {
    this.userStore.chooseBank()
    this.userStore.getUserAccountList()
  },
  methods: {
    addAccount() {
      this.userStore.addAccount({
        bankCode: this.bankCode,
        accountNumber: this.accountNumber,
        phoneNumber: this.phoneNumber,
        signature: this.signature
      })
    },
    changeBank() {
      this.totalDigit = 0
      this.accountNumber = ''
      this.phoneNumber = ''
      this.signature = false
      this.$refs.signature.checked = false
      this.digits.forEach(digit => {
        this.totalDigit += digit
      })
    },
    async closeModal() {
      this.change = ''
      this.bankCode = ''
      this.accountNumber = ''
      this.phoneNumber = ''
      this.totalDigit = 0
      await this.$nextTick()
      this.signature = false
      this.$refs.signature.checked = false
      this.valid.accountNumber = false
      this.valid.phoneNumber = false
      this.accountNumberHasError = false
      this.phoneNumberHasError = false
    },
    checkAccount() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      let validatePassword
      if (this.totalDigit == 12) {
        validatePassword = /^(?=.*[0-9]).{12}$/
      } else if (this.totalDigit == 13) {
        validatePassword = /^(?=.*[0-9]).{13}$/
      } else {
        validatePassword = /^(?=.*[0-9]).{14}$/
      }
      
      if (!validatePassword.test(this.accountNumber) || !this.accountNumber) {
        this.valid.accountNumber = false
        this.accountNumberHasError = true
      } else {
        this.valid.accountNumber = true
        this.accountNumberHasError = false
      }
      this.buttonEnable()
    },
    checkPhone() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/

      if (!validatePassword.test(this.phoneNumber) || !this.phoneNumber) {
        this.valid.phoneNumber = false
        this.phoneNumberHasError = true
      } else {
        this.valid.phoneNumber = true
        this.phoneNumberHasError = false
      }
      this.buttonEnable()
    },
    checkSign() {
      this.buttonEnable()
    },
    buttonEnable() {
      if (this.valid.accountNumber && this.valid.phoneNumber && this.signature) {
        this.btnEnable = true
      } else {
        this.btnEnable = false
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
@import '~/scss/MyCommon.scss';
.box {
  width: 100%;
  // flex-grow: 1;
  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 12px;
    border-bottom: 3px solid #222;
    .header__name {
      strong {
        font-size: 24px;
        font-weight: 600;
      }
      p {
        margin-top: 5px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(34, 34, 34, .5);
      }
    }
    .header__btn {
      // margin-left: auto;
      padding: 12px 0 0 30px;
      flex-shrink: 0;
      .btn_add {
        background-color: #fff;
        color: #222;
        margin-right: 0;
        padding: 0 14px;
        height: 34px;
        border-radius: 10px;
        border: 1px solid #222;
        font-size: 12px;
        box-shadow: none;
      }
      .modal {
        top: calc(50% - 300px);
        .modal-content {
          z-index: 9999;
          .modal-title {
            font-size: 18px;
            font-weight: 600;
          }
          .modal-body {
            margin: 0 8px;
            strong {
              margin-left: 1px;
              font-size: 13px;
              font-weight: 600;
            }
            .bank-name {
              position: relative;
              padding: 10px 0 14px;
              .input_title {
                position: relative;
                padding-right: 6px;
                &::after {
                  content: '*';
                  position: absolute;
                  top: -2px;
                  right: 0;
                }
              }
              .dropdown {
                position: relative;
                padding: 6px 0 7px;
                width: 450px;
                .dropdown-toggle {
                  display: flex;
                  width: 100%;
                  align-items: center;
                  color: rgba(34, 34, 34, .5);
                  background-color: #ebebeb;
                  border: 0;
                  border-radius: 0;
                  border-bottom: 1px solid #ebebeb;
                  outline: none;
                  &.show::after {
                    content: "";
                    margin-left: auto;
                    transform: rotate(180deg);
                  }
                  &::after {
                    content: "";
                    margin-left: auto;
                  }
                  &:focus {
                    box-shadow: none;
                  }
                  .choose {
                    font-size: 15px;
                  }
                  .chosen {
                    font-size: 15px;
                    color: #222;
                  }
                }
                .dropdown-menu {
                  position: absolute;
                  left: 0px;
                  top: 36px;
                  width: 100%;
                  height: 200px;
                  inset: 41px auto auto 0px !important;
                  transform: translate(0px, 0px) !important;
                  border-top: 0;
                  border-radius: 0rem;
                  overflow: scroll;
                  .dropdown-item {
                    padding: 11px 50px 10px 16px;
                    font-size: 13px;
                    color: rgba(34, 34, 34, .8);
                    &.disabled {
                      pointer-events:none;
                      opacity:0.6;
                    }
                  }
                }
              }
              .desc {
                position: absolute;
                font-size: 12px;
                color: rgba(34, 34, 34, .8);
              }
            }
            .input_box {
              margin-top: 6px;
              input {
                width: 100%;
                height: 34px;
                display: block;
                padding: 8px 10px 7px;
                font-size: 15px;
                border-bottom: 1px solid #ebebeb;
                &:focus {
                border-bottom: 2px solid #222;
                }
              }
              .input-error {
                display: block;
                position: absolute;
                line-height: 16px;
                font-size: 11px;
                color: $color-error;
              }
            }
            .account-number {
              margin-top: 16px;
              padding: 10px 0 14px;
              box-sizing: border-box;
              .input_title {
                position: relative;
                padding-right: 6px;
                &::after {
                  content: '*';
                  position: absolute;
                  top: -2px;
                  right: 0;
                }
              }
              &.has_error {
                color: $color-error;
              }
            }
            
            .phone-number {
              margin-top: 16px;
              padding: 10px 0 14px;
              .input_title {
                position: relative;
                padding-right: 6px;
                &::after {
                  content: '*';
                  position: absolute;
                  top: -2px;
                  right: 0;
                }
              }
              &.has_error {
                color: $color-error;
              }
            }
            .agree {
              margin-top: 10px;
              padding: 16px 4px 20px;
              .agree_box {
                display: flex;
                align-items: center;
                font-size: 15px;
                input {
                  width: 18px;
                  height: 18px;
                  margin-top: 1px;
                  margin-right: 12px;
                  accent-color: #222;
                }
                .user-agree {
                  flex-grow: 1;
                  line-height: 18px;
                }
              }
            }
          }
          .modal-footer {
            .btn {
              padding: 0 17px;
              height: 42px;
              font-size: 14px;
              line-height: 40px;
              border: 1px solid #d3d3d3;
              border-radius: 12px;
              color: rgba(34, 34, 34, .8);
              background-color: #fff;
              cursor: pointer;
              &.btn-create {
                font-weight: 700;
                margin-left: 8px;
                background-color: #222;
                color: #fff;
                &:disabled {
                  border: 0;
                  background-color: #ebebeb;
                  color: #fff;
                  cursor: default;
                }
              }
            }
          }
        }
      }
    }
  }
  .modal-backdrop {
    background-color: rgba(37, 37, 37, 0.6);
  }
}

</style>
