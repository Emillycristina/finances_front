import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import authService from "../../Services/useAuth";
import React, { useState, useEffect } from "react";
import EditModal from "../Modal/Modal";

const GridData = () => {
  const userId = authService.getUserIdFromCookies();
  const token = authService.getTokenFromCookies();

  const [apiData, setApiData] = useState([]);

  const [editState, setEditState] = useState({ id: null, data: {} });
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apifinances.onrender.com/moviments",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              userId: userId,
            },
          }
        );

        const data = await response.json();

        const rowsWithIds = data.movimento.map((item) => ({
          id: item.id,
          descricao: item.descricao,
          valor: item.valor,
          data: item.data,
          tipo: item.tipo,
        }));

        setApiData(rowsWithIds);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      field: "descricao",
      headerName: "Descrição",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "valor",
      headerName: "Valor",
      type: "number",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "data",
      headerName: "Data",
      type: "date",
      flex: 1,
      valueGetter: (params) => new Date(params.value),
      headerClassName: "custom-header",
    },
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
      headerClassName: "custom-header",
    },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <>
          <FaEdit
            style={{ cursor: "pointer", color: "#2e74f5" }}
            onClick={() => handleEdit(params.row.id)}
          />
          <FaTrash
            style={{ cursor: "pointer", marginLeft: "8px", color: "#2e74f5" }}
            onClick={() => handleDelete(params.row.id)}
          />
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    setEditState({ id, data: apiData.find(item => item.id === id) });

    setIsModalOpen(true); 
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `https://apifinances.onrender.com/moviments/${editState.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
           
          },
          body: JSON.stringify(editState.data),
        }
      );
      console.log(editState.data);
      if (response.ok) {
        setIsModalOpen(false);
        
      } else {
        console.error("Erro ao atualizar movimento:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição de atualização:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://apifinances.onrender.com/moviments/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );
      if (response.ok) {
        setApiData(apiData.filter((item) => item.id !== id));
      } else {
        console.error("Erro ao excluir movimento:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao enviar requisição de exclusão:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
   
  };

  const handleEditDataUpdate = (updatedData) => {
    setApiData((prevApiData) => {
      return prevApiData.map((item) => {
        if (item.id === editState.id) {
          
          setEditState({
            ...editState,
            data: {
              ...editState.data,
              ...updatedData
            }
          });
          
          return { ...item, ...updatedData };
        }
        return item;
      });
    });
  };
  

  const localeText = {
    // Traduções para os filtros

    filterEmptyRowsLabel: "Sem resultados",
    filterTooltip: "Filtrar",
    filterBooleanTrueLabel: "Sim",
    filterBooleanFalseLabel: "Não",

    toolbarDensity: "Densidade",
    toolbarDensityCompact: "Compacto",
    toolbarDensityStandard: "Médio",
    toolbarDensityComfortable: "Confortável",
    // Traduções para a exportação
    toolbarExport: "Exportar",
    toolbarExportCSV: "Exportar como CSV",
    toolbarExportExcel: "Exportar como Excel",

    toolbarFilters: "Filtros",
    toolbarColumns: "Colunas",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 250,
        width: "70%",
        margin: "0 auto",
        padding: "15px",
      }}
    >
      <DataGrid
        rows={apiData}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableClickEventBubbling
        localeText={{ ...localeText }}
        sx={() => ({
          marginTop: "150px",
          maxHeight: "70vh",
          background: "rgb(255, 255, 255)",
        })}
      />
      <EditModal
        isOpen={isModalOpen}
        handleClose={closeModal}
        editState={editState}
        handleSave={handleSave}
        handleUpdate={handleEditDataUpdate}

      />
    </div>
  );
};

export default GridData;
