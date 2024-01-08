import { useEffect, useRef, useState } from "react";
import { MdFormatListBulletedAdd, MdOutlineEdit, MdDeleteForever } from "react-icons/md";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function TodoList() {

    const [inputData, setInputData] = useState('');
    const [listItems, setListItems] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const serachInputRef = useRef();

    useEffect(() => {
        sessionStorage.getItem("list")
    })

    const addItem = () => {
        if (editIndex !== null) {
            const updatedData = [...listItems];
            updatedData[editIndex] = { text: inputData, done: false };
            setListItems(updatedData);
            setEditIndex(null);
            toast.warning("Item has been edited!");
        } else {
            if (!inputData) {
                toast.error("Item cannot be empty");
            } else {
                toast.success("Item added to list");
                setListItems([...listItems, { text: inputData, done: false }]);
            }
        }
        setInputData('');
        serachInputRef.current.focus();
    }


    const handleDone = (index) => {
        const updatedList = [...listItems];
        updatedList[index].done = !updatedList[index].done;
        setListItems(updatedList);
    }

    const handleEdit = (index) => {
        setInputData(listItems[index].text);
        setEditIndex(index);
    }

    const handleDelete = (index) => {
        const updatedList = [...listItems];
        updatedList.splice(index, 1);
        setListItems(updatedList);
        toast.error("Item has been removed from list");
    }

    return (<>
        <div className="box-border w-[40%] h-max rounded-xl shadow-xl bg-white/40 backdrop-blur-sm p-10">
            <div className="flex justify-center items-center gap-3">
                <input type="text"
                    className="outline-none ps-2 w-[70%] h-11 rounded-lg"
                    placeholder="Enter your items here....."
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    ref={serachInputRef}
                />

                <button onClick={addItem}>
                    <MdFormatListBulletedAdd className="text-[30px] text=white" />
                </button>
            </div>

            <div className="text-xl mt-7">
                {listItems.map((item, index) => (<>
                    <div key={index} className="m-2 flex justify-between items-center" >
                        <div className="flex gap-4 items-center">
                            <button onClick={() => handleDone(index)}>
                                {item.done ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
                            </button>
                            <p style={{ textDecoration: item.done ? "line-through" : 'none' }} >{item.text}</p>
                        </div>
                        <div className="flex w-[15%] justify-between">
                            <button onClick={() => handleEdit(index)}>
                                <MdOutlineEdit className="text[30px]" />
                            </button>
                            <button onClick={() => handleDelete(index)}>
                                <MdDeleteForever className="text[30px] text-red-600" />
                            </button>
                        </div>
                    </div >
                    <hr />
                </>))}
            </div>
        </div >
        <ToastContainer />
    </>);
}

export default TodoList;