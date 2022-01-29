<template>
  <div class="sceen">
    <div class="info">
      <div>
        <img class="man" src="../assets/run.png" alt="man" />
        <p class="speach">
          강남을 중심으로 열심히 운영하고 있어요. <br />소중한 의견 받아서
          열심히 늘려 나갈께요!
        </p>
      </div>
    </div>

    <div class="ground">
      <select v-model="addr1Selected" @change="getAddrList2(addr1Selected)">
        <option value="0" selected>시</option>
        <option
          v-for="(option, index) in addrList1"
          :key="index"
          :value="option.addressId"
          >{{ option.addressName }}
        </option>
      </select>
      <select v-model="addr2Selected" @change="getAddrList3(addr2Selected)">
        <option value="0" selected>시/군/구</option>
        <option
          v-for="(option, index) in addrList2"
          :key="index"
          :value="option.addressId"
          >{{ option.addressName }}</option
        >
      </select>
      <select v-model="addr3Selected" @change="setAddr(addr3Selected)">
        <option value="0" selected>읍/면/동</option>
        <option
          v-for="(option, index) in addrList3"
          :key="index"
          :value="option.addressId"
          >{{ option.addressName }}</option
        >
      </select>
    </div>
  </div>
</template>

<script>
import { getSearchAddr1, getSearchAddr2 } from '@/api/index';

export default {
  name: 'FindPlaceView',
  data() {
    return {
      addr1Selected: '0',
      addr2Selected: '0',
      addr3Selected: '0',
      addrList1: [],
      addrList2: [],
      addrList3: [],
    };
  },

  //부모,자식관계의 컴퍼넌트가 렌더링 될때 created 다음으로 호출
  //el이 새로 생성된 vm.$el로 대체된 인스턴스가 마운트 된 직후 호출됨
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.getAddrList();
    },
    getAddrList: async function() {
      try {
        const { data } = await getSearchAddr1();
        this.addrList1 = data.content;
        console.log(data.content);
      } catch (error) {
        console.log(error);
      }
    },
    getAddrList2: async function(value) {
      try {
        const params = '?level=2&pAddressId=' + value;
        const { data } = await getSearchAddr2(params);
        this.addrList2 = data.content;
        this.addr2Selected = '0';
        this.addr3Selected = '0';
        console.log(data.content);
      } catch (error) {
        console.log(error);
      }
    },
    getAddrList3: async function(value) {
      try {
        const params = '?level=3&pAddressId=' + value;
        const { data } = await getSearchAddr2(params);
        this.addrList3 = data.content;
        this.addr3Selected = '0';

        console.log(data.content);
      } catch (error) {
        console.log(error);
      }
    },
    setAddr: function(value) {
      this.$emit('setAddrId', value);
    },
  },
};
</script>

<style>
.ground select {
  border: solid 1px rgb(234, 234, 234);
  border-radius: 4px;
  width: 100%;
  height: 40px;
  margin-bottom: 20px;
  padding: 0 20px;
  /* 셀렉트안에 화살표 삭제 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #fff url(../assets/downBlack.png) 95% 50% no-repeat;
  background-size: 14px 10px;
}

/* 비활성화시 */
.ground select:disabled {
  color: rgb(183, 183, 183);
  background: rgb(234, 234, 234) url(../assets/down.png) 95% 50% no-repeat;
  background-size: 14px 10px;
}

/* 셀렉트안에 화살표 삭제 */
.ground select::-ms-expand {
  opacity: 0;
}

.sceen {
  padding: 15px 19px 0;
  background-color: white;
}

.info {
  text-align: center;
}

.man {
  width: 216px;
}

.speach {
  color: rgb(154, 138, 248);
  font-size: 13px;
}

.ground {
  background-color: white;
  margin-top: 24px;
}
</style>
