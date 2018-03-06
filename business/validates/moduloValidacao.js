/*
* Validacoes pre cadastro
*/

module.exports ={    
    
    notNull: function notNull(valor){
        if(valor == null || valor == '' || typeof valor == 'undefined'){
            return false;
        }else{
            return true;
        }
    },

    validaEmail: function validaEmail(email){
        if(!email) return false;
        var exclude=/[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
        var check=/@[\w\-]+\./;
        var checkend=/\.[a-zA-Z]{2,3}$/;
        if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
        else {return true;}
    },

    replaceAllMod: function replaceAll(str, de, para){
        var pos = str.indexOf(de);
        while (pos > -1){
            str = str.replace(de, para);
            pos = str.indexOf(de);
        }
        return (str);
       
    },

    validaTelefone: function validaTelefone(telefone){
        if(!telefone) return false;

        telefone = telefone.replace('(','').replace(')','').replace(' ','').replace('-','');

         if (telefone == "0000000000" || 
            telefone == "1111111111" || 
            telefone == "2222222222" || 
            telefone == "3333333333" || 
            telefone == "4444444444" || 
            telefone == "5555555555" || 
            telefone == "6666666666" || 
            telefone == "7777777777" || 
            telefone == "8888888888" || 
            telefone == "9999999999")
            return false;

        if(telefone.length != 10){
            return false;
        }else{
            return true;
        }
    },

    validaCelular: function validaCelular(celular){
        if(!celular) return false;

        celular = celular.replace('(','').replace(')','').replace(' ','').replace('-','');

         if (celular == "00000000000" || 
            celular == "11111111111" || 
            celular == "22222222222" || 
            celular == "33333333333" || 
            celular == "44444444444" || 
            celular == "55555555555" || 
            celular == "66666666666" || 
            celular == "77777777777" || 
            celular == "88888888888" || 
            celular == "99999999999")
            return false;

        if(celular.length != 11){
            return false;
        }else{
            return true;
        }
    },

    validaCNPJ: function validaCNPJ(cnpj) {         
     
        if(!cnpj) return false;

        cnpj = replaceAll(cnpj,'.','').replace('-','').replace('/','');

        if (cnpj.length != 14)
            return false;
     
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" || 
            cnpj == "11111111111111" || 
            cnpj == "22222222222222" || 
            cnpj == "33333333333333" || 
            cnpj == "44444444444444" || 
            cnpj == "55555555555555" || 
            cnpj == "66666666666666" || 
            cnpj == "77777777777777" || 
            cnpj == "88888888888888" || 
            cnpj == "99999999999999")
            return false;
             
        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0,tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
             
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
              return false;
               
        return true;
    
    },

    validaCEP: function validaCEP(CEP){
        if(!CEP) return false;

        CEP = CEP.replace('-','');

        if(CEP.length != 8){
            return false;
        }else{
            return true;
        }
    },

    validaCPF: function validaCPF(CPF) {
        strCPF =  replaceAll(CPF,'.','').replace('-','');  
        var Soma;
        var Resto;
        Soma = 0;   
        if (strCPF == "00000000000" ||
            strCPF == "11111111111" ||
            strCPF == "22222222222" ||
            strCPF == "33333333333" ||
            strCPF == "44444444444" ||
            strCPF == "55555555555" ||
            strCPF == "66666666666" ||
            strCPF == "77777777777" ||
            strCPF == "88888888888" ||
            strCPF == "99999999999" ||
            strCPF.length != 11 )
        return false;
        for (i=1; i<=9; i++)
        Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i); 
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) 
        Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10)) )
        return false;
        Soma = 0;
        for (i = 1; i <= 10; i++)
           Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;
        if ((Resto == 10) || (Resto == 11)) 
        Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11) ) )
            return false;
        return true;
    },

    semMascaraTel: function retirarMascaraTel(valor){
        var telefone = valor;
        if(telefone != null && telefone != "" && typeof telefone != 'undefined'){
            var telefoneSemMascara = telefone.replace('(','').replace(')','').replace('-','').replace(' ','');
            return telefoneSemMascara;
        }else{
            return telefone;
        }
    },

    somenteNumero: function isNumber(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }

  
}

function replaceAll(str, de, para){
    var pos = str.indexOf(de);
    while (pos > -1){
        str = str.replace(de, para);
        pos = str.indexOf(de);
    }
    return (str);
}
