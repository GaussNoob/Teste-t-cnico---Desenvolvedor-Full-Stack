namespace GastosApi.Enuns;

public enum Tipo
{
    //Fiquei um pouco confuso em relacao ao tipo, no model Transacao,
    //porque ele deseja quase os mesmos valores de finalidade
    //porem ele nao tem a opcao de ambas, entao  criei mais um enum
    
    despesas = 0,
    receitas = 1,
}