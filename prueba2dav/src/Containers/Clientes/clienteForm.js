import React, { useState } from 'react';

import { DatePicker, Dropdown, PrimaryButton, ProgressIndicator, TextField } from '@fluentui/react';
import { restClient } from '../../Services/restClient';

const status = [{ key: true, text: 'Activo' }, { key: false, text: 'Inactivo' }];

export const ClienteForm = ({ fetchClientes, clienteSeleccionado, accion, onDismiss })=>{
    const[cliente, setClient] = useState({
        idClient: accion === 'Edit' ? clienteSeleccionado.idClient : 0,
        name: accion === 'Edit' ? clienteSeleccionado.name : '',
        civilStatus: accion === 'Edit' ? clienteSeleccionado.civilStatus : '',
        birthDate: accion === 'Edit' ? new Date(clienteSeleccionado.birthDate) : new Date(),
        activo: accion === 'Edit' ? clienteSeleccionado.activo : true
    });

    const [mensajeValida, setMansajeValida] = useState ('');
    const [showSpinner, setShowSpinner] = useState(false);
    const [errorCampo, setErrorCampo] = useState({
        name: '',
        civilStatus: '',
        birthDate: '',
        activo: ''
    });

    const handleTextFielChange = prop => (event, value) => {
        setClient({ ...cliente, [prop]: value})
    }

    const handleSelectedStatusChange = (event, option) => {
        setClient({ ...cliente, activo: option.key });
    }


    const validaCampos = () => {
        let mensaje ={};

        if(!cliente.name){
            mensaje = { ...mensaje, name: 'Ingrese nombre'}
        }

        if(!cliente.birthDate){
            mensaje = { ...mensaje, birthDate: 'Ingrese fecha'}
        }

        if (!cliente.activo) {
            mensaje = { ...mensaje, status: 'Seleccione un Estado...' };
        }


        setErrorCampo(mensaje);

        return Object.keys(mensaje).length;
    }

    const handleGuardarClick = async () => {
        if(validaCampos()){
            return;
        }

        
        setShowSpinner(true);

        const response = await restClient.httpPost('/client', cliente);

        console.log(response);
        
        if(typeof response === 'string'){
            setMansajeValida(response);
        } 

        if(typeof response === 'object'){
            setMansajeValida('Saved');

            fetchClientes();
        }
        
        setShowSpinner(false);

        onDismiss();
    }

    const handleEditarClick = async () =>{
        if(validaCampos()){
            return;
        }

        setShowSpinner(true);

        const url = `/client/${clienteSeleccionado.id}`;

        const response = await restClient.httpPut(url, cliente);

        if(response === 'success'){
            setMansajeValida('Saved');

            fetchClientes();
        }else{
            setMansajeValida(response);
        }

        setShowSpinner(false);

        onDismiss();
    }

    return (
        <div>
            {showSpinner && <ProgressIndicator label="Guardando..."/>}

            <TextField label="Nombre" 
                value={cliente.name}
                onChange={handleTextFielChange('name')}
                errorMessage={errorCampo.name} />
            
            <TextField label="Estado Civil" 
                value={cliente.civilStatus}
                onChange={handleTextFielChange('civilStatus')}
                errorMessage={errorCampo.civilStatus} />
            
            <DatePicker label="Fecha de Nacimiento" 
                value={cliente.birthDate}
                onChange={handleTextFielChange('birthDate')}
            />

            <Dropdown label="Seleccione un estado"
                options={status}
                selectedKey={cliente.activo}
                onChange={handleSelectedStatusChange}
                errorMessage={errorCampo.activo} />


                <br/>

            <PrimaryButton text="Guardar" onClick={accion === 'Nuevo' ? handleGuardarClick : handleEditarClick} />

            <br />

            <span style={{ color: mensajeValida === 'Saved'? 'green' : 'red'}}>{mensajeValida}</span>
        </div>
    )

}