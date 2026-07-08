const { createApp } = Vue;

createApp({

    data() {
        return {

            nome: '',
            email: '',

            pessoas: []

        }
    },

    methods: {

        salvar() {

            this.pessoas.push({
                nome: this.nome,
                email: this.email
            });

            this.nome = '';
            this.email = '';
        }

    }

}).mount('#app');