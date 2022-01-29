<template>
  <div class="cont-room">
    <div class="dropdown">
      <strong class="addinfo">추가 정보 선택</strong>
      <p class="addinfotext">
        추가 정보를 등록해 주시면<br />최적의 공간을 찾아서 연락 드릴게요!
        <img class="smile" alt="imogi" src="../assets/smile.png" />
      </p>
      <button type="button" class="slim-arrow" @click="extraInfo = !extraInfo">
        <img class="arrow-img" alt="down-btn" src="../assets/slimdown.png" />
      </button>
    </div>
    <div class="wrap-select" v-if="extraInfo">
      <div class="room-type">
        <span>공간 구조</span>
        <span>(선택)</span>
      </div>
      <div class="room-select">
        <ul>
          <li v-for="(item, index) in structureList.content" :key="index">
            <button
              type="button"
              :class="{ active: houseStructures.includes(item.codeId) }"
              @click="selectStructure(item.codeId)"
            >
              {{ item.description }}
            </button>
          </li>
        </ul>
      </div>
      <article class="room-size">
        <span>평수</span>
        <span>(선택)</span>
        <!-- 범위슬라이드 추가 -->
        <div class="box-range">
          <vue-slider
            v-model="slider1Value"
            :min="1"
            :max="40"
            :marks="marks1"
            :tooltip="'none'"
          ></vue-slider>
          <!-- <ul class="list-range">
          <li>1평</li>
          <li>10평</li>
          <li>20평</li>
          <li>30평</li>
          <li>40평~</li>
        </ul> -->
          <span class="txt-value"
            >{{ slider1Value[0] }}평 ~ {{ slider1Value[1] }}평</span
          >
        </div>
      </article>

      <article class="room-pay">
        <span>월세</span>
        <span>(29박 기준)</span>
        <!-- 범위슬라이드 추가 -->
        <div class="box-range">
          <vue-slider
            v-model="slider2Value"
            :min="1"
            :max="250"
            :marks="marks2"
            :tooltip="'none'"
          ></vue-slider>
          <!-- <ul class="list-range">
          <li>1만</li>
          <li>50만</li>
          <li>100만</li>
          <li>150만</li>
          <li>250만~</li>
        </ul> -->
          <span class="txt-value"
            >{{ slider2Value[0] }}만원 ~ {{ slider2Value[1] }}만원</span
          >
        </div>
      </article>

      <div class="user-info">
        <div>
          <span>이름</span>
          <span>(선택)</span> <br />
          <div class="box-info">
            <input
              type="text"
              class="tf-cont name"
              placeholder="정규직"
              v-model="userName"
            />
          </div>
        </div>
        <div>
          <span>휴대폰번호</span>
          <span>(선택)</span> <br />
          <div class="box-info">
            <input
              id="phone"
              type="text"
              placeholder="010-1234-5678"
              v-model="userPhone"
              @keyup="phoneNumber(userPhone)"
              required
            />
          </div>
        </div>
        <div>
          <span>이메일</span>
          <span>(선택)</span> <br />
          <div class="box-info">
            <input
              type="text"
              class="tf-cont e-mail"
              placeholder="sarava@gmail.com"
              v-model="userEmail"
              @change="checkEmail($event, 'email')"
            />
          </div>
        </div>
      </div>

      <div class="agree">
        <div>
          <span>개인 정보 수집 및 이용 동의</span>
          <span>(선택)</span>
        </div>
        <div class="privacy">
          <ul class="circle-list">
            <li class="circle-item">
              &#9312; 수집 및 이용목적: 지역 수요 분석, 추가 설문
            </li>
            <li class="circle-item">
              &#9313; 수집정보: 이름(성함), 휴대폰번호, 이메일
            </li>
            <li class="circle-item">&#9314; 보유기간: 제공동의일로부터 1년</li>
            <li class="circle-item">
              &#9315; 귀하께서는 개인정보 수집 및 이용에 대해 거부할 권리가
              있습니다.
            </li>
          </ul>
        </div>
      </div>

      <div class="persnal-collect">
        <!-- 체크박스 export -->
        <span class="check-g">
          <input
            id="checkAgree"
            type="checkbox"
            name="개인정보동의"
            v-model="agreePersonalInfo"
            @change="setAskInfo()"
          />
          <label for="checkAgree" class="collect-agree"></label>
        </span>
        <span class="collect-agree-sign">
          (선택) 개인정보수집 및 이용에 동의 합니다. <br />
          (동의한 경우에만 개인 정보가 수집됩니다.)
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import { getHouseSize } from '@/api/index';
export default {
  components: {
    VueSlider,
  },
  data() {
    return {
      extraInfo: false,
      structureList: {},
      slider1Value: [1, 1],
      slider2Value: [1, 1],

      marks1: {
        '1': { label: '1평', labelStyle: { left: '10px' } },
        '10': { label: '10평' },
        '20': { label: '20평' },
        '30': { label: '30평' },
        '40': { label: '40평~', labelStyle: { left: 'auto', right: '-10px' } },
      },
      marks2: {
        '1': { label: '1만', labelStyle: { left: '10px' } },
        '50': { label: '5만', labelStyle: {} },
        '100': { label: '100만', labelStyle: {} },
        '150': { label: '150만', labelStyle: {} },
        '200': { label: '200만', labelStyle: {} },
        '250': {
          label: '250만~',
          labelStyle: { left: 'auto', right: '-10px' },
        },
      },

      agreePersonalInfo: false,
      houseStructures: [],
      userEmail: '',
      userName: '',
      userPhone: '',

      saveDataList: {},
    };
  },
  watch: {
    slider1Value() {
      this.setAskInfo();
    },
    slider2Value() {
      this.setAskInfo();
    },
  },
  mounted() {
    this.init();
  },

  methods: {
    init: function() {
      this.houseStructure();
    },
    houseStructure: async function() {
      try {
        const { data } = await getHouseSize();
        this.structureList = data;
        console.log(this.structureList);
      } catch (error) {
        console.log(error);
      }
    },
    selectStructure: function(value) {
      if (!this.houseStructures.includes(value)) {
        this.houseStructures.push(value);
      } else {
        this.houseStructures = this.houseStructures.filter(
          element => element !== value,
        );
      }
      this.setAskInfo();
    },

    setAskInfo: function() {
      this.saveDataList = {
        agreePersonalInfo: this.agreePersonalInfo,
        areaFrom: this.slider1Value[0],
        areaTo: this.slider1Value[1],
        amountFrom: this.slider2Value[0],
        amountTo: this.slider2Value[1],
        houseStructures: this.houseStructures,
        userEmail: this.userEmail,
        userName: this.userName,
        userPhone: this.userPhone,
      };
      this.$emit('setDataList', this.saveDataList);
    },

    checkEmail(type) {
      if (type === 'email') {
        if (!this.validEmail(this.userEmail)) {
          alert('이메일 형식을 확인하세요.');
        }
      }
    },
    validEmail: function(email) {
      // eslint-disable-next-line no-useless-escape
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    phoneNumber: function(value) {
      console.log(value);
      if (!value) {
        return '';
      }

      value = value.replace(/[^0-9]/g, '');
      console.log(value);
      let result = [];
      let restNumber = '';

      // 지역번호와 나머지 번호로 나누기
      if (value.startsWith('02')) {
        // 서울 02 지역번호
        result.push(value.substr(0, 2));
        restNumber = value.substring(2);
      } else if (value.startsWith('1')) {
        // 지역 번호가 없는 경우
        // 1xxx-yyyy
        restNumber = value;
      } else {
        // 나머지 3자리 지역번호
        // 0xx-yyyy-zzzz
        result.push(value.substr(0, 3));
        restNumber = value.substring(3);
      }

      if (restNumber.length === 7) {
        // 7자리만 남았을 때는 xxx-yyyy
        result.push(restNumber.substring(0, 3));
        result.push(restNumber.substring(3));
      } else {
        result.push(restNumber.substring(0, 4));
        result.push(restNumber.substring(4));
      }

      console.log('result', result);

      this.userPhone = result.filter(val => val).join('-');
    },
  },
};
</script>

<style>
.slider {
  width: 100%;
}

.wrap-select {
  width: 100%;
  padding: 40px;
  background-color: #fafafa;
}

.room-type {
  font-size: 13px;
  font-weight: bold;
}

.room-type span {
  margin-right: 3px;
}

.room-type span + span {
  color: rgb(190, 190, 190);
}

.room-select {
  margin-top: 13px;
}
.room-select li {
  display: inline-block;
  margin-right: 4px;
}

.room-select button {
  font-size: 12px;
  border-radius: 30px;
  padding: 11px 20px;

  border: none;
  background-color: rgb(237, 237, 237);
}
.room-select button:last-child {
  margin-right: 0;
}
.room-select .active {
  background-color: #c4baff;
  color: #fff;
}

.room-size {
  font-size: 13px;
  font-weight: bold;
  margin-top: 58px;
}

.room-size span + span {
  color: rgb(190, 190, 190);
}

.room-pay {
  font-size: 13px;
  font-weight: bold;
  margin-top: 58px;
}

.room-pay span + span {
  color: rgb(190, 190, 190);
}

/* 슬라이드 */
.box-range {
  position: relative;
  width: 100%;
  padding: 0 0;
  margin-top: 20px;
}
.box-range .list-range {
  position: relative;
  width: 100%;
  height: 20px;
}
.box-range .list-range li {
  position: absolute;
  bottom: 0;
  width: 50px;
  margin-left: -25px;
  font-size: 16px;
  text-align: center;
}
.box-range .list-range li:first-child {
  left: 0;
}
.box-range .list-range li:nth-child(2) {
  left: 25%;
}
.box-range .list-range li:nth-child(3) {
  left: 50%;
}
.box-range .list-range li:nth-child(4) {
  left: 75%;
}
.box-range .list-range li:last-child {
  left: 100%;
}
.box-range .txt-value {
  position: absolute;
  top: -20px;
  right: 0;
  color: #9a8af8;
}

.user-info {
  font-size: 12px;
  font-weight: bold;
  margin-top: 58px;
}

.box-info {
  margin: 10px -20px 0 -20px;
}

.user-info > div {
  margin-top: 36px;
  font-size: 13px;
  /* 네임.모바일.이메일 */
}

.user-info span + span {
  color: rgb(190, 190, 190);
  margin-left: 4px;
}

.tf-cont {
  padding: 0 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  border: solid 1px rgb(234, 234, 234);
  height: 40px;
  width: 100%;
}

::placeholder {
  color: rgb(170, 170, 170);
}
/* 플레이스홀더에 text를 입력하기 전에 색상. */

.name {
}

#phone {
  padding: 0 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  border: solid 1px rgb(234, 234, 234);
  height: 40px;
  width: 100%;
}

