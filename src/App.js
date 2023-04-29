import { useState } from 'react';
import './App.css';
import {v4 as uuidv4} from 'uuid'
import List from './Components/List';
import Alert from './Components/Alert';




function App() {
  const [name,setname] = useState('')
  const [list,setList] = useState([])
  const [alert,setAlert] = useState({show:false,msg:'',type:''})
  const [checkEditItem,setCheckEditItem] = useState(false)
  const [editId,setEditId] = useState(null)

  const submitData=(e)=>{
    e.preventDefault()
    if(!name){
        setAlert({show:true,msg:'กรุณาป้อนข้อมูล',type:'error'})
    }else if(checkEditItem && name){
        const result = list.map((item)=>{
          if(item.id===editId){
              return{...item,title:name}
          }
          return item
        })
        setList(result)
        setname('')
        setCheckEditItem(false)
        setEditId(null)
        setAlert({show:true,msg:'แก้ไขข้อมูลเรียบร้อย',type:'success'})
    }else{
      const newItem ={
        id:uuidv4(),
        title :name,
      }
      console.log(newItem)
      setList([...list,newItem])
      setname('')
      setAlert({show:true,msg:'บันทึกข้อมูลเรียบร้อย',type:'success'})
    }
  }

  const removeItem=(id)=>{
    setList( list.filter((item)=>item.id !== id))
    setAlert({show:true,msg:'ลบข้อมูลเรียบร้อยแล้วครับ',type:'delete'})
  }
  const editItem=(id)=>{
    setEditId(id)
    setCheckEditItem(true)
    const searchItem = list.find((item)=>item.id === id )
    setname(searchItem.title)
    
    
   
  }


  return (
    <section className='container'>
        <h1>TodoList App</h1>
        {alert.show && <Alert {...alert} setAlert={setAlert} list={list} /> }
        {/* Form ที่ใช้กรอกข้อมูลทั้งหมด เมื่อกด Submit จะเรียกใช้ฟังชั่น submitData ด้านบนผ่าน Button ผ่าน Form */}
        <form className='form-group' onSubmit={submitData}>
          {/* Div คุมบรรทัด textbox ใส่ข้อมูลเปลี่ยนค่าใน Stateผ่าน Onchange และ button   */}
          <div className='form-control'>
          <input type='text' className='textinput' 
          onChange={(e)=>setname(e.target.value)} value={name}></input>
              <button type='submit' className='submit-btn'>{checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</button>
          </div>
              
        </form>
        <section className='List-container'>
          {list.map((data,index)=>{
              return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/>
          })}
        </section>
    </section>
  );
}

export default App;
