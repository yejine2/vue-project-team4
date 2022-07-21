<template>
  <footer class="footer">
    <div class="inner">
      <div class="service-area">
        <div class="footer-menu">
          <div class="menu-box">
            <strong class="menu-title">이용안내</strong>
            <ul class="menu-list">
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  검수기준
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  이용정책
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  패널티 정책
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  커뮤니티 가이드라인
                </router-link>
              </li>
            </ul>
          </div>
          <div
            class="menu-box"
            style="margin-left: 80px">
            <strong class="menu-title">고객지원</strong>
            <ul class="menu-list">
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  공지사항
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  서비스 소개
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  쇼룸 안내
                </router-link>
              </li>
              <li class="menu-item">
                <router-link
                  to="#"
                  class="menu-link">
                  판매자 방문접수
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="customer-service">
          <strong class="service-title">고객센터
            <a
              href="tel:1588-7813"
              class="service-tel">1588-7813</a>
          </strong>
          <div class="service-item">
            <dl class="time-box">
              <dt class="time-term">
                운영시간
              </dt>
              <dd class="time-derc">
                평일 11:00 - 18:00 (토 ∙ 일, 공휴일 휴무)
              </dd>
            </dl>
            <dl
              class="time-box"
              style="padding-top: 4px">
              <dt class="time-term">
                점심시간
              </dt>
              <dd class="time-derc">
                평일 13:00 - 14:00
              </dd>
            </dl>
          </div>
          <p class="service-notice">
            1:1 문의하기는 앱에서만 가능합니다.
          </p>
          <div class="service-btn-box">
            <a href="#"><button class="service-btn">자주 묻는 질문</button></a>
          </div>
        </div>
      </div>
      <div class="corporation_area">
        <ul class="term-list">
          <li class="term-item">
            <router-link
              to="#"
              class="term-link">
              회사소개
            </router-link>
          </li>
          <li class="term-item">
            <router-link
              to="#"
              class="term-link">
              인재채용
            </router-link>
          </li>
          <li class="term-item">
            <router-link
              to="#"
              class="term-link">
              제휴제안
            </router-link>
          </li>
          <li class="term-item">
            <router-link
              to="#"
              class="term-link">
              이용약관
            </router-link>
          </li>
          <li class="term-item">
            <router-link
              to="#"
              class="term-link privacy">
              개인정보처리방침
            </router-link>
          </li>
        </ul>
        <div class="footer-sns">
          <a href="#"><img
            src="/src/assets/home/footer/instagram.png"
            alt="instagram" /></a>
          <a href="#"><img
            src="/src/assets/home/footer/facebook.png"
            alt="facebook" /></a>
          <a href="#"><img
            src="/src/assets/home/footer/kakaotalk.png"
            alt="kakaotalk" /></a>
        </div>
        <div class="business-info">
          <div class="info-list">
            <dl class="info-item">
              <dt class="business-title">
                크림 주식회사 · 대표
              </dt>
              <dd class="business-derc">
                김창욱
              </dd>
            </dl>
            <dl class="info-item">
              <dt class="business-title">
                사업자등록번호:
              </dt>
              <dd class="business-derc">
                570-88-01618
              </dd>
              <dd class="business-derc">
                <a
                  href="#"
                  class="license-link">사업자정보확인</a>
              </dd>
            </dl>
            <dl class="info-item">
              <dt class="business-title">
                통신판매업:
              </dt>
              <dd class="business-derc">
                제 2021-성남분당C-0093호
              </dd>
            </dl>
          </div>
          <div class="info-list">
            <dl class="info-item">
              <dt class="business-title">
                사업장소재지:
              </dt>
              <dd class="business-derc">
                경기도 성남시 분당구 분당내곡로 117, 8층
              </dd>
            </dl>
            <dl class="info-item">
              <dt class="business-title">
                개인정보관리책임자:
              </dt>
              <dd class="business-derc">
                김미진
              </dd>
            </dl>
            <dl class="info-item">
              <dt class="business-title">
                호스팅 서비스:
              </dt>
              <dd class="business-derc">
                네이버 클라우드 (주)
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div class="escrow-area">
        <img
          class="escrow-area__img"
          src="/src/assets/home/footer/escrow.png"
          alt="escrow" />
        <p class="escrow-area__text">
          고객님의 안전거래를 위해 현금 등으로 결제 시 KREAM에서 가입한 <br />
          NHN KCP의 구매안전서비스를 이용하실 수 있습니다. 
        </p>
      </div>
      <div class="notice-area">
        <p class="notice">
          해당 사이트는 크림 주식회사 사이트를 참조하여 학습목적으로 만들었습니다.
        </p>
        <p class="copyright">
          © KREAM Corp.
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