.e-mail {
}

.agree {
  margin-top: 35px;
  font-size: 13px;
}

.agree span {
  font-weight: bold;
}

.agree span + span {
  color: rgb(190, 190, 190);
  margin-left: 4px;
}

/* 이용내용박스 */
.privacy {
  border: solid 1px rgb(234, 234, 234);
  background-color: white;
  height: 74px;
  overflow-x: hidden;
  overflow-y: auto;
  margin-top: 18px;
  border-radius: 4px;
  margin: 18px -20px 0 -20px;
}

/* ul */
.circle-list {
  color: rgb(170, 170, 170);
  font-size: 13px;
  padding: 13px 20px 0 20px;
  font-weight: 400;
}

/* li 숫자는 ntt코드*/
.circle-item {
  margin-bottom: 4px;
}

.persnal-collect {
  margin: 0 0 12px 0;
  padding-top: 20px;
  line-height: 1;
  padding-left: 27px;
  text-indent: -27px;
  /* 마진이 적용되지않음 */
}

/* 체크박스 */
.check-g {
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
}
.check-g .collect-agree {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: #ddd;
  margin-right: 3px;
  vertical-align: top;
  background-image: url('../assets/checkBtn.png');
  background-size: 20px;
  /* 여기에 배경 이미지로 체크 모양 넣어랑 */
}

