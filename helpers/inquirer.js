const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [{
            value: '1',
            name: `${'1.'.yellow} ${'Crear lista'.red}`
        }, {
            value: '2',
            name: `${'2.'.yellow} ${ 'Listar tareas'.red }`
        }, {
            value: '3',
            name: `${'3.'.yellow} ${ 'Listar tareas completadas'.red }`
        },
        {
            value: '4',
            name: `${'4.'.yellow} ${ 'Listar tareas pendientes'.red }`
        },
        {
            value: '5',
            name: `${'5.'.yellow} ${ 'Completar tarea(s)'.red }`
        },
        {
            value: '6',
            name: `${'6.'.yellow} ${ 'Borrar tarea'.red }`
        },
        {
            value: '0',
            name: `${'0.'.yellow} ${ 'Salir'.red }`
        }
    ]
}];

const inquireMenu = async() => {

    console.clear();

    console.log("======================".green);
    console.log("Seleccione una Opcion ".white);
    console.log("======================\n".green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'enter'.red } para continuar `
    }];

    await inquirer.prompt(question);
}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.yellow;

        return {
            value: tarea.id,
            name: `${idx} ${(tarea.desc).red}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    })

    const pregunta = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];

    const { id } = await inquirer.prompt(pregunta);

    return id;
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.yellow;

        return {
            value: tarea.id,
            name: `${idx} ${(tarea.desc).red}`,
            checked: (tarea.completadoEn) ? true : false

        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }];

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}



module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}