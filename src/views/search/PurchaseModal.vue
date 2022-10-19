<template>
  <div
    id="exampleModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">구매하기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="purchase_product">
            <div class="thumbnail_box">
              <img
                :src="searchStore.productInfo.thumbnail"
                alt=""
                class="thumbnail"
              />
            </div>
            <div class="purchase_product_text">
              <div class="name">
                {{ searchStore.productInfo.title }}
              </div>
              <div class="description">
                {{ searchStore.productInfo.description }}
              </div>
            </div>
          </div>
          <div class="checkout">
            <strong>결제 방법</strong>
            <div class="account_box">
              <div class="payment_title">
                <p class="easy">간편 결제 (계좌이체)</p>
                <router-link to="/my/account" class="my_account">
                  내 계좌 조회
                </router-link>
              </div>
              <div class="account_list">
                <div v-show="login" class="banks_box">
                  <div
                    v-for="bank in banks"
                    :key="bank"
                    ref="banks"
                    class="banks"
                    @click="
                      (bank.btn = !bank.btn),
                        choose_account($event, bank.name, bank.btn)
                    "
                  >
                    <p ref="bank_name">
                      {{ bank.name }}
                    </p>
                  </div>
                </div>
                <div v-show="not_login" class="login_guide">
                  <p>로그인 후 확인 가능합니다.</p>
                  <router-link to="/login" class="login_link">
                    로그인
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="last">
            <strong>최종 주문 정보</strong>
            <div class="price_box">
              <div class="product_box">
                <p class="price_text">구매가</p>
                <p class="price">
                  {{ searchStore.productInfo.price.toLocaleString("ko-KR") }}
                </p>
              </div>
              <div class="product_box">
                <p class="price_text">배송비</p>
                <p class="price shipping">5,000</p>
              </div>
            </div>
            <div class="last_price_box">
              <span class="last_text">총 결제금액</span>
              <div class="red_text_box">
                <span class="last_price">
                  {{
                    (searchStore.productInfo.price + 5000).toLocaleString(
                      "ko-KR"
                    )
                  }}
                </span>
                <span class="won">원</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            취소
          </button>
          <button type="button" class="btn btn-primary" @click="payment">
            결제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useSearchStore } from "~/store/search";
import { useUserStore } from "~/store/user";

