/* Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco)
- assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
- nome e 
- immagine di ogni contatto */


let boolzapp = new Vue({
  el: "#boolzapp",
  data:{
    contacts:[],
  },

});