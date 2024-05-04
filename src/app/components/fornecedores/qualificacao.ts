export interface Qualificacao {
  uuid: string,
  tipo_fornecimento: {
    uuuid: string,
    tipo_fornecimento: string
  },
  mean: number,
  detalhes_qualificacao: {
    nf_bms: string,
    observacoes: string,
  },
  fornecedor: {
    uuid: string,
  },
  criado_em: string,

}