.check-g input {
  position: relative;
  z-index: -1;
  width: 1px;
  height: 1px;
  vertical-align: top;
  opacity: 0.01;
}
.check-g input:checked + label {
  background-color: #9a8af8;
}

.collect-agree-sign {
  font-size: 13px;
  color: rgb(51, 51, 51);
}

.cont-room {
  background-color: #fff;
}
.dropdown {
  padding: 20px 40px;
  position: relative;
  border-top: solid 1px rgb(233, 233, 233);
  border-bottom: solid 1px rgb(233, 233, 233);

  /* 보더가 끝까지 가지 않은것을 보정 */
}

.addinfo {
  font-size: 13px;
  font-weight: bold;
}

.addinfotext {
  font-size: 12px;
  font-weight: 300;
  margin-top: 15px;
}

.slim-arrow {
  position: absolute;
  right: 50px;
  top: 50%;
  margin-top: -9px;
}

.arrow-img {
  width: 16px;
  height: 8px;
}

.smile {
  width: 16px;
}
.vue-slider-ltr .vue-slider-mark-step {
  background-color: transparent;
}
.vue-slider-ltr .vue-slider-mark-label {
  font-size: 10px;
  color: #bebebe;
}
.vue-slider-ltr .vue-slider-process {
  background-color: #c4baff;
}
</style>
