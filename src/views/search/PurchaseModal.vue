<template>
  <div
    id="exampleModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5
            id="exampleModalLabel"
            class="modal-title">
            구매하기
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="purchase_product">
            <div class="thumbnail_box">
              <img
                :src="searchStore.productInfo.thumbnail"
                alt=""
                class="thumbnail" />
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
              <p class="easy">
                간편 결제 (계좌이체)
              </p>
              <div class="account_list">
                <div
                  v-for="bank in banks" 
                  :key="bank"
                  class="banks"
                  @click="choose_account($event, bank)">
                  <strong ref="bank">{{ bank }}</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="last">
            <div class="price_box">
              <div class="product_box">
                <p class="price_text">
                  구매가
                </p>
                <p class="price">
                  {{ searchStore.productInfo.price.toLocaleString('ko-KR') }}
                </p>
              </div>
              <div class="shipping_box">
                <div class="shipping">
                  + 배송비 5,000
                </div>
              </div>
            </div>
            <div class="last_price_box">
              <span class="last_price">
                {{ (searchStore.productInfo.price + 5000).toLocaleString('ko-KR') }}
              </span>
              <span>원</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="payment">
            결제하기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'
import { useUserStore } from '~/store/user'


export default {
  data() {
    return {
      banks: [
        'KB국민은행',
        'NH농협은행',
        '신한은행',
        '카카오뱅크',
        '우리은행',
        '하나은행',
        '케이뱅크'
      ],
      get_bank: [],
      user_payment: {
        productId: '',
        accountId: ''
      }
    }
  },
  computed: {
    ...mapStores(useSearchStore),
    ...mapStores(useUserStore)
  },
  async created() {
    await this.userStore.getUserAccountList()
    this.bank_list()
  },
  methods: {
    bank_list() {
      // Store 데이터에 뱅크 이름과 textContent 문자가 같으면 클래스 추가
      for(let i =0; i < this.userStore.userAccountList.length; i++) {
        this.get_bank.push(this.userStore.userAccountList[i].bankName)
      }
      for(let i =0; i < this.get_bank.length; i++) {
        let num = this.banks.findIndex(item => {
          return item === this.get_bank[i]  
        })
        this.$refs.bank[num].classList.add('account_on')
      }
    },
    choose_account(e, name) {
      // 다른 버튼 누르면 페이먼트 데이터 지워지는것도 짜야해
      e.currentTarget.classList.add('btn_on')
      const num = this.get_bank.findIndex( item => item === name)
      this.user_payment.productId = this.$route.params.productId
      this.user_payment.accountId = this.userStore.userAccountList[num].id
    },
    payment() {
      this.searchStore.product_payment(this.user_payment)
    }
  }
}
</script>
 
 <style scoped lang="scss">
 @import '../../../node_modules/bootstrap/scss/bootstrap.scss';
 
 .modal-body {
  p {
    margin-bottom: 0;
  }
  margin: 0 12px 0 8px;
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
        font-size: 13px;
        color: rgba(34,34,34,.8);
      }
      
    }
  }
  .checkout {
    margin-top: 10px;
    strong {
      font-size: 18px;
      font-weight: 600;
    }
    
    .account_box {
      .easy {
        padding: 16px 0 13px 1px;
        font-size: 15px;
      }
      .account_list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 11px;
        .banks {
          width: 200px;
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 6px;
          border: 1px solid #ebebeb;
          border-radius: 10px;
          cursor: pointer;
          strong {
            font-size: 16px;
            color: rgba(34,34,34,.5);
          }
          .account_on {
            color: #222;
          }
        }
        .btn_on {
          border: 1px solid #333;
        }
      }
    }
  }
  .last {
    position: relative;
    top: -20px;
    padding: 0 8px;
    .price_box {
      margin-top: 10px;
      padding: 0 1px 2px 0;
      border-bottom: 1px solid rgb(51, 51, 51, .5);
      text-align: right;
      .product_box {
        .price_text {
          font-size: 12px;
          
        }
        .price {
          font-size: 14px;
          font-weight: 600;
        }
      }
      .shipping_box {
        margin-top: auto;
        padding-bottom: 2px;
        text-align: right;
        .shipping {
          font-size: 12px;
        }
      }
    }
    .last_price_box {
      padding-top: 4px;
      font-size: 22px;
      font-weight: 600;
      color: #ef6253;
      text-align: end;
      .last_price {
        display: inline-block;
        margin-right: 3px;
        font-style: italic;
      }
    }
  }
 }
 </style>
