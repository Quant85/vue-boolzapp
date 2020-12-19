/* 
● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco)
- assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
- nome e 
- immagine di ogni contatto 
*/


let boolzapp = new Vue({
  el: "#boolzapp",
  data:{
    contacts:[
      {
        name: 'Michele',
        avatar: '_1',
        visible: true,
        state: true,
        messages:[
          {
            date: '10/01/2020 15:30:55',
            text: 'Hai portato a spasso il cane?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent'
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Fabio',
        avatar: '_2',
        visible: true,
        state: false,
        messages: [
          {
            date: '20/03/2020 16:30:00',
            text: 'Ciao come stai?',
            status: 'sent'
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received'
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent'
          }
        ],
      },
      {
        name: 'Samuele',
        avatar: '_3',
        visible: true,
        state: false,
        messages: [
          {
            date: '28/03/2020 10:10:40',
            text: 'La Marianna va in campagna',
            status: 'received'
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent'
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received'
          }
        ],
      },
      {
        name: 'Luisa',
        avatar: '_4',
        visible: true,
        state: false,
        messages: [
          {
            date: '10/01/2020 15:30:55',
            text: 'Lo sai che ha aperto una nuova pizzeria?',
            status: 'sent'
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received'
          }
        ],
      },
    ],
    admin:{
        name: "Antonio",
        avatar:"_io",
      },
    newMessage:"",
    nowTime:"",
  },
  methods: {
    openCurrentUserWindow(index){
      this.contacts.forEach(element => {
        if (element.state) {
          element.state = false;
        }
      });
      this.contacts[index].state = true;
    },
    timeFormate() {
      let date = new Date().toLocaleDateString();
      let time = new Date().toLocaleTimeString();
      this.nowTime = `${date}    ${time}`; //interpolazione di stringhe
    },
    nowTimes(){
      this.timeFormate(new Date());
      //setInterval(this.nowTimes,1000); in questo modo diventa un orologgio 
    },

  },  
  mounted(){
    this.nowTimes();
  },

});