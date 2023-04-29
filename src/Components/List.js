import { AiFillDelete,AiFillEdit } from "react-icons/ai";

const List =({id,title,removeItem,editItem})=>{
    return(
        <div>
            <p>
                <div className="list-item">
                        <p className="title">{title}</p>
                        <div className="button-container"></div>
                        <div>
                        <AiFillEdit onClick={()=>editItem(id)} className="btn" />
                        <AiFillDelete onClick={()=>removeItem(id)} className="btn"/>
                        </div>
                        
                </div>
            </p>
        </div>
    )
}

export default List