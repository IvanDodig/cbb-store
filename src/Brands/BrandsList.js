import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link, useHistory } from "react-router-dom";
import ActionModal from "../Common/Modals/ActionModal";
import { brandServices } from "../Services/brands.services";

const BrandsList = () => {
   const [brands, setBrands] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [brandId, setBrandId] = useState(null);
   const [update, setUpdate] = useState(new Date());
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   const history = useHistory();

   const { SearchBar } = Search;

   const columns = [
      { dataField: "brandId", text: "#", sort: true },
      {
         dataField: "brandName",
         text: "Name",
         sort: true,
      },
      {
         dataField: "action-update",
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
               history.push("/brands/update/" + row.brandId);
            },
         },
      },
      {
         dataField: "action-delete",
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
               setBrandId(row.brandId);
               setShowModal(true);
            },
         },
      },
   ];

   useEffect(() => {
      brandServices
         .getBrands()
         .then((res) => {
            if (res.status === 200) {
               setBrands(res.data);
               setIsLoading(false);
            } else {
               console.log(res);
               setIsLoading(false);
               setError("Došlo je do greške!");
            }
         })
         .catch((err) => setError(err));
   }, [update]);

   const handleDelete = (id) => {
      brandServices.deleteBrand(id).then((res) => {
         if (res.status === 200) {
            setShowModal(false);
            setUpdate(new Date());
         }
      });
   };

   return (
      <>
         <h2>Brands list</h2>

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
                  id={brandId}
               />
               <ToolkitProvider
                  keyField="brandId"
                  data={brands}
                  columns={columns}
                  search
               >
                  {(props) => (
                     <div>
                        <div className="d-flex justify-content-between">
                           <div style={{ width: "100%" }}>
                              <SearchBar {...props.searchProps} />
                           </div>
                           <div>
                              <Link to="/brands/create">
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

export default BrandsList;
