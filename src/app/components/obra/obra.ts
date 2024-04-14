export interface Obra {
  auth_user: {
    email: string;
    first_name: string;
    id: number;
    is_active: boolean;
    last_name: string;
    username: string;
  },
  obras:{
    cod_erp_obra: string;
    nome_obra: string;
    uuid: string;
  }[]

}