.footer {
  padding: 50px 40px;
  border-top: 1px solid #ebebeb;

  .inner {
    .service-area {
      display: flex;
      justify-content: space-between;
      padding-bottom: 56px;
      border-bottom: 1px solid #ebebeb;
      .footer-menu {
        width: 400px;
        height: 148px;
        display: inline-block;
        .menu-box {
          display: inline-block;
          width: 160px;
          height: 148px;
          .menu-title {
            font-size: 16px;
            font-weight: 700;
          }
          .menu-list {
            display: block;
            padding-top: 4px;
            list-style: none;
            .menu-item {
              width: 160px;
              height: 19px;
              margin-top: 12px;
              .menu-link {
                font-size: 14px;
                color: rgba(34, 34, 34, .5);
              }
            }
          }
        }
      }
      .customer-service {
        display: inline-block;
        height: 148px;
        .service-title {
          letter-spacing: -.16px;
          font-size: 16px;
          font-weight: 700;
          height: 20px;
          color: $color-black;
          .service-tel {
            height: 18px;
            color: $color-black;
            margin-left: 4px;
            letter-spacing: normal;
          }
        }
        .service-item {
          padding-top: 8px;
          .time-box {
            line-height: 17px;
            display: flex;
            .time-term {
              margin-right: 4px;
              font-size: 13px;
              color: rgba(34, 34, 34, .5);
            }
            .time-derc {
              margin-right: 4px;
              font-size: 13px;
              color: rgba(34, 34, 34, .5);
            }
          }
        }

        .service-notice {
          padding-top: 8px;
          font-size: 13px;
          color: $color-black;
        }
        .service-btn-box {
          padding-top: 17px;
          .service-btn {
            padding: 0 14px;
            height: 34px;
            font-size: 12px;
            color: $color-white;
            background-color: $color-black;
            border: 0px solid $color-black;
            cursor: pointer;
          }
        }
      }
    }
    .corporation_area {
      margin-top: 30px;
      position: relative;
      .term-list {
        height: 18px;
        display: inline-flex;
        padding-bottom: 16px;
        .term-item {
          padding-left: 18px;
          &:first-child {
            padding-left: 0px;
          }
        .term-link {
          height: 18px;
          font-size: 14px;
          color: $color-black;
        }
        .privacy {
          font-weight: 700;
        }
        }
      }
      .footer-sns {
        width: 112px;
        height: 24px;
        display: inline-flex;
        justify-content: space-between;
        position: absolute;
        top: 0;
        right: 0;
        img {
          width: 20px;
        }
      }
      .business-info {
        .info-list {
          height: 20px;
          display: block;
          .info-item {
            margin-right: 17px;
            font-size: 13px;
            display: inline;
            color: rgba(34, 34, 34, .5);
            .business-title {
              display: inline;
            }
            .business-derc {
              display: inline; 
            }
            .license-link {
              color: rgba(34, 34, 34, .5);
              text-decoration: underline;
            }
          }
        }
      }
    }
    .escrow-area {
      padding: 42px 0 8px;
      display: flex;
      align-items: center;
      .escrow-area__img {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
      .escrow-area__text {
        display: inline-block;
        font-size: 12px;
        letter-spacing: -.06px;
        color: rgba(34,34,34,.4);
        height: 32px;
        line-height: 16px;
      }
    }
    .notice-area {
      display: flex;
      justify-content: space-between;
      padding: 12px 0 0;
      font-size: 12px;
      color: rgba(34,34,34,.4);
      .notice {
        display: inline;
      }
      .copyright {
        display: inline;
      }
    }
  }
}
</style>
