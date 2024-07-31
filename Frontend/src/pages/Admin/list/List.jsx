import "./list.scss"
import Sidebar from "../../../components/AdminComponent/sidebar/Sidebar"
import Navbar from '../../../components/AdminComponent/navbar/Navbar';
import Datatable from "../../../components/AdminComponent/datatable/Datatable";

const List = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  )
}

export default List;