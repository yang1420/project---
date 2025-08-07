<template>
    <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
      <el-breadcrumb-item>User Management</el-breadcrumb-item>
      <el-breadcrumb-item>User List</el-breadcrumb-item>
    
    </el-breadcrumb>


    <el-card class="card"  style="max-width: 100%;">
        <el-input
        v-model="user_data.queryName"
        style="max-width: 600px"
        placeholder="Please input"
        class="input-with-select"
        >
        <template #prepend>
            <el-button :icon="Search" @click="searchUser"/>
        </template>
        
        </el-input>
        <el-button type="primary" :icon="Plus" @click="addDialogVisible = true">Add User</el-button>

        <el-table :data="user_data.table_data" stripe style="width: 100%">
        <el-table-column prop="id" label="id" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="nick_name" label="Nick_name" />
        <el-table-column prop="phone" label="Phone" />
        <el-table-column prop="email" label="Email" />
        </el-table>

        <el-pagination
        :current-page="user_data.pageNum"
        :page-size="user_data.pageSize"
        @update:current-page="val => user_data.pageNum = val"
        @update:page-size="val => user_data.pageSize = val"
          :page-sizes="pageSizes"
          :size="size"
          :disabled="disabled"
          :background="background" 
          layout="total, sizes, prev, pager, next, jumper"
          :total=user_data.total
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />


        <!-- <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
        /> -->

    </el-card>


    <!-- 这是增加用户的 -->


<el-dialog v-model="addDialogVisible" title="Add User " width="500">
  <el-form :model="user_form">
    <el-form-item label="Username" :label-width="formLabelWidth">
      <el-input v-model="user_form.name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Password" :label-width="formLabelWidth">
      <el-input v-model="user_form.pwd" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm_Password" :label-width="formLabelWidth">
      <el-input v-model="user_form.real_pwd" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Nick Name" :label-width="formLabelWidth">
      <el-input v-model="user_form.nick_name" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Phone" :label-width="formLabelWidth">
      <el-input v-model="user_form.phone" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Email" :label-width="formLabelWidth">
      <el-input v-model="user_form.email" autocomplete="off" />
    </el-form-item>
  </el-form>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="addDialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="addDialogVisible = false">
        Confirm
      </el-button>
    </div>
  </template>
</el-dialog>




<!--This is correspond to the first line  -->
    </div>
  </template>
  
  <script  setup>
  const input3 = ref('') 
  import { ArrowRight ,Plus,Search} from '@element-plus/icons-vue'
import { onMounted ,ref,nextTick ,reactive} from 'vue'
import api from '@/api/index.js'







const user_data=reactive({//这个reactive的意思是响应式的
    table_data:[],
    total:10,
    pageNum:1,
    pageSize:2,
    queryName: ''
})
const user_form= reactive({
  name:null,
  pwd:null,
  real_pwd:null,
  nick_name:null,
  phone:null,
  email:null,
})


let pageSizes=ref([1,2,5,10])

const size = ref('default')         // ✔ 默认分页器大小
const background = ref(false)       // ✔ 是否有背景色
const disabled = ref(false)         // ✔ 是否禁用分页器
const addDialogVisible = ref(false) //添加用户的对话框的
const formLabelWidth = '110px' //用户框的宽度

  

// onMounted(()=>{
//     get_user_list()
// })

const currentPage4 = ref(4)
onMounted(() => {

  nextTick(() => {
    get_user_list()
  })
})


const get_user_list =()=>{
  let params={
    'pnum': user_data.pageNum,
    'psize':user_data.pageSize,
    'name':user_data.queryName
  }
    api.get_user_list(params).then(res=>{
        //Update User Data
        user_data.table_data=res.data.data.data
       
        //Update total variable
        user_data.total=res.data.data.total
         console.log(res)

    })
}


const handleSizeChange = (val) => {
  //这个只是修改pageSize
  user_data.pageSize=val
  //修改完还要重新获取用户列表数据
  get_user_list()

}
const handleCurrentChange = (val) => {
    //这个只是修改pageNum
  user_data.pageNum=val
    //修改完还要重新获取用户列表数据
    get_user_list()

}

const searchUser = () =>{

  user_data.pageNum=1
  get_user_list()
 
}

  </script>


<style scoped>
    .card{
        margin-top: 30px;
    }
</style>