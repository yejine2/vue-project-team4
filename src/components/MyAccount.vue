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
                  aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="bank-name">
                  <strong>은행명</strong>
                  <div class="dropdown">
                    <button
                      id="dropdownMenuButton1"
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
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
                        @click="change = bank.name, bankCode = bank.code">
                        {{ bank.name }}
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="account-number">
                  <strong>계좌번호</strong>
                  <div class="input-box">
                    <input
                      v-model="accountNumber"
                      type="text"
                      placeholder="- 없이 입력하세요" />
                  </div>
                </div>

                <div class="phone-number">
                  <strong>휴대폰 번호</strong>
                  <div class="input-box">
                    <input
                      v-model="phoneNumber"
                      type="text"
                      placeholder="- 없이 입력하세요" />
                  </div>
                </div>

                <div class="agree">
                  <div class="agree-box">
                    <input
                      type="checkbox"
                      @click="signature = !signature" />
                    <div class="user-agree">
                      [필수] 계좌 정보 등록을 동의합니다.
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal">
                  취소
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-create"
                  @click="addAccount">
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
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthStore } from '~/store/auth'

export default {
  data() {
    return {
      change: '',
      bankCode: '',
      accountNumber: '',
      phoneNumber: '',
      signature: false
    }
  },
  computed: {
    ...mapStores(useAuthStore, ['banks']),
    banks() {
      return this.authStore.banks
    }
  },
  created() {
    this.authStore.chooseBank()
  },
  methods: {
    addAccount() {
      this.authStore.addAccount({
        bankCode: this.bankCode,
        accountNumber: this.accountNumber,
        phoneNumber: this.phoneNumber,
        signature: this.signature
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../node_modules/bootstrap/scss/bootstrap.scss';
@import '~/scss/MyCommon.scss';
.box {
  .header {
    display: flex;
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
        color: rgba(34,34,34,.5);
      }
    }
    .header__btn {
      margin-left: auto;
      padding-top: 12px;
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
              padding: 10px 0 14px;
              .dropdown {
                padding: 6px 0 7px;
                .dropdown-toggle {
                  // background-color: #fff;
                  width: 100%;
                  display: flex;
                  align-items: center;
                  border-radius: 0rem;
                  border-bottom: 1px solid #ebebeb;
                  &::after {
                    content: "";
                    margin-left: auto;
                  }
                  &:focus {
                    box-shadow: none;
                  }
                  .choose {
                    font-size: 15px;
                    color: rgba(34,34,34,.5);
                  }
                  .chosen {
                    font-size: 15px;
                    color: #222;
                  }
                }
                .dropdown-menu {
                  width: 100%;
                  height: 200px;
                  inset: -4px auto auto 0px !important;
                  border-radius: 0rem;
                  overflow: scroll;
                  .dropdown-item {
                    padding: 11px 50px 10px 16px;
                    font-size: 13px;
                    color: rgba(34,34,34,.8);
                  }
                }
              }
            }
            .input-box {
                input {
                  width: 100%;
                  display: block;
                  padding: 8px 10px 7px;
                  font-size: 15px;
                  border-bottom: 1px solid #ebebeb;
                  &:focus {
                  border-bottom: 2px solid #222;
                  }
                }
              }
            .account-number {
              margin-top: 6px;
              padding: 10px 0 14px;
            }
            .phone-number {
              margin-top: 16px;
              padding: 10px 0 14px;
            }
            .agree {
              margin-top: 10px;
              padding: 16px 4px 20px;
              .agree-box {
                display: flex;
                align-items: center;
                font-size: 15px;
                input {
                  width: 20px;
                  height: 20px;
                  margin-top: 1px;
                  margin-right: 12px;
                  accent-color: #222;
                }
              }
            }
          }
          .btn-create {
            background-color: #222;
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
