export interface Avaliacao {
  uuid: string,
  tipo_fornecimento: {
    uuid: string,
    tipo_fornecimento: string,
  },
  obra: {
    uuid: string
  },
  fornecedor: {
    uuid: string,
    razao_social: string
  },
  question_1: number,
  question_2: number,
  question_3: number,
  question_4: number,
  question_5: number,
  question_6: number,
  detalhes_qualificacao: {
    uuid: string,
    nf_bms: string,
    observacoes: string
  },
  criado_em: string
}

export interface AvaliacaoPost {
  tipo_fornecimento: string,
  obra: string,
  fornecedor: string,
  question_1: number,
  question_2: number,
  question_3: number,
  question_4: number,
  question_5: number,
  question_6: number,
  detalhes_qualificacao: {
    nf_bms: string,
    observacoes: string
  }
}

