<template>
  <div class="container">
    <MySNB />

    <div class="content_area">
      <RouterView />

      <template v-if="$route.path == '/my'">
        <div class="my_home">
          <div class="user_membership">
            <div class="user_detail">
              <div class="user_thumb">
                <img
                  :src="userStore.user.profileImg"
                  alt="사용자 이미지" />
              </div>
              <div class="user_info">
                <div class="info_box">
                  <strong class="name">
                    {{ userStore.user.displayName }}
                  </strong>
                  <p class="email">
                    {{ userEmailMasking }}
                  </p>
                  <RouterLink to="/my/profile">
                    <button
                      class="btn_modify"
                      @click="getimg">
                      프로필 수정
                    </button>
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useUserStore } from '~/store/user'
import MySNB from '~/components/my/MySNB.vue'

export default {
  components: {
    MySNB
  },
  computed: {
    ...mapStores(useUserStore),
    userEmailMasking(){
      return this.userStore.userEmailMasking(this.userStore.user.email)
    }
  },
  methods: {
    route() {
      console.log(this.$route)
      console.log('user',this.userStore.user)
    },
    getimg(){
      console.log(this.userStore.user.profileImg)
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  margin: 0 auto;
  padding: 40px 40px 160px;
  max-width: 1280px;
  box-sizing: border-box;
  .content_area {
    width: 100%;
    .btn_modify {
      margin-top: 12px;
      padding: 0 14px;
      height: 36px;
      font-size: 12px;
      line-height: 34px;
      color: rgba(34, 34, 34, .8);
      background-color: #fff;
      border: 1px solid #d3d3d3;
      border-radius: 10px;
      outline: none;
      cursor: pointer;
    } 
    .my_home {
      .user_membership {
        border: 1px solid #ebebeb;
        border-radius: 10px;
        background-color: $color-white;
        .user_detail {
          display: flex;
          padding: 30px 32px 22px;
          .user_thumb {
            margin-right: 12px;
            width: 100px;
            height: 100px;
            border-radius: 100%;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 100%;
            }
          }
          .user_info {
            .info_box {
              .name {
                font-size: 18px;
                font-weight: 700;
                line-height: 21px;
                color: $color-black;
              }
              .email {
                font-size: 14px;
                line-height: 18px;
                color: rgba(34, 34, 34, .5)
              }
            }
          }
        }
      }
    }
  }
}
</style>
