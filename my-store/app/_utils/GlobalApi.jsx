const {default:axios} =require("axios");

const axiosClient = axios.create({
    baseURL:'http://192.168.1.91:1337/api' 
    // baseURL:'http://192.168.1.91:1337/api' 
})

const getCategory=()=>axiosClient.get('/categories?populate=*');

const getSliders=()=>axiosClient.get('/sliders?populate=*').then(resp=>{
    return resp.data.data;
})

const getAllProducts=()=>axiosClient.get('/products?populate=*').then(resp=>{
    return resp.data.data;
})
const getProductByCategory=(category)=>axiosClient.get('/products?filters[categories][name][$in]='+category+'&populate=*').then(resp=>{
    return resp.data.data;
})
      const registerUser =(username,email,password)=>axiosClient.post('/auth/local/register',{
        username:username,
        email:email,
        password:password
    
      })


export default{
    getCategory,
    getSliders,
    getAllProducts,
    getProductByCategory,
    registerUser
    
}