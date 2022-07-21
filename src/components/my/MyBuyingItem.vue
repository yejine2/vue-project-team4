<template>
  <li class="item_list">
    <div class="item_img">
      <RouterLink
        :to="`/my/buying/${list.detailId}`"
        class="item_link">
        <img
          :src="list.product.thumbnail"
          alt="제품 사진" />
      </RouterLink>
    </div>
    <div class="item_info">
      <RouterLink
        :to="`/my/buying/${list.detailId}`"
        class="item_link">
        <div class="title">
          <p class="brand">
            {{ list.product.tags[1] }}
          </p>
          <p class="name">
            {{ list.product.title }}
          </p>
          <span class="price">{{ `${list.product.price.toLocaleString()}원` }}</span>
        </div>
      </RouterLink>
    </div>
    <div class="btn">
      <button
        v-show="!list.isCanceled"
        class="done"
        :disabled="list.done"
        :class="{ disabled: list.done }"
        @click="done(list.detailId)">
        구매확정
      </button>
      <button
        v-show="!list.done"
        class="cancel"
        :disabled="list.isCanceled"
        :class="{ disabled: list.isCanceled }"
        @click="cancel(list.detailId)">
        구매취소
      </button>
    </div>
  </li>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapStores(useUserStore)
  },
  methods: {
    done(value) {
      this.userStore.transactionDone(value)
    },
    cancel(value) {
      this.userStore.transactionCancel(value)
    }
  }
}
</script>

<style lang="scss" scoped>
.item_list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 15px;
  border-bottom: 1px solid #ebebeb;
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
    .item_link {
      text-decoration: none;
      .title {
        
        .brand {
          font-weight: 700;
          color: #333;
        }
        .name {
          margin-top: 8px;
          color: #222;
        }
        .price {
          display: inline-block;
          margin-top: 8px;
          font-size: 15px;
          color: #222;
        }
      }
    }
  }
  .btn {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    button {
      margin-left: 30px;
      padding: 3px 15px;
      font-size: 12px;
      background-color: #fff;
      border: 1px solid #d3d3d3;
      border-radius: 5px;  
      height: 34px;
      color: rgba(#222, .8);
      cursor: pointer;
      &.done.disabled {
        border: 0;
        background-color: #ebebeb;
        color: rgba(#222, 0.5);
        cursor: default;
      }
      &.cancel {
        margin-top: 7px;
        &.disabled {
          border: 0;
          background-color: #ebebeb;
          color: rgba(#222, 0.5);
          cursor: default;
        }
      }
    }
  }
}
</style>
