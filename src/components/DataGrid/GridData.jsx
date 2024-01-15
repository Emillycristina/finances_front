import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaEdit, FaTrash } from 'react-icons/fa';

const GridData = () => {
  const manualData = [
    { id: 1, description: 'Compra de material', value: 500, date: '2023-01-05', type: 'entrada' },
    { id: 2, description: 'Pagamento de conta', value: -300, date: '2023-01-10', type: 'saida' },
    // Adicione mais linhas conforme necessário
  ];

  const columns = [
    { field: 'description', headerName: 'Descrição', flex: 1, headerClassName: 'custom-header' },
    { field: 'value', headerName: 'Valor', type: 'number', flex: 1, headerClassName: 'custom-header' },
    { field: 'date', headerName: 'Data', type: 'date', flex: 1, valueGetter: (params) => new Date(params.value), headerClassName: 'custom-header' },
    { field: 'type', headerName: 'Tipo', flex: 1, headerClassName: 'custom-header' },
    {
      field: 'actions',
      headerName: 'Ações',
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <>
          <FaEdit style={{ cursor: 'pointer', color:'#2e74f5' }} onClick={() => handleEdit(params.row.id)} />
          <FaTrash style={{ cursor: 'pointer', marginLeft: '8px', color:'#2e74f5' }} onClick={() => handleDelete(params.row.id)} />
        </>
      ),
    },
  ];

  const handleEdit = (id) => {
    // Lógica para editar a linha com o ID fornecido
    console.log(`Editar a linha com ID ${id}`);
  };

  const handleDelete = (id) => {
    // Lógica para excluir a linha com o ID fornecido
    console.log(`Excluir a linha com ID ${id}`);
  };

 

  const localeText = {
    // Traduções para os filtros
    
    filterEmptyRowsLabel: 'Sem resultados',
    filterTooltip: 'Filtrar',
    filterBooleanTrueLabel: 'Sim',
    filterBooleanFalseLabel: 'Não',

    toolbarDensity: 'Densidade',
    toolbarDensityCompact: 'Compacto',
    toolbarDensityStandard:'Médio',
    toolbarDensityComfortable:'Confortável',
    // Traduções para a exportação
    toolbarExport: 'Exportar',
    toolbarExportCSV: 'Exportar como CSV',
    toolbarExportExcel: 'Exportar como Excel',

    toolbarFilters: 'Filtros',
   

    toolbarColumns:'Colunas'
  
  };

  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 250, width: '70%', margin: '0 auto' , padding: '15px'}}>
      <DataGrid
        rows={manualData}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
        localeText={localeText}
        autoHeight
        sx={() => ({ background: 'rgb(255, 255, 255)' })}
      />
    </div>
  );
}

export default GridData;
