import React, { useEffect, useState } from 'react';
import { CommandBar, DefaultButton, DetailsListLayoutMode, Dialog, DialogFooter, DialogType, IconButton, Panel, PrimaryButton, SearchBox, Selection, SelectionMode, ShimmeredDetailsList } from '@fluentui/react';
import { restClient } from '../../Services/restClient';
import { ClienteForm } from './clienteForm';
import './clientes.css'

export const Cliente = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenAlert, setIsOpenAlert] = useState(true);
    const [clientes, setClientes ] = useState(undefined);
    const [filtro, setFiltro] = useState([]);
    const [cliente, setCliente ] = useState({});
    const [accion , setAccion] = useState('Nuevo');

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await restClient.httpGet('/client');

        if(!response.length){
            return;
        }
        console.log(response)
        
        setClientes(response.map(item => ({ ...item, name: item.name})));
    }

    const handleRefreshClick = () => {
        setClientes(undefined);
        fetchClientes();
    }

    const handleDismissClick = () => {
        setIsOpen(!isOpen);
    }
    
    const handleNuevoClienteClick = () => {
        setAccion('Nuevo');

        setIsOpen(true);
    }
    
    const seleccion = new Selection({
        onSelectionChanged: () => {
            const itemSeleccionado = seleccion.getSelection();

            setCliente(itemSeleccionado.length ? itemSeleccionado[0] : null);
        }
    });

    const handleSearchCliente = value => {
        if(!value){
            setClientes(undefined);
            setFiltro([]);
            fetchClientes();

            return;
        }

        const datafilter = clientes && clientes.filter(item => item.nombre.toUpperCase().includes(value.toUpperCase()));

        setFiltro(datafilter)
    }

    const handleDismissAlertClick = () => {
        setIsOpenAlert(true);
    }

    const handleEditClienteClick = () => {
        if(!cliente) return 'Seleccione un cliente';

        setAccion('Edit');
        setIsOpen(true);
    }

    const handleRemoveClienteClick = async () => {
        if(!cliente) return;

        const response = await restClient.httpDelete('/client', cliente.idClient);

        if(response === 'success'){
            handleDismissAlertClick();
            setClientes(undefined);
            fetchClientes();
        }

        
    }

    const handleNoRemoveClienteClick = () => {
        handleDismissAlertClick();
    }

    const onRenderEdit = (row) => <IconButton iconProps={{ iconName: 'Edit' }} onClick={handleEditClienteClick} />
    const onRenderDelete = (row) => <IconButton iconProps={{ iconName: 'Delete' }} onClick={handleRemoveClienteClick} />

    const columns = [
        {key: 'OnRenderEdit', name:'', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderEdit},
        {key: 'OnRenderDelete', name:'', fieldName: '', minWidth: 30, maxWidth: 30, isResizable: true, onRender: onRenderDelete},
        {key: 'Column1', name:'idCliente', fieldName: 'idClient', minWidth: 100, maxWidth: 200, isResizable: true},
        {key: 'Column2', name:'Nombre', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true},
        {key: 'Column3', name:'Estado Civil', fieldName: 'civilStatus', minWidth: 100, maxWidth: 200, isResizable: true},
        {key: 'Column4', name:'Fecha Nacimiento', fieldName: 'birthDate', minWidth: 100, maxWidth: 200, isResizable: true},
        {key: 'Column5', name:'Estatus', fieldName: 'activo', minWidth: 100, maxWidth: 200, isResizable: true}
    ]

    const isDisableButton = cliente ? false : true;

    return (
        <div className="cliente">
            
            <CommandBar //barra para editar, agregar, etc
                items={[{
                    key: 'refresh',
                    text: 'Refresh',
                    iconProps: { iconName: 'Refresh' },
                    onClick: handleRefreshClick,
                }, {
                    key: 'newClient',
                    text: 'New',
                    iconProps: { iconName: 'Add' },
                    onClick: handleNuevoClienteClick,
                },
                {
                    key: 'removeClient',
                    text: 'Remove',
                    iconProps: { iconName: 'Delete' },
                    onClick: handleRemoveClienteClick,
                    disabled: isDisableButton
                }, {
                    key: 'editarCliente',
                    text: 'Editar Cliente',
                    iconProps: { iconName: 'Edit' },
                    onClick: handleEditClienteClick,
                    disabled: isDisableButton
                }]}
            />

            <SearchBox styles={{ root: { width: '300px' } }} placeholder="Buscar..." onSearch={handleSearchCliente} />

            <div className="contenedorLista">
                <ShimmeredDetailsList
                    items={filtro.length ? filtro : clientes}
                    columns={columns}
                    layoutMode={DetailsListLayoutMode.justified}
                    selection={seleccion}
                    selectionPreservedOnEmptyClick={true}
                    selectionMode={SelectionMode.single}
                    enableShimmer={!clientes}
                />
            </div>

            <Panel // panel lado derecho
                headerText={accion === 'Nuevo' ? "Nuevo Cliente" : "Editar Cliente"} 
                isOpen={isOpen}
                onDismiss={handleDismissClick}
                customWidth="700px"
            >
                <ClienteForm 
                    fetchClientes={fetchClientes} 
                    clienteSeleccionado={cliente || {}}
                    accion={accion}
                    onDismiss={handleDismissClick}
                />
            </Panel>

            <Dialog //consulta para remover
                hidden={isOpenAlert}
                onDismiss={handleDismissAlertClick} 
                dialogContentProps={{
                    type: DialogType.normal,
                    title: 'Remove Client',
                    closeButtonAriaLabel: 'Close',
                    subText: 'Remover Cliente?',
                }}
                modalProps={{
                    titleAriaId: '',
                    subtitleAriaId: '',
                    isBlocking: false,
                    styles: { main: { maxWidth: 450 } },
                }}
            >
                
                <DialogFooter>  
                    <PrimaryButton onClick={handleRemoveClienteClick} text="Si" />
                    <DefaultButton onClick={handleNoRemoveClienteClick} text="No" />
                </DialogFooter>
            </Dialog>
        </div>
    )

}