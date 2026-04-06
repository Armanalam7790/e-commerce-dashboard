import { axiosInstance } from "../config/axiosinstence";


export let getAllProducts  = async ()=>{
    try {
      let res  = await axiosInstance.get(`/products`)
      console.log('api hitted');
      
      // console.log(res);
     return res.data.products
      
      
    } catch (error) {
      console.log('errors in products api ',error);
      
    }

  }