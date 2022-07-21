<template>
  <li class="item_list">
    <div class="item_img">
      <img
        :src="list.product.thumbnail"
        alt="제품 사진" />
    </div>
    <div class="item_info">
      <div class="title">
        <p class="brand">
          {{ list.product.tags[1] }}
        </p>
        <p class="name">
          {{ list.product.title }}
        </p>
        <span class="price">{{ `${list.product.price.toLocaleString()}원` }}</span>
      </div>
    </div>
    <div class="btn">
      <button
        class="done"
        :class="{ disabled: list.done}">
        구매확정
      </button>
      <button
        class="cancel"
        :class="{ disabled: list.isCanceled}">
        구매취소
      </button>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      required: true
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
    // height: 120px;
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
      .price {
        display: inline-block;
        margin-top: 8px;
        font-size: 15px;
        color: #222;
      }
    }
  }
  .btn {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    button {
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
