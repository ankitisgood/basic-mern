import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'

const GetTask = () => {
  const [data,setData] =  useState([]);
  const {url,token} = useContext(StoreContext);

  console.log(token);

  const fetchOrders = async () => {
    try{
    const response = await axios.get(url+ "/api/tasks/getAllTasks", { withCredentials: true });
    setData(response.data)
  }
  catch (err) {
    console.log(err);
  }
  }
  console.log(data);

  useEffect(()=>{
    if (token) {
      fetchOrders();
    }
  },[token])

  return (
    <div className=''>
      GetTask
      <div>
      </div>
    </div>
  )
}

export default GetTask