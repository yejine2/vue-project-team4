<template>
  <section>
    <div
      class="filter_list">
      <div class="filter_box">
        <div class="filter_name">
          카테고리
        </div>
        <p
          v-if="false"
          class="all_category">
          모든 카테고리
        </p>
      </div>
      <i class="bi bi-plus-lg"></i>
    </div>
    <!-- 카테고리 리스트 -->
    <div class="list_max">
      <ul
        class="filter_menu">
        <li
          class="filter_one">
          <div
            class="list_off"
            @click="category_btn.shoe = !category_btn.shoe, checked($event, category_btn.shoe)">
            <div class="checkbox"></div>
            <p>신발</p>
          </div>
          <ul
            v-if="category_btn.shoe"
            class="filter_two">
            <li
              v-for="shoe in shoes"
              :key="shoe"
              class="list_on"
              @click="shoe.two = !shoe.two, inner_checked($event, shoe.two, shoes)">
              <div class="inner_checkbox"></div>
              <p class="cate_name">
                {{ shoe.one }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      
      <ul
        class="filter_menu">
        <li
          class="filter_one">
          <div
            class="list_off"
            @click="category_btn.cloth = !category_btn.cloth, checked($event, category_btn.cloth)">
            <div class="checkbox"></div>
            <p>의류</p>
          </div>
          <ul
            v-if="category_btn.cloth"
            class="filter_two">
            <li
              v-for="cloth in clothes"
              :key="cloth"
              class="list_on"
              @click="cloth.two = !cloth.two, inner_checked($event, cloth.two, clothes)">
              <div class="inner_checkbox"></div>
              <p class="cate_name">
                {{ cloth.one }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <ul
        class="filter_menu">
        <li
          class="filter_one">
          <div
            class="list_off"
            @click="category_btn.accessory = !category_btn.accessory, checked($event, category_btn.accessory)">
            <div class="checkbox"></div>
            <p>패션잡화</p>
          </div>
          <ul
            v-if="category_btn.accessory"
            class="filter_two">
            <li
              v-for="accessory in accessories"
              :key="accessory"
              class="list_on"
              @click="accessory.two = !accessory.two, inner_checked($event, accessory.two, accessories)">
              <div class="inner_checkbox"></div>
              <p class="cate_name">
                {{ accessory.one }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <ul
        class="filter_menu">
        <li
          class="filter_one">
          <div
            class="list_off"
            @click="category_btn.life = !category_btn.life, checked($event, category_btn.life)">
            <div class="checkbox"></div>
            <p>라이프</p>
          </div>
          <ul
            v-if="category_btn.life"
            class="filter_two">
            <li
              v-for="life in lifes"
              :key="life"
              class="list_on"
              @click="life.two = !life.two, inner_checked($event, life.two, lifes)">
              <div class="inner_checkbox"></div>
              <p class="cate_name">
                {{ life.one }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
      <ul
        class="filter_menu">
        <li
          class="filter_one">
          <div
            class="list_off"
            @click="category_btn.tech = !category_btn.tech, checked($event, category_btn.tech)">
            <div class="checkbox"></div>
            <p>테크</p>
          </div>
          <ul
            v-if="category_btn.tech"
            class="filter_two">
            <li
              v-for="tech in techs"
              :key="tech"
              class="list_on"
              @click="tech.two = !tech.two, inner_checked($event, tech.two, techs)">
              <div class="inner_checkbox"></div>
              <p class="cate_name">
                {{ tech.one }}
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'

export default {
  data() {
    return {
      category_btn: {
        shoe: false,
        cloth: false,
        accessory: false,
        life: false,
        tech: false
      },
      shoes: [
        { one: '스니커즈', two: false },
        { one: '샌들/슬리퍼', two: false },
        { one: '로퍼/플랫', two: false },
        { one: '부츠', two: false }
      ],
      clothes: [
        { one: '반팔 티셔츠', two: false },
        { one: '반바지', two: false },
        { one: '긴팔 티셔츠', two: false },
        { one: '후드', two: false },
        { one: '스웨트 셔츠', two: false },
        { one: '니트웨어', two: false },
        { one: '셔츠', two: false },
        { one: '자켓', two: false },
        { one: '코트', two: false },
        { one: '패딩', two: false },
        { one: '바지', two: false },
        { one: '기타', two: false }
      ],
      accessories: [
        { one: '프리미엄시계', two: false },
        { one: '프리미엄가방', two: false },
        { one: '가방', two: false },
        { one: '스몰레더', two: false },
        { one: '모자', two: false },
        { one: '기타', two: false }
      ],
      lifes: [
        { one: '아트토이/피규어', two: false },
        { one: '레고', two: false },
        { one: '캠핑', two: false },
        { one: '향수', two: false },
        { one: '트레이딩 카드', two: false },
        { one: 'LP', two: false },
        { one: '기타', two: false }
      ],
      techs: [
        { one: '스마트워치', two: false },
        { one: '음향기기', two: false },
        { one: '그래픽카드', two: false },
        { one: '게임기', two: false },
        { one: '테크 액세서리', two: false },
        { one: '기타', two: false },
      ]
    }
  },
  computed: {
    ...mapStores(useSearchStore)
  },
  watch: {
    
  },
  methods: {
    checked(e, boolean) {
      // console.log('hi')
      const list = document.querySelectorAll('.list_off')
      const checkbox = document.querySelectorAll('.checkbox')
      const cate_name = ['신발', '의류', '패션잡화', '라이프', '테크']

      for(let i =0; i < list.length; i++) {
        if(e.currentTarget === list.item(i)) {
          if(boolean) {
            checkbox.item(i).classList.add('checked')
            this.searchStore.category = cate_name[i]
          } else {
            checkbox.item(i).classList.remove('checked')
          } 
        }
        else if(e.currentTarget !== list.item(i)) {
          checkbox.item(i).classList.remove('checked')
          if(i === 0) {
          this.category_btn.shoe = false
          } else if(i === 1) {
            this.category_btn.cloth = false
          } else if(i === 2) {
            this.category_btn.accessory = false
          } else if(i === 3) {
            this.category_btn.life = false
          } else if(i === 4) {
            this.category_btn.tech = false
          }
        }
      }
      // const inner_list = document.querySelectorAll('.list_on')
      // if(inner_list.length > 1) {
      //   console.log('plz')
      // }
    },
    inner_checked(e, boolean, name) {
      const inner_list = document.querySelectorAll('.list_on')
      const inner_checkbox = document.querySelectorAll('.inner_checkbox')
      const cate_name = document.querySelectorAll('.cate_name')
      const checkbox = document.querySelectorAll('.checkbox')
      for(let i = 0; i < inner_list.length; i++) {
        if(e.currentTarget === inner_list.item(i)) {
          if(boolean) {
            inner_checkbox.item(i).classList.add('checked')
            this.searchStore.category = cate_name[i].textContent
            console.log('1')
            for(let k = 0; k < checkbox.length; k++) {
              checkbox.item(k).classList.remove('checked')
            }
          } else {
            inner_checkbox.item(i).classList.remove('checked')
          // this.category_btn.shoe = false
          // this.category_btn.cloth = false
          // this.category_btn.accessories = false
          // this.category_btn.life = false
          // this.category_btn.tech = false
          }
        }
        else if(e.currentTarget !== inner_list.item(i)) {
          console.log('3')
          inner_checkbox.item(i).classList.remove('checked')
          if(name === this.shoes) {
            this.shoes[i].two = false
          }
          else if(name === this.clothes) {
            this.clothes[i].two = false
          }
          else if(name === this.accessories) {
            this.accessories[i].two = false
          }
          else if(name === this.life) {
            this.life[i].two = false
          }
          else if(name === this.techs) {
            this.techs[i].two = false
          }
          for(let k = 0; k < checkbox.length; k++) {
            console.log('in')
            if(e.currentTarget === checkbox.item(k)) {
              console.log('inin')
              checkbox.item(k).classList.add('checked')
            }
          }
        }
      }
    }
  }
}


</script>

<style scoped lang="scss">
section {
  border-bottom: 1px solid #ebebeb;
.filter_list {
  display: flex;
  align-items: center;
  padding: 16px 0;
    
  .filter_box {
    .filter_name {
      position: relative;
      font-size: 13px;
      font-weight: 600;
    }
    .all_category {
      margin-top: 4px;
      font-size: 15px;
      color: rgba(34,34,34,.5);
    }
  }
  .bi {
    width: 20px;
    height: 20px;
    margin-left: auto;
    color: rgba(34,34,34,.5);
  }
}
.list_max {
  max-height: 339px;
  overflow-y: scroll;
  .filter_menu {
    padding-bottom: 24px;
    .filter_one {
      padding-top: 10px;
      font-size: 14px;
      .list_off {
        display: flex;
        align-items: center;
        cursor: pointer;
        
      }
      .filter_two {
            padding: 16px 0 6px 25px;
        .list_on {
          display: flex;
          align-items: center;
          padding-top: 10px;
        }
      }
    }
    .filter_one:first-child {
      padding-top: 0;
    }
  }
}
}
.checkbox {
  width: 16px;
  height: 17px;
  margin-right: 8px;
  border: 1px solid rgba(34,34,34,.3);;
  cursor: pointer;
}
.inner_checkbox {
  width: 16px;
  height: 17px;
  margin-right: 8px;
  border: 1px solid rgba(34,34,34,.3);;
  cursor: pointer;
}
.checked {
  background: url('../../assets/search/checkbox.png') no-repeat;
  background-position: center;
  background-size: 22px;
}

</style>
