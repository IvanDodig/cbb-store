import { useEffect, useState } from "react";
import { Spinner, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link, useHistory } from "react-router-dom";
import ActionModal from "../Common/Modals/ActionModal";
import { categoryServices } from "../Services/categories.services";

const CategoriesList = () => {
   const [categories, setCategories] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [categoryId, setCategoryId] = useState(null);
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   const history = useHistory();

   const { SearchBar } = Search;

   const columns = [
      { dataField: "categoryId", text: "#", sort: true },
      {
         dataField: "categoryName",
         text: "Name",
         sort: true,
      },
      {
         dataField: "actions",
         text: "Update",
         isDummyField: true,
         formatter: (cell, row) => (
            <Button
               style={{ backgroundColor: "lightgreen", width: "100%" }}
               id={row.id}
            >
               Update
            </Button>
         ),
         events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
               history.push("/categories/update/" + row.categoryId);
            },
         },
      },
      {
         dataField: "actions",
         text: "Delete",
         isDummyField: true,
         formatter: (cell, row) => (
            <Button
               style={{ backgroundColor: "red", width: "100%" }}
               id={row.id}
            >
               Delete
            </Button>
         ),
         events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
               setCategoryId(row.categoryId);
               setShowModal(true);
            },
         },
      },
   ];

   useEffect(() => {
      categoryServices
         .getCategories()
         .then((res) => {
            if (res.status === 200) {
               setCategories(res.data);
               setIsLoading(false);
            } else {
               setIsLoading(false);
               setError("Došlo je do greške!");
            }
         })
         .catch((err) => setError(err));
   }, []);

   const handleDelete = (id) => {
      categoryServices.deleteCategory(id).then((res) => {
         if (res.status === 200) {
            history.go(0);
         }
      });
   };

   return (
      <>
         <h2>Categories list</h2>

         {error || isLoading ? (
            <>
               {error && (
                  <div className="error">
                     <h2 style={{ color: "red" }}>{error}</h2>
                  </div>
               )}
               {isLoading && <Spinner animation="border" />}
            </>
         ) : (
            <>
               <ActionModal
                  show={showModal}
                  message={"Are you sure?"}
                  handleShow={() => setShowModal(false)}
                  handleDelete={handleDelete}
                  id={categoryId}
               />
               <ToolkitProvider
                  keyField="categoryId"
                  data={categories}
                  columns={columns}
                  bootstrap4
                  search
               >
                  {(props) => (
                     <div>
                        <div className="d-flex justify-content-between">
                           <div style={{ width: "100%" }}>
                              <SearchBar {...props.searchProps} />
                           </div>
                           <div>
                              <Link to="/categories/create">
                                 <Button>Create</Button>
                              </Link>
                           </div>
                        </div>
                        <hr />
                        <BootstrapTable
                           {...props.baseProps}
                           pagination={paginationFactory()}
                           hover
                        />
                     </div>
                  )}
               </ToolkitProvider>
            </>
         )}
      </>
   );
};

export default CategoriesList;
