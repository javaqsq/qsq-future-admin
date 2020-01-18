<template>
  <div class="app-container">

    <el-form v-model="info">
      <sticky :class-name="'sub-navbar'">
        <el-button icon="el-icon-arrow-left" class="pan-back-btn" @click="goBack">
          返回
        </el-button>
      </sticky>
      <div class="detail-container">
        <el-row :gutter="10">
         <el-col :span="12"></el-col>
        </el-row>

      </div>
    </el-form>
  </div>
</template>

<script>
  import { fetchSysUserInfo } from '@/api/sys-user-admin'
  import Sticky from '@/components/Sticky'

  export default {
    name: 'sys-user-info',
    components: { Sticky },
    data() {
      return {
        userId: null,
        info: {
          userInfo: {},
          roleInfoList: [],
          permissions: []
        }

      }
    },
    created() {
      this.userId = this.$route.params && this.$route.params.userId
      console.info(this.userId)
      this.getSysUserInfo(this.userId)
    },
    methods: {
      goBack() {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.$router.go(-1)
        }
      },
      getSysUserInfo(id) {
        if (id) {
          fetchSysUserInfo(id).then(response => {
            this.userInfo = response.data.userInfo
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none !important;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }

    .el-col {
      border-radius: 4px;
    }
  }

  .detail-container {
    padding: 40px 50px 20px;

    .preview-img {
      width: 200px;
      height: 270px;
    }
  }
</style>
