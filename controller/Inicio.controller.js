sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller , JSONModel) {
        "use strict";

        return Controller.extend("projectnetflix.controller.Inicio", {
            onInit: function () {

                var menu = {
                    primeiro : "BEGIN",
                    segundo  : "MOVIES",
                    terceiro : "SERIES",
                    quarto   : "DOCUMENTARY"
                };

                //cria modelo
                var menuModel = new JSONModel();
                menuModel.setData(menu);

                //atribuir dados modelo na tela
                var tela = this.getView()
                tela.setModel(menuModel , "MenuTela");    
                
                var resultados = {
                    titles : []
                };

                var filmesModel = new JSONModel();
                filmesModel.setData(resultados);
                tela.setModel(filmesModel, "APIFilmes");
            
            },

            onPressLink: function () {
                alert("Pagina em Construção.")
            },             
       
           
            onApertarBuscar: function() {
                // Obter valor de busca              
                var filtro  = this.byId("inputBuscar").getValue();              


                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query='
                    + filtro + '&offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': '302d885940msh22424f9a3686dcbp1d36b9jsndc6627a333d9',
                        'X-RapidAPI-Host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    // RESGATAR MODELO E ATUALIZAR OS DADOS
                     var view = this.getView();
                     var model = view.getModel("APIFilmes");
                     var dados = model.getData();

                     // limpar a lista
                     dados.titles = [];
                     dados.titles  = response.titles;
                     model.refresh();
                } .bind(this) );
    
              },

        
        });
    });
