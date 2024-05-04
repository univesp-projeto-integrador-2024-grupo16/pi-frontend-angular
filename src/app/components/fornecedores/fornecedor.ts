export interface Fornecedor {


  uuid: string,
  cnpj: string,
  razao_social: string,
  inscricao_estadual: string,
  inscricao_municipal: string,
  endereco_fornecedor: {
    logradouro: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero_predio: string,
    cep: number
  }


}
