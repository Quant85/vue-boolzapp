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
            status: 'sent',
            show: false,
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Ricordati di dargli da mangiare',
            status: 'sent',
            show: false,
          },
          {
            date: '10/01/2020 16:15:22',
            text: 'Tutto fatto!',
            status: 'received',
            show: false,
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
            status: 'sent',
            show: false,
          },
          {
            date: '20/03/2020 16:30:55',
            text: 'Bene grazie! Stasera ci vediamo?',
            status: 'received',
            show: false,
          },
          {
            date: '20/03/2020 16:35:00',
            text: 'Mi piacerebbe ma devo andare a fare la spesa.',
            status: 'sent',
            show: false,
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
            status: 'received',
            show: false,
          },
          {
            date: '28/03/2020 10:20:10',
            text: 'Sicuro di non aver sbagliato chat?',
            status: 'sent',
            show: false,
          },
          {
            date: '28/03/2020 16:15:22',
            text: 'Ah scusa!',
            status: 'received',
            show: false,
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
            status: 'sent',
            show: false,
          },
          {
            date: '10/01/2020 15:50:00',
            text: 'Si, ma preferirei andare al cinema',
            status: 'received',
            show: false,
          }
        ],
      },
    ],
    admin:{
      name: "Antonio",
      avatar:"_io",
    },
    newMessage:"",
    search:'',
    nowTime:"",    
  },
  methods: {
    openCurrentUserWindow(index){
      this.contacts.forEach(element=>{
        element.state = false;
        this.filteredList.forEach(element => {if (element.state) {element.state = false;}});
        //console.log(element.state);
      });
      console.log(this.contacts);
      this.filteredList[index].state = true;
    },
    addCurrentMessage() {
      this.contacts.forEach(element => {
        if (element.state) {
          console.log(element);
          // element è dove pusciare, il percorso
          element.messages.push({
            date: this.nowTime,
            text: this.newMessage,
            status: 'received',
            show: false
          });
          /* il this all'interno della funzione setTimout è diverso si riferisce alla funzione stessa e non a ciò che è fuori, si potrebbe ovviare con una funziona che "punta a.." - con una funzione freccia  o con .bind(this) "legando" la funzione mediante bind al this esteno ad essa*/
          setTimeout(function(){
            element.messages.push({
              date: this.nowTime,
              text: 'Ok!',
              status: 'sent',
              show: false,
            });
          }.bind(this), 1000);
        }
      });
      this.newMessage = '';
    },
    scroll() {
     //https://developer.mozilla.org/it/docs/Web/API/Element/scrollTop
      //console.log(this.$refs.main_chat_window);
      let chat_box = this.$refs.main_chat_window;
      //console.log(chat_box);
      //https://developer.mozilla.org/it/docs/Web/API/Element/scrollHeight
      let scrollHeight = chat_box.scrollHeight;
      //console.log(scrollHeight);
      chat_box.scrollTop = scrollHeight;
      //console.log(chat_box.scrollTop);
    },
    deleteMessage(index,position) {
        // quando si elimina un elemento nell'array di oggetti la dove esso è l'ultimo contenente le informazioni che sono state usate per aggiornare gli altri tag - si crea un problema di renderizzazione - per ovviare si è dato un if else in html dove l'array messages è vuoto compare un'altro elemento
        let messages = this.contacts[index].messages;
        Vue.delete(messages,position);
    },
    timeFormate() {
      let date = new Date().toLocaleDateString();
      let time = new Date().toLocaleTimeString();
      this.nowTime = `${date}    ${time}`; //interpolazione di stringhe
    },
    nowTimes(){
      this.timeFormate(new Date());      
    },
  },
  /* Uso computed in modo da renderizzare l'uso della funzione solo quando entra in azione il search e non ad ogni iterazione dovuta da qual si voglia azione - cosache succederebbe se creassi un methods */
  computed: {
    filteredList() {
      /* con filter mi ritorno un array filtrato di "contacts" che rispetti la condizione data, che verifica il valore della funzione  */
      return this.contacts.filter(contactUser => {
        /* trasformo la stinga tutta in lettere minuscole per evitare possa escludere dei risultati nella ricerca - sia nella destinazione che nella recezione, ovvero nel search */
        return contactUser.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  mounted(){
    this.nowTimes();
    setInterval(this.nowTimes,1000); 
    this.scroll();//il problema è che ad ogni azione viene ricalcolata la posizione
  },
  updated() {
    this.scroll();
  }
});

/* .scrollHeight ->
che misura dell'altezza del contenuto di un elemento, incluso il contenuto non visibile sullo schermo (overflow) 

Element.scrollTop che imposta il numero di pixe in cui il contenuto dell'elemento viene fatto scorrere verticalmente , è una misura della distanza dalla parte superiore dell'elemento al suo contenuto visibile più in alto.
Combinando in sequenza questi due valori prima misuro l'altezza del contenuto(dopo aver inserito il nuovo messaggio) e poi lo passo a scrollTop per aggiornare la misura verticale del scrollTop, in modo di farlo scorrere verticalmente di tale valore.

richiamando il metodo in mounted() per poterlo successivamente ricaricare in updated cosi da fargli effettuare aggiornamenti sulle misurazioni rilevate. */