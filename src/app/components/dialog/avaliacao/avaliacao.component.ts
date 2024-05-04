import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {DialogService, DynamicDialogComponent, DynamicDialogRef} from "primeng/dynamicdialog";
import {FornecedoresService} from "../../fornecedores/fornecedores.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Avaliacao, AvaliacaoPost} from "./IAvaliacao";
import {TokenService} from "../../../shared/session/token.service";

interface Answers {
  value: string;
  code: number;
}

interface TipoFornecimento {
  uuid: string,
  tipo_fornecimento: string
}


interface Questions {
  question: string,
  code: string,
  tooltip: string
}

@Component({
  selector: 'app-avaliacao',
  standalone: false,
  templateUrl: './avaliacao.component.html',
  styleUrl: './avaliacao.component.scss'
})
export class AvaliacaoComponent implements OnInit, AfterViewInit{

  answers: Answers[] | undefined
  questions: Questions[] | undefined
  avaliacao: Avaliacao | undefined
  fornecedor: {uuid: string, razao_social: string}
  tipo_fornecimento: TipoFornecimento[] | undefined

  #dialogInstance: DynamicDialogComponent
  #dialogService: DialogService = inject(DialogService)
  #fornecedorService: FornecedoresService = inject(FornecedoresService)
  #session: TokenService = inject(TokenService)

  avaliacaoForm: FormGroup = new FormGroup(
    {
      fornecedor: new FormControl<string | null>(null),
      avaliacao_uuid: new FormControl<string | null>(null),
      tipo_fornecimento: new FormControl<string | null>(null),
      nf_bms: new FormControl<string | null>(null),
      observacoes: new FormControl<string | null>(null),
      question_1: new FormControl<string | null>(null),
      question_2: new FormControl<string | null>(null),
      question_3: new FormControl<string | null>(null),
      question_4: new FormControl<string | null>(null),
      question_5: new FormControl<string | null>(null),
      question_6: new FormControl<string | null>(null),
      criado_em: new FormControl<string | null>(null)
    }
  )

  constructor(public dialogRef: DynamicDialogRef) {

  }

  async ngOnInit(): Promise<any> {
    if (this.#dialogService.dialogComponentRefMap.size != 0) {
      try {
        this.#dialogInstance = this.#dialogService.getInstance(this.dialogRef)
      } catch (err) {

      }
    }

    this.#fornecedorService.httpGetTipoFornecimento$().subscribe(
      {
        next: value => {
          this.tipo_fornecimento = value
        },
        error: value => {
          console.log(value)
        }
      }
    )

