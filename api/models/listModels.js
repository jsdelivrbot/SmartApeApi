'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Esquema general de los tipos de quizz
var tipoSchema = new Schema({
  Lenguaje: {type:String},
  Titulo:[{type:String, lowercase: true, trim: true}]
})

//Esquemas usuados para los quiz
var SocialSchema = new Schema({
  Resueltos: {type:Number,
              default: 0},
  Aprobados: {type:Number,
              default: 0},
  Reprobados: {type:Number,
              default: 0},
  Vistos: {type:Number,
              default: 0},
  Guardados: {type:Number,
              default: 0},
  Favoritos: {type:Number,
              default: 0}
});
//Estructura principal de quiz
var QuizSchema = new Schema({
  Categoria: {type: String},
  Titulo: {type:String},
  Creador: {type:String},
  Estado: {type:Number},
  Descripcion: {type:String},
  Tiempo_limite: {type:String},
  Elementos_sociales: {type:SocialSchema, default: SocialSchema},
  Fecha_creacion: {
    type: Date,
    default: Date.now
  }
});

//Esquemas usados para las preguntas
var SolucionesSchema = new Schema({
  Correcto: { type: String},
  Respuesta_pregunta: { type: String}
});
//Esquema principal de pregunta
var PreguntaSchema = new Schema({
  Premisa: {type:String},
  Id_quiz: {type:Schema.Types.ObjectId,
        require: true},
  Tipo_pregunta:{type: Number},
  Collecion_soluciones: [{type:SolucionesSchema, default: SolucionesSchema}],
  Fecha_creacion: {
    type: Date,
    default: Date.now
  }
});


var UsuarioSchema = new Schema({
  Admin: {type: Boolean,
    default: false},
  Correo: {type: String},
  Password: {type: String},
  Collecion_favoritos: [Schema.Types.ObjectId],
  Collecion_guardados: [Schema.Types.ObjectId],
  Collecion_quizzes: [Schema.Types.ObjectId],
  Descripcion: {type: String,
            default: ""},
  Lugar: {type: String,
            default: ""},
  Nombre: {type: String,
            default: ""},
  Apellido: {type: String,
            default: ""},
  DisplayName: {type: String,
            default: ""},
  Fecha_creacion: {
    type: Date,
    default: Date.now
  }
});
// Esquema de resuelto
var ResueltoSchema = new Schema({
    Id_usuario: {type:Schema.Types.ObjectId},
    Id_quiz: {type:Schema.Types.ObjectId},
    Titulo: {type:String},
    Nota: {type:String},
    Fecha_creacion: {
      type: Date,
      default: Date.now
    }
});


module.exports = mongoose.model('Tipo', tipoSchema);
module.exports = mongoose.model('Pregunta', PreguntaSchema);
module.exports = mongoose.model('Quiz', QuizSchema);
module.exports = mongoose.model('Usuario', UsuarioSchema);
module.exports = mongoose.model('Resuelto', ResueltoSchema);
