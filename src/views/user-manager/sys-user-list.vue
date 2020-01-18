<template>
  <div class="app-container">
    <sticky :z-index="10" :class-name="'sub-navbar'">
      <el-button  icon="el-icon-arrow-left" class="pan-back-btn" @click="goBack"  :loading=searchLoading >
        返回
      </el-button>
    </sticky>
    <el-row>
      <div class="filter-container">
        <el-input v-model="listQuery.username" placeholder="用户名" style="width: 200px;" class="filter-item" @keyup.enter.native="searchFilter" />
        <el-select v-model="listQuery.role" placeholder="角色" clearable style="width: 200px" class="filter-item">
          <el-option v-for="item in roleList" :key="item" :label="item" :value="item" />
        </el-select>
        <el-input v-model="listQuery.nickname" placeholder="昵称" style="width: 200px;" class="filter-item" @keyup.enter.native="searchFilter" />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="searchFilter">
          查询
        </el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="sysUserList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
      >
        <el-table-column label="用户id" prop="id" sortable="custom" align="center" width="100" :class-name="getSortClass('id')">
          <template slot-scope="{row}">
            <span>{{ row.userId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.nickname }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column label="性别" width="90px" align="center">-->
          <!--<template slot-scope="{row}">-->
            <!--<span>{{ row.sex === 1 ?'男':'女' }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="生日" width="150px" align="center">-->
          <!--<template slot-scope="{row}">-->
            <!--<span>{{ row.birthday | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column label="邮箱" width="200px"  align="center">
          <template slot-scope="{row}">
            <el-tag>{{ row.email  }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column  label="角色信息"  align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.roleNames }}</span>
          </template>
        </el-table-column>
        <el-table-column  label="角色"align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.roles }}</span>
          </template>
        </el-table-column>
        <el-table-column label="锁定标志" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.lockSign === 1 ?'锁定':'正常' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="100px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.createUserName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Actions" align="center"  min-width="80px" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="routerSysUserInfo(row.userId)">
              详情
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              修改
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger"  @click="handleModifyStatus(row,'draft')">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getSysUserList" />
    </el-row>
  </div>
</template>

<script>
  import { fetchList, getRoleList } from '@/api/sys-user-admin'
  import Pagination from '@/components/Pagination'
  import waves from '@/directive/waves'

  export default {
    name: 'sys-user-list',
    components: { Pagination },
    directives: { waves },
    data() {
      return {
        tableKey: 0,
        total: 0,
        searchLoading:false ,
        listLoading: true,
        roleValue:'',
        showReviewer: '',
        listQuery:{
          limit:15,
          page:1,
          username:'',
          role:'',
          nickname:''
        },
        sysUserList: [],
        roleList:[],
        roleNameQuery: null,
      }
    },
    created() {
      // 获取用户列表数据
      this.getSysUserList()

      // 获取角色信息
      this.getRoleList()
    },
    methods: {
      getSysUserList(){
        this.listLoading = false ;
        fetchList(this.listQuery).then(response=>{
          this.sysUserList = response.data.records ;
          this.total = response.data.total;
        }).catch(err=>{
          console.info(err)
        })
      },
      searchFilter(){
        this.searchLoading = true ;
        this.sysUserList.page = 1
        this.getSysUserList()
        this.searchLoading = false ;
      },
      handleCreate(){

      },
      sortChange(){

      },
      getSortClass: function(key) {
        const sort = this.listQuery.sort
        return sort === `+${key}`
          ? 'ascending'
          : sort === `-${key}`
            ? 'descending'
            : ''
      },
      routerSysUserInfo(userId){
        console.info("当前行的数据", userId)
        this.$router.push({name: 'sysUser-info', params: {userId: userId}})
      },
      goBack() {
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/dashboard' })
        } else {
          this.$router.go(-1)
        }
      },
      getRoleList() {
        getRoleList(this.roleNameQuery).then(response=>{
          this.roleList = response.data
        }).catch(err=>{
          console.info(err)
        })
      },
    }

  }
</script>

<style lang="scss" scoped >
  .pan-back-btn {
    background: #008489;
    color: #fff;
    border: none!important;
  }
  .el-row {
      margin-bottom: 20px;
      &:last-child {
         margin-bottom: 0;
       }
    }
</style>
