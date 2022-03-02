const Tarea = require('./tarea')
require('colors');
/*
 * _listadodo;
 *      { 'uuid-121212-1212112-2':{ id:12, desc:asd, completadoEn: 922331 } }
 Hola mi nombre es "Byron José González Meza"
 Hola mi nombre es "Byron José González Meza"
 */
class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach(keys => {
            const tarea = this._listado[keys];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFormArr(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

        //this._listado[tarea.id] = tarea;
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        // 1. Tarea :: Completada | Pendiente
        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.red;


            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    listadoPendientesCompletadas(completada = true) {

        let contador = 0;
        this.listadoArr.forEach((tarea, i) => {


            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ?
                'Completada'.green :
                'Pendiente'.blue;

            if (completada) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${(contador +'.').yellow} ${desc.red} :: ${(completadoEn).toString().green}`);
                }

            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${(contador +'.').yellow} ${desc.red} :: ${estado}`);
                }
            }

        });


    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }
}

module.exports = Tareas;