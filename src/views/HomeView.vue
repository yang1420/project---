<template>
    <div class="common-layout container">
        <el-container class="container">
            <el-header class="header">
                <div class="logo">
                    <img src="../assets/logo1.png" alt="">
                    <span>E-commerce</span>
                </div>
                <div class="user">
                    <el-button>Logout</el-button>
                </div>
            </el-header>
            <el-container>

                <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                    default-active="2" text-color="#fff" router>
                    <el-sub-menu :index="index + ''" :key="index" v-for="(item, index) in menuList.menus">

                        <template #title>
                            <el-icon>
                                <!-- <location /> -->
                            </el-icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <!-- <el-menu-item-group title="Group One"> -->
                            <el-menu-item :index="childItem.path" :key="childItem.id" v-for="childItem in item.Children">
                                {{ childItem.name }}
                            </el-menu-item>
                            
                        <!-- </el-menu-item-group> -->
                      
                    </el-sub-menu>
                    
                </el-menu>




                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup>
     import { useRoute } from 'vue-router';
     import api  from '@/api/index.js';
     import { onMounted ,reactive} from 'vue';


    const menuList=reactive({
        menus:[]
    })
    onMounted(()=>{
        get_menu()
    })

     const get_menu=()=>{
        api.get_Menu().then(res=>{
            menuList.menus=res.data.data
            console.log(res.data.data)
        })
     }


</script>
  
  
  <style scoped>
    .header {
      background-color: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      font-size: 20px;
      color: #999;
      height: 50px;
      width: 100%;
     }
    .logo {
      float: left;
      height: 50px;
      align-items: center;
      display: flex;
      justify-content: center;
     }
    .logo img {
      width: 40px;
      height: 30px;
      margin-right: 10px;
     }
    .user {
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
     }
    .aside{
      width: 200px;
      background-color: #304156;
     }
    .container{
      height: 100%;
     }
  </style>
  