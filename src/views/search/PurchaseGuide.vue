<template>
  <div class="purchase_guide">
    <strong>구매 전 꼭 확인해주세요!</strong>
    <div
      ref="guide"
      class="b_title"
      @click="inner_guide_a = !inner_guide_a, guide_style($event, inner_guide_a)">
      <div class="shipping_guide">
        배송 기간 안내
      </div>
      <i
        v-if="inner_guide"
        class="bi bi-chevron-up"></i>
      <i
        v-else
        class="bi bi-chevron-down"></i>
    </div>
    <div
      v-if="inner_guide_a"
      class="shipping_guide_inner">
      <p class="important">
        KREAM은 최대한 빠르게 모든 상품을 배송하기 위해 노력하고 있습니다. 배송 시간은 판매자가 검수를 위하여 상품을 검수센터로 보내는 속도에 따라 차이가 있습니다.
      </p>
      <p class="s_title">
        [빠른배송 구매]
      </p>
      <p class="s_content">
        - 판매자가 보관 신청한 상품 중 검수에 합격한 상품을 KREAM의 전용 창고에 보관합니다. 보관 상품에 한하여 바로 구매와 95점 구매가 가능합니다.
      </p>
      <p class="s_content">
        - 오늘(오후 11:59까지) 결제하면 내일 바로 출고되어 빠른 배송이 가능합니다. (연휴 및 공휴일, 천재지변, 택배사 사유 등 예외적으로 출고일이 변경될 수 있습니다.
      </p>
      <p class="s_title">
        [일반 구매]
      </p>
      <p class="s_content">
        - 거래가 체결된 시점부터 48시간(일요일•공휴일 제외) 내에 판매자가 상품을 발송해야 하며, 통상적으로 발송 후 1-2일 내에 KREAM 검수센터에 도착합니다.
      </p>
      <p class="s_content">
        - 검수센터에 도착한 상품은 입고 완료 후 3영업일 이내에 검수를 진행합니다. 검수 합격시 배송을 준비합니다.
        <br />* 상품 종류 및 상태에 따라 검수 소요 시간은 상이할 수 있으며, 구매의사 확인에 해당할 경우 구매자와 상담 진행으로 인해 지연이 발생할 수 있습니다.
      </p>
      <p class="s_content">
        - 검수센터 출고는 매 영업일에 진행하고 있으며, 출고 마감시간은 오후 5시입니다. 출고 마감시간 이후 검수 완료건은 운송장번호는 입력되지만 다음 영업일에 출고됩니다.
      </p>
    </div>
    <div
      ref="guide"
      class="b_title"
      @click="inner_guide_b = !inner_guide_b, guide_style($event, inner_guide_b)">
      <div class="shipping_guide">
        검증 안내
      </div>
      <i
        v-if="inner_guide"
        class="bi bi-chevron-up"></i>
      <i
        v-else
        class="bi bi-chevron-down"></i>
    </div>
    <div
      v-if="inner_guide_b"
      class="shipping_guide_inner">
      <p class="important">
        판매자의 상품이 검수센터에 도착하면 전담 검수팀이 철저한 분석과 검사로 정가품 확인을 진행합니다.
      </p>

      <p class="s_content inspection_content">
        - 검수센터에서는 정가품 여부를 확인하기 위하여, 지속적으로 데이터를 쌓고 분석하여 기록하고 있습니다.
      </p>
      <p class="s_content">
        - 업계 전문가로 구성된 검수팀은 박스와 상품의 라벨에서 바느질, 접착, 소재 등 모든 것을 검수합니다.
      </p>

      <p class="important inspection">
        검수 결과는 불합격•검수 보류•합격의 세가지 상태로 결과가 변경됩니다.
      </p>
      <p class="s_content inspection_content">
        * 검수 합격: KREAM 검수택(Tag)이 부착되어 배송을 준비함
      </p>
      <p class="s_content">
        * 검수 보류: 앱에서 사진으로 상품의 상태 확인 및 구매 여부를 선택. (24시간 이후 자동 검수 합격)
      </p>
      <p class="s_content">
        * 검수 불합격: 즉시 거래가 취소되고 구매하신 금액을 환불 처리함.(환불 수단은 결제 수단과 동일)
      </p>
    </div>
    <div
      ref="guide"
      class="b_title"
      @click="inner_guide_c = !inner_guide_c, guide_style($event, inner_guide_c)">
      <div class="shipping_guide">
        구매 환불/취소/교환 안내
      </div>
      <i
        v-if="inner_guide"
        class="bi bi-chevron-up"></i>
      <i
        v-else
        class="bi bi-chevron-down"></i>
    </div>
    <div
      v-if="inner_guide_c"
      class="shipping_guide_inner">
      <p class="important">
        KREAM은 익명 거래를 기반으로 판매자가 판매하는 상품을 구매자가 실시간으로 구매하여 거래를 체결합니다.
      </p>
      <p class="s_content">
        - 단순 변심이나 실수에 의한 취소/교환/반품이 불가능합니다. 상품을 원하지 않으시는 경우 언제든지 KREAM에서 재판매를 하실 수 있습니다.
      </p>
      <p class="s_content">
        - 상품 수령 후, 이상이 있는 경우 KREAM 고객센터로 문의해주시기 바랍니다.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inner_guide_a: false,
      inner_guide_b: false,
      inner_guide_c: false
    }
  },
  methods: {
    guide_style(e, boolean) {
      for(let i =0; i < this.$refs.guide.length; i++) {
        if(e.currentTarget === this.$refs.guide[i] && boolean) {
          this.$refs.guide[i].classList.add('guide_on')
        } else if(e.currentTarget === this.$refs.guide[i] && boolean === false) {
          this.$refs.guide[i].classList.remove('guide_on')
        }
      }
      
    }
  }
}
</script>

<style scoped lang="scss">
.purchase_guide {
  padding-top: 39px;
  strong {
    display: inline-block;
    padding-bottom: 12px;
    font-size: 18px;
    font-weight: 600;
  }
  .b_title {
    display: flex;
    justify-content: space-between;
    padding: 18px 0 17px;
    border-bottom: 1px solid #ebebeb;
    cursor: pointer;
    .shipping_guide{
      font-size: 15px;
    }
  }
  .guide_on {
    font-weight: 600;
    border-bottom: 1px solid #222;
  }
  .shipping_guide_inner {
    padding: 20px 0;
    border-bottom: 1px solid #ebebeb;
    font-size: 13px;
    color: rgba(34,34,34,.8);
    .important {
      font-weight: 600;
    }
    .s_title {
      margin-top: 20px;
    }
    .s_content {
      margin-top: 10px;
    }
    .inspection {
      margin-top: 38px;
    }
    .inspection_content {
      margin-top: 20px;
    }
  }
}
</style>
