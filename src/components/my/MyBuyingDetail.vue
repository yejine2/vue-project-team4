<template>
  <div class="goods_datail">
    <div class="content_title">
      <div class="title">
        <h3>구매 상세 내역</h3>
      </div>
    </div>
    <div class="detail_id">
      <h4>주문번호<span class="id">{{ userStore.transactionDetail.detailId }}</span></h4>
    </div>
    <div class="item_list">
      <div class="item_img">
        <img
          :src="userStore.transactionDetail.product.thumbnail"
          alt="제품 사진" />
      </div>
      <div class="item_info">
        <div class="title">
          <p class="brand">
            {{ userStore.transactionDetail.product.tags[1] }}
          </p>
          <p class="name">
            {{ userStore.transactionDetail.product.title }}
          </p>
        </div>
      </div>
      <div class="item_link">
        <RouterLink :to="`/search/${userStore.transactionDetail.product.productId}`">
          <button
            class="btn">
            상품 상세보기
          </button>
        </RouterLink>
      </div>
    </div>
    <div class="purchase_info">
      <div class="info_title">
        <h4>결제 내역</h4>
      </div>
      <div class="price_box">
        <div class="title">
          총 결제금액
        </div>
        <div class="price">
          {{ `${userStore.transactionDetail.product.price.toLocaleString()}원` }}
        </div>
      </div>
      <div class="price_detail">
        <div class="purchase_price">
          <div>구매가</div>
          <div>{{ userStore.transactionDetail.product.price.toLocaleString() }}</div>
        </div>
        <div class="inspection_price">
          <div>검수비</div>
          <div>무료</div>
        </div>
        <div class="shipping_price">
          <div>배송비</div>
          <div>무료 이벤트</div>
        </div>
      </div>
    </div>
    <div class="btn">
      <button
        v-show="!userStore.transactionDetail.isCanceled"
        class="done"
        :disabled="userStore.transactionDetail.done"
        :class="{ disabled: userStore.transactionDetail.done}"
        @click="done(userStore.transactionDetail.detailId)">
        구매확정
      </button>
      <button
        v-show="!userStore.transactionDetail.done"
        class="cancel"
        :disabled="userStore.transactionDetail.isCanceled"
        :class="{ disabled: userStore.transactionDetail.isCanceled}"
        @click="cancel(userStore.transactionDetail.detailId)">
        구매취소
      </button>
      <button
        class="back_list"
        @click="$router.back">
        목록
      </button>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  computed: {
    ...mapStores(useUserStore)
  },
  async created() {
    await this.userStore.getTransactionDetail(this.$route.params.id)
  },
  methods: {
    async done(value) {
      await this.userStore.transactionDone(value)
    },
    cancel(value) {
      this.userStore.transactionCancel(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods_datail {
  .content_title {
    padding: 5px 0 6px;
    .title {
      font-size: 24px;
      font-weight: 700;
    }
  }
  .detail_id {
    margin-top: 30px;
    h4 {
      padding-bottom: 15px;
      font-size: 18px;
      border-bottom: 2px solid #222;
      .id {
        margin-left: 5px;
        font-weight: 700;
      }
    }
  }
  .item_list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0px;
    .item_img {
      max-width: 120px;
      border-radius: 10px;
      overflow: hidden;
      background-color: #f5f5f5;
      img {
        width: 100%;
      }
    }
    .item_info {
      flex-grow: 1;
      margin-left: 16px;
      .title {
        .brand {
          font-weight: 700;
          color: #333;
        }
        .name {
          margin-top: 8px;
          color: #222;
        }
      }
    }
    .item_link {
      flex-shrink: 0;
      .btn {
        margin-left: 30px;
        padding: 3px 15px;
        font-size: 12px;
        background-color: #FFF;
        border: 1px solid #D3D3D3;
        border-radius: 10px;  
        height: 34px;
        color: rgba(#222, .8);
        cursor: pointer;
      }
    }
  }
  .purchase_info {
    margin-top: 40px;
    .info_title {
      padding: 5px 0;
      border-bottom: 3px solid #222;
      h4 {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .price_box {
      display: flex;
      padding: 40px 20px;
      background-color: #FAFAFA;
      border-bottom: 1px solid #ebebeb;
      .title {
        flex-grow: 1;
        max-width: 280px;
        font-size: 15px;
        font-weight: 700;
        line-height: 18px
      }
      .price {
        flex-grow: 1;
        font-size: 18px;
        font-weight: 700;
        color: #f15746;
      }
    }
    .price_detail {
      display: flex;
      flex-direction: column;
      padding: 30px 20px;
      > div {
        display: flex;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 700;
        div:nth-child(1) {
          flex-grow: 1;
          max-width: 280px;
          color: rgba(#222, .6);
        }
        div:nth-child(2) {
          flex-grow: 1;
        }
      }
      .purchase_price {
        div:nth-child(1) {
          color: #222;
        }
      }
      .inspection_price {
        div:nth-child(2) {
          color: rgba(#222, .8);
        }
      }
    }
  }
  .btn {
    margin-top: 20px;
    text-align: center;
    button {
      margin-left: 30px;
      padding: 3px 35px;
      font-size: 12px;
      background-color: #fff;
      border: 1px solid #d3d3d3;
      border-radius: 5px;  
      height: 34px;
      color: rgba(#222, .8);
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.disabled {
          border: 0;
          background-color: #ebebeb;
          color: rgba(#222, 0.5);
          cursor: default;
        }
    }
    .back_list {
      background-color: #222;
      color: #fff
    }
  }
}
</style>
