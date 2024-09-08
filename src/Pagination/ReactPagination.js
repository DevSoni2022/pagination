import React, { useEffect, useState } from "react";
const ReactPagination = () => {
  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const API_URL = `https://jsonplaceholder.typicode.com/posts`;

  const getData = async () => {
    let data = await fetch(API_URL);
    let getData = await data.json();
    console.log(getData);
    setUserData(getData);
    setTotalPage(Math.ceil(getData.length / 15));
  };
  useEffect(() => {
    getData();
  }, []);

  //Current page function
  const hanldePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const hanldeNextClick = (newPage) => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const hanldePreviousClick = (newPage) => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const preDisable = currentPage === 1;
  const nextDisable = currentPage === totalPage;

  const itemPerPage = 15;
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const itemToDisplay =
    userData && userData.length > 0 && userData.slice(startIndex, endIndex);

  console.log(totalPage, "#!@#$@");
  return (
    <div>
      {itemToDisplay &&
        itemToDisplay.length > 0 &&
        itemToDisplay.map((ele, index) => {
          let test = ele.title;
          test = test.substring(0, 10);
          return (
            <div key={index}>
              {ele.id}
              {test}
            </div>
          );
        })}
      <button disabled={preDisable} onClick={() => hanldePreviousClick()}>
        Prev
      </button>

      {Array.from({ length: totalPage }, (_, i) => {
        return (
          <button
            disabled={currentPage === i + 1 ? true : false}
            onClick={() => hanldePageChange(i + 1)}
            key={i}
          >
            {i + 1}
          </button>
        );
      })}

      <button disabled={nextDisable} onClick={() => hanldeNextClick()}>
        Next
      </button>
    </div>
  );
};

export default ReactPagination;
