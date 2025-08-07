<template>
    <!-- this is the body content -->
     <div class="main">
        <div class="login_page">
            <div class="logo">
                <img src="../assets/logo1.png" alt="">
            </div>

            <!-- This part is a form component that copy from 
             https://element-plus.org/en-US/component/button.html 
             I also doing some small modify
             -->
            <el-form :model="form" ref="formRef" label-width="auto" style="max-width: 250px" class="user_Form" :rules='user_rules'>
                <!-- this is for username -->
                <el-form-item label="Username:" prop="name">
                     <el-input v-model="form.name" />
                </el-form-item>
                <!-- this is for password -->
                <el-form-item label="Password:" prop="pwd" >
                     <el-input v-model="form.pwd" show-password/>
                </el-form-item>

                 <!-- this is button -->

                <el-form-item class="buttons">
                <el-button type="primary" @click="onSubmit">Login</el-button>
                <el-button @click="onReset">Reset</el-button>
                </el-form-item>
            </el-form>

        </div>
     </div>
</template>



<script setup>

    import { reactive ,ref} from 'vue'
    import api from '../api/index.js' //这是引入api
    import { useRouter } from 'vue-router' //引入路由，因为需要切换主页

    // do not use same name with ref
    const form = reactive({
    name: '',
    pwd:''
    })

    const user_rules=reactive({
        name:[
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 12, message: 'Length should be 3 to 12', trigger: 'blur' },
        ],
        pwd:[ { required: true, message: 'The password can not be empty', trigger: 'blur' },]
    })


    // 定义重置表单的方法
    const formRef=ref(null)
    const onReset = () => {
    formRef.value.resetFields()
    }
    // 可以在登入那边做一个验证，但是对于期末太麻烦了，以后有空写


    const router=useRouter()


    // 定义登录功能
    // 在这里进行登入
    //这个东西也是从element plus 那里拿的
    //This one is come from element plus and I also modify a little bit
    const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('Verify success')
      api.getLogin(form).then(res => {//如果valid，就发送post 请求，这个then是回调函数
        console.log(res.data)
        if (res.data.status == 200) {  
          // 跳转到主页
          router.push('/')
         }else{
          // 登录失败
          ElMessage.warning("Worng Username of Password")
         }
      })
    } else {
      console.log('Fail verify')
      return false
    }
  })
}



</script>


<style scoped>
    .main{
        width: 100%;
        height: 100%;
        background-color:rgb(149, 161, 37);
        display: flex;
         /* 默认是水平方向）上的对齐方式。*/
        justify-content: center;
       /* 默认是垂直方向）上的对齐方式。 */
        align-items: center;
        
    }
    .login_page{
        width: 400px;
        height: 300px;
        background-color: white;
        border-radius: 5px;
    }
    .logo{
       
        width: 100px;
        border: 1px solid #2f0505;
        margin: 0 auto;
        margin-top: -65px;
        padding: 5px;
        border-radius: 10px;
        box-shadow: 0 0 20px #ddd;
     }
    img{
        width: 100%;
        height: 100%;
    }
    .user_Form{
        padding: 40px;
    }
    .buttons{
        display: flex;
        justify-content: space-between;
    }
    .buttons button{
    flex: 1;
   }
</style>
