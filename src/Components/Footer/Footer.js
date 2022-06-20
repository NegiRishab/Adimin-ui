import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import ListItem from "../Main/ListItem";
import "./footer.css";

export default function Footer(props) {
  const { items } = props;
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;


  // my pagination code for change pages 
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, items]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    
    setItemOffset(newOffset);
    props.pagechange();
  };

//  function for transfer or call parent funtion with data 

useEffect(()=>{
  props.currentitem(currentItems)
},[currentItems])

  const handledelete = (id) => {
    props.delete(id,currentItems);
  };
  
  const handlecheckbox=(id)=>{
    props.checkbox(id);
  }
  const handlesubmit=(n,e,r,id)=>{
   props.submit(n,e,r,id)
  }
  
  return (
    <>
      <div className="head">
        {currentItems.map((item) => (
          <ListItem
            item={item}
            key={item.id}
            delete={handledelete}
            checkbox={handlecheckbox}
            submit={handlesubmit}
            
          />
        ))}
      </div>

      <div className="foot">
        <div>
          <button onClick={props.selectdelete}>Delete Select Item</button>
        </div>
        <div className="pagi">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageLinkClassName="page_num"
            previousLinkClassName="page_num"
            nextLinkClassName="page_num"
            activeLinkClassName="active"
          />
        </div>
      </div>
    </>
  );
}