export default {
  data() {
    return {
      banks: [
        { name: "KB국민은행", btn: false },
        { name: "NH농협은행", btn: false },
        { name: "신한은행", btn: false },
        { name: "카카오뱅크", btn: false },
        { name: "우리은행", btn: false },
        { name: "하나은행", btn: false },
        { name: "케이뱅크", btn: false },
      ],
      banks_index: [
        "KB국민은행",
        "NH농협은행",
        "신한은행",
        "카카오뱅크",
        "우리은행",
        "하나은행",
        "케이뱅크",
      ],
      get_bank: [],
      login: false,
      not_login: true,
      user_payment: {
        productId: "",
        accountId: "",
      },
    };
  },
  computed: {
    ...mapStores(useSearchStore),
    ...mapStores(useUserStore),
  },
  async created() {},
  async mounted() {
    await this.userStore.getUserAccountList();
    if (this.userStore.userAccountList !== null) {
      this.login = true;
      this.not_login = false;
    }
    this.bank_list();
  },
  methods: {
    bank_list() {
      // Store 데이터에 뱅크 이름과 textContent 문자가 같으면 클래스 추가
      if (this.userStore.userAccountList) {
        for (let i = 0; i < this.userStore.userAccountList.length; i++) {
          this.get_bank.push(this.userStore.userAccountList[i].bankName);
        }
      }
      for (let i = 0; i < this.get_bank.length; i++) {
        const num = this.banks_index.findIndex(
          (item) => item === this.get_bank[i]
        );
        this.$refs.bank_name[num].classList.add("account_on");
      }
      for (let i = 0; i < this.banks_index.length; i++) {
        const classes = this.$refs.bank_name[i].classList;
        if (!classes.contains("account_on")) {
          this.$refs.banks[i].classList.add("account_off");
        }
      }
    },
    choose_account(e, name, btn) {
      // 다른 버튼 누르면 페이먼트 데이터 지워지는것도 짜야해
      for (let i = 0; i < this.$refs.banks.length; i++) {
        if (e.currentTarget === this.$refs.banks[i]) {
          if (btn) {
            const num = this.get_bank.findIndex((item) => item === name);
            this.user_payment.productId = this.$route.params.productId;
            this.user_payment.accountId =
              this.userStore.userAccountList[num].id;
            e.currentTarget.classList.add("btn_on");
          } else {
            e.currentTarget.classList.remove("btn_on");
            this.user_payment.productId = "";
            this.user_payment.accountId = "";
          }
        } else {
          this.$refs.banks[i].classList.remove("btn_on");
        }
      }
    },
    async payment() {
      try {
        await this.searchStore.product_payment(this.user_payment);
        window.location.href = "/my/buying";
      } catch (err) {
        alert("계좌를 확인해주세요.");
        window.location.href = "/my/account";
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../../node_modules/bootstrap/scss/bootstrap.scss";

.modal-body {
  p {
    margin-bottom: 0;
  }
  height: 600px;
  margin: 0 12px 0 8px;
  overflow: auto;
  .purchase_product {
    display: flex;
    .thumbnail_box {
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      border-radius: 10px;
      overflow: hidden;
      .thumbnail {
        width: 104px;
      }
    }
    .purchase_product_text {
      flex: 1;
      width: 100%;
      margin-left: 16px;
      .name {
        font-weight: 600;
      }
      .description {
        margin-top: 4px;
        font-size: 13px;
        color: rgba(34, 34, 34, 0.5);
      }
    }
  }
  .checkout {
    margin-top: 20px;
    padding-bottom: 30px;
    .account_box {
      margin-top: 4px;
      .payment_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 0 13px 1px;
        .easy {
          font-size: 15px;
        }
        .my_account {
          font-size: 13px;
          font-weight: 600;
          color: rgba(34, 34, 34, 0.5);
        }
      }
      .account_list {
        display: flex;
        flex-wrap: wrap;
        .login_guide {
          width: 446px;
          height: 288px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: rgba(34, 34, 34, 0.5);
          .login_link {
            margin-top: 14px;
            color: rgba(34, 34, 34, 0.5);
          }
        }
        .banks_box {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          .banks {
            width: 208px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 6px auto;
            border: 1px solid #ebebeb;
            border-radius: 10px;
            font-weight: 400;
            cursor: pointer;
            &:last-child {
              margin: 6px 7.5px;
            }
            p {
              font-size: 16px;
              color: rgba(34, 34, 34, 0.5);
            }
            .account_on {
              color: #222;
            }
          }
          .account_off {
            pointer-events: none;
          }
          .btn_on {
            font-weight: 600;
            border: 1px solid #333;
          }
        }
      }
    }
  }
  .last {
    background-color: aliceblue;
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: -20px;
    margin-top: 20px;
    padding: 0 12px;
    border-radius: 20px;
    .price_box {
      padding: 12px 1px 8px 0;
      border-bottom: 1px solid rgb(51, 51, 51, 0.5);
      .product_box {
        display: flex;
        justify-content: space-between;
        margin-top: 6px;
        .price_text {
          font-size: 13px;
        }
        .price {
          font-size: 14px;
          font-weight: 600;
        }
        .shipping {
          font-weight: 400;
        }
      }
    }
    .last_price_box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-top: 14px;
      .last_text {
        font-size: 15;
        font-weight: 600;
      }
      .red_text_box {
        font-size: 22px;
        font-weight: 600;
        color: #ef6253;
        text-align: end;
        .last_price {
          display: inline-block;
          margin-right: 3px;
          padding-left: 4px;
          font-style: italic;
        }
      }
    }
  }
  strong {
    font-size: 18px;
    font-weight: 600;
  }
}
.btn-primary {
  background-color: #ef6253 !important;
  border-color: #ef6253 !important;
  box-shadow: none !important;
  &:hover {
    background-color: #db5a4c !important;
    border-color: #db5a4c !important;
  }
}
</style>
