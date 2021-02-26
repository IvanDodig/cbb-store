import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link, useHistory } from "react-router-dom";
import ActionModal from "../Common/Modals/ActionModal";
import { customerServices } from "../Services/customers.services";
import { useTranslation } from "react-i18next";
import cellEditFactory from "react-bootstrap-table2-editor";

const CustomersList = () => {
   const [customers, setCustomers] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [showUpdateModal, setShowUpdateModal] = useState(false);
   const [modalData, setModalData] = useState(null);
   const [modalMessage, setModalMessage] = useState(null);
   const [customerId, setCustomerId] = useState(null);
   const [update, setUpdate] = useState(new Date());
   const [error, setError] = useState(null);
   const [isLoading, setIsLoading] = useState(true);

   const history = useHistory();

   const { SearchBar } = Search;

   const columns = [
      { dataField: "customerId", text: "#", sort: true },
      {
         dataField: "firstName",
         text: "Name",
         sort: true,
      },
      { dataField: "city", text: "City", sort: true },
      {
         dataField: "email",
         text: "Email",
         sort: true,
         style: { fontSize: "12px" },
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
               history.push("/update/" + row.customerId);
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
               setCustomerId(row.customerId);
               setShowModal(true);
            },
         },
      },
   ];

   useEffect(() => {
      customerServices
         .getCustomers()
         .then((res) => {
            if (res.status === 200) {
               setCustomers(res.data);
               setIsLoading(false);
            } else {
               setIsLoading(false);
               setError("Došlo je do greške!");
            }
         })
         .catch((err) => setError(err));
   }, [update]);

   const handleDelete = (id, data = null) => {
      customerServices.deleteCustomer(id).then((res) => {
         if (res.status === 200) {
            setShowModal(false);
            setUpdate(new Date());
         }
      });
   };

   const handleUpdate = (id, data) => {
      console.log(data);
      customerServices.updateCustomer(id, data).then((res) => {
         if (res.status === 200) {
            setShowUpdateModal(false);
            setUpdate(new Date());
         } else {
            console.log(res);
         }
      });
   };

   const { t, i18n } = useTranslation();
   return (
      <>
         <h2>{t("headings.customers")}</h2>

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
                  action={handleDelete}
                  id={customerId}
               />

               <ActionModal
                  show={showUpdateModal}
                  message={modalMessage}
                  handleShow={() => {
                     setShowUpdateModal(false);
                     setUpdate(new Date());
                  }}
                  data={modalData}
                  action={handleUpdate}
                  id={customerId}
               />

               <ToolkitProvider
                  keyField="customerId"
                  data={customers}
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
                              <Link to="/create">
                                 <Button>Create</Button>
                              </Link>
                           </div>
                        </div>
                        <hr />
                        <BootstrapTable
                           {...props.baseProps}
                           cellEdit={cellEditFactory({
                              mode: "click",
                              afterSaveCell: (
                                 oldValue,
                                 newValue,
                                 row,
                                 column
                              ) => {
                                 if (oldValue !== newValue) {
                                    setCustomerId(row.customerId);
                                    setModalData(row);
                                    setModalMessage(
                                       "Update " + oldValue + " to " + newValue
                                    );
                                    setShowUpdateModal(true);
                                    console.log(row);
                                 }
                              },
                           })}
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

export default CustomersList;
