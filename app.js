require('colors');

//const { mostrarMenu, pausar } = require('./helpers/mensajes');


const {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');

const Tareas = require('./models/Tareas');

const { guardarDb, leerDb } = require('./helpers/guardarArchivo');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDb();

    if (tareasDB) { //Carga las tareas
        tareas.cargarTareasFormArr(tareasDB);
    }

    do {

        opt = await inquireMenu();

        switch (opt) {
            case '1':
                //Crear Opción
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);

                break;
            case '2':
                //Listar todas las tareas
                tareas.listadoCompleto();

                break;
            case '3':
                //Listar tareas completadas
                tareas.listadoPendientesCompletadas(true);

                break;
            case '4':
                //Listar tareas pendientes
                tareas.listadoPendientesCompletadas(false);

                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                //Borrar tareas
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id != '0') {
                    const ok = confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                    }
                }

                break;
            case '0':
                //salir del menú
                console.log('Espero que vuelva pronto Mao-sama')
                break;
        }

        guardarDb(tareas.listadoArr);
        await pausa();

    }
    while (opt !== '0');

}

main();