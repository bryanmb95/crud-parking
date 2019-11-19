const express = require('express');
const app = express ();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


var users = [
    {
        nome: "Bryan",
        carro: "Sandero",
        placa: "PXK-4052",
        saldo: 10,
        horaEntrada: "12:00",
        horaSaida: "18:00",
        id: 01
    
    },
    
    {
        nome: "Gabriel",
        carro: "Gol",
        placa: "PXK-4053",
        saldo: 5,
        horaEntrada: "10:00",
        horaSaida: "12:00",
        id: 02
    }
    ];

    //Functions
    //ADD USER
    const addUser = (user) => {
    
        users.push(user);
    
    }
    
    //SHOW USERS
    const showUsers = (users) => {
    
        console.log(users);
    
    }
    
    //UPDATE USER
    const updateUser = (user) => {
    
    
        users.forEach(element => {
            
            if (element.nome != user.nome && element.carro == user.carro && element.placa == user.placa && element.saldo == user.saldo && element.id == user.id) {

                element.nome = user.nome;
                console.log("Nome modificado");
    
            }
    
            else if (element.nome == user.nome && element.carro != user.carro && element.placa == user.placa && element.saldo == user.saldo && element.id == user.id) {
    
                element.carro = user.carro;
                console.log("Carro modificado. ");
    
            }
    
            else if (element.nome == user.nome && element.carro == user.carro && element.placa != user.placa && element.saldo == user.saldo && element.id == user.id) {
    
                element.placa = user.placa;
                console.log("Placa modificada. ");
    
            }
    
            else if (element.nome == user.nome && element.carro == user.carro && element.placa == user.placa && element.saldo != user.saldo && element.id == user.id ) {
    
                element.saldo = user.saldo;
                console.log("Saldo modificado. ");
    
            }

            else if (element.nome == user.nome && element.carro == user.carro && element.placa == user.placa && element.saldo == user.saldo && element.id != user.id) {

                element.id = user.id;
                console.log("ID modificado. ");

            }

        });
    
    }
    
    //DELETE USER
    const deleteUser = (userName) => {
    
        for (i = 0; i < users.length; i++) {

            if (users[i].nome == userName) {
    
                users.splice(users[i], 1);
    
            }
    
        }
    
    }
    const test = (userId) => {

        users.forEach(element => {

            console.log(element.id);
            if (element.id == 1) {
                console.log("voce achou o id");
                console.log("saldo desse id : " + element.saldo);
            }

        });

    }
    
    //USER ENTER IN THE PARK
    const valorTicket = 5;
    const enterPark = (userId, usersList) => {
    
        
        for (i = 0; i < usersList.length; i++) {

            if (userId == usersList[i].id) {
                
                var saldoUsuario = usersList[i].saldo;
                var saldoAtualizado;

                if (saldoUsuario >= valorTicket) {

                    console.log("ACESSO LIBERADO!!!");
                    saldoAtualizado = saldoUsuario - valorTicket;
                    console.log("Seu saldo atual é de: " + saldoAtualizado);

                }

                else {

                    console.log("SALDO INSUFICIENTE. POR FAVOR, EFETUE UMA RECARGA PARA LIBERAR SEU ACESSO!!!");

                }

                break;

            }

            else if (i == (usersList.length - 1)) {

                console.log("id de usuário não localizado. ");

            }
 
        }
    
    }

    //ROUTES
    app.listen('3000', function () {

        console.log('server is running on port 3000');

    });

    app.get('/', (req, res) => {

        usuariosCadastrados = JSON.stringify(users);
        res.send(console.log('Lista de usuários cadastrados: ' + usuariosCadastrados));

    });

    app.post('/add', (req, res) => {

        newUser = req.body;
        addUser(newUser);
        let listaAtualizada = JSON.stringify(users);

        res.send(console.log("Lista de usuários atualizada: " + listaAtualizada));

    });

    app.post('/update', (req, res) => {

        userEdited = req.body;
        updateUser(userEdited);
        listaAtual = JSON.stringify(users);
        res.send(console.log("Usuário modificado com sucesso. "));
        res.send(console.log("Lista atualizada de usuarios: " + listaAtual));

    });

    app.post('/delete', (req, res) => {

        var userToDelete = req.body.nome
        deleteUser(userToDelete);
        usuariosAtualizados = users;
        res.send(console.log(JSON.stringify(users)));
        res.send(console.log("Você deletou o usuário:  " + userToDelete));

    });

    app.get('/enter', (req, res) => {

        res.send(console.log("Solicitação de Entrada. "));
        enterPark(1, users);
        

    });