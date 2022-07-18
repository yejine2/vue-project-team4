<template>
  <section>
    <div
      class="filter_list">
      <div class="filter_box">
        <div class="filter_name">
          카테고리
        </div>
        <p
          v-if="hide"
          class="all_category">
          모든 카테고리
        </p>
      </div>
      <i
        v-if="minus_icon"
        class="bi bi-plus-lg"
        @click="hide = !hide, more = !more, minus_icon = !minus_icon"></i>
      <i
        v-else
        class="bi bi-dash-lg"
        @click="hide = !hide, more = !more, minus_icon = !minus_icon"></i>
    </div>
    <!-- 카테고리 리스트 -->
    <div
      v-show="more"
      class="list">
      <div class="list_max">
        <ul
          class="filter_menu">
          <li
            class="filter_one">
            <div
              class="list_off"
              @click="category_btn.shoe = !category_btn.shoe, inner.shoe = true, checked($event, category_btn.shoe, shoes)">
              <div class="checkbox"></div>
              <p>신발</p>
            </div>
            <ul
              v-if="inner.shoe"
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
              @click="category_btn.cloth = !category_btn.cloth, inner.cloth = true, checked($event, category_btn.cloth, clothes)">
              <div class="checkbox"></div>
              <p>의류</p>
            </div>
            <ul
              v-if="inner.cloth"
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
              @click="category_btn.accessory = !category_btn.accessory, inner.accessory = !inner.accessory, checked($event, category_btn.accessory, accessories)">
              <div class="checkbox"></div>
              <p>패션잡화</p>
            </div>
            <ul
              v-if="inner.accessory"
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
              @click="category_btn.life = !category_btn.life, inner.life = !inner.life, checked($event, category_btn.life, lifes)">
              <div class="checkbox"></div>
              <p>라이프</p>
            </div>
            <ul
              v-if="inner.life"
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
              @click="category_btn.tech = !category_btn.tech, inner.tech = !inner.tech, checked($event, category_btn.tech, techs)">
              <div class="checkbox"></div>
              <p>테크</p>
            </div>
            <ul
              v-if="inner.tech"
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
    </div>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { useSearchStore } from '~/store/search'

