import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) private sort!: MatSort;

  public pessoaForm!: FormGroup;
  public displayedColumns = ['id', 'nome', 'telefone', 'excluir'];
  dataSource = new MatTableDataSource([] as any);

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.buildFormPessoa();
  }

  ngAfterViewInit() {
    this.configurarView();
  }

  private buildFormPessoa() {
    this.pessoaForm = this.fb.group({
      id: [{ value: null, disabled: true }, Validators.required],
      nome: [null, Validators.required],
      telefone: [null, Validators.required]
    });
  }

  private configurarView() {
    this.dataSource.sort = this.sort;
  }

  public gravarPessoa() {
    const novaPessoa = {
      id: this.dataSource.data.length + 1,
      nome: this.pessoaForm.get('nome')?.value,
      telefone: this.pessoaForm.get('telefone')?.value
    };

    this.dataSource.data.push(novaPessoa);

    this.dataSource.data = [...this.dataSource.data];
    this.exibirMensagemInformacao('Registro gravado com sucesso!');
    this.pessoaForm.reset();
  }

  public excluirPessoa(rowIndex: number) {
    this.dataSource.data.splice(rowIndex, 1);
    this.dataSource.data = [...this.dataSource.data];
    this.exibirMensagemInformacao('Registro excluído com sucesso!');
  }

  private exibirMensagemInformacao(mensagem: string, duracao?: number,) {
    this.snackBar.open(mensagem, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: duracao ? duracao : 5000,
    });
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
