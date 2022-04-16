
const TakeInventory = (props)=>{
    const [itemList, setItemList] = useState([]);

    axios
      .get("http://localhost:8000/api/items", {withCredentials: true})
      .then(res => {
          setItemList(
              ...itemList
          )
      })
      .catch(err => console.error(err));

    return(
        <>
        </>
    )
}