    this.#fornecedorService.httpGetFornecedor$(this.#dialogInstance.data.fornecedor).subscribe(
      {
        next: value => {
          this.fornecedor = {uuid: value.uuid, razao_social: value.razao_social}
        },
        error: value => {
          console.log(value)
        }
      }
    )




    this.answers = [
      {value: 'NA', code: -1},
      {value: '0', code: 0},
      {value: '1', code: 1},
      {value: '2', code: 2},
      {value: '3', code: 3},
      {value: '4', code: 4},
      {value: '5', code: 5},
      {value: '6', code: 6},
      {value: '7', code: 7},
      {value: '8', code: 8},
      {value: '9', code: 9},
      {value: '10', code: 10}
    ]

    this.questions = [
      {
        question: '1. Qualidade do Produto ou Serviço',
        code: 'question_1',
        tooltip: 'Refere-se à qualidade apresentada do produto/serviço, quando às inspeções realizadas pela Unidade de Gestão, de acordo com critérios próprios'
      },
      {
        question: '2. Prazo de Entrega e Quantidade',
        code: 'question_2',
        tooltip: 'Refere-se ao cumprimento do prazo de entrega do produto/serviço, conforme contrato e das quantidades'
      },
      {
        question: '3. Mão de Obra',
        code: 'question_3',
        tooltip: 'Refere-se aos profissionais executantes do serviço contratado, face suas habilidades, compêtencias, conhecimentos e reciclagem, para a boa execução das atividades contratadas'
      },
      {
        question: '4. Equipamentos e Máquinas',
        code: 'question_4',
        tooltip: 'Refere-se aos equipamentos, máquinas e ferramentas, quanto à boa condição de utilização, englobando o controle e aferição adequadas destes, bem como o emprego de EPIs, quando necessário'
      },
      {
        question: '5. Relacionamento',
        code: 'question_5',
        tooltip: 'Refere-se ao relacionamento entre cliente e fornecedor, quanto a cordialidade, destreza no atendimento e disponibilidade para solucionar eventuais problemas'
      },
      {
        question: '6. Documentos/Registros, inclusive legais',
        code: 'question_6',
        tooltip: 'Refere-se ao atentimento do requisitos legais no âmbito da Qualidade, Meio Ambiente e Saúde Ocupacional, tais como: Entrega de relátorios, certificados de qualidade, data book de equipamentos e outros documentos exigidos na FO-REG-CORP-094'
      }
    ]
  }

  ngAfterViewInit(): void {
    if (this.#dialogInstance.data.avaliacao) {

      this.#fornecedorService.httGetAvaliacaoUnique$(this.#dialogInstance.data.avaliacao).subscribe(
        {
          next: value => {
            this.mountAvaliacaoForm(value)
          },
          error: value => {
            console.log(value)
          }
        }
      )
    }
  }



  mountAvaliacaoForm(avaliacao: Avaliacao){
    this.setValuesForm(avaliacao)
  }

  setValuesForm(avaliacao: Avaliacao){

    this.avaliacaoForm.controls['avaliacao_uuid'].setValue(avaliacao.uuid)
    this.avaliacaoForm.controls['tipo_fornecimento'].setValue(this.tipo_fornecimento.find(t => t.uuid == avaliacao.tipo_fornecimento.uuid))
    this.avaliacaoForm.controls['nf_bms'].setValue(avaliacao.detalhes_qualificacao.nf_bms)
    this.avaliacaoForm.controls['observacoes'].setValue(avaliacao.detalhes_qualificacao.observacoes)
    this.avaliacaoForm.controls['criado_em'].setValue(avaliacao.criado_em)

    this.avaliacaoForm.controls['question_1'].setValue(this.answers.find(a => a.code == avaliacao.question_1))
    this.avaliacaoForm.controls['question_2'].setValue(this.answers.find(a => a.code == avaliacao.question_2))
    this.avaliacaoForm.controls['question_3'].setValue(this.answers.find(a => a.code == avaliacao.question_3))
    this.avaliacaoForm.controls['question_4'].setValue(this.answers.find(a => a.code == avaliacao.question_4))
    this.avaliacaoForm.controls['question_5'].setValue(this.answers.find(a => a.code == avaliacao.question_5))
    this.avaliacaoForm.controls['question_6'].setValue(this.answers.find(a => a.code == avaliacao.question_6))
  }

  salvar(){
    if (this.avaliacaoForm.valid) {
      const avaliacao: AvaliacaoPost = {
        fornecedor: this.fornecedor.uuid,
        tipo_fornecimento: this.avaliacaoForm.controls['tipo_fornecimento'].value.uuid,
        obra: this.#session.getUserProject(),
        question_1: this.avaliacaoForm.controls['question_1'].value.code,
        question_2: this.avaliacaoForm.controls['question_2'].value.code,
        question_3: this.avaliacaoForm.controls['question_3'].value.code,
        question_4: this.avaliacaoForm.controls['question_4'].value.code,
        question_5: this.avaliacaoForm.controls['question_5'].value.code,
        question_6: this.avaliacaoForm.controls['question_6'].value.code,
        detalhes_qualificacao: {
          nf_bms: this.avaliacaoForm.controls['nf_bms'].value,
          observacoes: this.avaliacaoForm.controls['observacoes'].value
        }
      }



      this.#fornecedorService.httpPostAvaliacao$(avaliacao).subscribe(
        {
          next: value => {
            this.dialogRef.close(this.fornecedor.uuid)
          },
          error: value => {
            console.log(value)
          }
        }
      )
    }
  }

  cancelar(){
    this.dialogRef.close()
  }


}


