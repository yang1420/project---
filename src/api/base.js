// 这个是用来存放api接口的
//This is used to store the API interface



const base={
      baseUrl:"http://127.0.0.1:5000/",//这个是公共的接口,This is a public interface
      login:'/user/login/',
      get_menu:'menu/menus/?type_=tree',
      get_users:'/user/users/',
}

export default base