import Header from "./Components/Header/Header";
import classes from "./App.module.css";
import List from "./Components/Main/List";
import { useCallback, useEffect, useState } from "react";
import Footer from "./Components/Footer/Footer.js";

function App() {
   

  // This is my Parent component 

  const [displayContent, setdisplayContent] = useState([]);
  const [selectitem, setSelectitem] = useState([]);
  const [headercheckbox, setheaderchecbox] = useState(false);


  // Here we are going to fetch data from server using GEt Method 

  const fetchdata = useCallback(async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );

      if (!response.ok) {
        throw new Error("something went wrong ");
      }
      const data = await response.json();

      const addcheckbox = data.map((item) => {
        return {
          ...item,
          ischecked: false,
        };
      });

      setdisplayContent(addcheckbox);
    } catch (error) {
      // if server not response then this code of line execute 
      console.log(error);
    }
  });
//  i use useeffect because i did not want in each state update my api call again and again 
  useEffect(() => {
    fetchdata();
  }, []);


  // Now here is my single delete function  , using props i get id to delete a data from  footer/Listitem/Editin

  const SingleDelete = (id) => {
    const updateData = displayContent.filter((i) => i.id !== id);
    setdisplayContent(updateData);
  };

// here i update my checkbox whenever i click on chckbox i get data again usin props from footer/listitem 
  const checkboxchange = (id) => {
    let updatedData = displayContent.map((item) => {
      if (item.id !== id) return item;
      const changeitem = { ...item };
      const bool = changeitem.ischecked;
      changeitem.ischecked = !bool;
      return changeitem;
    });
    setdisplayContent(updatedData);
  };


  // here i  delete all select items  
  const SelectedItemDelte = () => {
    const Deletedata = displayContent.find((i) => i.ischecked);
    if (!Deletedata) {
      return;
    }
    const updateData = displayContent.filter((i) => !i.ischecked);
    setdisplayContent(updateData);
    setheaderchecbox(false);
    alert(" are you sure to delete these items");
  };


//  here i select all data that show in page using checkbox in header 
  const SelectAll = () => {
    
    setheaderchecbox(!headercheckbox);

      const seletedlist = selectitem.map((i) => {
        return i;
      });
      let updateData = displayContent.map((item) => {
        for (let i = 0; i < seletedlist.length; i++) {
          if (item.id === seletedlist[i].id) {
            const changeitem = { ...item };
            const check = changeitem.ischecked;
            changeitem.ischecked = !check;
            return changeitem;
          }
        }
        return item;
      });
      setdisplayContent(updateData);
  
  };



//  here i get all current item in current page 
  const Selectitem = (currentitem) => {
    setSelectitem(currentitem);
  };



// this is my search bar 
  const SearchItem = (serchitem) => {
    const updataeitem = displayContent.map((i) => {
      return i;
    });
    const usefilter = updataeitem.filter((item) => {
      let search = serchitem.toLowerCase();
      return (
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        item.role.toLowerCase().includes(search)
      );
    });
    setdisplayContent(usefilter);
  };


//  here i edit form when user want to update some details 
  const handlesubmit = (name, email, role, id) => {
    const updataeitem = displayContent.map((item) => {
      if (item.id === id) {
        const manipulateitem = {
          name,
          email,
          role,
          id,
        };
        return manipulateitem;
      }
      return item;
    });
    setdisplayContent(updataeitem);
  };
 
  // when page changes i update some state 
  const handlepagechange=()=>{
    
    if(headercheckbox){
      setheaderchecbox(false)
    }
    // SelectAll()
  }
  return (
    <div className={classes.App_body}>
      { console.log(
      'secound'
    )}
      <Header search={SearchItem} />
      <List selectall={SelectAll} checkbox={headercheckbox} />
     
      <Footer
        items={displayContent}
        delete={SingleDelete}
        selectdelete={SelectedItemDelte}
        checkbox={checkboxchange}
        currentitem={Selectitem}
        submit={handlesubmit}
        pagechange={handlepagechange}
      />
    </div>
  );
}

export default App;
