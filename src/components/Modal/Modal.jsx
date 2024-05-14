import { Modal, TextField, Button, Select, MenuItem } from '@mui/material';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import authService from "../../Services/useAuth";
import React, {useState, useEffect} from 'react';
import "dayjs/locale/pt-br";
import dayjs from 'dayjs';


const EditModal = ({ isOpen, handleClose, editState, handleSave, handleUpdate }) => {
  const userId = authService.getUserIdFromCookies();
  const token = authService.getTokenFromCookies();

  const formatDate = (dateString) => {
    return dayjs(dateString).format('DD/MM/YYYY');
  };
 

  const [formData, setFormData] = useState({
    descricao: "",
    valor: 0,
    tipo: "",
    data: null,
    userId: userId
  });



  useEffect(() => {
    if (isOpen && editState.id) {
      fetch(`https://apifinances.onrender.com/moviments/${editState.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      })
      .then(response => response.json())
      .then(apiData => {
        if (apiData && apiData.movimento) {
          const { descricao, valor, tipo, data } = apiData.movimento;
  

          const formattedDate = data ? formatDate(data) : null;
  
          const tipoSelecionado = tipo.toLowerCase();

        
        if (tipoSelecionado === 'entrada' || tipoSelecionado === 'saida') {
          setFormData({
            descricao: descricao,
            valor: valor,
            tipo: tipoSelecionado,
            data: formattedDate,
          });
          } else {
            console.error("Tipo inválido:", tipo);
            
            setFormData({
              descricao: descricao,
              valor: valor,
              tipo: '', 
              data: formattedDate,
            });
          }
        } else {
          console.error("Dados da API incompletos ou inválidos:", apiData);
        }
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes da movimentação:", error);
      });
    }
  }, [isOpen, editState.id]);


  const handleEditChange = (field, value) => {
   
    let updatedValue = value;

    if (field === 'data') {
      updatedValue = dayjs(value).format('DD-MM-YYYY');
    }

    const updatedFormData = { ...formData, [field]: updatedValue };

    setFormData(updatedFormData);
    handleUpdate(updatedFormData);

    console.log(updatedFormData); 
  };
  


  const onSaveClick = () => {

  
    if (formData.descricao && formData.valor && formData.tipo && formData.data) {
      handleSave(formData);
      handleClose();
    } else {
      console.error('Todos os campos devem ser preenchidos');
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)' }}>
        
        <form style={{ display:'flex', alignItems:'center'}}
        
          onSubmit={(e) => {
          e.preventDefault();
          onSaveClick();

        }} >
          <TextField
            label="Description"
            variant="outlined"
            value={formData.descricao || ""}
            onChange={(e) => handleEditChange('descricao', e.target.value)} 
            style={{ mb: 10, mr: 2,  marginRight:'6px'  }}
            size="small"
          />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format="D/M/YYYY"
                variant="standard"
                value={formData.data ? dayjs(formData.data, 'DD/MM/YYYY') : null}
                onChange={(newValue) => handleEditChange('data', newValue)} 
                slotProps={{ textField: { size: "small" } }}
                
              />
            </LocalizationProvider>
             <TextField
            label="Valor"
            variant="outlined"
            value={formData.valor || ""}
            onChange={(e) => handleEditChange('valor', e.target.value)}
            style={{ mb: 10, mr: 3,  marginLeft:'6px' }}
            size="small"
          />
           <Select
            label="Tipo"
            variant="outlined"
            value={formData.tipo || ""}
            onChange={(e) => handleEditChange('tipo', e.target.value)}
            style={{ mb: 10, mr: 2,  marginLeft:'6px'}}
            size="small"
          >
           <MenuItem value={'entrada'}>entrada</MenuItem>
           <MenuItem value={'saida'}>saída</MenuItem>
          </Select>
          <Button variant="contained" color="primary" type="submit"  style={{ marginLeft:'6px' }}>Salvar</Button>
          <Button variant="contained" color="secondary" onClick={handleClose} style={{ marginLeft:'6px' }}>Cancelar</Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditModal;
