<template>
  <div class="centents">
    <city @setAddrId="setAddrId"></city>
    <room @setDataList="setDataList"></room>
    <div class="fin-colse">
      <button
        type="button"
        class="fin-btn"
        :disabled="buttonActive"
        @click="requstLocationData()"
      >
        <strong>완료</strong>
      </button>
    </div>
  </div>
</template>

<script>
import city from '@/components/SearchCity';
import room from '@/components/SearchRoom';
import { postLocationRequest } from '@/api/index';

export default {
  components: {
    city,
    room,
  },
  data() {
    return {
      buttonActive: true,
      addressId: null,
      saveDataList: {},
    };
  },
  methods: {
    setAddrId: function(value) {
      this.addressId = value;
      this.saveDataList.addressId = this.addressId;
      console.log('addressId', this.addressId);
      if (this.addressId) {
        this.buttonActive = false;
      }
    },
    setDataList: function(arr) {
      this.saveDataList = arr;
      this.saveDataList.addressId = this.addressId;
    },
    requstLocationData: async function() {
      try {
        if (!this.agreePersonalInfo) {
          this.userEmail = '';
          this.userName = '';
          this.userPhone = '';
        }
        console.log('this.saveDataList', this.saveDataList.addressId);
        console.log('this.saveDataList', this.saveDataList);
        await postLocationRequest(this.saveDataList);
      } catch (error) {
        console.log(error.response);
        if (error.response.status === 409) {
          this.logMessage = `${this.username} already exists`;
        }
      }
    },
  },
};
</script>

<style>
.centents {
  max-width: 750px;
  min-width: 375px;
  width: 100%;
  margin: 0 auto;
}
.fin-colse {
  padding: 0 20px;
  margin: 10px 0;
}

.fin-btn {
  width: 335px;
  height: 48px;
  font-size: 16px;
  color: #fff;
  background-color: rgb(51, 51, 51);
  border-radius: 4px;
  border: none;
  margin: 24px 0;
}
.fin-btn:disabled {
  background-color: #ddd;
}
</style>
]
