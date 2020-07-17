import React, { useEffect, useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { importCsvService, getGrid } from './services';
import { API } from './config';

//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function App() {
  let file = '';
  const [grid, setGrid] = useState([]);
  const [selected, setSelected] = useState([]);
  
  useEffect(() => {
      getGrid(setGrid);
  }, []);

  async function importCsv() {
    if (!file) {
      alert('Escolha um Arquivo');
      return;
    }
    let formData = new FormData();
    formData.append("file", file);
    importCsvService(formData, setGrid);
  }
  async function changeSelected(id) {
    const old = selected;
    await setSelected([]);
    if (selected.includes(id)) {
      const removed = old.filter(element => (element !== id));
      return await setSelected(removed);
    }
    if (old.length >= 2) {
      setSelected(old);
      return;
    }
    let added = old;
    added.push(id);
    return await setSelected(added);
  }

  function getSelectedStyle(id) {
    return selected.includes(id) ? 'warning' : 'secondary';
  }

  function showRoute() {
    if (selected.length !== 2) {
      return;
    }
    const objFrom = grid.find(element => element.id === selected[0]);
    const objTo = grid.find(element => element.id === selected[1]);
    const from = `${objFrom.street}, ${objFrom.number} - ${objFrom.district}, ${objFrom.city} - ${objFrom.zip}`;
    const to = `${objTo.street}, ${objTo.number} - ${objTo.district}, ${objTo.city} - ${objTo.zip}`;
    window.open(`https://www.google.com/maps/dir/${from}/${to}`, "_blank");
  }

  return (
    <div className="App">
      <header className="App-header">
        <Form onSubmit={() => { console.log('submit') }}>
        <Alert className='menu' variant='dark'>
            <Form.File
              label="Pesquisar CSV"
              data-browse="Selecionar CSV"
              custom
              size='sm'
              value={file}
              onChange={(event) => { file = event.target.files[0] }}
            />
            <Button onClick={() => importCsv()} variant="success">Importar</Button>
        </Alert>
        </Form>
        <Table striped bordered hover className='grid-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Nascimento</th>
              <th>CPF</th>
              <th>Logradouro</th>
              <th>Número</th>
              <th>Complemento</th>
              <th>Bairro</th>
              <th>CEP</th>
              <th>Cidade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {(grid) && grid.map((line) => (
              <tr key={line.id}>
                <td>{line.id}</td>
                <td>{line.name}</td>
                <td>{line.email}</td>
                <td>{line.birth}</td>
                <td>{line.cpf}</td>
                <td>{line.street}</td>
                <td>{line.number}</td>
                <td>{line.address_complement}</td>
                <td>{line.district}</td>
                <td>{line.zip}</td>
                <td>{line.city}</td>
                <td>
                  <Button
                    onClick={() => changeSelected(line.id)}
                    variant={getSelectedStyle(line.id)}
                  >
                    {selected.includes(line.id) ? 'Selecionado' : 'Selecionar'}
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan='11'>
                {selected.length === 2 ? (<Alert variant='danger'>'Locais Selecionados'</Alert>) : ''}
              </td>
              <td><Button onClick={() => showRoute()} variant="primary">Mostrar Trajeto</Button></td>
            </tr>
          </tbody>
        </Table>
        <Alert className='menu' variant='dark'>
          <Button onClick={() => window.open(`${API}/places/export`, "_self")} variant="danger">Exportar</Button>
        </Alert>
      </header>
    </div>
  );
}

export default App;