export default {
  data() {
    return {
      hide: true,
      more: false,
      minus_icon: true,
      category_btn: {
        shoe: false,
        cloth: false,
        accessory: false,
        life: false,
        tech: false
      },
      inner: {
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
    ...mapStores(useSearchStore),
    tags() {return this.searchStore.searchTags[0]},
    cate_interaction() {return this.searchStore.categoryInteract}
  },
  watch: {
    // 헤더 카테고리와 연동
    tags() {
      const list_off = document.querySelectorAll('.list_off')
      const checkbox = document.querySelectorAll('.checkbox')
      const cate_name = ['신발', '의류', '패션잡화', '라이프', '테크']
      
      function btn_on(i) {
        checkbox.item(i).classList.add('checked')
        list_off.item(i).classList.add('bold')
      }

      // 검색 결과 필터 끄는 버튼과 연동
      if(this.searchStore.categoryInteract) {
        const list = document.querySelectorAll('.list_off')
        const checkbox = document.querySelectorAll('.checkbox')
        for(let i = 0; i < list.length; i++) {
          checkbox.item(i).classList.remove('checked')
          list.item(i).classList.remove('bold')
        }
        this.category_btn.shoe = false
        this.inner.shoe = false
        this.category_btn.cloth = false
        this.inner.cloth = false
        this.category_btn.accessory = false
        this.inner.accessory = false
        this.category_btn.life = false
        this.inner.life = false
        this.category_btn.tech = false
        this.inner.tech = false
      } else {
        return console.log('nope')
      }

      if(cate_name.includes(this.searchStore.searchTags[0])) {
        for(let i = 0; i < cate_name.length; i++) {
          if(this.searchStore.searchTags[0] === cate_name[i]) {
            this.hide = false
            this.minus_icon = false
            this.more = true
            if(i === 0) {
              btn_on(i)
              this.category_btn.shoe = true
              this.inner.shoe = true
            }
            else if(i === 1) {
              btn_on(i)
              this.category_btn.cloth = true
              this.inner.cloth = true
            }
            else if(i === 2) {
              btn_on(i)
              this.category_btn.accessory = true
              this.inner.accessory = true
            }
            else if(i === 3) {
              btn_on(i)
              this.category_btn.life = true
              this.inner.life = true
            }
            else if(i === 4) {
              btn_on(i)
              this.category_btn.tech = true
              this.inner.tech = true
            }
          }
          else {
            checkbox.item(i).classList.remove('checked')
            list_off.item(i).classList.remove('bold')
            if(i === 0) {
              this.category_btn.shoe = false
              this.inner.shoe = false
            }
            else if(i === 1) {
              this.category_btn.cloth = false
              this.inner.cloth = false
            }
            else if(i === 2) {
              this.category_btn.accessory = false
              this.inner.accessory = false
            }
            else if(i === 3) {
              this.category_btn.life = false
              this.inner.life = false
            }
            else if(i === 4) {
              this.category_btn.tech = false
              this.inner.tech = false
            }
          }
        }
      }
    }
  },
  methods: {
    async checked(e, boolean, data) {
      const list = document.querySelectorAll('.list_off')
      const checkbox = document.querySelectorAll('.checkbox')
      const inner_checkbox = document.querySelectorAll('.inner_checkbox')
      const inner_list = document.querySelectorAll('.list_on')
      const cate_name = ['신발', '의류', '패션잡화', '라이프', '테크']
      const cate_inner_name = document.querySelectorAll('.cate_name')
      
      for(let i =0; i < list.length; i++) {
        if(e.currentTarget === list.item(i)) {
          if(boolean) {
            checkbox.item(i).classList.add('checked')
            list.item(i).classList.add('bold')
            for(let k = 0; k < cate_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_name[k])) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            for(let k = 0; k < cate_inner_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_inner_name[k].textContent)) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            this.searchStore.searchTags.unshift(cate_name[i])
            this.searchStore.category = cate_name[i]
            this.shoes.map(a => {a.two = false})
            this.clothes.map(a => {a.two = false})
            this.accessories.map(a => {a.two = false})
            this.lifes.map(a => {a.two = false})
            this.techs.map(a => {a.two = false})
            // 재검색
            await this.searchStore.searchProducts()
          } else {
            data.map(a => {a.two = false})
            checkbox.item(i).classList.remove('checked')
            list.item(i).classList.remove('bold')
            for(let k = 0; k < cate_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_name[k])) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            this.searchStore.category = ''
            // 재검색
            await this.searchStore.searchProducts()
          }
        }
        else if(e.currentTarget !== list.item(i)) {
          checkbox.item(i).classList.remove('checked')
          list.item(i).classList.remove('bold')
          if(i === 0) {
          this.category_btn.shoe = false
          this.inner.shoe = false
          } else if(i === 1) {
            this.category_btn.cloth = false
            this.inner.cloth = false
          } else if(i === 2) {
            this.category_btn.accessory = false
            this.inner.accessory = false
          } else if(i === 3) {
            this.category_btn.life = false
            this.inner.life = false
          } else if(i === 4) {
            this.category_btn.tech = false
            this.inner.tech = false
          }
        }
      }
      for(let j = 0; j < inner_checkbox.length; j++) {
        inner_checkbox.item(j).classList.remove('checked')
        inner_list.item(j).classList.remove('bold')
      }
    },
    async inner_checked(e, boolean, name) {
      const list = document.querySelectorAll('.list_off')
      const inner_list = document.querySelectorAll('.list_on')
      const inner_checkbox = document.querySelectorAll('.inner_checkbox')
      const cate_name = ['신발', '의류', '패션잡화', '라이프', '테크']
      const cate_inner_name = document.querySelectorAll('.cate_name')
      const checkbox = document.querySelectorAll('.checkbox')

      for(let i = 0; i < inner_list.length; i++) {
        if(e.currentTarget === inner_list.item(i)) {
          if(boolean) {
            inner_checkbox.item(i).classList.add('checked')
            inner_list.item(i).classList.add('bold')
            // 카테고리 대분류 항목이 있는지 검사, 지움
            for(let k = 0; k < cate_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_name[k])) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            // 카테고리 소분류 항목이 있는지 검사, 지움
            for(let k = 0; k < cate_inner_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_inner_name[k].textContent)) {
                this.searchStore.searchTags.splice(0, 1)
              }
            }
            // 카테고리 소분류 추가
            this.searchStore.category = cate_inner_name[i].textContent
            this.searchStore.searchTags.unshift(cate_inner_name[i].textContent)
            for(let k = 0; k < checkbox.length; k++) {
              checkbox.item(k).classList.remove('checked')
              list.item(k).classList.remove('bold')
            }
            // 재검색
            await this.searchStore.searchProducts()
          } else {
            inner_checkbox.item(i).classList.remove('checked')
            inner_list.item(i).classList.remove('bold')
            this.searchStore.category = ''
            for(let k = 0; k < cate_inner_name.length; k++) {
              if(this.searchStore.searchTags.find(item => item === cate_inner_name[k].textContent)) {
                const number = this.searchStore.searchTags.findIndex(item => item === cate_inner_name[k].textContent)
                this.searchStore.searchTags.splice(number, 1)
              }
            }
            // 재검색
            await this.searchStore.searchProducts()
          }
        }
        else if(e.currentTarget !== inner_list.item(i)) {
          inner_checkbox.item(i).classList.remove('checked')
          inner_list.item(i).classList.remove('bold')
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
        }
      }
      this.category_btn.shoe = false
      this.category_btn.cloth = false
      this.category_btn.accessory = false
      this.category_btn.life = false
      this.category_btn.tech = false
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
      font-weight: 500;
    }
    .all_category {
      margin-top: 8px;
      font-size: 15px;
      font-weight: 400;
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
.list {
  padding-bottom: 24px;
  user-select: none;
  .list_max {
    max-height: 339px;
    overflow-y: auto;
    .filter_menu {
      padding-top: 10px;
      font-size: 14px;
      .filter_one {
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
            cursor: pointer;
          }
        }
      }
      .filter_one:first-child {
        padding-top: 0;
      }
    }
  }
}
.list_max::-webkit-scrollbar {
  display: none;
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
.bold {
  font-weight: 600;
}

</style>
